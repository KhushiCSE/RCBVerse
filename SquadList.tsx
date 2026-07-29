import { motion, AnimatePresence } from 'framer-motion';
import type { Player } from './auction';
import type { ROLE_CONFIG } from './auction';
import type { PlayerToken } from './PlayerToken';

interface SquadListProps {
  availablePlayers: Player[];
  usedPlayerIds: Set<string>;
  onDragStart: (playerId: string) => void;
  onQuickPlace: (playerId: string) => void;
}

const ROLE_COLORS: Record<string, string> = {
  BAT: '#FFD23F',
  BOWL: '#00E5FF',
  AR: '#EC0C16',
  WK: '#FFFFFF',
};

export function SquadList({
  availablePlayers,
  usedPlayerIds,
  onDragStart,
  onQuickPlace,
}: SquadListProps) {
  return (
    <div className="glass-panel p-4 flex flex-col h-full max-h-[600px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-sm text-white">Available Squad</h3>
        <span className="text-xs text-white/40">{availablePlayers.length} players</span>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-1.5 pr-1">
        <AnimatePresence>
          {availablePlayers.map((player) => {
            const used = usedPlayerIds.has(player.id);
            return (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: used ? 0.3 : 1 }}
                exit={{ opacity: 0 }}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  used ? 'bg-white/0' : 'bg-white/5 hover:bg-white/10 cursor-grab active:cursor-grabbing'
                }`}
                draggable={!used}
                onDragStart={() => !used && onDragStart(player.id)}
                onClick={() => !used && onQuickPlace(player.id)}
              >
                <PlayerToken player={player} size="sm" showRole={false} draggable={!used} onDragStart={onDragStart} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${used ? 'text-white/40 line-through' : 'text-white'}`}>
                    {player.name}
                  </p>
                  <p className="text-xs text-white/30">
                    {ROLE_CONFIG[player.role].label}
                  </p>
                </div>
                {!used && (
                  <span
                    className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                    style={{ color: ROLE_COLORS[player.role], background: `${ROLE_COLORS[player.role]}15` }}
                  >
                    {ROLE_CONFIG[player.role].short}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
