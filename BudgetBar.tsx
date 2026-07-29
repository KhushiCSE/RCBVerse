import { Wallet, Users, Globe2, Flag, TrendingDown } from 'lucide-react';
import { formatCr } from './auction';
import { MAX_SQUAD, MAX_OVERSEAS } from './auction';

interface BudgetBarProps {
  purse: number;
  squadCount: number;
  overseasCount: number;
  indianCount: number;
}

export function BudgetBar({ purse, squadCount, overseasCount, indianCount }: BudgetBarProps) {
  const pursePct = Math.max(0, (purse / 100) * 100);
  const squadPct = Math.max(0, (squadCount / MAX_SQUAD) * 100);

  return (
    <div className="glass-panel p-4 sm:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Purse */}
        <div className="sm:col-span-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 mb-2">
            <Wallet size={14} className="text-rcb-gold" />
            Remaining Purse
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-gradient-gold-red">
            {formatCr(purse)}
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-crimson-gradient transition-all duration-500"
              style={{ width: `${pursePct}%` }}
            />
          </div>
        </div>

        {/* Squad Size */}
        <div className="sm:col-span-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 mb-2">
            <Users size={14} className="text-rcb-cyan" />
            Squad Size
          </div>
          <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {squadCount}<span className="text-white/40 text-lg">/{MAX_SQUAD}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-cyan-gradient transition-all duration-500"
              style={{ width: `${squadPct}%` }}
            />
          </div>
        </div>

        {/* Slots */}
        <div className="sm:col-span-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 mb-2">
            <Globe2 size={14} className="text-rcb-red" />
            Overseas / Indian Slots
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Flag size={14} className="text-rcb-red" />
              <span className="font-display font-bold text-xl text-white">
                {overseasCount}<span className="text-white/30 text-sm">/{MAX_OVERSEAS}</span>
              </span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-rcb-gold/60" />
              <span className="font-display font-bold text-xl text-white">
                {indianCount}
              </span>
            </div>
          </div>
          <div className="mt-2 flex gap-1">
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-rcb-red transition-all duration-500"
                style={{ width: `${Math.min(100, (overseasCount / MAX_OVERSEAS) * 100)}%` }}
              />
            </div>
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full bg-rcb-gold transition-all duration-500"
                style={{ width: `${Math.min(100, (indianCount / (MAX_SQUAD - MAX_OVERSEAS)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {purse < 5 && purse > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-rcb-gold/80">
          <TrendingDown size={12} />
          Low budget! Bid carefully.
        </div>
      )}
    </div>
  );
}
