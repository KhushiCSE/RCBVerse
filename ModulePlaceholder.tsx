import { motion } from 'framer-motion';
import type { ModuleId } from './modules';
import { MODULES } from './modules';

interface ModulePlaceholderProps {
  moduleId: ModuleId;
}

export function ModulePlaceholder({ moduleId }: ModulePlaceholderProps) {
  const meta = MODULES.find((m) => m.id === moduleId);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl glass-panel flex items-center justify-center text-4xl">
          {meta?.emoji}
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-gradient-gold-red">
          {meta?.label}
        </h2>
        <p className="mt-4 text-white/60 text-base sm:text-lg">
          {meta?.description}
        </p>
        <p className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-rcb-cyan">
          Coming soon in a future build
        </p>
      </motion.div>
    </section>
  );
}
