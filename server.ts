import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Server-side Gemini client helper
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// REST route for rapid financial analysis using gemini-3.8-flash
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const ai = getGeminiClient();
    const { message, context } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const systemInstruction = `You are the Octopus Organizer Financial Voice & Intelligence Copilot, an intuitive, offline-first personal financial operating system assistant.
You provide crisp, high-value, actionable financial clarity and answers.
Current User Context:
${context ? JSON.stringify(context, null, 2) : 'Standard personal finance workspace'}
Tone: Classy, reassuring, mathematically precise, empowering. Keep answers concise (under 3 paragraphs or bullet points).`;

    const chat = ai.chats.create({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction,
      },
    });

    const response = await chat.sendMessage({
      message,
    });

    return res.json({
      text: response.text || 'I have analyzed your financial ledger.',
      model: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('[API Chat Error]:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini API',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    liveModel: 'gemini-3.8-live',
    chatModel: 'gemini-3.8-flash',
  });
});

// WebSocket Server for Gemini Live API (gemini-3.8-live)
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', async (clientWs: WebSocket, req) => {
  console.log('[Live WebSocket] Client connected from', req.socket.remoteAddress);
  let liveSession: any = null;
  let isClosing = false;

  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const requestedVoice = url.searchParams.get('voice') || 'Zephyr';

  try {
    const ai = getGeminiClient();

    // Connect to Gemini 3.8 Live API
    liveSession = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: requestedVoice, // 'Zephyr', 'Puck', 'Charon', 'Kore', 'Fenrir'
            },
          },
        },
        systemInstruction: `You are the Octopus Organizer Real-Time Voice Copilot.
You speak naturally, warmly, and concisely about personal finances, budgets, runway, savings, multi-currency allocations, and local sovereign data.
Be concise and conversational since you are speaking directly to the user over real-time audio. Keep spoken responses to 1-3 sentences unless asked for deeper breakdowns.`,
        outputAudioTranscription: {},
        inputAudioTranscription: {},
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          if (clientWs.readyState !== WebSocket.OPEN) return;

          // Model turn audio output (24kHz PCM)
          const modelParts = message.serverContent?.modelTurn?.parts;
          if (modelParts && modelParts.length > 0) {
            for (const part of modelParts) {
              if (part.inlineData?.data) {
                clientWs.send(
                  JSON.stringify({
                    type: 'audio',
                    audio: part.inlineData.data,
                    mimeType: part.inlineData.mimeType || 'audio/pcm;rate=24000',
                  })
                );
              }
              if (part.text) {
                clientWs.send(
                  JSON.stringify({
                    type: 'model_transcript',
                    text: part.text,
                  })
                );
              }
            }
          }

          // Interruption detection
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: 'interrupted' }));
          }

          if (message.serverContent?.turnComplete) {
            clientWs.send(JSON.stringify({ type: 'turn_complete' }));
          }
        },
        onclose: () => {
          if (clientWs.readyState === WebSocket.OPEN && !isClosing) {
            clientWs.send(JSON.stringify({ type: 'session_closed' }));
          }
        },
        onerror: (err: any) => {
          console.error('[Gemini Live Error]:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                type: 'error',
                message: err?.message || 'Error from Gemini Live API session',
              })
            );
          }
        },
      },
    });

    clientWs.send(
      JSON.stringify({
        type: 'connected',
        model: 'gemini-3.8-live',
        voice: requestedVoice,
      })
    );

    // Client audio stream handling
    clientWs.on('message', (rawData) => {
      try {
        const msg = JSON.parse(rawData.toString());
        if (msg.type === 'realtime_input' && msg.audio && liveSession) {
          liveSession.sendRealtimeInput({
            audio: {
              data: msg.audio,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        } else if (msg.type === 'text_input' && msg.text && liveSession) {
          liveSession.sendRealtimeInput({
            text: msg.text,
          });
        }
      } catch (e) {
        console.error('[WebSocket message parse error]:', e);
      }
    });

    clientWs.on('close', () => {
      isClosing = true;
      if (liveSession) {
        try {
          liveSession.close();
        } catch (e) {
          // ignore cleanup errors
        }
      }
    });
  } catch (initErr: any) {
    console.error('[Gemini Live Connection Failed]:', initErr);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(
        JSON.stringify({
          type: 'error',
          message:
            initErr?.message ||
            'Failed to establish Gemini Live connection. Check GEMINI_API_KEY in Settings > Secrets.',
        })
      );
      clientWs.close();
    }
  }
});

// Route upgrade requests to WebSocketServer for /api/live
server.on('upgrade', (request, socket, head) => {
  const { pathname } = new URL(request.url || '', `http://${request.headers.host}`);
  if (pathname === '/api/live') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

// Setup Vite or static serving
async function setupApp() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Octopus Organizer running on http://localhost:${PORT}`);
    console.log(`[Server] Live WebSocket endpoint ready at ws://localhost:${PORT}/api/live`);
  });
}

setupApp();
