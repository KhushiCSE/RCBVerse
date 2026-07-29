import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, MapPin, Sparkles } from 'lucide-react';
import type { ModuleId } from './modules';
import type { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onNavigate: (tab: ModuleId) => void;
}

const stats = [
  { value: 12, suffix: 'M+', label: 'Passionate Fans', decimals: 0 },
  { value: 2, suffix: '', label: 'IPL Trophies', decimals: 0 },
  { value: 2, suffix: '', label: 'WPL Trophies', decimals: 0 },
  { value: 100, suffix: '%', label: 'Endless Loyalty', decimals: 0 },
];

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      {/* Subtle top wash — keeps canvas flat-black, just a whisper of color */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rcb-red/50 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs sm:text-sm font-medium text-rcb-white mb-6">
          <Sparkles size={14} className="text-rcb-red" />
          Royal Challengers Bengaluru
        </span>

        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">
          <span className="block text-rcb-white">RCBVerse</span>
          <span className="block text-gradient-gold-red mt-2">
            The Ultimate Fan Experience
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-white/65 max-w-2xl mx-auto leading-relaxed">
          <span className="font-semibold text-gradient-cyan">Play Bold.</span> The
          ultimate interactive home for Royal Challengers Bengaluru fans.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('auction')}
            className="btn-primary w-full sm:w-auto group"
          >
            <Hammer size={18} />
            Start Auction Simulator
          </button>
          <button
            onClick={() => onNavigate('stadium')}
            className="btn-cyan w-full sm:w-auto group"
          >
            <MapPin size={18} />
            Explore Chinnaswamy
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mx-auto"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            className="glass-panel p-6 text-center transition-colors hover:border-white/20"
          >
            <div className="font-display font-extrabold text-3xl sm:text-4xl text-gradient-gold-red">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </div>
            <div className="mt-2 text-sm text-white/60 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-14 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs uppercase tracking-widest">Explore Modules</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-rcb-red to-transparent"
        />
      </motion.div>

      <AnimatePresence />
    </section>
  );
}
