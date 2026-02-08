import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import BadgeShowcase from "@/components/profile/BadgeShowcase";
import { useAuth } from "@/contexts/AuthContext";
import { allBadges, type Badge } from "@/mocks/data";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { user, theme, toggleTheme } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [badges, setBadges] = useState<Badge[]>(allBadges);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast({ title: "Error", description: "Display name is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 800));
    toast({ title: "Saved! ✨", description: "Your profile has been updated." });
    setSaving(false);
  };

  const handleToggleBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) =>
        b.id === badgeId ? { ...b, earned: !b.earned } : b
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 lg:p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Customize your profile and preferences</p>
      </motion.div>

      {/* Profile Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 space-y-5"
      >
        <h2 className="text-lg font-display font-bold text-foreground">Profile</h2>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-20 h-20 rounded-2xl bg-secondary"
            />
            <div className="absolute inset-0 rounded-2xl bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-5 h-5 text-foreground" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">@{user.username}</p>
            <p className="text-xs text-muted-foreground">Click avatar to change photo</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-foreground">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              className="bg-secondary/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-foreground">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell the world about your anime taste..."
              rows={3}
              className="bg-secondary/50 border-border/50 resize-none"
            />
          </div>
        </div>

        <Button variant="glow" onClick={handleSave} disabled={saving} className="gap-2">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </motion.section>

      {/* Appearance */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 space-y-4"
      >
        <h2 className="text-lg font-display font-bold text-foreground">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Theme</p>
            <p className="text-xs text-muted-foreground">Toggle between dark and light mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-secondary border border-border/50 transition-colors"
          >
            <motion.div
              className="absolute top-0.5 w-6 h-6 rounded-full bg-primary"
              animate={{ left: theme === "dark" ? "2px" : "calc(100% - 26px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        </div>
      </motion.section>

      {/* Badge Preferences */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 space-y-4"
      >
        <div>
          <h2 className="text-lg font-display font-bold text-foreground">Badge Preferences</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Select which badges to display on your profile
          </p>
        </div>
        <BadgeShowcase badges={badges} editable onToggle={handleToggleBadge} />
      </motion.section>
    </div>
  );
}
