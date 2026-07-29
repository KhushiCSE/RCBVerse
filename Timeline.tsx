import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TIMELINE } from './timeline';
import { TimelineMilestone } from './timeline';

const ACCENT_HEX: Record<TimelineMilestone['accent'], string> = {
  red: '#EC0C16',
  gold: '#FFD23F',
  cyan: '#00E5FF',
};

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-gradient-gold-red">
            The RCB Timeline
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            A journey through the moments that built Royal Challengers Bengaluru.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative pl-8 sm:pl-12">
          {/* Vertical glowing line track */}
          <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-white/8" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-3 sm:left-5 top-0 bottom-0 w-px origin-top"
            style={{
              scaleY: lineScaleY,
              background: 'linear-gradient(180deg, #EC0C16 0%, #FFD23F 50%, #00E5FF 100%)',
              boxShadow: '0 0 12px rgba(236,12,22,0.5)',
            }}
          />

          <div className="space-y-10">
            {TIMELINE.map((milestone, i) => (
              <TimelineNode key={`${milestone.year}-${i}`} milestone={milestone} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({ milestone }: { milestone: TimelineMilestone }) {
  const color = ACCENT_HEX[milestone.accent];

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Node dot */}
      <div className="absolute -left-8 sm:-left-12 top-1.5 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="relative w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: `${color}20`, border: `2px solid ${color}` }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -2 }}
        className="glass-panel p-5"
        style={{ borderLeft: `3px solid ${color}` }}
      >
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-display font-extrabold text-2xl" style={{ color }}>
            {milestone.year}
          </span>
          {milestone.trophy && (
            <span className="text-base">🏆</span>
          )}
        </div>
        <h3 className="font-display font-bold text-lg text-white mb-1.5">{milestone.title}</h3>
        <p className="text-sm text-white/60 leading-relaxed">{milestone.description}</p>
      </motion.div>
    </motion.div>
  );
}
