"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users, ClipboardList, TrendingUp, MessageSquare,
  ChevronRight, Brain, AlertTriangle, BookOpen,
  Send, FileText, BarChart2, CheckCircle2, Clock,
  ArrowUpRight, Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserName } from "@/lib/auth";

/* ─── Data ───────────────────────────────────────────────────── */
const STUDENTS = [
  {
    id: "1", name: "Alex Johnson", initials: "AJ", subject: "Machine Learning",
    quizScore: 78, mastery: 72, weakTopics: ["Neural Networks", "Backprop"],
    active: true, lastSeen: "2h ago", totalSessions: 38,
  },
  {
    id: "2", name: "Priya Ramasamy", initials: "PR", subject: "Statistics",
    quizScore: 95, mastery: 91, weakTopics: ["Bayesian Inference"],
    active: true, lastSeen: "Just now", totalSessions: 84,
  },
  {
    id: "3", name: "James Mitchell", initials: "JM", subject: "Calculus",
    quizScore: 55, mastery: 58, weakTopics: ["Integration", "Limits", "Chain Rule"],
    active: false, lastSeen: "3d ago", totalSessions: 12,
  },
  {
    id: "4", name: "Sofia Kim", initials: "SK", subject: "Data Science",
    quizScore: 82, mastery: 79, weakTopics: ["Feature Engineering"],
    active: true, lastSeen: "30m ago", totalSessions: 56,
  },
];

const PENDING_REVIEWS = [
  { student: "Alex Johnson", type: "Quiz Result", topic: "Neural Networks", score: "78%", time: "2h ago" },
  { student: "James Mitchell", type: "Study Plan Request", topic: "Calculus Basics", score: null, time: "1d ago" },
  { student: "Sofia Kim", type: "Quiz Result", topic: "Feature Engineering", score: "82%", time: "3h ago" },
];

const RECENT_FEEDBACK = [
  { student: "Priya Ramasamy", message: "Great progress on Bayesian Statistics!", time: "1d ago" },
  { student: "Alex Johnson", message: "Focus on backpropagation examples", time: "3d ago" },
];

