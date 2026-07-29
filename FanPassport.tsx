import { forwardRef, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPng } from 'html-to-image';
import {
  Download,
  Twitter,
  Award,
  Sparkles,
  Fingerprint,
  MapPin,
  Calendar,
  User,
} from 'lucide-react';
import { useFan } from './fanStore';
import { PASSPORT_BADGES } from './passport';
import { PLAYERS } from './players';

const RED = '#EC0C16';
const GOLD = '#FFC700';

const tierConfig: Record<string, { color: string; emoji: string }> = {
  Rookie: { color: '#00E5FF', emoji: '🏏' },
  'Super Fan': { color: '#FFC700', emoji: '🔥' },
  'Ultimate 12th Man': { color: RED, emoji: '👑' },
};

export function FanPassport() {
  const { profile, setProfile, fanId, memberSince, bestScores, fanTier } = useFan();
  const cardRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [exporting, setExporting] = useState(false);

  const menPlayers = PLAYERS.filter((p) => p.gender === 'M');
  const womenPlayers = PLAYERS.filter((p) => p.gender === 'W');

  const unlockedBadges = PASSPORT_BADGES.filter((b) => b.unlocked(bestScores));
  const tierInfo = tierConfig[fanTier];

  const displayName = profile.name || 'YOUR NAME';
  const displayPlayer = profile.favoritePlayer || 'Pick a player';
  const displayCity = profile.homeCity || 'Your City';

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#08080A',
      });
      const link = document.createElement('a');
      link.download = `rcb-passport-${fanId}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // ignore export failure
    } finally {
      setExporting(false);
    }
  };

  const handleShareX = () => {
    const text = `Just claimed my official RCB 12th Man Digital Passport on #RCBVerse! Ee Sala Cup Namde! 🔴🖤 ${fanTier} status unlocked!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-gradient-gold-red">
            Digital Fan Passport
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            Your official RCB 12th Man membership card. Customize, download, and share.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Card preview area */}
          <div className="flex flex-col items-center gap-6">
            <TiltCard ref={cardRef}>
              <PassportCard
                displayName={displayName}
                displayPlayer={displayPlayer}
                displayCity={displayCity}
                fanId={fanId}
                memberSince={memberSince}
                fanTier={fanTier}
                tierColor={tierInfo.color}
                tierEmoji={tierInfo.emoji}
                unlockedBadges={unlockedBadges}
              />
            </TiltCard>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <button onClick={handleDownload} disabled={exporting} className="btn-gold flex-1 disabled:opacity-50">
                <Download size={18} />
                {exporting ? 'Exporting...' : 'Download Passport'}
              </button>
              <button onClick={handleShareX} className="btn-ghost flex-1">
                <Twitter size={18} />
                Share on X
              </button>
            </div>

            {/* Mobile drawer toggle */}
            <button
              onClick={() => setDrawerOpen((o) => !o)}
              className="lg:hidden btn-ghost w-full max-w-sm text-sm"
            >
              {drawerOpen ? 'Hide' : 'Edit'} Passport Details
            </button>
          </div>

          {/* Form drawer / sidebar */}
          <AnimatePresence>
            {(drawerOpen || typeof window !== 'undefined') && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`${drawerOpen ? 'block' : 'hidden'} lg:block`}
              >
                <div className="glass-panel-strong p-6 sticky top-20">
                  <div className="flex items-center gap-2 mb-5">
                    <Fingerprint size={18} className="text-rcb-gold" />
                    <h2 className="font-display font-bold text-base text-white">Passport Details</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5">
                        <User size={12} /> Fan Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        maxLength={22}
                        onChange={(e) => setProfile({ name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rcb-gold/50 transition-colors"
                      />
                    </div>

                    {/* Favorite Player */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5">
                        <Sparkles size={12} /> Favorite Player
                      </label>
                      <select
                        value={profile.favoritePlayer}
                        onChange={(e) => setProfile({ favoritePlayer: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rcb-gold/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-rcb-black">Select a player...</option>
                        <optgroup label="Men's Squad" className="bg-rcb-black">
                          {menPlayers.map((p) => (
                            <option key={p.id} value={p.name} className="bg-rcb-black">{p.name}</option>
                          ))}
                        </optgroup>
                        <optgroup label="WPL Squad" className="bg-rcb-black">
                          {womenPlayers.map((p) => (
                            <option key={p.id} value={p.name} className="bg-rcb-black">{p.name}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Home City */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs text-white/50 mb-1.5">
                        <MapPin size={12} /> Home City
                      </label>
                      <input
                        type="text"
                        value={profile.homeCity}
                        maxLength={24}
                        onChange={(e) => setProfile({ homeCity: e.target.value })}
                        placeholder="e.g. Bengaluru"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-rcb-gold/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Tier info */}
                  <div className="mt-6 p-4 rounded-xl" style={{ background: `${tierInfo.color}10`, border: `1px solid ${tierInfo.color}30` }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{tierInfo.emoji}</span>
                      <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: tierInfo.color }}>
                        Current Tier
                      </span>
                    </div>
                    <p className="font-display font-bold text-white text-sm">{fanTier}</p>
                    <p className="text-[11px] text-white/40 mt-1">
                      Play the Quiz Arena to rank up and unlock more badges.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── 3D Tilt Wrapper ───
interface TiltCardProps {
  children: React.ReactNode;
}

const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(({ children }, ref) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setRotate({ x: (py - 0.5) * -12, y: (px - 0.5) * 14 });
    setGlow({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="w-full max-w-[340px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative cursor-pointer"
      >
        {/* Glow follow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
          style={{
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,199,0,0.25), transparent 50%)`,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
});

TiltCard.displayName = 'TiltCard';

// ─── Passport Card Visual ───
interface PassportCardProps {
  displayName: string;
  displayPlayer: string;
  displayCity: string;
  fanId: string;
  memberSince: number;
  fanTier: string;
  tierColor: string;
  tierEmoji: string;
  unlockedBadges: { id: string; name: string; emoji: string; description: string }[];
}

function PassportCard({
  displayName,
  displayPlayer,
  displayCity,
  fanId,
  memberSince,
  fanTier,
  tierColor,
  tierEmoji,
  unlockedBadges,
}: PassportCardProps) {
  return (
    <div
      className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #0E0E12 0%, #08080A 60%, #050506 100%)',
        border: `2px solid ${GOLD}`,
        boxShadow: `0 0 30px rgba(255,199,0,0.15), 0 0 60px rgba(236,12,22,0.1), inset 0 0 40px rgba(255,199,0,0.05)`,
      }}
    >
      {/* Metallic gold watermark */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 18px, #FFC700 18px, #FFC700 20px)',
        }}
      />

      {/* Glass overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.04), transparent 40%)' }} />

      {/* Inner border */}
      <div className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: '1px solid rgba(255,199,0,0.2)' }} />

      {/* Content */}
      <div className="relative h-full flex flex-col p-5">
        {/* Header */}
        <div className="text-center pt-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: RED }}>
              <span className="font-display font-extrabold text-white text-[10px]">RCB</span>
            </div>
          </div>
          <h2 className="font-display font-extrabold text-[11px] text-white leading-tight tracking-wide">
            ROYAL CHALLENGERS BENGALURU
          </h2>
          <p className="text-[9px] uppercase tracking-[0.2em] mt-0.5" style={{ color: GOLD }}>
            Official 12th Man Passport
          </p>
          <div className="mt-2 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />
        </div>

        {/* Fan ID */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <Fingerprint size={12} style={{ color: GOLD }} />
          <span className="font-mono text-xs font-bold tracking-wider" style={{ color: GOLD }}>
            #{fanId}
          </span>
        </div>

        {/* Avatar circle */}
        <div className="flex justify-center mt-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${RED}30, transparent)`,
              border: `2px solid ${GOLD}60`,
              boxShadow: `0 0 20px ${RED}30`,
            }}
          >
            <span className="font-display font-extrabold text-2xl text-white">
              {displayName.charAt(0).toUpperCase() || '?'}
            </span>
          </div>
        </div>

        {/* Fan details */}
        <div className="mt-5 space-y-3">
          <DetailRow icon={<User size={11} />} label="Name" value={displayName} color={GOLD} />
          <DetailRow icon={<Sparkles size={11} />} label="Fav Player" value={displayPlayer} color={GOLD} />
          <DetailRow icon={<MapPin size={11} />} label="Home City" value={displayCity} color={GOLD} />
          <DetailRow icon={<Calendar size={11} />} label="Member Since" value={String(memberSince)} color={GOLD} />
        </div>

        {/* Tier badge */}
        <div className="mt-5">
          <div
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl"
            style={{ background: `${tierColor}15`, border: `1px solid ${tierColor}50` }}
          >
            <span className="text-base">{tierEmoji}</span>
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-white/40">Fan Tier</span>
              <span className="font-display font-extrabold text-xs" style={{ color: tierColor }}>
                {fanTier}
              </span>
            </div>
          </div>
        </div>

        {/* Unlocked badges */}
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Award size={11} style={{ color: GOLD }} />
            <span className="text-[8px] uppercase tracking-wider font-semibold" style={{ color: GOLD }}>
              Unlocked Badges ({unlockedBadges.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {unlockedBadges.length > 0 ? (
              unlockedBadges.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center gap-1 px-2 py-1 rounded-md"
                  style={{ background: 'rgba(255,199,0,0.08)', border: '1px solid rgba(255,199,0,0.2)' }}
                >
                  <span className="text-xs">{b.emoji}</span>
                  <span className="text-[8px] font-semibold text-white/70">{b.name}</span>
                </div>
              ))
            ) : (
              <p className="text-[9px] text-white/30">Play quizzes & explore modules to unlock badges.</p>
            )}
          </div>
        </div>

        {/* Footer barcode */}
        <div className="mt-3 flex items-center justify-center gap-0.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/30"
              style={{ width: `${1 + (i % 3)}px`, height: '10px' }}
            />
          ))}
        </div>
        <p className="text-center text-[7px] text-white/20 mt-1 tracking-widest">PLAY BOLD • STAY BOLD</p>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color }} className="shrink-0">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[8px] uppercase tracking-wider text-white/30 leading-none">{label}</p>
        <p className="text-xs font-semibold text-white truncate mt-0.5">{value}</p>
      </div>
    </div>
  );
}
