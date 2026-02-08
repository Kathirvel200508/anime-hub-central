import { motion } from "framer-motion";
import { type Badge } from "@/mocks/data";
import { cn } from "@/lib/utils";

interface BadgeShowcaseProps {
  badges: Badge[];
  editable?: boolean;
  onToggle?: (badgeId: string) => void;
}

const typeColors: Record<string, string> = {
  engagement: "border-primary/30 bg-primary/5",
  consistency: "border-warning/30 bg-warning/5",
  reviewer: "border-accent/30 bg-accent/5",
  taste: "border-success/30 bg-success/5",
  community: "border-secondary bg-secondary/30",
};

export default function BadgeShowcase({ badges, editable = false, onToggle }: BadgeShowcaseProps) {
  return (
    <div className="space-y-4">
      {["engagement", "consistency", "reviewer", "taste", "community"].map((type) => {
        const typeBadges = badges.filter((b) => b.type === type);
        if (typeBadges.length === 0) return null;

        return (
          <div key={type}>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
              {type} Badges
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {typeBadges.map((badge, i) => (
                <motion.button
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => editable && onToggle?.(badge.id)}
                  disabled={!editable}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all duration-200",
                    badge.earned ? typeColors[badge.type] : "border-border/30 bg-secondary/10 opacity-40",
                    editable && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
                    !editable && "cursor-default"
                  )}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{badge.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{badge.description}</p>
                  </div>
                  {editable && badge.earned && (
                    <div className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
