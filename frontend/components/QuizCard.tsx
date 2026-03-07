"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface QuizOptionProps {
  option: string;
  selected: boolean;
  status: "idle" | "correct" | "incorrect";
  onClick: () => void;
  disabled?: boolean;
}

export function QuizOption({ option, selected, status, onClick, disabled }: QuizOptionProps) {
  let stateClass = "bg-card border-border hover:bg-muted text-card-foreground";
  
  if (selected) {
    if (status === "idle") {
      stateClass = "bg-primary/10 border-primary text-primary shadow-[0_4px_0_0_hsl(var(--primary)/0.3)]";
    } else if (status === "correct") {
      stateClass = "bg-green-100 border-green-500 text-green-700 shadow-[0_4px_0_0_rgba(34,197,94,0.3)] dark:bg-green-900/30 dark:text-green-400";
    } else if (status === "incorrect") {
      stateClass = "bg-red-100 border-red-500 text-red-700 shadow-[0_4px_0_0_rgba(239,68,68,0.3)] dark:bg-red-900/30 dark:text-red-400";
    }
  } else if (status !== "idle") {
     stateClass = "bg-card border-border opacity-50"; 
  }

  return (
    <motion.button
      whileTap={!disabled ? { y: 4, boxShadow: "none" } : undefined}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={cn(
        "relative w-full text-left p-5 rounded-2xl border-2 font-semibold text-lg transition-all",
        "shadow-[0_4px_0_0_rgba(0,0,0,0.05)]",
        stateClass
      )}
    >
      <div className="flex justify-between items-center">
        <span>{option}</span>
        {selected && status === "correct" && <Check className="w-6 h-6 text-green-600 dark:text-green-400" />}
        {selected && status === "incorrect" && <X className="w-6 h-6 text-red-600 dark:text-red-400" />}
      </div>
    </motion.button>
  );
}
