import { motion } from 'framer-motion';
import { Crown, Shield } from 'lucide-react';
import type { Player } from '@/types/auction';
import { ROLE_CONFIG } from '@/types/auction';
import { getInitials } from '@/lib/playingxi';

const ROLE_COLORS: Record<string, string> = {
  BAT: '#FFD23F',
  BOWL: '#00E5FF',
  AR: '#EC0C16',
  WK: '#FFFFFF',
};

interface PlayerTokenProps {
  player: Player;
  isCaptain?: boolean;
  isKeeper?: boolean;
  size?: 'sm' | 'md';
  draggable?: boolean;
  onDragStart?: (playerId: string) => void;
  onClick?: () => void;
  showRole?: boolean;
}

export function PlayerToken({
  player,
  isCaptain = false,
  isKeeper = false,
  size = 'md',
  draggable = false,
  onDragStart,
  onClick,
  showRole = true,
}: PlayerTokenProps) {
  const roleColor = ROLE_COLORS[player.role] ?? '#EC0C16';
  const sz = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14';
  const initials = getInitials(player.name);

  return (
    <motion.div
      layout
      draggable={draggable}
      onDragStart={() => onDragStart?.(player.id)}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      className={`relative ${sz} rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0 select-none`}
      style={{
        background: `linear-gradient(135deg, ${roleColor}20, ${roleColor}05)`,
        border: `2px solid ${roleColor}80`,
      }}
    >
      {/* Inner circle with image & clean initials fallback */}
      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative">
        <span className="font-display font-bold text-white text-xs sm:text-sm absolute z-0">
          {initials}
        </span>
        {player.image ? (
          <img
            src={player.image}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top relative z-10"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : null}
      </div>

      {showRole && (
        <span
          className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded text-[8px] font-bold text-rcb-black"
          style={{ background: roleColor }}
        >
          {ROLE_CONFIG[player.role].short}
        </span>
      )}

      {isCaptain && (
        <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-rcb-gold flex items-center justify-center border-2 border-rcb-black">
          <Crown size={11} className="text-rcb-black" />
        </span>
      )}
      {isKeeper && !isCaptain && (
        <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-rcb-cyan flex items-center justify-center border-2 border-rcb-black">
          <Shield size={11} className="text-rcb-black" />
        </span>
      )}
    </motion.div>
  );
}
