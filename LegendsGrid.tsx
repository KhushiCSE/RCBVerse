import { useState } from 'react';
import { motion } from 'framer-motion';
import { LEGENDS } from './legends';
import { Legend } from './legends';
import { LegendModal } from './LegendModal';

const ACCENT_HEX: Record<Legend['accent'], string> = {
  red: '#EC0C16',
  gold: '#FFD23F',
  cyan: '#00E5FF',
};

export function LegendsGrid() {
  const [selected, setSelected] = useState<Legend | null>(null);
  const [filter, setFilter] = useState<'all' | 'men' | 'women'>('all');

  const filtered = LEGENDS.filter((l) => filter === 'all' || l.category === filter);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-gradient-gold-red">
            Hall of Legends
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            The icons who wore the red and gold. Tap a card to explore their legacy.
          </p>
        </motion.div>

        {/* Filter toggle */}
        <div className="flex justify-center gap-2 mb-8">
          {(['all', 'men', 'women'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-rcb-gold text-rcb-black'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {f === 'all' ? 'All Legends' : `${f === 'men' ? "Men's" : "Women's"} Stars`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((legend, i) => (
            <LegendCard key={legend.id} legend={legend} index={i} onClick={() => setSelected(legend)} />
          ))}
        </div>
      </div>

      <LegendModal legend={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

interface LegendCardProps {
  legend: Legend;
  index: number;
  onClick: () => void;
}

function LegendCard({ legend, index, onClick }: LegendCardProps) {
  const color = ACCENT_HEX[legend.accent];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -6, rotateZ: -1 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden text-left"
      style={{
        background: `linear-gradient(160deg, ${color}18 0%, #121216 55%, #08080A 100%)`,
        border: `1px solid ${color}30`,
      }}
    >
      {/* Holographic shine overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(110deg, transparent 30%, ${color}25 48%, ${color}40 50%, ${color}25 52%, transparent 70%)`,
        }}
      />

      {/* Inner card border */}
      <div className="absolute inset-2 rounded-xl border border-white/5 pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-between p-4">
        {/* Top: initials badge */}
        <div className="flex flex-col items-center pt-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-display font-extrabold text-2xl text-white"
            style={{ background: `${color}15`, border: `2px solid ${color}50` }}
          >
            {legend.initials}
          </div>
          <span
            className="mt-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
            style={{ color, background: `${color}15` }}
          >
            {legend.category === 'men' ? 'MEN' : 'WOMEN'}
          </span>
        </div>

        {/* Bottom: name + tagline */}
        <div className="text-center w-full">
          <p className="font-display font-bold text-sm text-white leading-tight">{legend.name}</p>
          <p className="text-[10px] text-white/40 mt-1">{legend.role}</p>
          <p className="text-[11px] mt-2 font-semibold" style={{ color }}>
            {legend.tagline}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
