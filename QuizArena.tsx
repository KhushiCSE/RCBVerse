import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, Check, X, RotateCw, Award, Flame } from 'lucide-react';
import { QUIZ_TIERS, BADGES } from './quiz';
import { QuizTier } from './quiz';
import { celebrateGold, celebrateBig, celebrateCorrect } from './confetti';
import { useFan } from './fanStore';
import { useAudio } from './audioStore';

type Phase = 'select' | 'playing' | 'result';

const QUESTION_TIME = 15;

export function QuizArena() {
  const [phase, setPhase] = useState<Phase>('select');
  const [tier, setTier] = useState<QuizTier | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [answered, setAnswered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { recordQuizResult } = useFan();
  const { playFireworks } = useAudio();

  const currentQuestion = tier?.questions[qIndex];

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleAnswer = useCallback(
    (idx: number | null) => {
      if (answered) return;
      stopTimer();
      setSelected(idx);
      setAnswered(true);
      if (idx !== null && currentQuestion && idx === currentQuestion.answer) {
        setScore((s) => s + 1);
        celebrateCorrect();
      }
    },
    [answered, currentQuestion, stopTimer]
  );

  const nextQuestion = useCallback(() => {
    if (!tier) return;
    if (qIndex + 1 >= tier.questions.length) {
      setPhase('result');
      recordQuizResult(tier.id, score, tier.questions.length);
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(QUESTION_TIME);
    }
  }, [qIndex, tier]);

  // Timer effect
  useEffect(() => {
    if (phase !== 'playing' || answered) {
      stopTimer();
      return;
    }
    stopTimer();
    setTimeLeft(QUESTION_TIME);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return stopTimer;
  }, [phase, answered, qIndex, stopTimer]);

  // Auto-submit on timeout
  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0 && !answered) {
      handleAnswer(null);
    }
  }, [timeLeft, phase, answered, handleAnswer]);

  // Confetti + fireworks on result
  useEffect(() => {
    if (phase !== 'result' || !tier) return;
    const total = tier.questions.length;
    const ratio = score / total;
    if (ratio === 1) {
      const fired = setTimeout(() => { celebrateBig(); playFireworks(); }, 300);
      return () => clearTimeout(fired);
    }
    if (ratio >= 0.7) {
      const fired = setTimeout(() => { celebrateGold(); playFireworks(); }, 300);
      return () => clearTimeout(fired);
    }
  }, [phase, score, tier, playFireworks]);

  const startQuiz = (selectedTier: QuizTier) => {
    setTier(selectedTier);
    setQIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setTimeLeft(QUESTION_TIME);
    setPhase('playing');
  };

  const reset = () => {
    setPhase('select');
    setTier(null);
    setScore(0);
  };

  const earnedBadges = tier
    ? BADGES.filter((b) => b.condition(score, tier.questions.length, tier.id))
    : [];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-gradient-gold-red">
            RCB Quiz Arena
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            Test your fandom across three tiers. 15 seconds per question.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-4"
            >
              {QUIZ_TIERS.map((t, i) => (
                <motion.button
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startQuiz(t)}
                  className="glass-panel p-5 text-left hover:border-rcb-gold/30 transition-colors flex items-center gap-4"
                >
                  <span className="text-3xl">{t.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-white">{t.label}</h3>
                    <p className="text-sm text-white/50">{t.description}</p>
                    <p className="text-xs text-white/30 mt-1">{t.questions.length} questions</p>
                  </div>
                  <Flame size={20} className="text-rcb-red/60" />
                </motion.button>
              ))}
            </motion.div>
          )}

          {phase === 'playing' && tier && currentQuestion && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              {/* Progress + timer */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-white/40 font-medium">
                  Question {qIndex + 1} of {tier.questions.length}
                </span>
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="text-rcb-gold" />
                  <span className="text-xs text-white/60 font-semibold">{score} pts</span>
                </div>
              </div>

              {/* Timer bar */}
              <div className="glass-panel p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className={timeLeft <= 5 ? 'text-rcb-red' : 'text-rcb-cyan'} />
                  <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-rcb-red' : 'text-white/70'}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: timeLeft <= 5 ? '#EC0C16' : '#00E5FF' }}
                    animate={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-5 mb-4"
              >
                <p className="font-display font-bold text-base sm:text-lg text-white leading-relaxed">
                  {currentQuestion.q}
                </p>
              </motion.div>

              {/* Options */}
              <div className="grid gap-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isCorrect = idx === currentQuestion.answer;
                  const isSelected = idx === selected;
                  let cls = 'bg-white/5 border-white/10 text-white/80 hover:bg-white/8';
                  if (answered) {
                    if (isCorrect) cls = 'bg-green-500/15 border-green-500/50 text-white';
                    else if (isSelected) cls = 'bg-red-500/15 border-red-500/50 text-white';
                    else cls = 'bg-white/5 border-white/10 text-white/40';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={!answered ? { x: 2 } : undefined}
                      whileTap={!answered ? { scale: 0.98 } : undefined}
                      onClick={() => handleAnswer(idx)}
                      disabled={answered}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium transition-colors ${cls}`}
                    >
                      <span>{opt}</span>
                      {answered && isCorrect && <Check size={16} className="text-green-400" />}
                      {answered && isSelected && !isCorrect && <X size={16} className="text-red-400" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Next button */}
              {answered && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextQuestion}
                  className="btn-primary w-full mt-4"
                >
                  {qIndex + 1 >= tier.questions.length ? 'See Results' : 'Next Question'}
                </motion.button>
              )}
            </motion.div>
          )}

          {phase === 'result' && tier && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel-strong p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: score === tier.questions.length ? '#FFD23F' : score / tier.questions.length >= 0.7 ? '#EC0C16' : '#1A1A22',
                  border: `2px solid ${score === tier.questions.length ? '#FFD23F' : 'rgba(255,255,255,0.15)'}`,
                }}
              >
                <Trophy size={36} className={score === tier.questions.length ? 'text-rcb-black' : 'text-white'} />
              </motion.div>

              <h2 className="font-display font-extrabold text-2xl text-white">
                {score === tier.questions.length ? 'Perfect Score!' : score / tier.questions.length >= 0.7 ? 'Well Played!' : 'Keep Going!'}
              </h2>
              <p className="text-white/50 text-sm mt-1">{tier.label}</p>

              <p className="font-display font-extrabold text-4xl text-gradient-gold mt-4">
                {score} / {tier.questions.length}
              </p>

              {/* Badges */}
              {earnedBadges.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Award size={16} className="text-rcb-gold" />
                    <h3 className="text-xs uppercase tracking-wider text-rcb-gold font-semibold">Badges Unlocked</h3>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {earnedBadges.map((b) => (
                      <motion.div
                        key={b.id}
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
                        className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl"
                        style={{ background: 'rgba(255,210,63,0.1)', border: '1px solid rgba(255,210,63,0.3)' }}
                      >
                        <span className="text-2xl">{b.emoji}</span>
                        <span className="text-xs font-bold text-rcb-gold">{b.name}</span>
                        <span className="text-[10px] text-white/40 max-w-[120px]">{b.description}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={reset} className="btn-ghost mt-6">
                <RotateCw size={16} />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
