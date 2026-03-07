import React from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakIndicatorProps {
  streak: number;
  active?: boolean;
  className?: string;
}

export function StreakIndicator({ streak, active = true, className }: StreakIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-1.5 font-bold", className)}>
      <Flame 
        className={cn(
          "w-6 h-6", 
          active ? "text-orange-500 fill-orange-500 drop-shadow-md" : "text-muted-foreground fill-transparent"
        )} 
      />
      <span className={cn(active ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground")}>
        {streak}
      </span>
    </div>
  );
}
