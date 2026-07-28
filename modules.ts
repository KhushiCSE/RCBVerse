export type ModuleId =
  | 'home'
  | 'auction'
  | 'playingxi'
  | 'stadium'
  | 'timeline'
  | 'legends'
  | 'jersey'
  | 'quiz'
  | 'passport';

export interface ModuleMeta {
  id: ModuleId;
  label: string;
  description: string;
  emoji: string;
}

export const MODULES: ModuleMeta[] = [
  { id: 'home', label: 'Home', description: 'Welcome to RCBVerse', emoji: '🏠' },
  { id: 'auction', label: 'Auction', description: 'Build your dream squad', emoji: '🔨' },
  { id: 'playingxi', label: 'Playing XI', description: 'Pick your best eleven', emoji: '📋' },
  { id: 'stadium', label: 'Stadium', description: 'Explore Chinnaswamy', emoji: '🏟️' },
  { id: 'timeline', label: 'Timeline', description: 'Relive the journey', emoji: '📅' },
  { id: 'legends', label: 'Legends', description: 'Hall of fame', emoji: '👑' },
  { id: 'jersey', label: 'Jersey', description: 'Design your colors', emoji: '👕' },
  { id: 'quiz', label: 'Quiz', description: 'Test your fandom', emoji: '🧠' },
  { id: 'passport', label: 'Passport', description: 'Your fan ID card', emoji: 'passport' },
];

export const NAV_MODULES = MODULES.filter((m) => m.id !== 'home');
