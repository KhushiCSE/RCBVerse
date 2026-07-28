export interface PassportBadge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: (bestScores: Record<string, number>) => boolean;
}

export const PASSPORT_BADGES: PassportBadge[] = [
  {
    id: 'bold-believer',
    name: 'Bold Believer',
    emoji: '❤️',
    description: 'Complete any quiz tier',
    unlocked: (b) => Object.keys(b).length > 0,
  },
  {
    id: 'quiz-champion',
    name: 'Quiz Champion',
    emoji: '🧠',
    description: 'Score 70%+ on Super Fan',
    unlocked: (b) => (b['superfan'] ?? 0) >= 0.7,
  },
  {
    id: 'chinnaswamy-master',
    name: 'Chinnaswamy Master',
    emoji: '🏟️',
    description: 'Perfect the Rookie tier',
    unlocked: (b) => (b['rookie'] ?? 0) >= 1,
  },
  {
    id: 'ultimate-12th-man',
    name: 'Ultimate 12th Man',
    emoji: '👑',
    description: 'Score 70%+ on Ultimate tier',
    unlocked: (b) => (b['ultimate'] ?? 0) >= 0.7,
  },
  {
    id: 'auction-master',
    name: 'Auction Master',
    emoji: '🔨',
    description: 'Build a squad in the Auction',
    unlocked: () => false,
  },
  {
    id: 'chinnaswamy-loyal',
    name: 'Chinnaswamy Loyal',
    emoji: '🦁',
    description: 'Explore the Chinnaswamy Stadium',
    unlocked: () => false,
  },
];
