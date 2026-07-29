import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Volume2, VolumeX, Wind, Music, PartyPopper, Megaphone, Radio, X } from 'lucide-react';
import type { ModuleId } from './modules';
import { NAV_MODULES } from './modules';
import { useAudio } from './audioStore';

interface NavbarProps {
  activeTab: ModuleId;
  onTabChange: (tab: ModuleId) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    masterVolume,
    ambientOn,
    fxVolume,
    setMasterVolume,
    setFxVolume,
    toggleAmbient,
    playHorn,
    playChant,
    playAnthem,
  } = useAudio();
  const audioActive = masterVolume > 0 || ambientOn;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-panel-strong rounded-none px-4 sm:px-6 py-3">
        <nav className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center gap-3 group shrink-0"
            aria-label="RCBVerse home"
          >
            <div className="relative">
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center animate-glowPulse"
                   style={{ background: '#EC0C16' }}>
                <span className="font-display font-extrabold text-white text-sm tracking-tight">
                  RCB
                </span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-base text-rcb-white">
                RCB<span className="text-rcb-red">Verse</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                Play Bold
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_MODULES.map((mod) => {
              const active = activeTab === mod.id;
              return (
                <li key={mod.id}>
                  <button
                    onClick={() => onTabChange(mod.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg border border-rcb-red/50"
                        style={{ backgroundColor: 'rgba(236,12,22,0.12)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{mod.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right cluster: audio + champions + mobile nav */}
          <div className="flex items-center gap-2">
            {/* Audio control */}
            <div className="relative flex items-center gap-2">
              {audioActive && <Equalizer />}
              <button
                onClick={() => setDrawerOpen((o) => !o)}
                className="flex items-center justify-center w-9 h-9 rounded-full glass-panel text-white/70 hover:text-white transition-colors"
                aria-label="Toggle audio controls"
              >
                {audioActive ? <Volume2 size={16} className="text-rcb-gold" /> : <VolumeX size={16} />}
              </button>

              <AnimatePresence>
                {drawerOpen && (
                  <AudioDrawer
                    masterVolume={masterVolume}
                    ambientOn={ambientOn}
                    fxVolume={fxVolume}
                    onMasterChange={setMasterVolume}
                    onFxChange={setFxVolume}
                    onToggleAmbient={toggleAmbient}
                    onHorn={playHorn}
                    onChant={playChant}
                    onAnthem={playAnthem}
                    onClose={() => setDrawerOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Trophy accent */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-rcb-gold">
              <Trophy size={14} className="text-rcb-gold" />
              <span className="font-semibold tracking-widest">CHAMPIONS</span>
            </div>

            {/* Mobile select */}
            <div className="lg:hidden">
              <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileNav({
  activeTab,
  onTabChange,
}: {
  activeTab: ModuleId;
  onTabChange: (tab: ModuleId) => void;
}) {
  const active = NAV_MODULES.find((m) => m.id === activeTab) ?? NAV_MODULES[0];
  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel text-sm font-medium text-rcb-white"
        >
          <span className="text-rcb-red">{active.emoji}</span>
          <span>{active.label}</span>
        </motion.div>
      </AnimatePresence>
      <select
        value={activeTab}
        onChange={(e) => onTabChange(e.target.value as ModuleId)}
        className="absolute inset-0 opacity-0 cursor-pointer"
        aria-label="Navigate modules"
      >
        <option value="home">Home</option>
        {NAV_MODULES.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Animated equalizer (shown when audio is active) ───
function Equalizer() {
  return (
    <div className="hidden sm:flex items-end gap-[2px] h-4" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-rcb-gold"
          animate={{ height: ['35%', '100%', '50%', '80%', '35%'] }}
          transition={{
            duration: 0.8 + i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// ─── Audio Drawer ───
interface AudioDrawerProps {
  masterVolume: number;
  ambientOn: boolean;
  fxVolume: number;
  onMasterChange: (v: number) => void;
  onFxChange: (v: number) => void;
  onToggleAmbient: () => void;
  onHorn: () => void;
  onChant: () => void;
  onAnthem: () => void;
  onClose: () => void;
}

function AudioDrawer({
  masterVolume,
  ambientOn,
  fxVolume,
  onMasterChange,
  onFxChange,
  onToggleAmbient,
  onHorn,
  onChant,
  onAnthem,
  onClose,
}: AudioDrawerProps) {
  return (
    <>
      {/* Click-out overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="absolute right-0 top-12 z-50 w-72 glass-panel-strong p-5 shadow-2xl"
        style={{ borderColor: 'rgba(255,199,0,0.15)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio size={16} className="text-rcb-gold" />
            <h3 className="font-display font-bold text-sm text-white">Matchday Audio</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Master volume */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/60 font-medium">Master Volume</span>
            <span className="text-xs font-mono text-rcb-gold">{Math.round(masterVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(masterVolume * 100)}
            onChange={(e) => onMasterChange(Number(e.target.value) / 100)}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-rcb-red"
            style={{ accentColor: '#EC0C16' }}
          />
        </div>

        {/* Ambient toggle */}
        <button
          onClick={onToggleAmbient}
          className="flex items-center justify-between w-full p-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors mb-4"
        >
          <div className="flex items-center gap-2">
            <Wind size={14} className="text-rcb-cyan" />
            <span className="text-sm text-white/80">Stadium Crowd</span>
          </div>
          <span className={`relative w-10 h-5 rounded-full transition-colors ${ambientOn ? 'bg-rcb-red' : 'bg-white/10'}`}>
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${ambientOn ? 'translate-x-5' : ''}`} />
          </span>
        </button>

        {/* FX volume */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/60 font-medium">Sound FX Volume</span>
            <span className="text-xs font-mono text-rcb-gold">{Math.round(fxVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(fxVolume * 100)}
            onChange={(e) => onFxChange(Number(e.target.value) / 100)}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10"
            style={{ accentColor: '#FFD23F' }}
          />
        </div>

        {/* Trigger buttons */}
        <div className="grid grid-cols-3 gap-2">
          <FxButton label="Horn" icon={<Megaphone size={14} />} onClick={onHorn} />
          <FxButton label="R-C-B!" icon={<Volume2 size={14} />} onClick={onChant} />
          <FxButton label="Anthem" icon={<Music size={14} />} onClick={onAnthem} />
        </div>

        <p className="text-[10px] text-white/30 mt-4 text-center">
          Audio starts muted. Move the slider to enter matchday mode.
        </p>
      </motion.div>
    </>
  );
}

function FxButton({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-rcb-gold/30 transition-all"
    >
      <span className="text-rcb-gold">{icon}</span>
      <span className="text-[10px] font-semibold text-white/70">{label}</span>
    </button>
  );
}
