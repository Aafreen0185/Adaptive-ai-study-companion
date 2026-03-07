"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Flame, Zap, Clock, Brain, Target, Lock } from "lucide-react";

const BADGES = [
  {
    id: "1",
    name: "First Step",
    desc: "Complete your first quiz",
    icon: "🎯",
    color: "bg-pastel-yellow",
    earned: true,
    earnedDate: "Mar 1, 2026",
    xp: 50,
  },
  {
    id: "2",
    name: "Week Warrior",
    desc: "Maintain a 7-day streak",
    icon: "🔥",
    color: "bg-pastel-pink",
    earned: true,
    earnedDate: "Mar 4, 2026",
    xp: 100,
  },
  {
    id: "3",
    name: "Quiz Master",
    desc: "Score 100% on a quiz",
    icon: "🏆",
    color: "bg-pastel-lavender",
    earned: true,
    earnedDate: "Mar 5, 2026",
    xp: 200,
  },
  {
    id: "4",
    name: "Speed Reader",
    desc: "Study 3 hours in one day",
    icon: "⚡",
    color: "bg-pastel-sky",
    earned: true,
    earnedDate: "Mar 6, 2026",
    xp: 150,
  },
  {
    id: "5",
    name: "AI Explorer",
    desc: "Ask your first AI question",
    icon: "🤖",
    color: "bg-pastel-mint",
    earned: true,
    earnedDate: "Mar 2, 2026",
    xp: 75,
  },
  {
    id: "6",
    name: "Flashcard Fanatic",
    desc: "Review 50 flashcards",
    icon: "🃏",
    color: "bg-pastel-yellow",
    earned: false,
    progress: 34,
    total: 50,
    xp: 125,
  },
  {
    id: "7",
    name: "Month Master",
    desc: "Maintain a 30-day streak",
    icon: "🌟",
    color: "bg-pastel-pink",
    earned: false,
    progress: 14,
    total: 30,
    xp: 500,
  },
  {
    id: "8",
    name: "Top Student",
    desc: "Reach #1 on leaderboard",
    icon: "👑",
    color: "bg-pastel-lavender",
    earned: false,
    progress: 0,
    total: 1,
    xp: 1000,
  },
  {
    id: "9",
    name: "Mind Mapper",
    desc: "Generate 10 mind maps",
    icon: "🗺️",
    color: "bg-pastel-sky",
    earned: false,
    progress: 3,
    total: 10,
    xp: 150,
  },
];

const LEVELS = [
  { level: 1, name: "Novice", threshold: 0, color: "bg-gray-400" },
  { level: 2, name: "Learner", threshold: 500, color: "bg-blue-400" },
  { level: 3, name: "Scholar", threshold: 1500, color: "bg-purple-500" },
  { level: 4, name: "Expert", threshold: 3000, color: "bg-amber-500" },
  { level: 5, name: "Master", threshold: 6000, color: "bg-red-500" },
  { level: 6, name: "Sage", threshold: 12000, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
];

const XP = 1240;
const CURRENT_LEVEL = LEVELS.findLast(l => XP >= l.threshold) || LEVELS[0];
const NEXT_LEVEL = LEVELS.find(l => l.threshold > XP);
const xpToNext = NEXT_LEVEL ? NEXT_LEVEL.threshold - XP : 0;
const xpProgress = NEXT_LEVEL ? ((XP - CURRENT_LEVEL.threshold) / (NEXT_LEVEL.threshold - CURRENT_LEVEL.threshold)) * 100 : 100;

export default function BadgesPage() {
  const earned = BADGES.filter(b => b.earned);
  const inProgress = BADGES.filter(b => !b.earned);

  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Badges & Level</h1>
        <p className="text-muted-foreground mt-1">Your earned achievements and milestones 🏅</p>
      </div>

      {/* Level Card */}
      <div className="clay bg-gradient-to-br from-primary/15 to-accent/15 border-2 border-primary/25 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Star className="w-8 h-8 text-white fill-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Current Level</p>
            <h2 className="text-2xl font-extrabold">{CURRENT_LEVEL.name}</h2>
            <p className="text-sm text-primary font-bold">{XP.toLocaleString()} XP</p>
          </div>
        </div>

        {NEXT_LEVEL && (
          <>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>Progress to {NEXT_LEVEL.name}</span>
              <span className="text-muted-foreground">{xpToNext} XP to go</span>
            </div>
            <div className="h-3 bg-card/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </>
        )}
      </div>

      {/* Level Roadmap */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" /> Level Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {LEVELS.map((level, i) => {
              const isReached = XP >= level.threshold;
              const isCurrent = CURRENT_LEVEL.level === level.level;
              return (
                <div key={level.level} className="flex items-center shrink-0">
                  <div className={`flex flex-col items-center gap-1`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-extrabold ${
                      isReached ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"
                    } ${isCurrent ? "ring-4 ring-primary/30 scale-110" : ""}`}>
                      {isReached ? "✓" : level.level}
                    </div>
                    <span className={`text-xs font-bold ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>{level.name}</span>
                  </div>
                  {i < LEVELS.length - 1 && (
                    <div className={`w-6 h-1 mx-1 rounded-full ${XP >= LEVELS[i + 1].threshold ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      <div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> Earned Badges ({earned.length})
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {earned.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className="clay bg-card p-4 flex flex-col gap-3 hover:scale-[1.02] transition-transform"
            >
              <div className={`${badge.color} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
                {badge.icon}
              </div>
              <div>
                <p className="font-bold text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-bold">+{badge.xp} XP</span>
                <span className="text-xs text-muted-foreground">{badge.earnedDate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* In Progress */}
      <div>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-muted-foreground" /> In Progress ({inProgress.length})
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {inProgress.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className="clay bg-card/60 p-4 flex flex-col gap-3 opacity-80"
            >
              <div className="relative">
                <div className={`${badge.color} w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm opacity-50 grayscale`}>
                  {badge.icon}
                </div>
                <div className="absolute -top-1 -right-1 bg-card border-2 border-border rounded-full p-0.5">
                  <Lock className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="font-bold text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </div>
              {badge.progress !== undefined && badge.total !== undefined && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-semibold">{badge.progress}/{badge.total}</span>
                    <span className="text-primary font-bold">+{badge.xp} XP</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/50 rounded-full" style={{ width: `${(badge.progress / badge.total) * 100}%` }} />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
