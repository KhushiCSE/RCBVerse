import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  soundEngine,
  DEFAULT_AUDIO_SETTINGS,
  type AudioSettings,
} from './soundEngine';

interface AudioStoreValue extends AudioSettings {
  setMasterVolume: (v: number) => void;
  setFxVolume: (v: number) => void;
  toggleAmbient: () => void;
  setAmbient: (on: boolean) => void;
  playHorn: () => void;
  playChant: () => void;
  playFireworks: () => void;
  playAnthem: () => void;
}

const STORAGE_KEY = 'rcb-audio-settings-v1';

function loadSettings(): AudioSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AudioSettings;
      return { ...DEFAULT_AUDIO_SETTINGS, ...parsed, masterVolume: 0, ambientOn: false };
    }
  } catch {
    // fall through
  }
  return DEFAULT_AUDIO_SETTINGS;
}

const AudioContext = createContext<AudioStoreValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AudioSettings>(() => loadSettings());

  // Persist fxVolume preference (master stays muted on load per autoplay policy)
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ fxVolume: settings.fxVolume }),
      );
    } catch {
      // ignore
    }
  }, [settings.fxVolume]);

  const setMasterVolume = useCallback((v: number) => {
    setSettings((s) => ({ ...s, masterVolume: v }));
    soundEngine.resume();
    soundEngine.setMasterVolume(v);
  }, []);

  const setFxVolume = useCallback((v: number) => {
    setSettings((s) => ({ ...s, fxVolume: v }));
    soundEngine.setFxVolume(v);
  }, []);

  const setAmbient = useCallback((on: boolean) => {
    setSettings((s) => ({ ...s, ambientOn: on }));
    soundEngine.resume();
    soundEngine.setAmbientEnabled(on);
  }, []);

  const toggleAmbient = useCallback(() => {
    setSettings((s) => {
      const next = !s.ambientOn;
      soundEngine.resume();
      // If turning on, make sure master is audible
      if (next && s.masterVolume === 0) {
        soundEngine.setMasterVolume(0.5);
        soundEngine.setFxVolume(s.fxVolume);
        soundEngine.setAmbientEnabled(true);
        return { ...s, ambientOn: true, masterVolume: 0.5 };
      }
      soundEngine.setAmbientEnabled(next);
      return { ...s, ambientOn: next };
    });
  }, []);

  const playHorn = useCallback(() => {
    soundEngine.resume();
    soundEngine.playHorn();
  }, []);

  const playChant = useCallback(() => {
    soundEngine.resume();
    soundEngine.playChant();
  }, []);

  const playFireworks = useCallback(() => {
    soundEngine.resume();
    soundEngine.playFireworks();
  }, []);

  const playAnthem = useCallback(() => {
    soundEngine.resume();
    soundEngine.playAnthem();
  }, []);

  const value: AudioStoreValue = {
    ...settings,
    setMasterVolume,
    setFxVolume,
    toggleAmbient,
    setAmbient,
    playHorn,
    playChant,
    playFireworks,
    playAnthem,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio(): AudioStoreValue {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
}
