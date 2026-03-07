"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Clock, Users, Plus, Coffee, Focus, CheckCircle2, Settings } from "lucide-react";

const TIMER_MODES = [
  { id: "focus", label: "Focus", duration: 25 * 60, emoji: "🎯", color: "text-primary" },
  { id: "short", label: "Short Break", duration: 5 * 60, emoji: "☕", color: "text-emerald-500" },
  { id: "long", label: "Long Break", duration: 15 * 60, emoji: "🌿", color: "text-sky-500" },
] as const;

type ModeId = typeof TIMER_MODES[number]["id"];

const ACTIVE_ROOMS = [
  { id: "1", title: "ML Cram Session", host: "Priya R.", participants: 4, topic: "Neural Networks", timer: "18:30 remaining" },
  { id: "2", title: "Calculus Group", host: "James M.", participants: 2, topic: "Integration by Parts", timer: "On break" },
];

const SESSION_LOG = [
  { type: "focus", duration: "25 min", topic: "Neural Networks", xp: 50 },
  { type: "focus", duration: "25 min", topic: "Backpropagation", xp: 50 },
  { type: "break", duration: "5 min", topic: "Short Break", xp: 0 },
];

export default function StudySessionPage() {
  const [mode, setMode] = useState<ModeId>("focus");
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [sessions, setSessions] = useState(0);
  const [topic, setTopic] = useState("Machine Learning");
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentMode = TIMER_MODES.find(m => m.id === mode)!;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            setRunning(false);
            setCompleted(true);
            if (mode === "focus") setSessions(s => s + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode]);

  const handleModeSwitch = (modeId: ModeId) => {
    setRunning(false);
    setMode(modeId);
    setTime(TIMER_MODES.find(m => m.id === modeId)!.duration);
    setCompleted(false);
  };

  const reset = () => {
    setRunning(false);
    setTime(currentMode.duration);
    setCompleted(false);
  };

  const total = currentMode.duration;
  const progressPct = ((total - time) / total) * 100;
  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");
  const circumference = 2 * Math.PI * 108;

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Study Session</h1>
          <p className="text-muted-foreground mt-1">Pomodoro-style focus timer 🍅</p>
        </div>
        <div className="bg-card clay px-4 py-2 rounded-2xl flex items-center gap-2 text-sm font-bold">
          🟢 {sessions} sessions today
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-2 bg-muted p-1.5 rounded-2xl">
        {TIMER_MODES.map(m => (
          <button
            key={m.id}
            onClick={() => handleModeSwitch(m.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              mode === m.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m.emoji} {m.label}
          </button>
        ))}
      </div>

      {/* Timer Circle */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <svg width="250" height="250" className="-rotate-90">
            <circle
              cx="125" cy="125" r="108"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="10"
            />
            <motion.circle
              cx="125" cy="125" r="108"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: circumference - (progressPct / 100) * circumference }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-extrabold tabular-nums tracking-tighter">
              {minutes}:{secs}
            </div>
            <div className={`text-sm font-bold mt-1 ${currentMode.color}`}>
              {currentMode.emoji} {currentMode.label}
            </div>
          </div>
        </div>

        {/* Topic */}
        <div className="clay bg-card px-5 py-3 rounded-2xl flex items-center gap-2 border-2 border-border w-full max-w-xs text-center justify-center">
          <Focus className="w-4 h-4 text-primary" />
          <span className="font-bold text-sm">{topic}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={reset} className="h-12 w-12 rounded-2xl border-2">
            <RotateCcw className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => { setRunning(r => !r); setCompleted(false); }}
            className={`h-16 w-40 rounded-2xl text-lg font-bold gap-2 shadow-[0_6px_0_0_rgba(0,0,0,0.15)] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_rgba(0,0,0,0.15)] ${running ? "bg-red-500 hover:bg-red-600" : ""}`}
          >
            {running ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            {running ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-2">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="clay bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 p-6 text-center"
          >
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-extrabold">Session Complete!</h3>
            <p className="text-muted-foreground text-sm mt-1">+50 XP earned · Streak maintained 🔥</p>
            <div className="flex gap-2 justify-center mt-4">
              <Button size="sm" onClick={() => handleModeSwitch("short")} className="gap-1">
                <Coffee className="w-4 h-4" /> Short Break
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleModeSwitch("focus")}>
                Next Focus
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Rooms */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Active Study Rooms</h2>
          <Button size="sm" variant="outline" className="gap-1 rounded-xl"><Plus className="w-3 h-3" /> Create</Button>
        </div>
        <div className="space-y-3">
          {ACTIVE_ROOMS.map(room => (
            <div key={room.id} className="clay bg-card p-4 flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-2xl shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{room.title}</p>
                <p className="text-xs text-muted-foreground">{room.host} · {room.topic}</p>
                <p className="text-xs text-primary font-semibold mt-0.5">{room.timer}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-muted-foreground mb-1">{room.participants} studying</p>
                <Button size="sm" className="rounded-xl text-xs">Join</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Log */}
      <div>
        <h2 className="text-xl font-bold mb-3">Today's Log</h2>
        <div className="space-y-2">
          {SESSION_LOG.map((log, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-2xl ${log.type === "focus" ? "bg-primary/8 border border-primary/20" : "bg-muted"}`}>
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${log.type === "focus" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1">
                <p className="text-sm font-semibold">{log.topic}</p>
                <p className="text-xs text-muted-foreground">{log.duration}</p>
              </div>
              {log.xp > 0 && <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">+{log.xp} XP</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
