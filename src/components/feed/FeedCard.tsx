import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, AlertTriangle, MoreHorizontal } from "lucide-react";
import { type FeedPost } from "@/mocks/data";
import { feedService } from "@/services/api";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FeedCardProps {
  post: FeedPost;
  index?: number;
}

export default function FeedCard({ post, index = 0 }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikes((l) => (isLiked ? l - 1 : l + 1));
    try {
      await feedService.toggleLike(post.id);
    } catch {
      setIsLiked(isLiked);
      setLikes(post.likes);
    }
  };

  const handleShare = () => {
    toast({ title: "Shared!", description: "Post link copied to clipboard." });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-card-hover p-4 sm:p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.user.avatar}
            alt={post.user.displayName}
            className="w-10 h-10 rounded-full bg-secondary ring-2 ring-border/50"
          />
          <div>
            <h3 className="text-sm font-semibold text-foreground">{post.user.displayName}</h3>
            <p className="text-xs text-muted-foreground">@{post.user.username} · {post.createdAt}</p>
          </div>
        </div>
        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Anime Tag */}
      {post.animeTag && (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium mb-3">
          🎬 {post.animeTag}
        </span>
      )}

      {/* Content / Spoiler */}
      {post.isSpoiler && !spoilerRevealed ? (
        <div
          onClick={() => setSpoilerRevealed(true)}
          className="relative rounded-xl bg-secondary/50 p-6 mb-3 cursor-pointer group border border-warning/20"
        >
          <div className="flex items-center justify-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-semibold">Spoilers Ahead</span>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-1">Tap to reveal</p>
        </div>
      ) : (
        <p className="text-sm text-foreground/90 leading-relaxed mb-3">{post.content}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-2 border-t border-border/30">
        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all",
            isLiked
              ? "text-accent bg-accent/10"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
          )}
        >
          <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          <span className="text-xs font-medium">{likes}</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-medium">{post.comments}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-xs font-medium">{post.shares}</span>
        </button>
      </div>
    </motion.article>
  );
}
