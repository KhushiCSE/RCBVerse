import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Star } from 'lucide-react';
import type { SquadRatings } from '@/types/auction';
import { overallScore, getAIComment } from '@/lib/auction';

interface AIRatingModalProps {
  open: boolean;
  onClose: () => void;
  ratings: SquadRatings | null;
  squadSize: number;
}

interface RatingRow {
  label: string;
  value: number;
  icon: string;
}

export function AIRatingModal({ open, onClose, ratings, squadSize }: AIRatingModalProps) {
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    if (open) {
      setProgress(false);
      const t = setTimeout(() => setProgress(true), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!ratings || squadSize === 0) return null;

  const rows: RatingRow[] = [
    { label: 'Team Chemistry', value: ratings.chemistry, icon: '🧪' },
    { label: 'Batting Power', value: ratings.batting, icon: '🏏' },
    { label: 'Bowling Depth', value: ratings.bowling, icon: '🎯' },
    { label: 'Death Overs Capability', value: ratings.death, icon: '💀' },
    { label: 'Spin Attack Strength', value: ratings.spin, icon: '🌀' },
  ];

  const overall = overallScore(ratings);
  const comment = getAIComment(ratings);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-lg glass-panel-strong p-6 sm:p-8 max-h-[90vh] overflow-y-auto hide-scrollbar"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-crimson-gradient flex items-center justify-center">
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-white">AI Squad Analysis</h2>
                  <p className="text-xs text-white/40">{squadSize} players evaluated</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close analysis"
              >
                <X size={18} />
              </button>
            </div>

            {/* Overall score */}
            <div className="text-center mb-6">
              <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Overall Rating</p>
              <div className="font-display font-extrabold text-5xl text-gradient-gold-red">
                {progress ? overall.toFixed(1) : '0.0'}
                <span className="text-2xl text-white/30">/10</span>
              </div>
              <div className="flex justify-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={progress && overall >= s * 2 ? 'text-rcb-gold fill-rcb-gold' : 'text-white/15'}
                  />
                ))}
              </div>
            </div>

            {/* Rating bars */}
            <div className="space-y-4">
              {rows.map((row, i) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white/80 flex items-center gap-2">
                      <span className="text-base">{row.icon}</span>
                      {row.label}
                    </span>
                    <span className="font-display font-bold text-sm text-white">
                      {progress ? row.value.toFixed(1) : '0.0'}<span className="text-white/30">/10</span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-crimson-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: progress ? `${row.value * 10}%` : 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* AI Comment */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: progress ? 1 : 0, y: progress ? 0 : 10 }}
              transition={{ delay: 1.4 }}
              className="mt-6 p-4 rounded-xl bg-rcb-red/10 border border-rcb-red/20"
            >
              <p className="text-xs uppercase tracking-wider text-rcb-red mb-1 font-semibold">AI Verdict</p>
              <p className="text-sm text-white/90 leading-relaxed">{comment}</p>
            </motion.div>

            <button
              onClick={onClose}
              className="w-full btn-ghost mt-6"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
