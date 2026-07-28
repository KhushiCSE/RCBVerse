import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trophy,
  Sparkles,
  Play,
  BarChart3,
  Zap,
  Calendar,
} from 'lucide-react';
import type { Legend } from '@/data/legends';

interface LegendModalProps {
  legend: Legend | null;
  onClose: () => void;
}

const ACCENT_HEX: Record<Legend['accent'], string> = {
  red: '#EC0C16',
  gold: '#FFD23F',
  cyan: '#00E5FF',
};

export function LegendModal({ legend, onClose }: LegendModalProps) {
  const color = legend ? ACCENT_HEX[legend.accent] : '#EC0C16';

  return (
    <AnimatePresence>
      {legend && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="relative w-full max-w-lg glass-panel-strong max-h-[90vh] overflow-y-auto hide-scrollbar rounded-2xl"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            {/* Hero header */}
            <div
              className="relative p-6 overflow-hidden rounded-t-2xl"
              style={{ background: `linear-gradient(160deg, ${color}20 0%, transparent 100%)` }}
            >
              {/* Holographic shine */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(110deg, transparent 40%, ${color}15 50%, transparent 60%)`,
                }}
              />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="relative flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-extrabold text-3xl text-white shrink-0"
                  style={{ background: `${color}18`, border: `2px solid ${color}60` }}
                >
                  {legend.initials}
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-xl text-white">{legend.name}</h2>
                  <p className="text-sm text-white/50">{legend.role}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className="px-2 py-0.5 rounded text-[9px] font-bold uppercase"
                      style={{ color, background: `${color}18` }}
                    >
                      {legend.tagline}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-white/40">
                      <Calendar size={10} />
                      {legend.years}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Bio */}
              <p className="text-sm text-white/70 leading-relaxed">{legend.bio}</p>

              {/* Stats */}
              <div>
                <SectionTitle icon={<BarChart3 size={14} />} label="Career Stats & Franchise Records" color={color} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <StatCard label="Matches" value={legend.stats.matches} color={color} />
                  {legend.stats.runs && <StatCard label="Runs" value={legend.stats.runs} color={color} />}
                  {legend.stats.highest && <StatCard label="Highest" value={legend.stats.highest} color={color} />}
                  {legend.stats.wickets && <StatCard label="Wickets" value={legend.stats.wickets} color={color} />}
                  {legend.stats.best && <StatCard label="Best" value={legend.stats.best} color={color} />}
                  {legend.stats.average && <StatCard label="Average" value={legend.stats.average} color={color} />}
                  {legend.stats.strikeRate && <StatCard label="Strike Rate" value={legend.stats.strikeRate} color={color} />}
                  {legend.stats.economy && <StatCard label="Economy" value={legend.stats.economy} color={color} />}
                </div>
              </div>

              {/* Best Innings / Bowling Spells */}
              <div>
                <SectionTitle icon={<Zap size={14} />} label="Best Innings & Bowling Spells" color={color} />
                <div className="space-y-2">
                  {legend.bestInnings.map((inning) => (
                    <div key={inning.label} className="glass-panel p-3">
                      <p className="text-sm font-semibold text-white">{inning.label}</p>
                      <p className="text-xs text-white/50 mt-0.5">{inning.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Iconic moment */}
              <div
                className="p-4 rounded-xl"
                style={{ background: `${color}10`, border: `1px solid ${color}25` }}
              >
                <SectionTitle icon={<Trophy size={14} />} label="Iconic Moment" color={color} />
                <div className="flex items-start gap-2">
                  <Sparkles size={14} className="shrink-0 mt-0.5" style={{ color }} />
                  <p className="text-sm text-white/80 leading-relaxed">{legend.iconicMoment}</p>
                </div>
              </div>

              {/* Video placeholder */}
              <div className="glass-panel p-6 flex flex-col items-center justify-center text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ background: `${color}18`, border: `1px solid ${color}40` }}
                >
                  <Play size={20} style={{ color }} />
                </div>
                <p className="text-xs text-white/40">Highlights coming soon</p>
              </div>

              <button onClick={onClose} className="w-full btn-ghost mt-2">
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function SectionTitle({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <span style={{ color }}>{icon}</span>
      <h3 className="text-xs uppercase tracking-wider font-semibold" style={{ color }}>
        {label}
      </h3>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass-panel p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-white/40">{label}</p>
      <p className="font-display font-bold text-base" style={{ color }}>{value}</p>
    </div>
  );
}
