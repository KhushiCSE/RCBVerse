import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ListFilter, Users2, Search } from 'lucide-react';
import type { Player, PurchasedPlayer, SquadRatings } from './auction';
import type { MAX_SQUAD, MAX_OVERSEAS } from './auction';
import type { PLAYERS } from './players';
import type { computeRatings } from './auction';
import type { BudgetBar } from './BudgetBar';
import type { PlayerCard } from './PlayerCard';
import type { SquadDrawer } from './SquadDrawer';
import type { AIRatingModal } from './AIRatingModal';
import { useAudio } from './audioStore';

type Filter = 'all' | 'M' | 'W' | 'BAT' | 'BOWL' | 'AR' | 'WK';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'M', label: "Men's" },
  { id: 'W', label: "Women's" },
  { id: 'BAT', label: 'Batters' },
  { id: 'BOWL', label: 'Bowlers' },
  { id: 'AR', label: 'All-Rounders' },
  { id: 'WK', label: 'Keepers' },
];

export function AuctionSimulator() {
  const [squad, setSquad] = useState<PurchasedPlayer[]>([]);
  const [bids, setBids] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const { playFireworks } = useAudio();

  const getBid = (p: Player) => bids[p.id] ?? p.basePrice;

  const purse = 100 - squad.reduce((s, p) => s + p.price, 0);
  const overseasCount = squad.filter((p) => p.player.nationality === 'Overseas').length;
  const indianCount = squad.filter((p) => p.player.nationality === 'Indian').length;
  const squadFull = squad.length >= MAX_SQUAD;
  const overseasFull = overseasCount >= MAX_OVERSEAS;
  const canAnalyze = squad.length >= 11;

  const purchasedIds = useMemo(() => new Set(squad.map((p) => p.player.id)), [squad]);

  const filteredPlayers = useMemo(() => {
    return PLAYERS.filter((p) => {
      if (filter === 'all') return true;
      if (['M', 'W'].includes(filter)) return p.gender === filter;
      return p.role === filter;
    }).filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [filter, search]);

  function handleBid(playerId: string, amount: number) {
    setBids((prev) => {
      const current = prev[playerId] ?? PLAYERS.find((p) => p.id === playerId)?.basePrice ?? 0;
      return { ...prev, [playerId]: current + amount };
    });
  }

  function handleBuy(player: Player) {
    const price = getBid(player);
    if (squad.length >= MAX_SQUAD) return;
    if (purse < price) return;
    if (player.nationality === 'Overseas' && overseasCount >= MAX_OVERSEAS) return;

    setSquad((prev) => [...prev, { player, price }]);
    setBids((prev) => {
      const next = { ...prev };
      delete next[player.id];
      return next;
    });
    playFireworks();
  }

  function handleRelease(playerId: string) {
    setSquad((prev) => prev.filter((p) => p.player.id !== playerId));
    setBids((prev) => {
      const next = { ...prev };
      delete next[playerId];
      return next;
    });
  }

  const ratings: SquadRatings | null = squad.length >= 11 ? computeRatings(squad) : null;

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
              Mega Auction Simulator
            </h1>
            <p className="text-white/50 text-sm mt-1">
              Build your dream RCB squad. Budget smart, bid bold.
            </p>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="btn-ghost shrink-0"
          >
            <Users2 size={18} />
            My Squad ({squad.length})
          </button>
        </motion.div>

        {/* Budget bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6"
        >
          <BudgetBar
            purse={purse}
            squadCount={squad.length}
            overseasCount={overseasCount}
            indianCount={indianCount}
          />
        </motion.div>

        {/* Filters + search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 flex-1">
            <ListFilter size={16} className="text-white/40 shrink-0" />
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  filter === f.id
                    ? 'bg-rcb-red text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative sm:w-56 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search players..."
              className="w-full pl-9 pr-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-rcb-red/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Warning banners */}
        {squadFull && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-rcb-gold/10 border border-rcb-gold/30 text-sm text-rcb-gold/90">
            Squad is full ({MAX_SQUAD} players). Release a player to bid on more.
          </div>
        )}
        {overseasFull && !squadFull && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60">
            Overseas slots full ({MAX_OVERSEAS}). Only Indian players can be added now.
          </div>
        )}

        {/* Player grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
            {filteredPlayers.map((player, i) => {
              const currentBid = getBid(player);
              const isPurchased = purchasedIds.has(player.id);
              const wouldExceedOverseas = player.nationality === 'Overseas' && overseasFull && !isPurchased;
              const canAfford = purse >= currentBid && !wouldExceedOverseas;

              return (
                <PlayerCard
                  key={player.id}
                  player={player}
                  currentBid={currentBid}
                  isPurchased={isPurchased}
                  canAfford={canAfford}
                  squadFull={squadFull}
                  onBid={(amt) => handleBid(player.id, amt)}
                  onBuy={() => handleBuy(player)}
                  index={i}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-white/30 text-sm">
            No players match your search.
          </div>
        )}
      </div>

      <SquadDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        squad={squad}
        purse={purse}
        onRelease={handleRelease}
        onAnalyze={() => {
          setDrawerOpen(false);
          setAiOpen(true);
        }}
        canAnalyze={canAnalyze}
      />

      <AIRatingModal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        ratings={ratings}
        squadSize={squad.length}
      />
    </section>
  );
}
