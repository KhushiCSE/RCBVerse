import { forwardRef, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCw } from 'lucide-react';

interface JerseyConfig {
  body: string;
  accent: string;
  collar: string;
  sleeves: string;
  showSponsor: boolean;
  showSleeveLogo: boolean;
  name: string;
  number: string;
}

const DEFAULT: JerseyConfig = {
  body: '#EC0C16',
  accent: '#FFD23F',
  collar: '#08080A',
  sleeves: '#D1040A',
  showSponsor: true,
  showSleeveLogo: true,
  name: '12th MAN',
  number: '18',
};

const PRESETS: { name: string; config: JerseyConfig }[] = [
  { name: 'Classic Red', config: DEFAULT },
  { name: 'Green Spark', config: { ...DEFAULT, body: '#0a5c2e', accent: '#FFD23F', sleeves: '#063d1e' } },
  { name: 'Bold Black', config: { ...DEFAULT, body: '#1A1A22', accent: '#00E5FF', sleeves: '#08080A', collar: '#FFD23F' } },
  { name: 'Royal Gold', config: { ...DEFAULT, body: '#FFD23F', accent: '#EC0C16', sleeves: '#E0B800', collar: '#08080A' } },
];

const SWATCHES = ['#EC0C16', '#D1040A', '#FF1E27', '#FFD23F', '#E0B800', '#08080A', '#1A1A22', '#00E5FF', '#00B8CC', '#0a5c2e', '#FFFFFF', '#FF8C00'];

export function JerseyDesigner() {
  const [config, setConfig] = useState<JerseyConfig>(DEFAULT);
  const [view, setView] = useState<'front' | 'back'>('front');
  const [showFront, setShowFront] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);

  const update = <K extends keyof JerseyConfig>(key: K, value: JerseyConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const exportJersey = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const svgData = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#08080A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 800, 800);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement('a');
        link.download = `rcb-jersey-${config.name || 'custom'}-${config.number}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }, 'image/png');
    };
    img.src = url;
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-gradient-gold-red">
            Custom Jersey Designer
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            Design your own RCB jersey — pick colors, add your name, and export it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Jersey preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-panel p-6 flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => { setShowFront(true); setView('front'); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${showFront ? 'bg-rcb-gold text-rcb-black' : 'bg-white/5 text-white/50'}`}
              >
                Front
              </button>
              <button
                onClick={() => { setShowFront(false); setView('back'); }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${!showFront ? 'bg-rcb-gold text-rcb-black' : 'bg-white/5 text-white/50'}`}
              >
                Back
              </button>
            </div>

            <JerseySVG ref={svgRef} config={config} showFront={showFront} />

            <button onClick={exportJersey} className="btn-gold mt-6 w-full">
              <Download size={18} />
              Export Jersey
            </button>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="glass-panel p-6 space-y-6"
          >
            {/* Presets */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">Presets</h3>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setConfig(p.config)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color pickers */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">Colours</h3>
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker label="Primary Body" value={config.body} swatches={SWATCHES} onChange={(v) => update('body', v)} />
                <ColorPicker label="Secondary Accents" value={config.accent} swatches={SWATCHES} onChange={(v) => update('accent', v)} />
                <ColorPicker label="Collar" value={config.collar} swatches={SWATCHES} onChange={(v) => update('collar', v)} />
                <ColorPicker label="Sleeves" value={config.sleeves} swatches={SWATCHES} onChange={(v) => update('sleeves', v)} />
              </div>
            </div>

            {/* Sponsor toggles */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">Sponsor Logos</h3>
              <div className="space-y-2">
                <Toggle label="Chest Sponsor" enabled={config.showSponsor} onToggle={() => update('showSponsor', !config.showSponsor)} />
                <Toggle label="Sleeve Logo" enabled={config.showSleeveLogo} onToggle={() => update('showSleeveLogo', !config.showSleeveLogo)} />
              </div>
            </div>

            {/* Name & Number */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">Name & Number</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Player Name (shown on back)</label>
                  <input
                    type="text"
                    value={config.name}
                    maxLength={14}
                    onChange={(e) => update('name', e.target.value.toUpperCase())}
                    placeholder="12th MAN"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rcb-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Jersey Number</label>
                  <input
                    type="text"
                    value={config.number}
                    maxLength={3}
                    onChange={(e) => update('number', e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="18"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rcb-gold/50 transition-colors"
                />
                </div>
              </div>
            </div>

            <button onClick={() => setConfig(DEFAULT)} className="btn-ghost w-full text-sm">
              <RotateCw size={16} />
              Reset to Default
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ColorPickerProps {
  label: string;
  value: string;
  swatches: string[];
  onChange: (v: string) => void;
}

function ColorPicker({ label, value, swatches, onChange }: ColorPickerProps) {
  return (
    <div>
      <label className="text-xs text-white/50 mb-1.5 block">{label}</label>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer bg-transparent"
        />
        <span className="text-xs font-mono text-white/40 uppercase">{value}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {swatches.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 ${value === s ? 'border-rcb-gold ring-1 ring-rcb-gold' : 'border-white/20'}`}
            style={{ backgroundColor: s }}
            aria-label={s}
          />
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full p-2.5 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
    >
      <span className="text-sm text-white/70">{label}</span>
      <span className={`relative w-10 h-5 rounded-full transition-colors ${enabled ? 'bg-rcb-red' : 'bg-white/10'}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-5' : ''}`} />
      </span>
    </button>
  );
}

