import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FeedCard from "@/components/feed/FeedCard";
import FilterChips from "@/components/feed/FilterChips";
import SkeletonCard from "@/components/common/SkeletonCard";
import { feedService } from "@/services/api";
import { type FeedPost } from "@/mocks/data";
import { useAuth } from "@/contexts/AuthContext";

const filters = ["Following", "Communities", "Trending", "Reviews"];

export default function Index() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("Following");
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, [activeFilter]);

  const loadFeed = async () => {
    setLoading(true);
    const data = await feedService.getFeed(activeFilter.toLowerCase());
    setPosts(data);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
          Welcome back, <span className="text-gradient-primary">{user.displayName}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Here's what's happening in your anime world
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 overflow-x-auto hide-scrollbar"
      >
        {[
          { label: "🔥 Streak", value: `${user.streakDays} days` },
          { label: "👀 Watching", value: user.currentlyWatching },
          { label: "✅ Completed", value: user.completedAnime },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex-shrink-0 glass-card px-4 py-3 min-w-[120px]"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-display font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Filter Chips */}
      <FilterChips filters={filters} active={activeFilter} onChange={setActiveFilter} />

      {/* Feed */}
      <div className="space-y-4">
        {loading ? (
          <SkeletonCard variant="feed" count={4} />
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-display font-semibold text-foreground">No posts yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Follow more people to see their posts here</p>
          </div>
        ) : (
          posts.map((post, i) => (
            <FeedCard key={post.id} post={post} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
