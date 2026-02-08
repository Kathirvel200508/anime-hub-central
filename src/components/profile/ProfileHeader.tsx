import { motion } from "framer-motion";
import { Clock, Eye, CheckCircle2, BookOpen, Flame, UserPlus, UserMinus } from "lucide-react";
import { type User } from "@/mocks/data";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { user: currentUser } = useAuth();
  const isOwnProfile = currentUser.id === user.id;
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following!",
      description: isFollowing ? `You unfollowed ${user.displayName}` : `You're now following ${user.displayName}`,
    });
  };

  const stats = [
    { label: "Hours", value: user.hoursWatched.toLocaleString(), icon: Clock, color: "text-primary" },
    { label: "Completed", value: user.completedAnime, icon: CheckCircle2, color: "text-success" },
    { label: "Watching", value: user.currentlyWatching, icon: Eye, color: "text-warning" },
    { label: "Watchlist", value: user.watchlistCount, icon: BookOpen, color: "text-accent" },
    { label: "Streak", value: `${user.streakDays}d`, icon: Flame, color: "text-destructive" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-24 h-24 rounded-2xl bg-secondary ring-4 ring-primary/20"
          />
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success border-4 border-card" />
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-display font-bold text-foreground">{user.displayName}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">@{user.username}</p>
          <p className="text-sm text-foreground/80 mt-2 max-w-md">{user.bio}</p>
          <div className="flex items-center gap-4 mt-3 justify-center sm:justify-start">
            <span className="text-sm">
              <strong className="text-foreground">{user.followers.toLocaleString()}</strong>{" "}
              <span className="text-muted-foreground">followers</span>
            </span>
            <span className="text-sm">
              <strong className="text-foreground">{user.following.toLocaleString()}</strong>{" "}
              <span className="text-muted-foreground">following</span>
            </span>
          </div>
        </div>
        {!isOwnProfile && (
          <Button
            variant={isFollowing ? "outline" : "glow"}
            onClick={handleFollow}
            className="gap-2"
          >
            {isFollowing ? <UserMinus className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-5 gap-2 mt-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center p-3 rounded-xl bg-secondary/30 border border-border/30"
          >
            <stat.icon className={`w-4 h-4 mb-1 ${stat.color}`} />
            <span className="text-lg font-display font-bold text-foreground">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
