import { cn } from "@/lib/utils";

interface FilterChipsProps {
  filters: string[];
  active: string;
  onChange: (filter: string) => void;
}

export default function FilterChips({ filters, active, onChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
            active === filter
              ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
              : "bg-secondary/60 text-secondary-foreground hover:bg-secondary"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
