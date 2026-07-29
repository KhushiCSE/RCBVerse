import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stand } from './stands';
import { STANDS } from './stands';

interface StadiumMapProps {
  onSelectStand: (stand: Stand) => void;
  activeStandId: string | null;
}

interface StandShape {
  standId: string;
  path: string;
  label: string;
  labelX: number;
  labelY: number;
}

const STAND_SHAPES: StandShape[] = [
  {
    standId: 'executive-lounge',
    path: 'M 100 60 L 300 60 L 280 120 L 120 120 Z',
    label: 'Executive Lounge',
    labelX: 200,
    labelY: 90,
  },
  {
    standId: 'pavilion-terrace',
    path: 'M 120 120 L 280 120 L 290 170 L 110 170 Z',
    label: 'Pavilion',
    labelX: 200,
    labelY: 145,
  },
  {
    standId: 'p1-fan-zone',
    path: 'M 110 170 L 290 170 L 295 230 L 105 230 Z',
    label: 'P1 Fan Zone',
    labelX: 200,
    labelY: 200,
  },
  {
    standId: 'b-stand-grand-terrace',
    path: 'M 300 60 L 420 60 L 410 140 L 290 170 Z',
    label: 'B Stand',
    labelX: 355,
    labelY: 115,
  },
  {
    standId: 'boat-club-stand',
    path: 'M 80 230 L 320 230 L 310 290 L 90 290 Z',
    label: 'Boat Club',
    labelX: 200,
    labelY: 260,
  },
];

export function StadiumMap({ onSelectStand, activeStandId }: StadiumMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 500 330"
        className="w-full h-auto"
        role="img"
        aria-label="Interactive map of M. Chinnaswamy Stadium stands"
      >
        <defs>
          <radialGradient id="fieldGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a4d0a" />
            <stop offset="60%" stopColor="#063106" />
            <stop offset="100%" stopColor="#021a02" />
          </radialGradient>
          <linearGradient id="standHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD23F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFA500" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="standBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1A22" />
            <stop offset="100%" stopColor="#101016" />
          </linearGradient>
          <filter id="standGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer stadium ring */}
        <ellipse cx="250" cy="165" rx="235" ry="148" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        {/* Playing field (inner oval) */}
        <ellipse cx="250" cy="175" rx="130" ry="80" fill="url(#fieldGradient)" />
        {/* Pitch strip */}
        <rect x="240" y="135" width="20" height="80" rx="2" fill="#c4a35a" opacity="0.25" />

        {/* Field circle markings */}
        <ellipse cx="250" cy="175" rx="90" ry="55" fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth="1" />
        <ellipse cx="250" cy="175" rx="45" ry="28" fill="none" stroke="rgba(34,197,94,0.08)" strokeWidth="1" />

        {/* Stands */}
        {STAND_SHAPES.map((shape) => {
          const isHovered = hoveredId === shape.standId;
          const isActive = activeStandId === shape.standId;
          const stand = STANDS.find((s) => s.id === shape.standId);

          return (
            <g
              key={shape.standId}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId(shape.standId)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => stand && onSelectStand(stand)}
            >
              <path
                d={shape.path}
                fill={isHovered || isActive ? 'url(#standHover)' : 'url(#standBase)'}
                stroke={isHovered || isActive ? '#FFD23F' : 'rgba(255,255,255,0.08)'}
                strokeWidth={isHovered || isActive ? 1.5 : 1}
                filter={isHovered || isActive ? 'url(#standGlow)' : undefined}
                style={{ transition: 'fill 0.2s, stroke 0.2s' }}
              />
              <text
                x={shape.labelX}
                y={shape.labelY}
                textAnchor="middle"
                className="pointer-events-none select-none"
                fill={isHovered || isActive ? '#08080A' : 'rgba(255,255,255,0.5)'}
                fontSize="10"
                fontWeight="700"
                style={{ fontFamily: 'Sora, sans-serif', transition: 'fill 0.2s' }}
              >
                {shape.label}
              </text>
            </g>
          );
        })}

        {/* Compass / label */}
        <text x="250" y="178" textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="8" fontWeight="600" style={{ fontFamily: 'Sora, sans-serif' }}>
          PITCH
        </text>
      </svg>

      {/* Stand legend chips below map */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {STANDS.map((stand) => (
          <motion.button
            key={stand.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectStand(stand)}
            onMouseEnter={() => setHoveredId(stand.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              hoveredId === stand.id || activeStandId === stand.id
                ? 'bg-rcb-gold text-rcb-black'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {stand.shortName}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
