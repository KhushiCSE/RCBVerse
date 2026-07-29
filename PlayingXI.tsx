import { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Crown, Shield, RotateCcw, Users2 } from 'lucide-react';
import type { Player } from './auction';
import type { ROLE_CONFIG } from './auction';
import type { Assignments } from './playingxi';
import type { PITCH_POSITIONS } from './playingxi';
import type { getDefaultSquad, computeXIRatings, getCaptaincyGrade, getRoleWarnings } from './playingxi';
import type { useAudio } from './audioStore';
import type { CricketPitch } from './CricketPitch';
import type { SquadList } from './SquadList';
import type { RatingWidget, WarningsToast } from './RatingWidget';

function emptyAssignments(): Assignments {
  return Object.fromEntries(PITCH_POSITIONS.map((p) => [p.id, null]));
}

export function PlayingXI() {
  const [squad] = useState<Player[]>(() => getDefaultSquad());
  const [assignments, setAssignments] = useState<Assignments>(() => emptyAssignments());
  const [captainId, setCaptainId] = useState<string | null>(null);
  const [wkId, setWkId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const { playFireworks } = useAudio();
  const prevComplete = useRef(false);

  const placedPlayers = useMemo(() => {
    const map = new Map<string, number>();
    Object.entries(assignments).forEach(([posId, player]) => {
      if (player) map.set(player.id, Number(posId));
    });
    return map;
  }, [assignments]);

  const filledCount = placedPlayers.size;
  const usedPlayerIds = useMemo(() => new Set(placedPlayers.keys()), [placedPlayers]);

  const availablePlayers = useMemo(
    () => squad.filter((p) => !usedPlayerIds.has(p.id)),
    [squad, usedPlayerIds],
  );

  function handleDrop(positionId: number, playerId: string) {
    const player = squad.find((p) => p.id === playerId);
    if (!player) return;

    setAssignments((prev) => {
      const next = { ...prev };
      const existingPos = placedPlayers.get(playerId);
      if (existingPos) next[existingPos] = null;
      next[positionId] = player;
      return next;
    });
    setDraggedId(null);
  }

  function handleRemove(positionId: number) {
    const player = assignments[positionId];
    setAssignments((prev) => ({ ...prev, [positionId]: null }));
    if (captainId === player?.id) setCaptainId(null);
    if (wkId === player?.id) setWkId(null);
  }

  function handleQuickPlace(playerId: string) {
    const player = squad.find((p) => p.id === playerId);
    if (!player) return;

    const emptyPos = PITCH_POSITIONS.find((p) => assignments[p.id] === null);
    if (!emptyPos) return;
    handleDrop(emptyPos.id, playerId);
  }

  function handleReset() {
    setAssignments(emptyAssignments());
    setCaptainId(null);
    setWkId(null);
  }

  const ratings = computeXIRatings(assignments);
  const captaincy = getCaptaincyGrade(assignments, captainId);
  const warnings = getRoleWarnings(assignments, captainId, wkId);
  const isComplete = filledCount === 11 && warnings.length === 0;

  // Fireworks + cheer when the XI is locked (transition into complete state)
  useEffect(() => {
    if (isComplete && !prevComplete.current) {
      playFireworks();
    }
    prevComplete.current = isComplete;
  }, [isComplete, playFireworks]);

  const placedPlayerList = useMemo(
    () =>
      Object.entries(assignments)
        .filter(([, p]) => p !== null)
        .map(([posId, p]) => ({ position: Number(posId), player: p as Player })),
    [assignments],
  );

  return (
    <section className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-6 py-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6"
        >
          <div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gradient-gold-red">
              Build Your Playing XI
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Drag players onto the pitch. Assign roles. Get your AI scorecard.
            </p>
          </div>
          <button onClick={handleReset} className="btn-ghost shrink-0">
            <RotateCcw size={18} />
            Reset XI
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Left: pitch + role toggles */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <CricketPitch
                assignments={assignments}
                captainId={captainId}
                wkId={wkId}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onDragStart={setDraggedId}
              />
            </motion.div>

            {/* Role toggles */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="glass-panel p-4"
            >
              <h3 className="font-display font-bold text-sm text-white mb-3">Role Designations</h3>
              {placedPlayerList.length === 0 ? (
                <p className="text-xs text-white/30">Place players on the pitch to assign roles.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto hide-scrollbar">
                  {placedPlayerList.map(({ position, player }) => (
                    <div key={player.id} className="flex items-center gap-3 py-1">
                      <span className="text-xs text-white/30 w-6">#{position}</span>
                      <span className="text-sm text-white/80 flex-1 truncate">{player.name}</span>
                      <span className="text-[10px] text-white/30">{ROLE_CONFIG[player.role].short}</span>
                      <RoleToggle
                        active={captainId === player.id}
                        onClick={() =>
                          setCaptainId(captainId === player.id ? null : player.id)
                        }
                        icon={<Crown size={12} />}
                        label="C"
                        activeColor="#FFD23F"
                      />
                      <RoleToggle
                        active={wkId === player.id}
                        onClick={() => setWkId(wkId === player.id ? null : player.id)}
                        icon={<Shield size={12} />}
                        label="WK"
                        activeColor="#00E5FF"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right: squad list + ratings + warnings */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <SquadList
                availablePlayers={availablePlayers}
                usedPlayerIds={usedPlayerIds}
                onDragStart={setDraggedId}
                onQuickPlace={handleQuickPlace}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <RatingWidget
                ratings={ratings}
                captaincy={captaincy}
                filledCount={filledCount}
              />
            </motion.div>

            <WarningsToast warnings={warnings} />

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-4 text-center"
              >
                <Users2 size={24} className="text-rcb-gold mx-auto mb-2" />
                <p className="text-sm font-semibold text-gradient-gold">
                  XI Complete! Ready to Play Bold.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface RoleToggleProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  activeColor: string;
}

function RoleToggle({ active, onClick, icon, label, activeColor }: RoleToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
        active ? 'text-rcb-black' : 'text-white/40 hover:text-white/70 bg-white/5'
      }`}
      style={active ? { background: activeColor } : undefined}
      aria-pressed={active}
    >
      {icon}
      {label}
    </button>
  );
}
