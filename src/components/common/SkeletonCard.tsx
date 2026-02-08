import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  variant?: "feed" | "anime" | "community" | "watchparty";
  count?: number;
}

function SingleSkeleton({ variant = "feed" }: { variant: string }) {
  if (variant === "anime") {
    return (
      <div className="animate-pulse">
        <div className="aspect-[3/4] rounded-xl bg-secondary/60" />
        <div className="flex gap-1 mt-2">
          <div className="h-4 w-12 rounded bg-secondary/40" />
          <div className="h-4 w-14 rounded bg-secondary/40" />
        </div>
      </div>
    );
  }

  if (variant === "community") {
    return (
      <div className="animate-pulse glass-card overflow-hidden">
        <div className="h-24 bg-secondary/60" />
        <div className="p-4 space-y-2">
          <div className="h-4 w-3/4 rounded bg-secondary/40" />
          <div className="h-3 w-full rounded bg-secondary/30" />
          <div className="h-3 w-1/2 rounded bg-secondary/30" />
        </div>
      </div>
    );
  }

  if (variant === "watchparty") {
    return (
      <div className="animate-pulse glass-card overflow-hidden">
        <div className="h-28 bg-secondary/60" />
        <div className="p-4 space-y-3">
          <div className="h-4 w-2/3 rounded bg-secondary/40" />
          <div className="h-3 w-1/2 rounded bg-secondary/30" />
          <div className="h-8 w-full rounded bg-secondary/30" />
        </div>
      </div>
    );
  }

  // Feed skeleton
  return (
    <div className="animate-pulse glass-card p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-secondary/60" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3 w-24 rounded bg-secondary/40" />
          <div className="h-2.5 w-32 rounded bg-secondary/30" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-secondary/30" />
        <div className="h-3 w-4/5 rounded bg-secondary/30" />
      </div>
      <div className="flex gap-4 pt-2">
        <div className="h-6 w-14 rounded bg-secondary/30" />
        <div className="h-6 w-14 rounded bg-secondary/30" />
        <div className="h-6 w-14 rounded bg-secondary/30" />
      </div>
    </div>
  );
}

export default function SkeletonCard({ variant = "feed", count = 3 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SingleSkeleton key={i} variant={variant} />
      ))}
    </>
  );
}
