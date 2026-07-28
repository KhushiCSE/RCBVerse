import { motion } from 'framer-motion';
import { Check, Gavel, Zap } from 'lucide-react';
import type { Player } from '@/types/auction';
import { ROLE_CONFIG } from '@/types/auction';
import { formatCr } from '@/lib/auction';

interface PlayerCardProps {
  player: Player;
  currentBid: number;
  isPurchased: boolean;
  canAfford: boolean;
  squadFull: boolean;
  onBid: (amount: number) => void;
  onBuy: () => void;
  index: number;
}

const ROLE_COLORS: Record<string, string> = {
  BAT: 'text-rcb-gold border-rcb-gold/30 bg-rcb-gold/10',
  BOWL: 'text-rcb-cyan border-rcb-cyan/30 bg-rcb-cyan/10',
  AR: 'text-rcb-red border-rcb-red/30 bg-rcb-red/10',
  WK: 'text-white border-white/30 bg-white/10',
};

export function PlayerCard({
  player,
  currentBid,
  isPurchased,
  canAfford,
  squadFull,
  onBid,
  onBuy,
  index,
}: PlayerCardProps) {
  const initials = player.name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  const roleCfg = ROLE_COLORS[player.role] ?? ROLE_COLORS.BAT;
  const disabled = isPurchased || !canAfford || squadFull;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
      className={`glass-panel p-4 flex flex-col transition-all duration-200 ${
        isPurchased ? 'border-rcb-red/40 opacity-60' : 'hover:border-white/20'
      }`}
    >
      {/* Header: avatar + role */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl bg-crimson-gradient flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-white text-sm">
              {initials}
            </span>
            {player.gender === 'W' && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rcb-cyan border-2 border-rcb-black" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm leading-tight truncate">
              {player.name}
            </h3>
            <p className="text-xs text-white/40 mt-0.5">
              {player.country} · {player.nationality}
            </p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${roleCfg}`}>
          {ROLE_CONFIG[player.role].short}
        </span>
      </div>

      {/* Base price + current bid */}
      <div className="flex items-center justify-between mb-3 py-2 border-y border-white/5">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/40">Base</p>
          <p className="font-display font-bold text-sm text-white">{formatCr(player.basePrice)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-white/40">Current Bid</p>
          <p className={`font-display font-bold text-sm ${currentBid > player.basePrice ? 'text-rcb-gold' : 'text-white/60'}`}>
            {formatCr(currentBid)}
          </p>
        </div>
      </div>

      {/* Controls */}
      {isPurchased ? (
        <div className="flex items-center justify-center gap-2 py-2 text-rcb-red text-sm font-semibold">
          <Check size={16} />
          SOLD
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onBid(0.5)}
              disabled={disabled}
              className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-semibold text-white bg-white/5 border border-white/10 transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Gavel size={12} />
              ₹50L
            </button>
            <button
              onClick={() => onBid(1.0)}
              disabled={disabled}
              className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-semibold text-white bg-white/5 border border-white/10 transition-all hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Gavel size={12} />
              ₹1Cr
            </button>
          </div>
          <button
            onClick={onBuy}
            disabled={disabled}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ background: disabled ? '#333' : '#EC0C16' }}
          >
            <Zap size={14} />
            Buy {formatCr(currentBid)}
          </button>
        </div>
      )}
    </motion.div>
  );
}
