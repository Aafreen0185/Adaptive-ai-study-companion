"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

export function ChatMessage({ role, content, isTyping }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn("flex gap-3 max-w-[85%]", isUser ? "flex-row-reverse" : "flex-row")}>
        {/* Avatar Placeholder */}
        <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2",
            isUser ? "bg-p-sky border-blue-200" : "bg-p-lavender border-purple-300"
          )}
        >
          {isUser ? "👤" : "🤖"}
        </div>

        {/* Bubble */}
        <div
          className={cn(
            "px-5 py-4 rounded-3xl text-sm leading-relaxed shadow-sm border",
            isUser 
              ? "bg-primary text-primary-foreground rounded-tr-sm border-transparent" 
              : "bg-card text-card-foreground rounded-tl-sm border-border clay"
          )}
        >
          {isTyping ? (
            <div className="flex gap-1 py-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                />
              ))}
            </div>
          ) : (
             <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
