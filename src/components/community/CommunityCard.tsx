import { motion } from "framer-motion";
import { Users, TrendingUp, Star, Award, Zap, Crown } from "lucide-react";
import { type Community } from "@/mocks/data";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CommunityCardProps {
  community: Community;
  index?: number;
}

const badgeConfig = {
  rising: { label: "Rising", icon: TrendingUp, className: "text-success bg-success/10" },
  "reviewer-hub": { label: "Reviewer Hub", icon: Star, className: "text-warning bg-warning/10" },
  elite: { label: "Elite Club", icon: Crown, className: "text-primary bg-primary/10" },
};

export default function CommunityCard({ community, index = 0 }: CommunityCardProps) {
  const badge = community.badge ? badgeConfig[community.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link to={`/community/${community.id}`} className="block glass-card-hover overflow-hidden group">
        {/* Cover Gradient */}
        <div className={cn("h-24 bg-gradient-to-br relative", community.coverGradient)}>
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-3 left-4 text-3xl">{community.icon}</div>
          {badge && (
            <div className={cn(
              "absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
              badge.className
            )}>
              <badge.icon className="w-3 h-3" />
              {badge.label}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
            {community.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{community.description}</p>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{(community.memberCount / 1000).toFixed(1)}k</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-success">
              <Zap className="w-3.5 h-3.5" />
              <span>{community.activeNow} active</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
