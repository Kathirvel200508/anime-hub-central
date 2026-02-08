import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import AnimeCard from "@/components/anime/AnimeCard";
import CommunityCard from "@/components/community/CommunityCard";
import SkeletonCard from "@/components/common/SkeletonCard";
import { animeService, communityService } from "@/services/api";
import { type Anime, type Community } from "@/mocks/data";
import heroBanner from "@/assets/hero-banner.jpg";

export default function Discover() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [animeData, communityData] = await Promise.all([
      animeService.getAnime(),
      communityService.getCommunities(),
    ]);
    setAnime(animeData);
    setCommunities(communityData);
    setLoading(false);
  };

  const filteredAnime = search
    ? anime.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    : anime;

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Banner */}
      <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden">
        <img
          src={heroBanner}
          alt="Discover anime"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4"
            >
              Discover Your Next <span className="text-gradient-primary">Obsession</span>
            </motion.h1>
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative max-w-lg"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anime, communities..."
                className="w-full pl-11 pr-4 py-3 bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 space-y-10">
        {/* Trending Anime */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-foreground">Trending Anime</h2>
            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
          </div>
          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              <SkeletonCard variant="anime" count={6} />
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {filteredAnime.slice(0, 6).map((a, i) => (
                <AnimeCard key={a.id} anime={a} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* All Anime */}
        <section>
          <h2 className="text-xl font-display font-bold text-foreground mb-4">
            {search ? `Results for "${search}"` : "All Anime"}
          </h2>
          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              <SkeletonCard variant="anime" count={12} />
            </div>
          ) : filteredAnime.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-display font-semibold text-foreground">No anime found</h3>
              <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {filteredAnime.map((a, i) => (
                <AnimeCard key={a.id} anime={a} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Communities */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-foreground">Popular Communities</h2>
            <span className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</span>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <SkeletonCard variant="community" count={4} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {communities.map((c, i) => (
                <CommunityCard key={c.id} community={c} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
