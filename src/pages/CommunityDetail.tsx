import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Zap, ArrowLeft, MessageSquare, ThumbsUp, Star, TrendingUp, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonCard from "@/components/common/SkeletonCard";
import { communityService } from "@/services/api";
import { type Community, type DiscussionThread, type User } from "@/mocks/data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const badgeConfig: Record<string, { label: string; icon: typeof TrendingUp; className: string }> = {
  rising: { label: "Rising", icon: TrendingUp, className: "text-success bg-success/10" },
  "reviewer-hub": { label: "Reviewer Hub", icon: Star, className: "text-warning bg-warning/10" },
  elite: { label: "Elite Club", icon: Crown, className: "text-primary bg-primary/10" },
};

export default function CommunityDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const [community, setCommunity] = useState<Community | null>(null);
  const [threads, setThreads] = useState<DiscussionThread[]>([]);
  const [topReviewers, setTopReviewers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (id) loadData(id);
  }, [id]);

  const loadData = async (communityId: string) => {
    setLoading(true);
    const [communityData, threadsData, reviewersData] = await Promise.all([
      communityService.getById(communityId),
      communityService.getThreads(communityId),
      communityService.getTopReviewers(communityId),
    ]);
    setCommunity(communityData || null);
    setThreads(threadsData);
    setTopReviewers(reviewersData);
    setLoading(false);
  };

  const handleJoin = async () => {
    if (!id) return;
    setJoined(true);
    await communityService.join(id);
    toast({ title: "Joined! 🎉", description: `You've joined ${community?.name}` });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
        <div className="animate-pulse glass-card h-48 bg-secondary/60 rounded-xl" />
        <SkeletonCard variant="feed" count={3} />
      </div>
    );
  }

  if (!community) {
    return (
      <div className="max-w-4xl mx-auto p-4 lg:p-6 text-center py-20">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-display font-bold text-foreground">Community not found</h2>
        <Link to="/discover" className="text-sm text-primary hover:underline mt-2 inline-block">
          Back to Discover
        </Link>
      </div>
    );
  }

  const badge = community.badge ? badgeConfig[community.badge] : null;

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
      {/* Back Link */}
      <Link
        to="/discover"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Discover
      </Link>

      {/* Community Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        <div className={cn("h-36 bg-gradient-to-br relative", community.coverGradient)}>
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-4 left-5 text-5xl">{community.icon}</div>
        </div>
        <div className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-display font-bold text-foreground">{community.name}</h1>
                {badge && (
                  <span className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold", badge.className)}>
                    <badge.icon className="w-3 h-3" />
                    {badge.label}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{community.description}</p>
            </div>
            <Button
              variant={joined ? "outline" : "glow"}
              onClick={handleJoin}
              disabled={joined}
              className="flex-shrink-0"
            >
              {joined ? "Joined" : "Join Community"}
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{community.memberCount.toLocaleString()} members</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-success">
              <Zap className="w-4 h-4" />
              <span>{community.activeNow} active now</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Discussion Threads */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-display font-bold text-foreground">Discussion Threads</h2>
          {threads.map((thread, i) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-hover p-4 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <img
                  src={thread.user.avatar}
                  alt={thread.user.displayName}
                  className="w-9 h-9 rounded-full bg-secondary flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{thread.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{thread.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> {thread.replies}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> {thread.likes}
                    </span>
                    <span className="text-xs text-muted-foreground">{thread.createdAt}</span>
                    {thread.animeTag && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
                        {thread.animeTag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top Reviewers */}
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-foreground">Top Reviewers</h2>
          <div className="glass-card p-4 space-y-3">
            {topReviewers.map((reviewer, i) => (
              <Link
                key={reviewer.id}
                to={`/profile/${reviewer.username}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-all"
              >
                <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                <img
                  src={reviewer.avatar}
                  alt={reviewer.displayName}
                  className="w-8 h-8 rounded-full bg-secondary"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{reviewer.displayName}</p>
                  <p className="text-[10px] text-muted-foreground">{reviewer.completedAnime} anime reviewed</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
