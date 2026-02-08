import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WatchPartyCard from "@/components/watchparty/WatchPartyCard";
import SkeletonCard from "@/components/common/SkeletonCard";
import { watchPartyService } from "@/services/api";
import { type WatchParty } from "@/mocks/data";

export default function WatchPartyPage() {
  const [parties, setParties] = useState<WatchParty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadParties();
  }, []);

  const loadParties = async () => {
    setLoading(true);
    const data = await watchPartyService.getParties();
    setParties(data);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
          Watch <span className="text-gradient-primary">Parties</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Join live watch sessions with fellow anime fans
        </p>
      </motion.div>

      {/* Party Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard variant="watchparty" count={6} />
        </div>
      ) : parties.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🎬</div>
          <h3 className="text-lg font-display font-semibold text-foreground">No watch parties yet</h3>
          <p className="text-sm text-muted-foreground mt-1">Check back later or create your own!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parties.map((party, i) => (
            <WatchPartyCard key={party.id} party={party} index={i} />
          ))}
        </div>
      )}

      {/* Room Preview Placeholder */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-display font-bold text-foreground mb-4">Room Preview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Video Player Placeholder */}
          <div className="lg:col-span-2 aspect-video bg-secondary/40 rounded-xl flex items-center justify-center border border-border/30">
            <div className="text-center">
              <div className="text-4xl mb-2">📺</div>
              <p className="text-sm text-muted-foreground">Synchronized video player</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Timeline syncs with all participants</p>
            </div>
          </div>
          {/* Chat Panel Placeholder */}
          <div className="bg-secondary/20 rounded-xl border border-border/30 p-4 flex flex-col min-h-[200px]">
            <h3 className="text-sm font-semibold text-foreground mb-3">Group Chat</h3>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs text-muted-foreground text-center">
                Chat with everyone in the room while watching together
              </p>
            </div>
            <div className="mt-3 h-9 bg-secondary/40 rounded-lg border border-border/30" />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