/* ─── Stat component (mentor-specific, no gamification) ──────── */
function MentorStat({ label, value, icon: Icon, iconBg }: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  iconBg: string;
}) {
  return (
    <div className="card-raised p-5 flex items-center gap-4">
      <div className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground leading-none mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function MentorPage() {
  const [selected, setSelected] = useState(STUDENTS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserNameLocal] = useState("Mentor");

  useEffect(() => {
    setUserNameLocal(getUserName());
  }, []);

  const filteredStudents = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Mentor Portal</p>
          <h1 className="text-2xl font-bold text-foreground">Welcome, {userName}</h1>
          <p className="text-sm text-muted-foreground mt-1">You&apos;re mentoring {STUDENTS.length} students</p>
        </div>
        <Button className="gap-2 self-start sm:self-auto">
          <Users className="h-4 w-4" /> Add Student
        </Button>
      </div>

      {/* ── Overview Stats ────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MentorStat label="Students"   value={STUDENTS.length}  icon={Users}          iconBg="bg-pastel-sky text-sky-700 dark:text-sky-300" />
        <MentorStat label="Avg Score"  value="76%"              icon={TrendingUp}     iconBg="bg-pastel-mint text-emerald-700 dark:text-emerald-300" />
        <MentorStat label="To Review"  value={PENDING_REVIEWS.length} icon={ClipboardList} iconBg="bg-pastel-yellow text-yellow-700 dark:text-yellow-300" />
        <MentorStat label="Active Now" value={STUDENTS.filter(s => s.active).length} icon={Brain} iconBg="bg-pastel-lavender text-purple-700 dark:text-purple-300" />
      </div>

      {/* ── Pending Reviews ───────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h2 className="text-sm font-semibold text-foreground">Pending Reviews</h2>
          <span className="ml-auto text-xs text-muted-foreground">{PENDING_REVIEWS.length} items</span>
        </div>
        <div className="card-raised divide-y divide-border">
          {PENDING_REVIEWS.map((review, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                <ClipboardList className="h-[18px] w-[18px] text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{review.student}</p>
                <p className="text-xs text-muted-foreground">{review.type} · {review.topic}{review.score ? ` · ${review.score}` : ""}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{review.time}</span>
              <Button size="sm" variant="outline" className="shrink-0 gap-1.5">
                Review <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

        {/* Student List (3/5 width) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">My Students</h2>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search students..."
              className="input-base pl-9"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            {filteredStudents.map(student => (
              <button
                key={student.id}
                onClick={() => setSelected(student)}
                className={`w-full text-left card-raised p-4 flex items-center gap-4 transition-all duration-200 ${
                  selected.id === student.id
                    ? "ring-2 ring-primary/30 bg-primary/[0.03]"
                    : "hover:bg-muted/40"
                }`}
              >
                {/* Avatar */}
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                  {student.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{student.name}</p>
                    {student.active && (
                      <span className="flex h-2 w-2 rounded-full bg-success" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{student.subject} · Last seen {student.lastSeen}</p>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className={`text-sm font-bold ${student.quizScore >= 70 ? "text-success" : student.quizScore >= 55 ? "text-warning" : "text-danger"}`}>
                    {student.quizScore}%
                  </p>
                  <p className="text-[11px] text-muted-foreground">avg score</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Selected Student Detail (2/5 width) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card-raised p-6 space-y-5">
            {/* Student header */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary">
                {selected.initials}
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">{selected.name}</p>
                <p className="text-xs text-muted-foreground">{selected.subject}</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-muted/60 p-3 text-center">
                <p className="text-lg font-bold text-foreground">{selected.quizScore}%</p>
                <p className="text-[11px] text-muted-foreground">Avg Score</p>
              </div>
              <div className="rounded-xl bg-muted/60 p-3 text-center">
                <p className="text-lg font-bold text-foreground">{selected.mastery}%</p>
                <p className="text-[11px] text-muted-foreground">Mastery</p>
              </div>
              <div className="rounded-xl bg-muted/60 p-3 text-center">
                <p className="text-lg font-bold text-foreground">{selected.totalSessions}</p>
                <p className="text-[11px] text-muted-foreground">Sessions</p>
              </div>
            </div>

            {/* Mastery bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Overall Mastery</p>
                <span className={`chip text-xs font-bold ${selected.mastery >= 80 ? "bg-success/10 text-success" : selected.mastery >= 60 ? "bg-warning/10 text-warning" : "bg-danger/10 text-danger"}`}>
                  {selected.mastery}%
                </span>
              </div>
              <div className="progress-track">
                <motion.div
                  key={selected.id}
                  initial={{ width: 0 }}
                  animate={{ width: `${selected.mastery}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`progress-fill ${selected.mastery >= 80 ? "bg-success" : selected.mastery >= 60 ? "bg-warning" : "bg-danger"}`}
                />
              </div>
            </div>

            {/* Weak topics */}
            {selected.weakTopics.length > 0 && (
              <div className="rounded-xl bg-danger/5 border border-danger/15 p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-danger" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-danger">Weak Areas</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.weakTopics.map(topic => (
                    <span key={topic} className="chip bg-danger/10 text-danger text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button className="flex-1 gap-1.5">
                <MessageSquare className="h-4 w-4" /> Feedback
              </Button>
              <Button variant="outline" className="flex-1 gap-1.5">
                <FileText className="h-4 w-4" /> Study Plan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Feedback ───────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Recent Feedback Sent</h2>
        </div>
        <div className="card-raised divide-y divide-border">
          {RECENT_FEEDBACK.map((fb, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3">
              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Send className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{fb.student}</p>
                <p className="text-xs text-muted-foreground truncate">{fb.message}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{fb.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
