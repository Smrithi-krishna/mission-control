const AMBIENT_TRACK_URL = null;
const DEFAULT_MUSIC_BOOST = 2;
const MAX_MUSIC_BOOST = 4;
const DEFAULT_SETTINGS = { musicVolume: 40, effectsVolume: 60, mutedAll: false };

let audioContext;
let effectGain;
let musicGain;
let mediaElement;
let mediaSource;
let ambienceNodes;
let ambientStarted = false;
let musicBoost = DEFAULT_MUSIC_BOOST;
let settings = { ...DEFAULT_SETTINGS };

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ||= new AudioContextClass();
  if (!effectGain) {
    effectGain = audioContext.createGain();
    effectGain.connect(audioContext.destination);
  }
  if (!musicGain) {
    musicGain = audioContext.createGain();
    musicGain.connect(audioContext.destination);
  }
  updateAudioLevels();
  return audioContext;
}

function updateAudioLevels() {
  if (!audioContext) return;
  const now = audioContext.currentTime;
  if (effectGain) {
    effectGain.gain.setTargetAtTime(settings.mutedAll ? 0 : settings.effectsVolume / 100, now, 0.04);
  }
  if (musicGain) {
    const boost = Math.max(0, Math.min(MAX_MUSIC_BOOST, musicBoost));
    musicGain.gain.setTargetAtTime(settings.mutedAll || !ambientStarted ? 0 : boost, now, 0.06);
  }
  if (mediaElement) mediaElement.volume = settings.musicVolume / 100;
  if (ambienceNodes) {
    ambienceNodes.forEach(({ gain, base }) => {
      gain.gain.setTargetAtTime(base * settings.musicVolume / 100, now, 0.12);
    });
  }
}

export function setSoundSettings(nextSettings) {
  settings = {
    musicVolume: Math.max(0, Math.min(100, Number(nextSettings.musicVolume) || 0)),
    effectsVolume: Math.max(0, Math.min(100, Number(nextSettings.effectsVolume) || 0)),
    mutedAll: Boolean(nextSettings.mutedAll)
  };
  if (audioContext) updateAudioLevels();
}

export function setMusicBoost(value) {
  musicBoost = Math.max(0, Math.min(MAX_MUSIC_BOOST, Number(value) || 0));
  if (audioContext) updateAudioLevels();
}

export function getDefaultSoundSettings() {
  return { ...DEFAULT_SETTINGS };
}

async function resumeContext(onBlocked) {
  const context = getContext();
  if (!context) return null;
  try {
    if (context.state === "suspended") await context.resume();
    if (context.state !== "running") {
      onBlocked?.();
      return null;
    }
    return context;
  } catch (error) {
    console.warn("Could not resume the sound player:", error);
    onBlocked?.();
    return null;
  }
}

function startGeneratedAmbience(context) {
  if (ambienceNodes) return;
  const layers = [
    { frequency: 55, base: 0.17, type: "sine", detune: -4 },
    { frequency: 82.41, base: 0.12, type: "triangle", detune: 3 },
    { frequency: 110, base: 0.095, type: "sine", detune: 5 },
    { frequency: 164.81, base: 0.052, type: "triangle", detune: -3 },
    { frequency: 220, base: 0.032, type: "sine", detune: 7 },
    { frequency: 329.63, base: 0.016, type: "sine", detune: -6 },
    { frequency: 392, base: 0.009, type: "sine", detune: 4 }
  ];
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1100;
  filter.Q.value = 0.5;
  filter.connect(musicGain);
  ambienceNodes = layers.map(({ frequency, base, type, detune }) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    oscillator.detune.value = detune;
    gain.gain.value = base * settings.musicVolume / 100;
    oscillator.connect(gain);
    gain.connect(filter);
    const drift = context.createOscillator();
    const driftGain = context.createGain();
    drift.type = "sine";
    drift.frequency.value = 0.045 + Math.random() * 0.025;
    driftGain.gain.value = 4;
    drift.connect(driftGain);
    driftGain.connect(oscillator.detune);
    drift.start();
    oscillator.start();
    return { oscillator, drift, gain, base };
  });
}

