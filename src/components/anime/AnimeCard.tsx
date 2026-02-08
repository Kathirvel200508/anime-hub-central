import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import { type Anime } from "@/mocks/data";
import { cn } from "@/lib/utils";

interface AnimeCardProps {
  anime: Anime;
  index?: number;
  variant?: "default" | "compact";
}

export default function AnimeCard({ anime, index = 0, variant = "default" }: AnimeCardProps) {
  const statusColor = {
    airing: "bg-success text-success",
    completed: "bg-primary text-primary",
    upcoming: "bg-warning text-warning",
  };

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className="flex items-center gap-3 p-3 glass-card-hover cursor-pointer"
      >
        <div className={cn("w-12 h-16 rounded-lg bg-gradient-to-br flex-shrink-0", anime.coverImage)} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">{anime.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-3 h-3 text-warning fill-warning" />
            <span className="text-xs text-muted-foreground">{anime.rating}</span>
            <span className="text-xs text-muted-foreground">· {anime.episodes} eps</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl">
        {/* Cover */}
        <div className={cn(
          "aspect-[3/4] bg-gradient-to-br flex items-end p-3 relative",
          anime.coverImage
        )}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-2 right-2 z-10">
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-background/40 backdrop-blur-sm",
              anime.status === "airing" ? "text-success" : anime.status === "upcoming" ? "text-warning" : "text-primary"
            )}>
              {anime.status}
            </span>
          </div>

          {/* Hover Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
            </div>
          </div>

          {/* Info */}
          <div className="relative z-10 w-full">
            <h3 className="text-sm font-bold text-foreground line-clamp-2">{anime.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-3 h-3 text-warning fill-warning" />
              <span className="text-xs font-medium text-foreground/80">{anime.rating}</span>
              <span className="text-xs text-foreground/60">· {anime.episodes} eps</span>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Tags */}
      <div className="flex gap-1 mt-2 flex-wrap">
        {anime.genre.slice(0, 2).map((g) => (
          <span key={g} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary/60 text-muted-foreground">
            {g}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
