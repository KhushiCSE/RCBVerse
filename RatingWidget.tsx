import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { XIRatings, CaptaincyGrade } from './playingxi';
import type { RoleWarning } from './playingxi';

interface RatingWidgetProps {
  ratings: XIRatings;
  captaincy: CaptaincyGrade;
  filledCount: number;
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-white/60">{label}</span>
        <span className="font-display font-bold text-sm" style={{ color }}>
          {value.toFixed(1)}<span className="text-white/30 text-xs">/10</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

const GRADE_COLORS: Record<CaptaincyGrade, string> = {
  'Tactical Mastermind': '#00E5FF',
  'Aggressive Leader': '#EC0C16',
  'Steady Captain': '#FFD23F',
  'Rookie Captain': '#FF8C00',
  'No Captain': '#666',
};

export function RatingWidget({ ratings, captaincy, filledCount }: RatingWidgetProps) {
  const gradeColor = GRADE_COLORS[captaincy];

  return (
    <div className="glass-panel p-5">
      <h3 className="font-display font-bold text-sm text-white mb-4">AI Match Scorecard</h3>

      <div className="text-center mb-5">
        <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Overall XI Rating</p>
        <div className="font-display font-extrabold text-4xl text-gradient-gold-red">
          {ratings.overall.toFixed(1)}
          <span className="text-xl text-white/30">/10</span>
        </div>
        <p className="text-xs text-white/40 mt-1">{filledCount}/11 positions filled</p>
      </div>

      <div className="space-y-3">
        <ScoreBar label="Batting Score" value={ratings.batting} color="#FFD23F" />
        <ScoreBar label="Bowling Score" value={ratings.bowling} color="#00E5FF" />
        <ScoreBar label="Fielding Score" value={ratings.fielding} color="#EC0C16" />
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs uppercase tracking-wider text-white/40 mb-1.5">Captaincy Grade</p>
        <div
          className="px-3 py-2 rounded-lg text-sm font-bold text-center"
          style={{ color: gradeColor, background: `${gradeColor}15` }}
        >
          {captaincy}
        </div>
      </div>
    </div>
  );
}

interface WarningsToastProps {
  warnings: RoleWarning[];
}

export function WarningsToast({ warnings }: WarningsToastProps) {
  return (
    <div className="space-y-2">
      <AnimatePresence>
        {warnings.map((w, i) => (
          <motion.div
            key={w.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rcb-red/10 border border-rcb-red/30"
          >
            <AlertTriangle size={14} className="text-rcb-red shrink-0" />
            <span className="text-xs text-rcb-red/90 font-medium">{w.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
