import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, MousePointerClick, Users } from 'lucide-react';
import type { Stand } from '@/data/stands';
import { STANDS } from '@/data/stands';
import { StadiumMap } from './StadiumMap';
import { StandModal } from './StandModal';

const STAND_STATS = [
  { icon: <MapPin size={16} />, label: 'Stands', value: '5' },
  { icon: <Users size={16} />, label: 'Capacity', value: '40,000' },
  { icon: <MapPin size={16} />, label: 'Location', value: 'Bengaluru' },
];

export function StadiumExplorer() {
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gradient-gold-red">
            Interactive Stadium Explorer
          </h1>
          <p className="text-white/50 text-sm mt-1">
            M. Chinnaswamy Stadium, Bengaluru — hover and click any stand to explore.
          </p>

          {/* Stats row */}
          <div className="flex gap-3 mt-4">
            {STAND_STATS.map((stat) => (
              <div key={stat.label} className="glass-panel px-3 py-2 flex items-center gap-2">
                <span className="text-rcb-gold">{stat.icon}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</p>
                  <p className="text-sm font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map + instructions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-panel p-5 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-4 text-xs text-white/40">
            <MousePointerClick size={14} className="text-rcb-gold" />
            <span>Hover to highlight · Click to view stand details</span>
          </div>

          <StadiumMap onSelectStand={setSelectedStand} activeStandId={selectedStand?.id ?? null} />
        </motion.div>

        {/* Stand cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-6"
        >
          <h2 className="font-display font-bold text-lg text-white mb-4">All Stands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
            {STANDS.map((stand, i) => (
              <motion.button
                key={stand.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStand(stand)}
                className="glass-panel p-4 text-left hover:border-rcb-gold/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm text-white group-hover:text-rcb-gold transition-colors">
                    {stand.shortName}
                  </h3>
                  <span className="text-xs text-white/30">{stand.priceRange}</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">{stand.tagline}</p>
                <p className="text-xs text-rcb-gold/60 mt-2 font-medium">
                  {stand.gateInfo}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <StandModal stand={selectedStand} onClose={() => setSelectedStand(null)} />
    </section>
  );
}
