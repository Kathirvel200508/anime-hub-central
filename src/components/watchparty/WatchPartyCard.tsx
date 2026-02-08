import { motion } from "framer-motion";
import { Calendar, Users, Clock, Play, Bell } from "lucide-react";
import { type WatchParty } from "@/mocks/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface WatchPartyCardProps {
  party: WatchParty;
  index?: number;
}

export default function WatchPartyCard({ party, index = 0 }: WatchPartyCardProps) {
  const { toast } = useToast();
  const [joined, setJoined] = useState(false);
  const [reminded, setReminded] = useState(false);

  const startDate = new Date(party.startTime);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const formattedTime = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleJoin = () => {
    setJoined(true);
    toast({ title: "Joined! 🎉", description: `You've joined ${party.title}` });
  };

  const handleRemind = () => {
    setReminded(true);
    toast({ title: "Reminder set! ⏰", description: `We'll remind you before ${party.title}` });
  };

  const spotsLeft = party.maxParticipants - party.participants;
  const fillPercent = (party.participants / party.maxParticipants) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card-hover overflow-hidden"
    >
      {/* Header Gradient */}
      <div className={cn("h-28 bg-gradient-to-br relative", party.coverGradient)}>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <h3 className="text-lg font-display font-bold text-foreground">{party.title}</h3>
          <p className="text-xs text-foreground/70 mt-0.5">
            {party.anime} · {party.episode}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Host & Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={party.hostUser.avatar}
              alt={party.hostUser.displayName}
              className="w-7 h-7 rounded-full bg-secondary"
            />
            <span className="text-xs text-muted-foreground">
              Hosted by <span className="text-foreground font-medium">{party.hostUser.displayName}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{formattedTime} {party.timezone}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>{party.participants}/{party.maxParticipants}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="space-y-1">
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${fillPercent}%` }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={cn(
                "h-full rounded-full",
                fillPercent > 80 ? "bg-destructive" : fillPercent > 50 ? "bg-warning" : "bg-primary"
              )}
            />
          </div>
          <p className="text-[10px] text-muted-foreground">{spotsLeft} spots left</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant={joined ? "outline" : "glow"}
            size="sm"
            className="flex-1 gap-1.5"
            onClick={handleJoin}
            disabled={joined}
          >
            <Play className="w-3.5 h-3.5" />
            {joined ? "Joined" : "Join Room"}
          </Button>
          <Button
            variant="glass"
            size="sm"
            className="gap-1.5"
            onClick={handleRemind}
            disabled={reminded}
          >
            <Bell className={cn("w-3.5 h-3.5", reminded && "fill-current text-warning")} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
