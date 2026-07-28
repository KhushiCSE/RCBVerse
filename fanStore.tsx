import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

export type FanTierName = 'Rookie' | 'Super Fan' | 'Ultimate 12th Man';

export interface FanProfile {
  name: string;
  favoritePlayer: string;
  homeCity: string;
}

interface FanStoreValue {
  profile: FanProfile;
  setProfile: (p: Partial<FanProfile>) => void;
  fanId: string;
  memberSince: number;
  bestScores: Record<string, number>;
  recordQuizResult: (tierId: string, score: number, total: number) => void;
  fanTier: FanTierName;
}

const STORAGE_KEY = 'rcb-fan-store-v1';

interface PersistedState {
  profile: FanProfile;
  fanId: string;
  memberSince: number;
  bestScores: Record<string, number>;
}

function generateFanId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `RCB-2026-${num}`;
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedState;
      return {
        profile: parsed.profile ?? { name: '', favoritePlayer: '', homeCity: '' },
        fanId: parsed.fanId ?? generateFanId(),
        memberSince: parsed.memberSince ?? new Date().getFullYear(),
        bestScores: parsed.bestScores ?? {},
      };
    }
  } catch {
    // fall through to defaults
  }
  return {
    profile: { name: '', favoritePlayer: '', homeCity: '' },
    fanId: generateFanId(),
    memberSince: new Date().getFullYear(),
    bestScores: {},
  };
}

function deriveTier(bestScores: Record<string, number>): FanTierName {
  if ((bestScores['ultimate'] ?? 0) >= 0.7) return 'Ultimate 12th Man';
  if ((bestScores['superfan'] ?? 0) >= 0.7) return 'Super Fan';
  return 'Rookie';
}

const FanContext = createContext<FanStoreValue | null>(null);

export function FanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(() => loadState());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore write failures
    }
  }, [state]);

  const setProfile = useCallback((p: Partial<FanProfile>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...p } }));
  }, []);

  const recordQuizResult = useCallback((tierId: string, score: number, total: number) => {
    if (total <= 0) return;
    const ratio = score / total;
    setState((s) => ({
      ...s,
      bestScores: {
        ...s.bestScores,
        [tierId]: Math.max(s.bestScores[tierId] ?? 0, ratio),
      },
    }));
  }, []);

  const value: FanStoreValue = {
    profile: state.profile,
    setProfile,
    fanId: state.fanId,
    memberSince: state.memberSince,
    bestScores: state.bestScores,
    recordQuizResult,
    fanTier: deriveTier(state.bestScores),
  };

  return <FanContext.Provider value={value}>{children}</FanContext.Provider>;
}

export function useFan(): FanStoreValue {
  const ctx = useContext(FanContext);
  if (!ctx) throw new Error('useFan must be used within FanProvider');
  return ctx;
}
