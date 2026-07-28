import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Player } from '@/types/auction';
import type { Assignments } from '@/types/playingxi';
import { PITCH_POSITIONS, POSITION_GROUP_META } from '@/types/playingxi';
import { PlayerToken } from './PlayerToken';

interface CricketPitchProps {
  assignments: Assignments;
  captainId: string | null;
  wkId: string | null;
  onDrop: (positionId: number, playerId: string) => void;
  onRemove: (positionId: number) => void;
  onDragStart: (playerId: string) => void;
}

const GROUP_LAYOUT: { group: keyof typeof POSITION_GROUP_META; positions: number[] }[] = [
  { group: 'opener', positions: [1, 2] },
  { group: 'middle', positions: [3, 4, 5, 6] },
  { group: 'finisher', positions: [7, 8] },
  { group: 'bowler', positions: [9, 10, 11] },
];

export function CricketPitch({
  assignments,
  captainId,
  wkId,
  onDrop,
  onRemove,
  onDragStart,
}: CricketPitchProps) {
  return (
    <div className="relative">
      {/* Pitch field background */}
      <div
        className="relative rounded-3xl p-4 sm:p-6 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% 40%, #0a3d0a 0%, #052305 70%, #021902 100%)',
          border: '1px solid rgba(34, 197, 94, 0.15)',
        }}
      >
        {/* Field circle markings */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[85%] h-[75%] rounded-full border border-green-500/10" />
        </div>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[50%] h-[40%] rounded-full border border-green-500/10" />
        </div>

        {/* Center pitch strip */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-32 rounded bg-[#c4a35a]/20 border border-[#c4a35a]/20 pointer-events-none" />

        <div className="relative space-y-3 sm:space-y-4">
          {GROUP_LAYOUT.map(({ group, positions }) => {
            const meta = POSITION_GROUP_META[group];
            return (
              <div key={group} className="flex items-center gap-2 sm:gap-3">
                <span
                  className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider w-16 sm:w-20 shrink-0"
                  style={{ color: meta.color }}
                >
                  {meta.label}
                </span>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {positions.map((posId) => {
                    const player = assignments[posId] ?? null;
                    return (
                      <DropZone
                        key={posId}
                        positionId={posId}
                        player={player}
                        isCaptain={captainId === player?.id}
                        isKeeper={wkId === player?.id}
                        onDrop={onDrop}
                        onRemove={onRemove}
                        onDragStart={onDragStart}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface DropZoneProps {
  positionId: number;
  player: Player | null;
  isCaptain: boolean;
  isKeeper: boolean;
  onDrop: (positionId: number, playerId: string) => void;
  onRemove: (positionId: number) => void;
  onDragStart: (playerId: string) => void;
}

function DropZone({
  positionId,
  player,
  isCaptain,
  isKeeper,
  onDrop,
  onRemove,
  onDragStart,
}: DropZoneProps) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const playerId = e.dataTransfer.getData('text/plain');
        if (playerId) onDrop(positionId, playerId);
      }}
      className="relative group"
    >
      {player ? (
        <div className="relative">
          <PlayerToken
            player={player}
            isCaptain={isCaptain}
            isKeeper={isKeeper}
            draggable
            onDragStart={onDragStart}
          />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-white/30 whitespace-nowrap">
            #{positionId}
          </span>
          <button
            onClick={() => onRemove(positionId)}
            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rcb-red flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Remove from position"
          >
            <X size={10} className="text-white" />
          </button>
        </div>
      ) : (
        <div className="w-14 h-14 rounded-full border-2 border-dashed border-white/15 flex items-center justify-center hover:border-white/30 transition-colors">
          <span className="text-xs text-white/20 font-semibold">{positionId}</span>
        </div>
      )}
    </div>
  );
}
