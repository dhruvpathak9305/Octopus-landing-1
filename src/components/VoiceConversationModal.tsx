/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Radio,
  RefreshCw,
  Send,
  Square,
  MessageSquare,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { Currency, formatCurrency } from '../utils/finance';
import { float32ToPcm16Base64, GaplessAudioPlayer } from '../utils/audioStream';

interface VoiceConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  reducedMotion?: boolean;
}

interface MessageEntry {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  model: 'gemini-3.8-live' | 'gemini-3.8-flash';
}

const AVAILABLE_VOICES = [
  { id: 'Zephyr', name: 'Zephyr', desc: 'Warm, calm, and balanced' },
  { id: 'Kore', name: 'Kore', desc: 'Articulate, thoughtful, and clear' },
  { id: 'Puck', name: 'Puck', desc: 'Bright, crisp, and upbeat' },
  { id: 'Fenrir', name: 'Fenrir', desc: 'Deep, resonant, and grounded' },
  { id: 'Charon', name: 'Charon', desc: 'Steady, formal, and collected' },
];

export const VoiceConversationModal: React.FC<VoiceConversationModalProps> = ({
  isOpen,
  onClose,
  currency,
  reducedMotion = false,
}) => {
  const [selectedVoice, setSelectedVoice] = useState<string>('Zephyr');
  const [connectionStatus, setConnectionStatus] = useState<
    'disconnected' | 'connecting' | 'connected' | 'error'
  >('disconnected');
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isModelSpeaking, setIsModelSpeaking] = useState<boolean>(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<'gemini-3.8-live' | 'gemini-3.8-flash'>('gemini-3.8-live');
  const [isSendingText, setIsSendingText] = useState<boolean>(false);

  // Audio References
  const wsRef = useRef<WebSocket | null>(null);
  const playerRef = useRef<GaplessAudioPlayer | null>(null);
  const micAudioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const micAnalyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize Player
  useEffect(() => {
    playerRef.current = new GaplessAudioPlayer((speaking) => {
      setIsModelSpeaking(speaking);
    });

    return () => {
      cleanupConnection();
      if (playerRef.current) {
        playerRef.current.close();
      }
    };
  }, []);

  // Auto-connect when modal opens
  useEffect(() => {
    if (isOpen) {
      startLiveSession();
    } else {
      cleanupConnection();
    }
  }, [isOpen, selectedVoice]);

  // Scroll to bottom of message list
  useEffect(() => {
    if (showHistory && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showHistory]);

  const cleanupConnection = () => {
    // Stop mic stream
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }
    if (micProcessorRef.current) {
      micProcessorRef.current.disconnect();
      micProcessorRef.current = null;
    }
    if (micAudioCtxRef.current) {
      micAudioCtxRef.current.close().catch(() => {});
      micAudioCtxRef.current = null;
    }
    // Stop live audio playback
    if (playerRef.current) {
      playerRef.current.interrupt();
    }
    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.onclose = null;
      wsRef.current.onerror = null;
      wsRef.current.onmessage = null;
      wsRef.current.close();
      wsRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setConnectionStatus('disconnected');
    setIsModelSpeaking(false);
    setIsUserSpeaking(false);
  };

  const startLiveSession = async () => {
    cleanupConnection();
    setConnectionStatus('connecting');
    setErrorMessage(null);

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/api/live?voice=${selectedVoice}`;

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = async () => {
        console.log('[Live Client] WebSocket connected to Gemini 3.8 Live API');
        setConnectionStatus('connected');
        setActiveModel('gemini-3.8-live');
        await setupMicrophone(ws);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'connected') {
            setConnectionStatus('connected');
          } else if (data.type === 'audio' && data.audio) {
            // Stream audio chunk into gapless 24kHz player
            if (playerRef.current) {
              playerRef.current.playChunk(data.audio);
            }
          } else if (data.type === 'model_transcript' && data.text) {
            setCurrentTranscript((prev) => {
              const updated = prev ? `${prev} ${data.text}` : data.text;
              return updated;
            });
          } else if (data.type === 'turn_complete') {
            setCurrentTranscript((current) => {
              if (current.trim()) {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: Math.random().toString(36).substring(2, 9),
                    role: 'model',
                    text: current.trim(),
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    model: 'gemini-3.8-live',
                  },
                ]);
              }
              return '';
            });
          } else if (data.type === 'interrupted') {
            console.log('[Live Client] User interrupted model speech');
            if (playerRef.current) {
              playerRef.current.interrupt();
            }
            setIsModelSpeaking(false);
          } else if (data.type === 'error') {
            setErrorMessage(data.message || 'Error received from Gemini Live API session');
            setConnectionStatus('error');
          }
        } catch (err) {
          console.error('[Live Client] Message parsing error:', err);
        }
      };

      ws.onerror = (e) => {
        console.error('[Live Client] WebSocket error:', e);
        setErrorMessage('Could not connect to Gemini Live session. Make sure server is running.');
        setConnectionStatus('error');
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
      };
    } catch (err: any) {
      console.error('[Live Client] Connection setup failed:', err);
      setErrorMessage(err?.message || 'Failed to start Live session');
      setConnectionStatus('error');
    }
  };

  const setupMicrophone = async (ws: WebSocket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx({ sampleRate: 16000 });
      micAudioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.5;
      micAnalyserRef.current = analyser;

      // ScriptProcessor for 16-bit PCM streaming
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      micProcessorRef.current = processor;

      source.connect(analyser);
      analyser.connect(processor);
      processor.connect(audioCtx.destination);

      let silenceFrames = 0;

      processor.onaudioprocess = (e) => {
        if (isMicMuted || ws.readyState !== WebSocket.OPEN) return;

        const channelData = e.inputBuffer.getChannelData(0);

        // Detect speaking level
        let sum = 0;
        for (let i = 0; i < channelData.length; i++) {
          sum += Math.abs(channelData[i]);
        }
        const rms = Math.sqrt(sum / channelData.length);

        if (rms > 0.015) {
          setIsUserSpeaking(true);
          silenceFrames = 0;
        } else {
          silenceFrames++;
          if (silenceFrames > 12) {
            setIsUserSpeaking(false);
          }
        }

        // Convert Float32 to 16-bit PCM little-endian Base64
        const pcmBase64 = float32ToPcm16Base64(channelData);
        ws.send(
          JSON.stringify({
            type: 'realtime_input',
            audio: pcmBase64,
          })
        );
      };

      // Start canvas audio visualizer loop
      drawWaveform();
    } catch (micErr: any) {
      console.warn('[Live Client] Microphone access error:', micErr);
      setErrorMessage(
        'Microphone access was denied or is unavailable. You can still type queries or test with sample questions.'
      );
    }
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = micAnalyserRef.current;
    const bufferLength = analyser ? analyser.frequencyBinCount : 64;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (analyser && !isMicMuted) {
        analyser.getByteFrequencyData(dataArray);
      }

      // Draw modern organic glowing waveform bars
      const barCount = 36;
      const barWidth = width / barCount - 3;
      const centerY = height / 2;

      for (let i = 0; i < barCount; i++) {
        let value = 0;
        if (isModelSpeaking) {
          // Model speaking pulse animation
          const time = Date.now() / 150;
          value = Math.sin(time + i * 0.4) * 45 + 50 + Math.random() * 15;
        } else if (isUserSpeaking && analyser && !isMicMuted) {
          const dataIndex = Math.floor((i / barCount) * (bufferLength / 2));
          value = (dataArray[dataIndex] / 255) * 80;
        } else {
          // Ambient breathing state
          const time = Date.now() / 600;
          value = Math.sin(time + i * 0.2) * 6 + 10;
        }

        const barHeight = Math.max(4, value);
        const x = i * (barWidth + 3);

        const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
        if (isModelSpeaking) {
          gradient.addColorStop(0, '#19B99A');
          gradient.addColorStop(0.5, '#07856D');
          gradient.addColorStop(1, '#05473A');
        } else if (isUserSpeaking) {
          gradient.addColorStop(0, '#26D07C');
          gradient.addColorStop(0.5, '#19B99A');
          gradient.addColorStop(1, '#07856D');
        } else {
          gradient.addColorStop(0, 'rgba(25, 185, 154, 0.4)');
          gradient.addColorStop(1, 'rgba(7, 133, 109, 0.2)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, centerY - barHeight / 2, barWidth, barHeight, 4);
        ctx.fill();
      }
    };

    render();
  };

  const handleInterrupt = () => {
    if (playerRef.current) {
      playerRef.current.interrupt();
    }
    setIsModelSpeaking(false);
  };

  const toggleMic = () => {
    setIsMicMuted((prev) => !prev);
  };

  const sendTextMessage = async (textToSend?: string) => {
    const query = (textToSend || textInput).trim();
    if (!query) return;

    setTextInput('');
    setIsSendingText(true);

    const userEntry: MessageEntry = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: activeModel,
    };
    setMessages((prev) => [...prev, userEntry]);

    // If connected to Gemini Live and user chose Live mode
    if (activeModel === 'gemini-3.8-live' && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: 'text_input',
          text: query,
        })
      );
      setIsSendingText(false);
    } else {
      // Use Server-side Gemini 3.8 Flash REST endpoint
      try {
        const response = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            context: {
              currency,
              netWorth: 1824500,
              emergencyRunwayMonths: 6.2,
              liquidSavings: 274000,
              monthlyExpenses: 68240,
            },
          }),
        });

        const data = await response.json();
        if (data.text) {
          setMessages((prev) => [
            ...prev,
            {
              id: Math.random().toString(36).substring(2, 9),
              role: 'model',
              text: data.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              model: 'gemini-3.8-flash',
            },
          ]);
        }
      } catch (err: any) {
        console.error('Chat error:', err);
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(2, 9),
            role: 'model',
            text: 'I could not reach the intelligence copilot. Please check your network connection.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            model: 'gemini-3.8-flash',
          },
        ]);
      } finally {
        setIsSendingText(false);
      }
    }
  };

  const sampleVoicePrompts = [
    'Where did my money go this month?',
    'What is my 6-month liquid runway status?',
    'Can I afford a ₹45,000 purchase right now?',
    'How should I divide my income under 50/30/20?',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1A14]/75 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }}
        className="relative w-full max-w-2xl bg-[#0F241C] border border-[#19B99A]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto text-white z-10"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#19B99A]/20 bg-[#081B14]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#19B99A]/20 border border-[#19B99A]/40 flex items-center justify-center text-[#26D07C] shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">Voice Copilot</h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-[#19B99A]/20 border border-[#19B99A]/40 text-[#26D07C]">
                  gemini-3.8-live
                </span>
              </div>
              <p className="text-xs text-[#8DA698] font-medium flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    connectionStatus === 'connected'
                      ? 'bg-[#26D07C] shadow-[0_0_8px_#26D07C]'
                      : connectionStatus === 'connecting'
                      ? 'bg-amber-400 animate-ping'
                      : 'bg-rose-500'
                  }`}
                />
                {connectionStatus === 'connected' && (isModelSpeaking ? 'Gemini Speaking...' : isUserSpeaking ? 'Listening to you...' : 'Live Audio Connected')}
                {connectionStatus === 'connecting' && 'Connecting to Gemini 3.8 Live API...'}
                {connectionStatus === 'error' && 'Connection Interrupted'}
                {connectionStatus === 'disconnected' && 'Disconnected'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* History Toggle */}
            <button
              type="button"
              onClick={() => setShowHistory((prev) => !prev)}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                showHistory
                  ? 'bg-[#19B99A]/30 border-[#19B99A] text-white'
                  : 'bg-[#163024]/60 border-[#19B99A]/20 text-[#8DA698] hover:text-white'
              }`}
              title="View conversation history"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Log</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#163024]/60 hover:bg-[#163024] border border-[#19B99A]/20 text-[#8DA698] hover:text-white transition-colors"
              aria-label="Close voice conversation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voice Persona Selector & Model Switcher */}
        <div className="px-6 py-2.5 bg-[#081B14]/40 border-b border-[#19B99A]/15 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#8DA698] font-medium">Voice:</span>
            <div className="flex items-center gap-1 bg-[#122B20] p-1 rounded-xl border border-[#19B99A]/20">
              {AVAILABLE_VOICES.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVoice(v.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    selectedVoice === v.id
                      ? 'bg-[#19B99A] text-[#062016] font-bold shadow-xs'
                      : 'text-[#8DA698] hover:text-white'
                  }`}
                  title={v.desc}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#8DA698] font-medium">Mode:</span>
            <div className="flex items-center gap-1 bg-[#122B20] p-1 rounded-xl border border-[#19B99A]/20">
              <button
                type="button"
                onClick={() => setActiveModel('gemini-3.8-live')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeModel === 'gemini-3.8-live'
                    ? 'bg-[#19B99A] text-[#062016] font-bold shadow-xs'
                    : 'text-[#8DA698] hover:text-white'
                }`}
              >
                Live Voice
              </button>
              <button
                type="button"
                onClick={() => setActiveModel('gemini-3.8-flash')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  activeModel === 'gemini-3.8-flash'
                    ? 'bg-[#19B99A] text-[#062016] font-bold shadow-xs'
                    : 'text-[#8DA698] hover:text-white'
                }`}
              >
                3.8 Flash
              </button>
            </div>
          </div>
        </div>

        {/* Central Display Area */}
        <div className="p-6 flex-1 flex flex-col items-center justify-center min-h-[300px]">
          {/* Animated Central Node & Waves */}
          <div className="relative w-48 h-48 flex items-center justify-center my-4">
            {/* Concentric Glow Rings */}
            <motion.div
              animate={
                isModelSpeaking
                  ? { scale: [1, 1.35, 1], opacity: [0.3, 0.7, 0.3] }
                  : isUserSpeaking
                  ? { scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] }
                  : { scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }
              }
              transition={{ repeat: Infinity, duration: isModelSpeaking ? 1.2 : 2.4, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#19B99A]/40 to-[#07856D]/20 blur-xl pointer-events-none"
            />

            <motion.div
              animate={
                isModelSpeaking
                  ? { scale: [1, 1.15, 1] }
                  : isUserSpeaking
                  ? { scale: [1, 1.1, 1] }
                  : { scale: 1 }
              }
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              className={`w-28 h-28 rounded-full border-2 flex items-center justify-center relative shadow-2xl transition-colors duration-300 ${
                isModelSpeaking
                  ? 'border-[#26D07C] bg-[#163E2D] shadow-[#19B99A]/50'
                  : isUserSpeaking
                  ? 'border-[#19B99A] bg-[#123124] shadow-[#19B99A]/30'
                  : 'border-[#19B99A]/30 bg-[#0B2117] shadow-black/40'
              }`}
            >
              <div className="text-center">
                <Radio
                  className={`w-8 h-8 mx-auto transition-transform ${
                    isModelSpeaking ? 'text-[#26D07C] scale-110 animate-bounce' : isUserSpeaking ? 'text-[#19B99A] scale-105' : 'text-[#8DA698]'
                  }`}
                />
                <span className="text-[10px] font-bold uppercase tracking-wider block mt-1 text-[#8DA698]">
                  {selectedVoice}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Canvas Waveform */}
          <div className="w-full max-w-md h-16 flex items-center justify-center mb-3">
            <canvas ref={canvasRef} width={420} height={60} className="w-full h-full" />
          </div>

          {/* Live Subtitle / Spoken Transcript */}
          <div className="w-full max-w-lg min-h-[48px] px-4 py-2 text-center">
            {currentTranscript ? (
              <p className="text-sm sm:text-base font-medium text-[#E2F5ED] leading-relaxed animate-in fade-in">
                "{currentTranscript}"
              </p>
            ) : isModelSpeaking ? (
              <p className="text-xs text-[#8DA698] italic flex items-center justify-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#26D07C] animate-pulse" />
                Gemini Live Voice streaming response (24kHz audio)...
              </p>
            ) : isUserSpeaking ? (
              <p className="text-xs text-[#26D07C] font-semibold flex items-center justify-center gap-1.5">
                <Mic className="w-4 h-4 animate-pulse" />
                Listening to your query...
              </p>
            ) : (
              <p className="text-xs text-[#8DA698]">
                Tap the microphone or say something. You can also pick a prompt below.
              </p>
            )}
          </div>

          {/* Error Message if present */}
          {errorMessage && (
            <div className="mt-2 w-full max-w-md p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Notice</p>
                <p className="text-[11px] opacity-90">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={startLiveSession}
                className="shrink-0 px-2 py-1 bg-rose-800/60 hover:bg-rose-800 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Quick Financial Prompt Chips */}
          <div className="w-full mt-4 flex flex-wrap items-center justify-center gap-2">
            {sampleVoicePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendTextMessage(prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#163024]/70 hover:bg-[#19B99A]/20 border border-[#19B99A]/30 text-[#B8D7C8] hover:text-white transition-all shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Conversation Transcript Log */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 200, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-[#19B99A]/20 bg-[#071610] overflow-y-auto p-4 space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-[#8DA698] font-bold uppercase tracking-wider mb-2">
                <span>Session Transcript History</span>
                <span>{messages.length} exchanges</span>
              </div>
              {messages.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#8DA698]">
                  No spoken messages yet. Start speaking or click a suggestion!
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-[#8DA698] mb-1">
                      <span className="font-bold">{msg.role === 'user' ? 'You' : 'Gemini Copilot'}</span>
                      <span>·</span>
                      <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-[#163024]">
                        {msg.model}
                      </span>
                      <span>·</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#07856D] text-white rounded-tr-none'
                          : 'bg-[#142C20] border border-[#19B99A]/30 text-[#E2F5ED] rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer / Input Bar */}
        <div className="px-6 py-4 bg-[#081B14] border-t border-[#19B99A]/20 flex flex-col sm:flex-row items-center gap-3">
          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            {/* Mic Toggle Button */}
            <button
              type="button"
              onClick={toggleMic}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs transition-all ${
                isMicMuted
                  ? 'bg-rose-950/80 border border-rose-500/50 text-rose-300 hover:bg-rose-900'
                  : 'bg-[#07856D] hover:bg-[#066C59] text-white shadow-md shadow-[#07856D]/30'
              }`}
              title={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMicMuted ? <MicOff className="w-4 h-4 text-rose-400" /> : <Mic className="w-4 h-4" />}
              <span>{isMicMuted ? 'Muted' : 'Live Mic'}</span>
            </button>

            {/* Interrupt Speech Button */}
            {isModelSpeaking && (
              <button
                type="button"
                onClick={handleInterrupt}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-amber-950/70 hover:bg-amber-900 border border-amber-500/50 text-amber-300 font-bold text-xs transition-colors"
                title="Interrupt Gemini's current audio"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Interrupt</span>
              </button>
            )}

            {/* Reconnect Button */}
            <button
              type="button"
              onClick={startLiveSession}
              className="p-2.5 rounded-full bg-[#163024] hover:bg-[#1D3E2F] border border-[#19B99A]/20 text-[#8DA698] hover:text-white transition-colors"
              title="Reconnect Live Session"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Text Input Companion */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendTextMessage();
            }}
            className="flex-1 w-full flex items-center gap-2 bg-[#122B20] border border-[#19B99A]/30 rounded-full px-3.5 py-1.5 focus-within:border-[#26D07C] transition-all"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Or type a financial question..."
              className="flex-1 bg-transparent text-xs text-white placeholder-[#8DA698] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!textInput.trim() || isSendingText}
              className="p-1.5 rounded-full bg-[#19B99A] hover:bg-[#26D07C] disabled:opacity-40 disabled:hover:bg-[#19B99A] text-[#052016] transition-colors"
              title="Send question"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
