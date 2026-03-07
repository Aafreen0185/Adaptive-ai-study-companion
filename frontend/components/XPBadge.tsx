"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface XPBadgeProps {
  xp: number;
  className?: string;
  animate?: boolean;
}

export function XPBadge({ xp, className, animate = false }: XPBadgeProps) {
  return (
    <motion.div
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "flex items-center gap-2 bg-p-yellow text-amber-900 font-bold px-3 py-1.5 rounded-full shadow-sm border-2 border-amber-200/50",
        className
      )}
    >
      <Trophy className="w-5 h-5 text-amber-600 fill-amber-500" />
      <span>{xp} XP</span>
    </motion.div>
  );
}