interface JerseySVGProps {
  config: JerseyConfig;
  showFront: boolean;
}

const JerseySVG = forwardRef<SVGSVGElement, JerseySVGProps>(({ config, showFront }, ref) => {
  return (
    <svg ref={ref} viewBox="0 0 400 480" className="w-full max-w-xs h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jerseyShade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>
      </defs>

      {showFront ? (
        <FrontJersey config={config} />
      ) : (
        <BackJersey config={config} />
      )}
    </svg>
  );
});

JerseySVG.displayName = 'JerseySVG';

function FrontJersey({ config }: { config: JerseyConfig }) {
  return (
    <g>
      {/* Sleeves */}
      <path d="M 80 130 L 30 175 L 50 215 L 110 185 Z" fill={config.sleeves} stroke={config.accent} strokeWidth="2" />
      <path d="M 320 130 L 370 175 L 350 215 L 290 185 Z" fill={config.sleeves} stroke={config.accent} strokeWidth="2" />

      {/* Body */}
      <path d="M 110 120 L 80 130 L 110 185 L 110 420 L 290 420 L 290 185 L 320 130 L 290 120 L 250 105 L 230 130 L 170 130 L 150 105 Z"
        fill={config.body} stroke={config.accent} strokeWidth="2.5" />
      {/* Shading */}
      <path d="M 110 120 L 80 130 L 110 185 L 110 420 L 290 420 L 290 185 L 320 130 L 290 120 L 250 105 L 230 130 L 170 130 L 150 105 Z"
        fill="url(#jerseyShade)" />

      {/* Collar */}
      <path d="M 170 130 L 200 150 L 230 130 L 220 115 L 200 125 L 180 115 Z" fill={config.collar} stroke={config.accent} strokeWidth="1.5" />

      {/* Accent stripe down center */}
      <rect x="195" y="150" width="10" height="265" fill={config.accent} opacity="0.6" />

      {/* Chest sponsor */}
      {config.showSponsor && (
        <g>
          <rect x="140" y="200" width="120" height="40" rx="4" fill="rgba(0,0,0,0.25)" />
          <text x="200" y="226" textAnchor="middle" fill={config.accent} fontSize="16" fontWeight="800" fontFamily="Sora, sans-serif">RCB</text>
        </g>
      )}

      {/* Sleeve logos */}
      {config.showSleeveLogo && (
        <g>
          <circle cx="65" cy="185" r="8" fill="rgba(0,0,0,0.3)" />
          <text x="65" y="189" textAnchor="middle" fill={config.accent} fontSize="8" fontWeight="700" fontFamily="Sora, sans-serif">RCB</text>
          <circle cx="335" cy="185" r="8" fill="rgba(0,0,0,0.3)" />
          <text x="335" y="189" textAnchor="middle" fill={config.accent} fontSize="8" fontWeight="700" fontFamily="Sora, sans-serif">RCB</text>
        </g>
      )}
    </g>
  );
}

function BackJersey({ config }: { config: JerseyConfig }) {
  return (
    <g>
      {/* Sleeves */}
      <path d="M 80 130 L 30 175 L 50 215 L 110 185 Z" fill={config.sleeves} stroke={config.accent} strokeWidth="2" />
      <path d="M 320 130 L 370 175 L 350 215 L 290 185 Z" fill={config.sleeves} stroke={config.accent} strokeWidth="2" />

      {/* Body */}
      <path d="M 110 120 L 80 130 L 110 185 L 110 420 L 290 420 L 290 185 L 320 130 L 290 120 L 250 105 L 200 105 L 150 105 Z"
        fill={config.body} stroke={config.accent} strokeWidth="2.5" />
      <path d="M 110 120 L 80 130 L 110 185 L 110 420 L 290 420 L 290 185 L 320 130 L 290 120 L 250 105 L 200 105 L 150 105 Z"
        fill="url(#jerseyShade)" />

      {/* Collar (back) */}
      <path d="M 170 105 L 200 125 L 230 105 Z" fill={config.collar} stroke={config.accent} strokeWidth="1.5" />

      {/* Number */}
      <text x="200" y="230" textAnchor="middle" fill={config.accent} fontSize="90" fontWeight="900" fontFamily="Sora, sans-serif" opacity="0.95">
        {config.number || ''}
      </text>

      {/* Name */}
      <text x="200" y="160" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="800" fontFamily="Sora, sans-serif" letterSpacing="2">
        {config.name || ''}
      </text>

      {/* Sleeve logos */}
      {config.showSleeveLogo && (
        <g>
          <circle cx="65" cy="185" r="8" fill="rgba(0,0,0,0.3)" />
          <text x="65" y="189" textAnchor="middle" fill={config.accent} fontSize="8" fontWeight="700" fontFamily="Sora, sans-serif">RCB</text>
          <circle cx="335" cy="185" r="8" fill="rgba(0,0,0,0.3)" />
          <text x="335" y="189" textAnchor="middle" fill={config.accent} fontSize="8" fontWeight="700" fontFamily="Sora, sans-serif">RCB</text>
        </g>
      )}
    </g>
  );
}
