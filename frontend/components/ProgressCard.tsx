"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressCardProps {
  title: string;
  progress: number; // 0–100
  total?: number;
  current?: number;
  colorClass?: string;
  className?: string;
}

export function ProgressCard({
  title,
  progress,
  total,
  current,
  colorClass = "bg-primary",
  className,
}: ProgressCardProps) {
  return (
    <div className={cn("card-raised p-5", className)}>
      <div className="flex items-center justify-between mb-3 gap-4 min-w-0">
        <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>
        <div className="flex items-center gap-2 shrink-0">
          {total !== undefined && current !== undefined && (
            <span className="text-xs text-muted-foreground font-medium">
              {current}/{total}
            </span>
          )}
          <span className={cn(
            "text-xs font-bold px-2 py-0.5 rounded-full",
            progress >= 80 ? "bg-success/15 text-success"
              : progress >= 50 ? "bg-warning/15 text-warning"
              : "bg-danger/10 text-danger"
          )}>
            {progress}%
          </span>
        </div>
      </div>
      <div className="progress-track">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className={cn("progress-fill", colorClass)}
        />
      </div>
    </div>
  );
}
