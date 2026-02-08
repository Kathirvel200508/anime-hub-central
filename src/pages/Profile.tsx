import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/profile/ProfileHeader";
import BadgeShowcase from "@/components/profile/BadgeShowcase";
import AnimeCard from "@/components/anime/AnimeCard";
import SkeletonCard from "@/components/common/SkeletonCard";
import { profileService, reviewService } from "@/services/api";
import { mockAnime, type User, type Review } from "@/mocks/data";
import { cn } from "@/lib/utils";
import { Star, ThumbsUp } from "lucide-react";

const tabs = ["Overview", "Watched", "Watchlist", "Reviews", "Badges"];

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    if (username) loadProfile(username);
  }, [username]);

  const loadProfile = async (uname: string) => {
    setLoading(true);
    const [userData, reviewsData] = await Promise.all([
      profileService.getProfile(uname),
      reviewService.getReviews(),
    ]);
    setUser(userData || null);
    setReviews(reviewsData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
        <div className="animate-pulse glass-card h-56 bg-secondary/60 rounded-xl" />
        <SkeletonCard variant="feed" count={2} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6 text-center py-20">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-xl font-display font-bold text-foreground">User not found</h2>
      </div>
    );
  }

  // Mock watched/watchlist anime
  const watchedAnime = mockAnime.filter((a) => a.status === "completed").slice(0, 6);
  const watchlistAnime = mockAnime.filter((a) => a.status === "airing").slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
      <ProfileHeader user={user} />

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto hide-scrollbar border-b border-border/50 pb-px">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative",
              activeTab === tab
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="profileTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "Overview" && (
          <div className="space-y-6">
            {/* Currently Watching */}
            <section>
              <h3 className="text-lg font-display font-bold text-foreground mb-3">Currently Watching</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {watchlistAnime.slice(0, 4).map((a, i) => (
                  <AnimeCard key={a.id} anime={a} index={i} />
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h3 className="text-lg font-display font-bold text-foreground mb-3">Recent Reviews</h3>
              <div className="space-y-3">
                {reviews.slice(0, 2).map((review, i) => (
                  <div key={review.id} className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-foreground">{review.anime}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                        <span className="text-sm font-bold text-foreground">{review.rating}/10</span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 line-clamp-3">{review.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{review.helpfulCount} found helpful</span>
                      <span>· {review.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Badge Showcase (preview) */}
            <section>
              <h3 className="text-lg font-display font-bold text-foreground mb-3">Badges</h3>
              <BadgeShowcase badges={user.badges.filter((b) => b.earned).slice(0, 6)} />
            </section>
          </div>
        )}

        {activeTab === "Watched" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {watchedAnime.map((a, i) => (
              <AnimeCard key={a.id} anime={a} index={i} />
            ))}
          </div>
        )}

        {activeTab === "Watchlist" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {watchlistAnime.map((a, i) => (
              <AnimeCard key={a.id} anime={a} index={i} />
            ))}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-lg font-display font-semibold text-foreground">No reviews yet</h3>
                <p className="text-sm text-muted-foreground mt-1">Start reviewing anime to see them here</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="glass-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.user.avatar}
                        alt={review.user.displayName}
                        className="w-8 h-8 rounded-full bg-secondary"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{review.anime}</h4>
                        <p className="text-xs text-muted-foreground">by {review.user.displayName} · {review.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-warning/10">
                      <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                      <span className="text-sm font-bold text-warning">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">{review.content}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{review.helpfulCount} found helpful</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "Badges" && (
          <BadgeShowcase badges={user.badges} />
        )}
      </motion.div>
    </div>
  );
}