function fadeMusicIn(context) {
  if (ambientStarted) return;
  const now = context.currentTime;
  const target = Math.max(0, Math.min(MAX_MUSIC_BOOST, musicBoost));
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(0, now);
  musicGain.gain.linearRampToValueAtTime(settings.mutedAll ? 0 : target, now + 2);
  ambientStarted = true;
}

function prepareMediaTrack() {
  if (!AMBIENT_TRACK_URL || !audioContext) return false;
  if (!mediaElement) {
    mediaElement = new Audio(AMBIENT_TRACK_URL);
    mediaElement.loop = true;
    mediaElement.volume = settings.musicVolume / 100;
    mediaSource = audioContext.createMediaElementSource(mediaElement);
    mediaSource.connect(musicGain);
  }
  return true;
}

export async function startAmbient(onBlocked) {
  if (settings.mutedAll || settings.musicVolume === 0) return true;
  const context = await resumeContext(onBlocked);
  if (!context) return false;

  if (!prepareMediaTrack()) {
    startGeneratedAmbience(context);
    fadeMusicIn(context);
    return true;
  }

  try {
    await mediaElement.play();
    fadeMusicIn(context);
    return true;
  } catch (error) {
    console.warn("Could not play the ambient track:", error);
    if (error?.name === "NotAllowedError" || context.state !== "running") onBlocked?.();
    return false;
  }
}

export async function resumeSound(onBlocked) {
  const context = await resumeContext(onBlocked);
  if (!context) return false;
  if (!settings.mutedAll && settings.musicVolume > 0) return startAmbient(onBlocked);
  return true;
}

function tone(frequency, start, duration, { type = "sine", endFrequency = frequency, volume = 0.6 } = {}) {
  const context = getContext();
  if (!context || settings.mutedAll || settings.effectsVolume === 0) return;
  if (context.state === "suspended") context.resume().catch((error) => console.warn("Could not resume sound effects:", error));
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.018, duration / 4));
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(effectGain);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function softLowLayer(context, start, duration, volume = 0.12) {
  tone(165, start, duration, { type: "triangle", endFrequency: 130, volume });
}

export function playClick() {
  if (settings.mutedAll || settings.effectsVolume === 0) return;
  const context = getContext();
  if (!context) return;
  tone(560, context.currentTime, 0.075, { endFrequency: 420, volume: 0.58 });
  softLowLayer(context, context.currentTime, 0.085, 0.14);
}

export function playAlert() {
  if (settings.mutedAll || settings.effectsVolume === 0) return;
  const context = getContext();
  if (!context) return;
  tone(392, context.currentTime, 0.16, { type: "triangle", endFrequency: 440, volume: 0.36 });
  tone(523.25, context.currentTime + 0.18, 0.18, { type: "triangle", endFrequency: 493.88, volume: 0.34 });
  softLowLayer(context, context.currentTime, 0.3, 0.11);
}

export function playDing() {
  if (settings.mutedAll || settings.effectsVolume === 0) return;
  const context = getContext();
  if (!context) return;
  tone(659.25, context.currentTime, 0.18, { endFrequency: 783.99, volume: 0.62 });
  tone(880, context.currentTime + 0.1, 0.22, { endFrequency: 1046.5, volume: 0.52 });
  softLowLayer(context, context.currentTime, 0.26, 0.15);
}

export function playBloop() {
  if (settings.mutedAll || settings.effectsVolume === 0) return;
  const context = getContext();
  if (!context) return;
  tone(245, context.currentTime, 0.25, { type: "triangle", endFrequency: 108, volume: 0.64 });
  softLowLayer(context, context.currentTime + 0.01, 0.28, 0.18);
}

export function playWin() {
  if (settings.mutedAll || settings.effectsVolume === 0) return;
  const context = getContext();
  if (!context) return;
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
  notes.forEach((frequency, index) => {
    const start = context.currentTime + index * 0.16;
    tone(frequency, start, 0.24, { type: "triangle", endFrequency: frequency * 1.04, volume: 0.58 });
    if (index === 0 || index === 3) softLowLayer(context, start, 0.3, 0.16);
  });
}

export async function testSound(onBlocked) {
  const ambientReady = await startAmbient(onBlocked);
  if (ambientReady && !settings.mutedAll) playDing();
  return ambientReady;
}
