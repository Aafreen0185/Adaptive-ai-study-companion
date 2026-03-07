"use client";

import { StatCard } from "@/components/StatCard";
import { ProgressCard } from "@/components/ProgressCard";
import { Trophy, Clock, Brain, Activity, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const SUBJECTS = [
  { name: "Linear Algebra",    progress: 85, color: "bg-primary" },
  { name: "Calculus",          progress: 62, color: "bg-warning" },
  { name: "Machine Learning",  progress: 45, color: "bg-danger" },
  { name: "Statistics",        progress: 91, color: "bg-success" },
  { name: "Probability",       progress: 73, color: "bg-accent" },
];

const WEEK_DATA = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2.8 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 3.5 },
  { day: "Fri", hours: 2.4 },
  { day: "Sat", hours: 0.8 },
  { day: "Sun", hours: 3.2 },
];

const maxHours = Math.max(...WEEK_DATA.map(d => d.hours));

const WEAK_TOPICS = [
  { name: "Neural Networks",    score: 45, delta: "-5%" },
  { name: "Integration",        score: 52, delta: "+3%" },
  { name: "Backpropagation",    score: 58, delta: "+8%" },
];

export default function AnalyticsPage() {
  const totalHours = WEEK_DATA.reduce((s, d) => s + d.hours, 0).toFixed(1);

  return (
    <div className="space-y-8">
      {/* ── Page header ── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Progress</h1>
        <p className="mt-1 text-sm text-muted-foreground">How you&apos;re tracking across all subjects</p>
      </div>

      {/* ── Stat row ── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          title="Total XP"
          value="12,450"
          icon={<Trophy className="h-5 w-5 text-warning" />}
          color="bg-warning/15"
          trend="↑ 340 this week"
          trendUp
        />
        <StatCard
          title="Study Hours"
          value={`${totalHours}h`}
          icon={<Clock className="h-5 w-5 text-primary" />}
          color="bg-primary/15"
          subtext="this week"
        />
        <StatCard
          title="Quizzes"
          value="128"
          icon={<Brain className="h-5 w-5 text-accent" />}
          color="bg-accent/15"
          subtext="total"
        />
        <StatCard
          title="Accuracy"
          value="92%"
          icon={<Activity className="h-5 w-5 text-success" />}
          color="bg-success/15"
          trend="↑ 4% vs last week"
          trendUp
        />
      </div>

      {/* ── Main two-column section ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Subject Mastery */}
        <div className="card-raised p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Subject Mastery</h2>
            <span className="chip bg-primary/10 text-primary">5 subjects</span>
          </div>
          <div className="space-y-3">
            {SUBJECTS.map(s => (
              <ProgressCard
                key={s.name}
                title={s.name}
                progress={s.progress}
                colorClass={s.color}
                className="!card-none bg-transparent !shadow-none !border-0 !p-0"
              />
            ))}
          </div>
        </div>

        {/* Study Time bar chart */}
        <div className="card-raised p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-foreground">Study Time — This Week</h2>
            <span className="text-sm font-bold text-primary">{totalHours}h total</span>
          </div>
          <div className="flex items-end gap-2 h-40">
            {WEEK_DATA.map(({ day, hours }) => {
              const pct = (hours / maxHours) * 100;
              return (
                <div key={day} className="flex flex-1 flex-col items-center gap-2">
                  <motion.div
                    className="w-full rounded-t-lg bg-primary/20 relative overflow-hidden"
                    style={{ height: "100%" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 rounded-t-lg bg-primary"
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ duration: 0.7, delay: 0.05 * WEEK_DATA.findIndex(d => d.day === day), ease: "easeOut" }}
                    />
                  </motion.div>
                  <span className="text-[11px] text-muted-foreground font-medium">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Weak topics ── */}
      <div className="card-raised p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertCircle className="h-4 w-4 text-danger" />
          <h2 className="text-sm font-semibold text-foreground">Areas Needing Attention</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {WEAK_TOPICS.map(({ name, score, delta }) => (
            <div key={name} className="flex items-center justify-between rounded-xl bg-danger/5 border border-danger/15 px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{delta} vs last week</p>
              </div>
              <span className="ml-3 shrink-0 text-sm font-bold text-danger">{score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Learning streak heatmap ── */}
      <div className="card-raised p-6">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Study Consistency — Last 4 Weeks</h2>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-7 gap-1.5 text-center mb-1">
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <span key={i} className="text-[10px] text-muted-foreground font-medium">{d}</span>
            ))}
          </div>
          {[
            [1,0,1,1,0,1,1],
            [1,1,1,1,1,0,1],
            [0,1,1,0,1,1,1],
            [1,1,0,1,1,1,1],
          ].map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1.5">
              {week.map((active, di) => (
                <div
                  key={di}
                  className={`h-8 rounded-lg ${active ? "bg-primary" : "bg-muted"}`}
                  style={{ opacity: active ? 0.3 + di * 0.1 : 1 }}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          🔥 14 days active out of the last 28
        </p>
      </div>
    </div>
  );
}
