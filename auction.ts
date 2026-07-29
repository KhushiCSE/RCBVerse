// Auction Constants
export const MAX_SQUAD = 25;
export const MAX_OVERSEAS = 8;
export const MIN_SQUAD = 18;
export const INITIAL_PURSE = 100;

export const ROLE_CONFIG = {
  BAT: { min: 3, max: 6, label: 'Batters' },
  BOWL: { min: 3, max: 6, label: 'Bowlers' },
  AR: { min: 1, max: 4, label: 'All-Rounders' },
  WK: { min: 1, max: 3, label: 'Wicket Keepers' },
};

// Types & Interfaces
export interface Player {
  id: string;
  name: string;
  role: 'BAT' | 'BOWL' | 'AR' | 'WK';
  gender?: 'M' | 'F';
  basePrice: number;
  batting: number;
  bowling: number;
  fielding?: number;
  chemistry: number;
  death: number;
  spin: number;
  isOverseas?: boolean;
  image?: string;
}

export interface PurchasedPlayer {
  player: Player;
  price: number;
}

export interface SquadRatings {
  chemistry: number;
  batting: number;
  bowling: number;
  death: number;
  spin: number;
}

// Helper Functions
export function formatCr(amount: number): string {
  return `₹${amount.toFixed(2)} Cr`;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function computeRatings(squad: PurchasedPlayer[]): SquadRatings {
  if (squad.length === 0) {
    return { chemistry: 0, batting: 0, bowling: 0, death: 0, spin: 0 };
  }

  const avgChem = squad.reduce((s, p) => s + p.player.chemistry, 0) / squad.length;
  const roles = new Set(squad.map((p) => p.player.role));
  const roleBonus = roles.size >= 4 ? 1.0 : roles.size >= 3 ? 0.5 : 0;
  const genderCount = new Set(squad.map((p) => p.player.gender)).size;
  const genderBonus = genderCount === 2 ? 0.5 : 0;
  const chemistry = Math.min(10, avgChem + roleBonus + genderBonus);

  const batPlayers = squad.filter((p) => ['BAT', 'WK', 'AR'].includes(p.player.role));
  const batting = batPlayers.length > 0
    ? batPlayers.reduce((s, p) => s + p.player.batting, 0) / batPlayers.length
    : squad.reduce((s, p) => s + p.player.batting, 0) / squad.length;

  const bowlPlayers = squad.filter((p) => ['BOWL', 'AR'].includes(p.role));
  const fallback = squad.length > 0
    ? squad.reduce((s, p) => s + p.player.bowling, 0) / squad.length
    : 0;
  const bowling = bowlPlayers.length > 0
    ? bowlPlayers.reduce((s, p) => s + p.player.bowling, 0) / bowlPlayers.length
    : Math.min(fallback, 4);
  const death = bowlPlayers.length > 0
    ? bowlPlayers.reduce((s, p) => s + p.player.death, 0) / bowlPlayers.length
    : Math.min(fallback, 4);
  const spin = bowlPlayers.length > 0
    ? bowlPlayers.reduce((s, p) => s + p.player.spin, 0) / bowlPlayers.length
    : Math.min(fallback, 4);

  return {
    chemistry: round1(chemistry),
    batting: round1(batting),
    bowling: round1(bowling),
    death: round1(death),
    spin: round1(spin),
  };
}

export function overallScore(r: SquadRatings): number {
  return round1((r.chemistry + r.batting + r.bowling + r.death + r.spin) / 5);
}

export function getAIComment(r: SquadRatings): string {
  const avg = overallScore(r);
  if (avg >= 8.5) return "Chinnaswamy-approved boundary machine! This squad is lifting the trophy!";
  if (avg >= 7.5) return "Play Bold! This is a championship-calibre squad with serious firepower.";
  if (avg >= 6.5) return "Solid squad with real potential. A few tweaks and you're playoff-bound!";
  if (avg >= 5.5) return "Decent foundation, but you'll need some smart mid-season signings.";
  if (avg >= 4.5) return "Hmm... the bench might need reinforcements. Play Bold anyway!";
  return "Yikes. Maybe rethink the auction strategy? Even the 12th Man is worried.";
}