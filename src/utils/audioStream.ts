/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Converts Float32Array channel data from Web Audio API into 16-bit Linear PCM Little-Endian
 * and returns it as a base64 encoded string.
 */
export function float32ToPcm16Base64(float32Array: Float32Array): string {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;

  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    // Convert -1.0...1.0 to -32768...32767
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true); // true = little-endian
  }

  // Convert array buffer to base64
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converts a base64 16-bit Linear PCM string into a Float32Array
 * suitable for playback in an AudioBuffer at 24kHz.
 */
export function pcm16Base64ToFloat32(base64: string): Float32Array {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const sampleCount = Math.floor(bytes.byteLength / 2);
  const float32 = new Float32Array(sampleCount);

  for (let i = 0; i < sampleCount; i++) {
    const int16 = dataView.getInt16(i * 2, true); // little-endian
    float32[i] = int16 < 0 ? int16 / 0x8000 : int16 / 0x7fff;
  }

  return float32;
}

/**
 * Gapless Audio Queue Manager for Gemini Live API audio output (24kHz PCM)
 */
export class GaplessAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private nextStartTime = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  private onPlayingStateChange?: (isPlaying: boolean) => void;
  private checkInterval: any = null;

  constructor(onPlayingStateChange?: (isPlaying: boolean) => void) {
    this.onPlayingStateChange = onPlayingStateChange;
  }

  public init() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx({ sampleRate: 24000 });
      this.nextStartTime = this.audioCtx.currentTime;
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playChunk(pcmBase64: string) {
    this.init();
    if (!this.audioCtx) return;

    const float32 = pcm16Base64ToFloat32(pcmBase64);
    if (float32.length === 0) return;

    const buffer = this.audioCtx.createBuffer(1, float32.length, 24000);
    buffer.getChannelData(0).set(float32);

    const source = this.audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioCtx.destination);

    const now = this.audioCtx.currentTime;
    const startTime = Math.max(now, this.nextStartTime);
    source.start(startTime);

    this.nextStartTime = startTime + buffer.duration;
    this.activeSources.push(source);

    if (this.onPlayingStateChange) {
      this.onPlayingStateChange(true);
      this.scheduleStateCheck();
    }

    source.onended = () => {
      const idx = this.activeSources.indexOf(source);
      if (idx !== -1) {
        this.activeSources.splice(idx, 1);
      }
      if (this.activeSources.length === 0 && this.onPlayingStateChange) {
        this.onPlayingStateChange(false);
      }
    };
  }

  private scheduleStateCheck() {
    if (this.checkInterval) clearTimeout(this.checkInterval);
    this.checkInterval = setTimeout(() => {
      if (this.audioCtx && this.audioCtx.currentTime >= this.nextStartTime) {
        if (this.onPlayingStateChange) this.onPlayingStateChange(false);
      }
    }, 200);
  }

  public interrupt() {
    // Immediate stop of all active audio sources
    for (const src of this.activeSources) {
      try {
        src.stop();
        src.disconnect();
      } catch (e) {
        // Source might have already finished
      }
    }
    this.activeSources = [];
    if (this.audioCtx) {
      this.nextStartTime = this.audioCtx.currentTime;
    }
    if (this.onPlayingStateChange) {
      this.onPlayingStateChange(false);
    }
  }

  public close() {
    this.interrupt();
    if (this.checkInterval) clearTimeout(this.checkInterval);
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }
}
