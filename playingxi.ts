import { Player } from './auction';
import { Assignments, CaptaincyGrade, XIRatings } from './playingxi';
import { PLAYERS } from './players'; // FIXED: Removed 'type'

// FIXED: Export PITCH_POSITIONS required by PlayingXI.tsx
export const PITCH_POSITIONS = [
  { id: '1', role: 'BAT', label: 'Opener 1' },
  { id: '2', role: 'BAT', label: 'Opener 2' },
  { id: '3', role: 'BAT', label: 'Top Order' },
  { id: '4', role: 'BAT', label: 'Middle Order' },
  { id: '5', role: 'BAT', label: 'Middle Order' },
  { id: '6', role: 'AR', label: 'All-Rounder' },
  { id: '7', role: 'WK', label: 'Wicketkeeper' },
  { id: '8', role: 'BOWL', label: 'Bowler 1' },
  { id: '9', role: 'BOWL', label: 'Bowler 2' },
  { id: '10', role: 'BOWL', label: 'Bowler 3' },
  { id: '11', role: 'BOWL', label: 'Bowler 4' },
];

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

const DEFAULT_SQUAD_IDS = [
  'virat-kohli',
  'phil-salt',
  'rajat-patidar',
  'glenn-maxwell',
  'ab-devilliers',
  'krunal-pandya',
  'jitesh-sharma',
  'josh-hazlewood',
  'mohammed-siraj',
  'bhuvneshwar-kumar',
  'suyash-sharma',
  'smriti-mandhana',
  'ellyse-perry',
  'richa-ghosh',
  'shreyanka-patil',
];

export function getDefaultSquad(): Player[] {
  return DEFAULT_SQUAD_IDS
    .map((id) => PLAYERS.find((p) => p.id === id))
    .filter((p): p is Player => p !== undefined);
}

export function computeXIRatings(assignments: Assignments): XIRatings {
  const players = Object.values(assignments).filter((p): p is Player => p !== null);

  if (players.length === 0) {
    return { batting: 0, bowling: 0, fielding: 0, overall: 0 };
  }

  const batPlayers = players.filter((p) => ['BAT', 'WK', 'AR'].includes(p.role));
  const batting = batPlayers.length > 0
    ? batPlayers.reduce((s, p) => s + p.batting, 0) / batPlayers.length
    : players.reduce((s, p) => s + p.batting, 0) / players.length;

  const bowlPlayers = players.filter((p) => ['BOWL', 'AR'].includes(p.role));
  const fallbackBowl = players.reduce((s, p) => s + p.bowling, 0) / players.length;
  const bowling = bowlPlayers.length > 0
    ? bowlPlayers.reduce((s, p) => s + p.bowling, 0) / bowlPlayers.length
    : Math.min(fallbackBowl, 4);

  const fielding = players.reduce((s, p) => s + p.fielding, 0) / players.length;

  const overall = (batting * 0.35 + bowling * 0.35 + fielding * 0.30);

  return {
    batting: round1(batting),
    bowling: round1(bowling),
    fielding: round1(fielding),
    overall: round1(overall),
  };
}

export function getCaptaincyGrade(
  assignments: Assignments,
  captainId: string | null,
): CaptaincyGrade {
  if (!captainId) return 'No Captain';

  const captain = Object.values(assignments).find((p) => p?.id === captainId);
  if (!captain) return 'No Captain';

  if (captain.role === 'WK' && captain.batting >= 8) return 'Tactical Mastermind';
  if (captain.role === 'AR' && captain.batting >= 7.5) return 'Aggressive Leader';
  if (captain.role === 'BAT' && captain.batting >= 9) return 'Aggressive Leader';
  if (captain.batting >= 8) return 'Steady Captain';
  return 'Rookie Captain';
}

export interface RoleWarning {
  type: 'wk' | 'captain' | 'bowlers' | 'openers';
  message: string;
}

export function getRoleWarnings(
  assignments: Assignments,
  captainId: string | null,
  wkId: string | null,
): RoleWarning[] {
  const players = Object.values(assignments).filter((p): p is Player => p !== null);
  const warnings: RoleWarning[] = [];

  const hasWK = players.some((p) => p.role === 'WK') || !!wkId;
  if (!hasWK) {
    warnings.push({ type: 'wk', message: 'Warning: No designated Wicketkeeper!' });
  }

  if (!captainId) {
    warnings.push({ type: 'captain', message: 'Warning: No designated Captain!' });
  }

  const bowlerCount = players.filter((p) => ['BOWL', 'AR'].includes(p.role)).length;
  if (players.length > 0 && bowlerCount < 4) {
    warnings.push({
      type: 'bowlers',
      message: `Warning: Only ${bowlerCount} bowling option${bowlerCount === 1 ? '' : 's'} — need at least 4!`,
    });
  }

  const openerCount = players.filter((p) => p.role === 'BAT' || p.role === 'WK').length;
  if (players.length >= 6 && openerCount < 2) {
    warnings.push({ type: 'openers', message: 'Warning: Not enough top-order batters!' });
  }

  return warnings;
}

export function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('');
}