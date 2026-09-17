// Synthesized Web Audio API sound effects and festive music for YAADRAKHO
// 100% self-contained, offline, zero-latency, no external audio file dependencies.

class SoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isMusicPlaying: boolean = false;
  private musicTimer: NodeJS.Timeout | null = null;
  private nextNoteTime: number = 0;
  private currentNoteIndex: number = 0;
  private masterMusicGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];

  // Raga Bhupali / Mohanam festive melodic sequence (joyful Ganesh prayer melody)
  // Notes in Hz: C4 (261.63), D4 (293.66), E4 (329.63), G4 (392.0), A4 (440.0), C5 (523.25), D5 (587.33), E5 (659.25)
  private readonly melodyNotes = [
    392.0,  // G4
    392.0,  // G4
    440.0,  // A4
    523.25, // C5
    523.25, // C5
    587.33, // D5
    523.25, // C5
    440.0,  // A4
    392.0,  // G4
    440.0,  // A4
    392.0,  // G4
    329.63, // E4
    293.66, // D4
    329.63, // E4
    392.0,  // G4
    261.63, // C4 (tonic resolution)
  ];

  public getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.isMuted;
  }

  // =========================================================================
  // BACKGROUND FESTIVE MUSIC ENGINE
  // Flute + Veena Pluck + Dhol/Tabla Rhythms + Temple Chimes
  // Clearly audible, festive, cheerful!
  // =========================================================================
  public startMusic() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    // If context is suspended, resume it
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => this.initMusicGraph(ctx)).catch(() => {});
    } else {
      this.initMusicGraph(ctx);
    }
  }

  private initMusicGraph(ctx: AudioContext) {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    try {
      // Master music volume
      this.masterMusicGain = ctx.createGain();
      this.masterMusicGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this.masterMusicGain.gain.linearRampToValueAtTime(0.24, ctx.currentTime + 0.8);
      this.masterMusicGain.connect(ctx.destination);

      // Tanpura Drone Foundation (C3, G3, C4)
      this.droneGain = ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.07, ctx.currentTime);
      this.droneGain.connect(this.masterMusicGain);

      const droneFreqs = [130.81, 196.0, 261.63];
      this.droneOscs = droneFreqs.map((f) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        osc.connect(this.droneGain!);
        osc.start();
        return osc;
      });

      // Continuous Lookahead Music Scheduler
      this.nextNoteTime = ctx.currentTime + 0.1;
      this.currentNoteIndex = 0;

      const scheduleTick = () => {
        if (!this.isMusicPlaying || !this.ctx) return;

        // Schedule notes ahead by 0.6 seconds
        while (this.nextNoteTime < this.ctx.currentTime + 0.6) {
          this.scheduleFestiveNote(this.nextNoteTime, this.currentNoteIndex);
          const beatDuration = 0.44; // ~136 BPM lively festive tempo
          this.nextNoteTime += beatDuration;
          this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melodyNotes.length;
        }

        this.musicTimer = setTimeout(scheduleTick, 150);
      };

      scheduleTick();
    } catch {
      this.isMusicPlaying = false;
    }
  }

  private scheduleFestiveNote(time: number, index: number) {
    if (!this.ctx || !this.masterMusicGain) return;
    const ctx = this.ctx;
    const freq = this.melodyNotes[index];
    const beatDuration = 0.44;

    // 1. Bansuri (Flute) / Harmonium Melody Voice
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Subtle gentle pitch bend / ornament (Gamaka)
    if (index % 4 === 0) {
      osc.frequency.setValueAtTime(freq * 0.98, time);
      osc.frequency.linearRampToValueAtTime(freq, time + 0.08);
    }

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.18, time + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, time + beatDuration * 0.95);

    osc.connect(gain);
    gain.connect(this.masterMusicGain);
    osc.start(time);
    osc.stop(time + beatDuration);

    // 2. Harmonic Sitar / Veena Pluck (Twinkle accent on notes)
    const pluckOsc = ctx.createOscillator();
    const pluckGain = ctx.createGain();
    pluckOsc.type = 'triangle';
    pluckOsc.frequency.setValueAtTime(freq * 2, time); // 1 octave higher overtone

    pluckGain.gain.setValueAtTime(0.08, time);
    pluckGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);

    pluckOsc.connect(pluckGain);
    pluckGain.connect(this.masterMusicGain);
    pluckOsc.start(time);
    pluckOsc.stop(time + 0.2);

    // 3. Dhol / Tabla Festive Rhythm
    // Beat 0: Big Bass Dhol (Dhayan)
    // Beat 2: Medium Tabla Tap (Ta)
    // Beat 1, 3: Soft Upbeat Accent (Tin)
    const rhythmBeat = index % 4;
    if (rhythmBeat === 0) {
      // Big deep bass dhol pulse
      const drumOsc = ctx.createOscillator();
      const drumGain = ctx.createGain();
      drumOsc.type = 'sine';
      drumOsc.frequency.setValueAtTime(130, time);
      drumOsc.frequency.exponentialRampToValueAtTime(45, time + 0.22);

      drumGain.gain.setValueAtTime(0.22, time);
      drumGain.gain.exponentialRampToValueAtTime(0.001, time + 0.24);

      drumOsc.connect(drumGain);
      drumGain.connect(this.masterMusicGain);
      drumOsc.start(time);
      drumOsc.stop(time + 0.25);
    } else if (rhythmBeat === 2) {
      // Crisper open tabla beat
      const drumOsc = ctx.createOscillator();
      const drumGain = ctx.createGain();
      drumOsc.type = 'sine';
      drumOsc.frequency.setValueAtTime(160, time);
      drumOsc.frequency.exponentialRampToValueAtTime(65, time + 0.16);

      drumGain.gain.setValueAtTime(0.16, time);
      drumGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      drumOsc.connect(drumGain);
      drumGain.connect(this.masterMusicGain);
      drumOsc.start(time);
      drumOsc.stop(time + 0.19);
    }

    // 4. Festive Ghungroo / Bell Shimmer on upbeat (Beat 1 and 3)
    if (rhythmBeat === 1 || rhythmBeat === 3) {
      const bellOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bellOsc.type = 'triangle';
      bellOsc.frequency.setValueAtTime(1567.98, time); // G6 bell

      bellGain.gain.setValueAtTime(0.05, time);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.2);

      bellOsc.connect(bellGain);
      bellGain.connect(this.masterMusicGain);
      bellOsc.start(time);
      bellOsc.stop(time + 0.22);
    }
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }

    if (this.masterMusicGain && this.ctx) {
      try {
        this.masterMusicGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      } catch {}
    }

    setTimeout(() => {
      this.droneOscs.forEach((o) => {
        try {
          o.stop();
          o.disconnect();
        } catch {}
      });
      this.droneOscs = [];
    }, 350);
  }

  public startAmbient() {
    this.startMusic();
  }

  public stopAmbient() {
    this.stopMusic();
  }

  // =========================================================================
  // INTERACTION SOUND EFFECTS
  // =========================================================================

  // Soft temple bell / ghanti chime
  public playTempleBell() {
    const ctx = this.getContext();
    if (!ctx) return;

    const freqs = [1046.5, 1318.5, 1567.98, 2093.0];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);

      const decay = 1.2 - i * 0.2;
      const initialVol = 0.12 / (i + 1);

      gain.gain.setValueAtTime(initialVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + decay);
    });
  }

  // Card flip light click
  public playCardFlip() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  }

  // Playful sweet munching sound when Ganapathi eats Modak or Undralu
  public playMunch() {
    const ctx = this.getContext();
    if (!ctx) return;

    // 1. Three lively, audible "nom nom nom" munch sounds
    const munches = [
      { time: 0, startFreq: 360, endFreq: 640, vol: 0.16 },
      { time: 0.14, startFreq: 420, endFreq: 760, vol: 0.18 },
      { time: 0.28, startFreq: 380, endFreq: 700, vol: 0.17 },
    ];

    munches.forEach(({ time, startFreq, endFreq, vol }) => {
      const t = ctx.currentTime + time;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Chewy triangle wave
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.08);

      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.09);

      // Subtle soft crunch pop
      const popOsc = ctx.createOscillator();
      const popGain = ctx.createGain();
      popOsc.type = 'sine';
      popOsc.frequency.setValueAtTime(180, t);
      popOsc.frequency.exponentialRampToValueAtTime(80, t + 0.04);
      popGain.gain.setValueAtTime(0.12, t);
      popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      popOsc.connect(popGain);
      popGain.connect(ctx.destination);
      popOsc.start(t);
      popOsc.stop(t + 0.05);
    });

    // 2. Sweet divine bell chime upon swallowing
    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const t = this.ctx.currentTime;
      [1046.5, 1318.51, 1567.98].forEach((freq, i) => {
        const bellOsc = this.ctx!.createOscillator();
        const bellGain = this.ctx!.createGain();
        bellOsc.type = 'sine';
        bellOsc.frequency.setValueAtTime(freq, t + i * 0.04);

        bellGain.gain.setValueAtTime(0.12 / (i + 1), t + i * 0.04);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.04 + 0.6);

        bellOsc.connect(bellGain);
        bellGain.connect(this.ctx!.destination);
        bellOsc.start(t + i * 0.04);
        bellOsc.stop(t + i * 0.04 + 0.6);
      });
    }, 380);
  }

  // Mushak playful scurry / squeak
  public playMushakScurry() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(1800, ctx.currentTime + 0.06);
    osc.frequency.linearRampToValueAtTime(1400, ctx.currentTime + 0.12);
    osc.frequency.linearRampToValueAtTime(2200, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.23);
  }

  // Mushak card swap swoosh
  public playSwapSwoosh() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.33);
  }

  // Correct answer bell celebration
  public playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.55);
    });
  }

  // Wrong answer subtle thud
  public playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.26);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.27);
  }

  // Level complete festive dhol fanfare
  public playLevelFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    const beats = [0, 0.12, 0.24, 0.4, 0.55];
    beats.forEach((timeOffset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(idx % 2 === 0 ? 120 : 85, ctx.currentTime + timeOffset);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + timeOffset + 0.1);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + timeOffset);
      osc.stop(ctx.currentTime + timeOffset + 0.14);
    });

    const chords = [587.33, 739.99, 880.0, 1174.66];
    chords.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + 0.35);
      osc.stop(ctx.currentTime + 1.25);
    });
  }

  // Divine blessing chime for Vinayak decoration
  public playBlessingChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    const chimeFreqs = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];
    chimeFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.09);
      osc.stop(ctx.currentTime + idx * 0.09 + 1.3);
    });
  }
}

export const sound = new SoundController();
