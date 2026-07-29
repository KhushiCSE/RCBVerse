import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioProvider } from './audioStore';
import { FanProvider } from './fanStore';
import { ModuleId } from './modules';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { AuctionSimulator } from './AuctionSimulator';
import { PlayingXI } from './PlayingXI';
import { StadiumExplorer } from './StadiumExplorer';
import { Timeline } from './Timeline';
import { LegendsGrid } from './LegendsGrid';
import { JerseyDesigner } from './JerseyDesigner';
import { QuizArena } from './QuizArena';
import { FanPassport } from './FanPassport';
import { ModulePlaceholder } from './ModulePlaceholder';

function App() {
  const [activeTab, setActiveTab] = useState<ModuleId>('home');

  const handleNavigate = (tab: ModuleId) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FanProvider>
      <AudioProvider>
        <div className="min-h-screen">
          <Navbar activeTab={activeTab} onTabChange={handleNavigate} />

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'home' ? (
                <Hero onNavigate={handleNavigate} />
              ) : activeTab === 'auction' ? (
                <AuctionSimulator />
              ) : activeTab === 'playingxi' ? (
                <PlayingXI />
              ) : activeTab === 'stadium' ? (
                <StadiumExplorer />
              ) : activeTab === 'timeline' ? (
                <Timeline />
              ) : activeTab === 'legends' ? (
                <LegendsGrid />
              ) : activeTab === 'jersey' ? (
                <JerseyDesigner />
              ) : activeTab === 'quiz' ? (
                <QuizArena />
              ) : activeTab === 'passport' ? (
                <FanPassport />
              ) : (
                <ModulePlaceholder moduleId={activeTab} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-white/10 mt-8">
          <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50 font-medium">
              RCBVerse — The Ultimate Fan Experience
            </p>
            <p className="text-xs text-rcb-gold/70 uppercase tracking-[0.25em] font-semibold">
              Royal Challengers Bengaluru
            </p>
          </div>
        </footer>
        </div>
      </AudioProvider>
    </FanProvider>
  );
}

export default App;
