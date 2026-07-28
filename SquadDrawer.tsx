import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, RotateCcw, Wallet } from 'lucide-react';
import type { PurchasedPlayer } from '@/types/auction';
import { ROLE_CONFIG } from '@/types/auction';
import { formatCr } from '@/lib/auction';

interface SquadDrawerProps {
  open: boolean;
  onClose: () => void;
  squad: PurchasedPlayer[];
  purse: number;
  onRelease: (playerId: string) => void;
  onAnalyze: () => void;
  canAnalyze: boolean;
}

export function SquadDrawer({
  open,
  onClose,
  squad,
  purse,
  onRelease,
  onAnalyze,
  canAnalyze,
}: SquadDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 z-50 glass-panel-strong rounded-none border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <h2 className="font-display font-bold text-lg text-white">My RCB Squad</h2>
                <p className="text-xs text-white/40 mt-0.5">{squad.length} players signed</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close squad drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Purse summary */}
            <div className="px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/40 mb-1">
                <Wallet size={12} className="text-rcb-gold" />
                Remaining Purse
              </div>
              <div className="font-display font-extrabold text-2xl text-gradient-gold-red">
                {formatCr(purse)}
              </div>
            </div>

            {/* Squad list */}
            <div className="flex-1 overflow-y-auto hide-scrollbar px-5 py-3">
              {squad.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <p className="text-white/30 text-sm">No players bought yet.</p>
                  <p className="text-white/20 text-xs mt-1">Start bidding to build your squad!</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  <AnimatePresence>
                    {squad.map((entry) => (
                      <motion.li
                        key={entry.player.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                        className="glass-panel p-3 flex items-center gap-3 group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-crimson-gradient flex items-center justify-center shrink-0">
                          <span className="font-display font-bold text-white text-xs">
                            {entry.player.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {entry.player.name}
                          </p>
                          <p className="text-xs text-white/40">
                            {ROLE_CONFIG[entry.player.role].label} · {formatCr(entry.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => onRelease(entry.player.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-rcb-red hover:bg-rcb-red/10 transition-colors opacity-0 group-hover:opacity-100"
                          aria-label={`Release ${entry.player.name}`}
                          title="Release player"
                        >
                          <RotateCcw size={14} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* AI Analyze button */}
            <div className="p-5 border-t border-white/10">
              <button
                onClick={onAnalyze}
                disabled={!canAnalyze}
                className="w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <Sparkles size={18} />
                Analyze My Squad with AI
              </button>
              {!canAnalyze && (
                <p className="text-center text-xs text-white/30 mt-2">
                  {squad.length === 0
                    ? 'Buy at least 11 players to unlock AI analysis'
                    : `Need ${11 - squad.length} more player${11 - squad.length > 1 ? 's' : ''} to unlock AI analysis`}
                </p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
