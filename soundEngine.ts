/**
 * Pure Web Audio API sound engine — no external audio files required.
 * Synthesizes an ambient stadium crowd loop, a matchday horn, an "R-C-B!" chant,
 * fireworks/cheer FX, and a fan anthem fanfare. Every sound degrades gracefully
 * (try/catch around all AudioContext work) so there are zero console errors even
 * if the browser blocks autoplay or the AudioContext is unavailable.
 */

type EngineState = 'idle' | 'running' | 'closed';

export interface AudioSettings {
  masterVolume: number;
  ambientOn: boolean;
  fxVolume: number;
}

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  masterVolume: 0,
  ambientOn: false,
  fxVolume: 0.6,
};

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private fxGain: GainNode | null = null;
  private ambientNodes: AudioNode[] = [];
  private state: EngineState = 'idle';
  private _ambientOn = false;

  get ambientOn() {
    return this._ambientOn;
  }

  private ensureContext(): AudioContext | null {
    if (this.state === 'closed') return null;
    if (this.ctx && this.state === 'running') return this.ctx;
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = 0.12;
      this.ambientGain.connect(this.masterGain);

      this.fxGain = this.ctx.createGain();
      this.fxGain.gain.value = 0.6;
      this.fxGain.connect(this.masterGain);

      this.state = 'running';
      return this.ctx;
    } catch {
      return null;
    }
  }

  /** Must be called from a user gesture to satisfy autoplay policies. */
  resume() {
    const ctx = this.ensureContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  setMasterVolume(v: number) {
    if (!this.masterGain || !this.ctx) return;
    const clamped = Math.max(0, Math.min(1, v));
    this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
  }

  setFxVolume(v: number) {
    if (!this.fxGain || !this.ctx) return;
    const clamped = Math.max(0, Math.min(1, v));
    this.fxGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
  }

  setAmbientEnabled(on: boolean) {
    this._ambientOn = on;
    const ctx = this.ensureContext();
    if (!ctx || !this.ambientGain) return;
    if (on) {
      if (this.ambientNodes.length === 0) this.startAmbient();
      this.ambientGain.gain.setTargetAtTime(0.12, ctx.currentTime, 0.3);
    } else {
      this.ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    }
  }

  /** Continuous low-volume crowd ambience built from filtered noise + slow swells. */
  startAmbient() {
    const ctx = this.ensureContext();
    if (!ctx || !this.ambientGain) return;

    try {
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 700;
      lp.Q.value = 0.7;

      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 120;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.5;

      noise.connect(hp).connect(lp).connect(noiseGain).connect(this.ambientGain);
      noise.start();
      this.ambientNodes.push(noise);

      // Slow crowd swell via LFO on a mid band
      const swellOsc = ctx.createOscillator();
      swellOsc.type = 'sine';
      swellOsc.frequency.value = 0.08;
      const swellGain = ctx.createGain();
      swellGain.gain.value = 0.15;
      swellOsc.connect(swellGain);

      const swellBand = ctx.createBiquadFilter();
      swellBand.type = 'bandpass';
      swellBand.frequency.value = 400;
      swellBand.Q.value = 2;
      swellGain.connect(swellBand.frequency);
      swellBand.connect(this.ambientGain);
      swellOsc.start();
      this.ambientNodes.push(swellOsc);
    } catch {
      // ignore
    }
  }

  /** Classic stadium horn — a triumphant two-tone brass blast. */
  playHorn() {
    const ctx = this.ensureContext();
    if (!ctx || !this.fxGain) return;
    const now = ctx.currentTime;

    const playBrass = (freq: number, start: number, dur: number, peak = 0.3) => {
      try {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now + start);
        gain.gain.linearRampToValueAtTime(peak, now + start + 0.06);
        gain.gain.linearRampToValueAtTime(peak * 0.7, now + start + dur * 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1800;

        osc.connect(filter).connect(gain).connect(this.fxGain!);
        osc.start(now + start);
        osc.stop(now + start + dur + 0.1);
      } catch {
        // ignore
      }
    };

    playBrass(233, 0, 0.7);
    playBrass(311, 0.35, 0.9);
    playBrass(466, 0.9, 1.2, 0.22);
  }

  /** "R-C-B!" chant — three syllables with crowd-stomp underneath. */
  playChant() {
    const ctx = this.ensureContext();
    if (!ctx || !this.fxGain) return;
    const now = ctx.currentTime;

    const syllables = [
      { freq: 220, start: 0, dur: 0.22 },
      { freq: 247, start: 0.3, dur: 0.22 },
      { freq: 330, start: 0.6, dur: 0.45 },
    ];

    syllables.forEach((s) => {
      try {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(s.freq, now + s.start);
        osc.frequency.linearRampToValueAtTime(s.freq * 1.04, now + s.start + s.dur);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now + s.start);
        gain.gain.linearRampToValueAtTime(0.18, now + s.start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + s.start + s.dur);

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 600;
        filter.Q.value = 1.5;

        osc.connect(filter).connect(gain).connect(this.fxGain!);
        osc.start(now + s.start);
        osc.stop(now + s.start + s.dur + 0.05);
      } catch {
        // ignore
      }
    });

    // Stomp
    try {
      const stomp = ctx.createOscillator();
      stomp.type = 'sine';
      stomp.frequency.setValueAtTime(60, now);
      stomp.frequency.exponentialRampToValueAtTime(30, now + 1.2);
      const sg = ctx.createGain();
      sg.gain.setValueAtTime(0.25, now);
      sg.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      stomp.connect(sg).connect(this.fxGain);
      stomp.start(now);
      stomp.stop(now + 1.3);
    } catch {
      // ignore
    }
  }

  /** Fireworks + cheer burst — noise crackle pops + rising cheer swells. */
  playFireworks() {
    const ctx = this.ensureContext();
    if (!ctx || !this.fxGain) return;
    const now = ctx.currentTime;

    // Three firework pops
    for (let i = 0; i < 3; i++) {
      const start = now + i * 0.28;
      try {
        const bufferSize = Math.floor(ctx.sampleRate * 0.15);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const out = buffer.getChannelData(0);
        for (let j = 0; j < bufferSize; j++) {
          out[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / bufferSize, 2.5);
        }
        const src = ctx.createBufferSource();
        src.buffer = buffer;

        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1200 + i * 400;
        bp.Q.value = 0.8;

        const g = ctx.createGain();
        g.gain.value = 0.4;

        src.connect(bp).connect(g).connect(this.fxGain!);
        src.start(start);
      } catch {
        // ignore
      }
    }

    // Rising cheer swell
    try {
      const cheerBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const cd = cheerBuf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < cd.length; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        cd[i] = last * 3 * Math.min(1, i / (cd.length * 0.5));
      }
      const cheer = ctx.createBufferSource();
      cheer.buffer = cheerBuf;

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(600, now);
      lp.frequency.linearRampToValueAtTime(2000, now + 1.8);

      const cg = ctx.createGain();
      cg.gain.setValueAtTime(0, now);
      cg.gain.linearRampToValueAtTime(0.35, now + 0.8);
      cg.gain.exponentialRampToValueAtTime(0.001, now + 2);

      cheer.connect(lp).connect(cg).connect(this.fxGain);
      cheer.start(now);
    } catch {
      // ignore
    }
  }

  /** High-energy "Play Bold" fan anthem fanfare — a short triumphant motif. */
  playAnthem() {
    const ctx = this.ensureContext();
    if (!ctx || !this.fxGain) return;
    const now = ctx.currentTime;

    // E5 - G5 - A5 - B5 - E6 triumphant motif
    const notes = [
      { freq: 659, start: 0, dur: 0.18 },
      { freq: 784, start: 0.18, dur: 0.18 },
      { freq: 880, start: 0.36, dur: 0.18 },
      { freq: 988, start: 0.54, dur: 0.22 },
      { freq: 1319, start: 0.76, dur: 0.6 },
    ];

    notes.forEach((n, i) => {
      try {
        const osc = ctx.createOscillator();
        osc.type = i < 2 ? 'sawtooth' : 'square';
        osc.frequency.value = n.freq;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, now + n.start);
        gain.gain.linearRampToValueAtTime(0.2, now + n.start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 2600;

        osc.connect(filter).connect(gain).connect(this.fxGain!);
        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur + 0.05);
      } catch {
        // ignore
      }
    });

    // Bass anchor
    try {
      const bass = ctx.createOscillator();
      bass.type = 'triangle';
      bass.frequency.setValueAtTime(165, now);
      bass.frequency.setValueAtTime(220, now + 0.36);
      bass.frequency.setValueAtTime(247, now + 0.54);
      const bg = ctx.createGain();
      bg.gain.setValueAtTime(0.12, now);
      bg.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      bass.connect(bg).connect(this.fxGain);
      bass.start(now);
      bass.stop(now + 1.5);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();
