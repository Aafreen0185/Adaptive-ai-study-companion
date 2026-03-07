"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Paperclip, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { id: number; role: "assistant" | "user"; content: string };

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hi Alex! I'm your AI Study Tutor. Ask me anything about your uploaded materials or any topic you're studying.",
  },
];

const SUGGESTIONS = [
  "Explain backpropagation simply",
  "What is the chain rule?",
  "Summarise Chapter 3",
  "Quiz me on linear algebra",
];

function ChatBubble({ role, content, isTyping }: { role: "assistant" | "user"; content: string; isTyping?: boolean }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3 max-w-2xl", isUser && "ml-auto flex-row-reverse")}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="shrink-0 h-8 w-8 rounded-xl bg-primary/15 flex items-center justify-center mt-1">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      )}
      {/* Bubble */}
      <div className={cn(
        "rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[85%]",
        isUser
          ? "bg-primary text-primary-foreground rounded-tr-sm"
          : "bg-card border border-border rounded-tl-sm"
      )}>
        {isTyping ? (
          <div className="flex items-center gap-1.5 py-1">
            {[0, 0.2, 0.4].map(delay => (
              <motion.div
                key={delay}
                className="h-2 w-2 rounded-full bg-muted-foreground"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                transition={{ duration: 1, delay, repeat: Infinity }}
              />
            ))}
          </div>
        ) : content}
      </div>
    </motion.div>
  );
}

export default function StudyAssistantPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: "assistant",
        content: "Great question! Backpropagation computes the gradient of the loss function with respect to each weight using the chain rule, propagating errors backwards through the network layer by layer. Would you like a worked example?",
      }]);
    }, 1800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Page header */}
      <div className="flex items-center justify-between pb-4 border-b border-border mb-4 shrink-0">
        <div>
          <h1 className="text-lg font-bold text-foreground">AI Study Assistant</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Online · Powered by uploaded materials
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Paperclip className="h-3.5 w-3.5" /> Attach file
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        <AnimatePresence initial={false}>
          {messages.map(m => <ChatBubble key={m.id} {...m} />)}
          {isTyping && <ChatBubble role="assistant" content="" isTyping />}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      {messages.length === 1 && !isTyping && (
        <div className="flex flex-wrap gap-2 py-3 shrink-0">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="chip bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="pt-3 border-t border-border shrink-0 flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask anything about your study material…"
            className="input-base pr-12"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <Mic className="h-4 w-4" />
          </button>
        </div>
        <Button
          onClick={() => handleSend()}
          disabled={!input.trim() || isTyping}
          size="icon"
          className="h-10 w-10 shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
