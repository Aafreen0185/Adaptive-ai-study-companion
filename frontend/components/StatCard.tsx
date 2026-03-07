import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  /** Tailwind bg color class for the icon container */
  color?: string;
  className?: string;
  subtext?: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, icon, color, className, subtext, trend, trendUp }: StatCardProps) {
  return (
    <div className={cn("card-raised flex items-center gap-4 p-5 min-w-0", className)}>
      {icon && (
        <div className={cn(
          "shrink-0 flex h-11 w-11 items-center justify-center rounded-xl",
          color || "bg-muted"
        )}>
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate">{title}</p>
        <div className="flex items-baseline gap-2 mt-0.5 flex-wrap">
          <span className="text-2xl font-bold tracking-tight text-foreground leading-none">{value}</span>
          {subtext && <span className="text-sm text-muted-foreground">{subtext}</span>}
        </div>
        {trend && (
          <p className={cn("text-xs font-medium mt-1", trendUp ? "text-success" : "text-danger")}>
            {trendUp ? "↑" : "↓"} {trend}
          </p>
        )}
      </div>
    </div>
  );
}
