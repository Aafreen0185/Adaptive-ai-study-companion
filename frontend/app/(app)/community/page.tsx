"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Flame, Target, Plus, MessageCircle } from "lucide-react";

const LEADERBOARD = [
  { rank: 1, name: "Priya R.", xp: 14820, streak: 42, avatar: "🧑‍💻", isYou: false },
  { rank: 2, name: "James M.", xp: 12950, streak: 31, avatar: "👩‍⚕️", isYou: false },
  { rank: 3, name: "Alex (You)", xp: 11240, streak: 14, avatar: "😎", isYou: true },
  { rank: 4, name: "Sofia K.", xp: 9830, streak: 28, avatar: "🧑‍🔬", isYou: false },
  { rank: 5, name: "Marcus T.", xp: 8610, streak: 7, avatar: "👨‍🎓", isYou: false },
  { rank: 6, name: "Aisha L.", xp: 7490, streak: 19, avatar: "👩‍💼", isYou: false },
];

const SESSIONS = [
  {
    id: "1",
    title: "Machine Learning Cram Session",
    host: "Priya R.",
    participants: 4,
    maxParticipants: 8,
    topic: "Neural Networks",
    startsin: "Starting in 10 min",
    color: "bg-pastel-lavender",
  },
  {
    id: "2",
    title: "Calculus Study Group",
    host: "James M.",
    participants: 2,
    maxParticipants: 5,
    topic: "Integration",
    startsin: "Live now",
    color: "bg-pastel-mint",
    live: true,
  },
  {
    id: "3",
    title: "Linear Algebra Bootcamp",
    host: "Sofia K.",
    participants: 6,
    maxParticipants: 10,
    topic: "Eigenvalues",
    startsin: "Tomorrow 7 PM",
    color: "bg-pastel-sky",
  },
];

const GOALS = [
  { name: "Complete 10 Quizzes", progress: 7, total: 10, color: "bg-primary", emoji: "🏆" },
  { name: "Study 5 hours this week", progress: 3.5, total: 5, color: "bg-accent", emoji: "⏱️" },
  { name: "30-Day Streak", progress: 14, total: 30, color: "bg-yellow-400", emoji: "🔥" },
];

type Tab = "leaderboard" | "sessions" | "goals";

export default function CommunityPage() {
  const [tab, setTab] = useState<Tab>("leaderboard");

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex flex-col gap-6 py-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Community</h1>
        <p className="text-muted-foreground mt-1">Study with friends, climb the leaderboard! 🚀</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-muted p-1.5 rounded-2xl">
        {(["leaderboard", "sessions", "goals"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
              tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "leaderboard" ? "🏆 Board" : t === "sessions" ? "👥 Rooms" : "🎯 Goals"}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {tab === "leaderboard" && (
        <div className="flex flex-col gap-3">
          {/* Top 3 Hero Cards */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            {LEADERBOARD.slice(0, 3).map((user, i) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`clay p-4 text-center flex flex-col items-center gap-1 ${
                  user.isYou ? "bg-primary/10 border-2 border-primary/30" : "bg-card"
                } ${i === 0 ? "pb-6 -mb-4" : ""}`}
              >
                <div className="text-2xl">{medals[i]}</div>
                <div className="text-2xl">{user.avatar}</div>
                <div className={`text-xs font-bold ${user.isYou ? "text-primary" : ""}`}>{user.name.split(" ")[0]}</div>
                <div className="text-xs text-muted-foreground">{(user.xp / 1000).toFixed(1)}K XP</div>
              </motion.div>
            ))}
          </div>

          {/* Full List */}
          {LEADERBOARD.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`clay flex items-center gap-3 p-4 ${
                user.isYou
                  ? "bg-primary/8 border-2 border-primary/25"
                  : "bg-card"
              }`}
            >
              <div className="w-8 text-center font-extrabold text-muted-foreground text-sm">
                {i < 3 ? medals[i] : `#${user.rank}`}
              </div>
              <div className="text-2xl">{user.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm ${user.isYou ? "text-primary" : ""}`}>{user.name}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" />{user.streak}d</span>
                  <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-400" />{user.xp.toLocaleString()} XP</span>
                </div>
              </div>
              {!user.isYou && (
                <Button size="sm" variant="outline" className="shrink-0 rounded-xl text-xs gap-1">
                  <MessageCircle className="w-3 h-3" /> Chat
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Study Sessions */}
      {tab === "sessions" && (
        <div className="flex flex-col gap-4">
          <Button className="gap-2 h-12 rounded-2xl w-full">
            <Plus className="w-4 h-4" /> Create Study Room
          </Button>
          {SESSIONS.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="clay bg-card p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {session.live && (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> LIVE
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground font-semibold">{session.startsin}</span>
                  </div>
                  <h3 className="font-bold text-base">{session.title}</h3>
                  <p className="text-sm text-muted-foreground">Hosted by {session.host} · {session.topic}</p>
                </div>
                <div className={`${session.color} p-2 rounded-xl`}>
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 w-24 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold">
                    {session.participants}/{session.maxParticipants} joined
                  </span>
                </div>
                <Button size="sm" className="rounded-xl gap-1">
                  Join <Plus className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Shared Goals */}
      {tab === "goals" && (
        <div className="flex flex-col gap-4">
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Your Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {GOALS.map(({ name, progress, total, color, emoji }) => (
                <div key={name}>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="flex items-center gap-2">{emoji} {name}</span>
                    <span className="text-muted-foreground">{progress}/{total}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(progress / total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Challenge a Friend 🆚</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {LEADERBOARD.filter(u => !u.isYou).slice(0, 3).map(user => (
                <div key={user.name} className="flex items-center gap-3 p-3 bg-muted/50 rounded-2xl">
                  <span className="text-xl">{user.avatar}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</p>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-xl text-xs">
                    Challenge
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
