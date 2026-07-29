import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Ticket,
  Car,
  Train,
  Utensils,
  Droplets,
  HeartPulse,
  Shirt,
  Camera,
  Sparkles,
} from 'lucide-react';
import type { Stand } from './stands';

interface StandModalProps {
  stand: Stand | null;
  onClose: () => void;
}

const VIBE_COLORS: Record<string, string> = {
  Luxury: '#FFD23F',
  Premium: '#00E5FF',
  Electric: '#EC0C16',
  Classic: '#FF8C00',
  Relaxed: '#22C55E',
};

export function StandModal({ stand, onClose }: StandModalProps) {
  const vibeColor = stand ? VIBE_COLORS[stand.vibe] ?? '#FFD23F' : '#FFD23F';

  return (
    <AnimatePresence>
      {stand && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-2xl glass-panel-strong max-h-[90vh] overflow-y-auto hide-scrollbar rounded-2xl"
          >
            {/* Seat view image header */}
            <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl">
              <img
                src={stand.seatView}
                alt={`${stand.name} seat view`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rcb-black via-rcb-black/40 to-transparent" />

              {/* Vibe badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md"
                style={{ color: vibeColor, background: `${vibeColor}25`, border: `1px solid ${vibeColor}40` }}
              >
                <Sparkles size={12} />
                {stand.vibe}
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Title overlay */}
              <div className="absolute bottom-4 left-5 right-5">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight">
                  {stand.name}
                </h2>
                <p className="text-sm text-white/60 mt-0.5">{stand.tagline}</p>
              </div>
            </div>

            {/* Content body */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* Description */}
              <p className="text-sm text-white/70 leading-relaxed">{stand.description}</p>

              {/* Seat View label */}
              <InfoRow icon={<Camera size={16} />} label="Seat View" color="#FFD23F">
                <p className="text-sm text-white/80">Live preview shown above — the view you'll get from this stand on match day.</p>
              </InfoRow>

              {/* Ticket price */}
              <InfoRow icon={<Ticket size={16} />} label="Ticket Price Range" color="#EC0C16">
                <p className="font-display font-bold text-lg text-white">{stand.priceRange}</p>
              </InfoRow>

              {/* Gate & Metro & Parking */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <CompactCard icon={<Car size={16} />} label="Gate" value={stand.gateInfo} color="#00E5FF" />
                <CompactCard icon={<Train size={16} />} label="Metro" value={stand.metroInfo} color="#FFD23F" />
                <CompactCard icon={<Car size={16} />} label="Parking" value={stand.parking} color="#22C55E" />
              </div>

              {/* Food stalls */}
              <InfoRow icon={<Utensils size={16} />} label="Nearby Food Stalls" color="#FF8C00">
                <div className="flex flex-wrap gap-2">
                  {stand.foodStalls.map((food) => (
                    <span
                      key={food}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium text-white/80 bg-white/5 border border-white/10"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </InfoRow>

              {/* Washrooms & First Aid & Merchandise */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <CompactCard icon={<Droplets size={16} />} label="Washrooms" value={stand.washrooms} color="#00E5FF" />
                <CompactCard icon={<HeartPulse size={16} />} label="First Aid" value={stand.firstAid} color="#EC0C16" />
                <CompactCard icon={<Shirt size={16} />} label="Merchandise" value={stand.merchandise} color="#FFD23F" />
              </div>

              {/* Close button */}
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

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  children: React.ReactNode;
}

function InfoRow({ icon, label, color, children }: InfoRowProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color }}>{icon}</span>
        <h3 className="text-xs uppercase tracking-wider font-semibold" style={{ color }}>
          {label}
        </h3>
      </div>
      {children}
    </div>
  );
}

interface CompactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function CompactCard({ icon, label, value, color }: CompactCardProps) {
  return (
    <div className="glass-panel p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span style={{ color }}>{icon}</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold" style={{ color }}>
          {label}
        </span>
      </div>
      <p className="text-xs text-white/70 leading-snug">{value}</p>
    </div>
  );
}
