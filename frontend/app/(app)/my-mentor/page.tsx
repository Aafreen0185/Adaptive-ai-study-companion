"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, MessageSquare, Star, CheckCircle2,
  Clock, FileText, BarChart2, ChevronRight, Send,
  AlertTriangle, TrendingUp, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Mock data ──────────────────────────────────────────────── */
const MENTOR = {
  name: "Dr. Sarah Morgan",
  initials: "SM",
  subject: "Machine Learning & Data Science",
  rating: 4.9,
  totalStudents: 12,
  responseTime: "~2 hours",
};

const FEEDBACK_FROM_MENTOR = [
  {
    id: 1,
    date: "Mar 5, 2026",
    topic: "Neural Networks Assignment",
    grade: "B+",
    gradeColor: "text-primary",
    message: "Good understanding of forward pass. Need to focus more on backpropagation derivations. Review Chapter 6.3 for the chain rule application in multi-layer networks.",
    suggestions: ["Practice backpropagation by hand", "Complete exercise set 6.3–6.5", "Watch the 3Blue1Brown gradient descent video"],
  },
  {
    id: 2,
    date: "Feb 28, 2026",
    topic: "Linear Algebra Quiz",
    grade: "A-",
    gradeColor: "text-success",
    message: "Excellent work on eigenvalue decomposition. Slight errors in orthogonal projections — review the Gram-Schmidt process.",
    suggestions: ["Redo problems 4.7 and 4.9", "Focus on orthonormal bases"],
  },
  {
    id: 3,
    date: "Feb 20, 2026",
    topic: "Calculus Midterm Review",
    grade: "C+",
    gradeColor: "text-warning",
    message: "Integration techniques need significant improvement. You should spend extra time on substitution and partial fractions before the final.",
    suggestions: ["Do 20 integration problems daily", "Attend the TA office hours", "Use the spaced repetition flashcards"],
  },
];

const STUDY_PLAN = {
  title: "Deep Learning Foundations — 6 Week Plan",
  progress: 50,
  weeks: [
    { week: 1, topic: "Linear Algebra Refresher",     status: "completed" },
    { week: 2, topic: "Calculus & Optimization",       status: "completed" },
    { week: 3, topic: "Forward Pass & Loss Functions", status: "completed" },
    { week: 4, topic: "Backpropagation & Gradients",   status: "current" },
    { week: 5, topic: "CNNs & Architectures",          status: "upcoming" },
    { week: 6, topic: "RNNs & Transformers",           status: "upcoming" },
  ],
};

export default function MyMentorPage() {
  const [messageText, setMessageText] = useState("");

  return (
    <div className="space-y-8">

      {/* ── Header ────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Mentor</h1>
        <p className="text-sm text-muted-foreground mt-1">View feedback, grades, and study plans from your mentor</p>
      </div>

      {/* ── Mentor Card ───────────────────────────────────────── */}
      <div className="card-raised p-6">
        <div className="flex items-center gap-4">
          <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
            {MENTOR.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-foreground">{MENTOR.name}</p>
            <p className="text-sm text-muted-foreground">{MENTOR.subject}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                <span className="font-semibold text-foreground">{MENTOR.rating}</span> rating
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" />
                {MENTOR.totalStudents} students
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Responds {MENTOR.responseTime}
              </div>
            </div>
          </div>
          <Button className="gap-2 shrink-0">
            <MessageSquare className="h-4 w-4" /> Message
          </Button>
        </div>
      </div>

      {/* ── Quick Message ─────────────────────────────────────── */}
      <div className="card-raised p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Send className="h-[18px] w-[18px] text-primary" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Send a Message</h2>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask your mentor a question..."
            className="input-base flex-1"
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
          />
          <Button disabled={!messageText.trim()} className="gap-2 shrink-0">
            <Send className="h-4 w-4" /> Send
          </Button>
        </div>
      </div>

      {/* ── Two-column: Feedback + Study Plan ─────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

        {/* Feedback & Grades (3/5) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Feedback & Grades</h2>
          </div>

          {FEEDBACK_FROM_MENTOR.map(fb => (
            <div key={fb.id} className="card-raised p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{fb.topic}</p>
                  <p className="text-xs text-muted-foreground">{fb.date}</p>
                </div>
                <div className={`flex items-center gap-1.5 chip ${
                  fb.grade.startsWith("A") ? "bg-success/10 text-success" :
                  fb.grade.startsWith("B") ? "bg-primary/10 text-primary" :
                  "bg-warning/10 text-warning"
                }`}>
                  <span className="text-sm font-bold">{fb.grade}</span>
                </div>
              </div>

              {/* Feedback message */}
              <div className="rounded-xl bg-muted/40 p-4">
                <div className="flex gap-3">
                  <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Dr. Morgan&apos;s Feedback</p>
                    <p className="text-sm text-foreground leading-relaxed">{fb.message}</p>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              {fb.suggestions.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Suggestions</p>
                  <ul className="space-y-1.5">
                    {fb.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Study Plan (2/5) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Study Plan</h2>
          </div>

          <div className="card-raised p-5 space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground">{STUDY_PLAN.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 progress-track">
                  <div className="progress-fill bg-primary" style={{ width: `${STUDY_PLAN.progress}%` }} />
                </div>
                <span className="text-xs font-bold text-primary">{STUDY_PLAN.progress}%</span>
              </div>
            </div>

            <div className="space-y-1">
              {STUDY_PLAN.weeks.map(({ week, topic, status }) => (
                <div
                  key={week}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                    status === "current" ? "bg-primary/5 border border-primary/20" :
                    status === "completed" ? "opacity-70" : ""
                  }`}
                >
                  <div className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${
                    status === "completed" ? "bg-success/10 text-success" :
                    status === "current" ? "bg-primary/10 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span>{week}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      status === "current" ? "text-primary" : "text-foreground"
                    }`}>{topic}</p>
                    <p className="text-[10px] text-muted-foreground">Week {week}</p>
                  </div>
                  {status === "current" && (
                    <span className="chip bg-primary/10 text-primary text-[10px]">Current</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Grade Summary */}
          <div className="card-raised p-5 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Grade Summary</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-success/5 border border-success/15 p-3 text-center">
                <p className="text-lg font-bold text-success">1</p>
                <p className="text-[10px] text-muted-foreground">A grades</p>
              </div>
              <div className="rounded-xl bg-primary/5 border border-primary/15 p-3 text-center">
                <p className="text-lg font-bold text-primary">1</p>
                <p className="text-[10px] text-muted-foreground">B grades</p>
              </div>
              <div className="rounded-xl bg-warning/5 border border-warning/15 p-3 text-center">
                <p className="text-lg font-bold text-warning">1</p>
                <p className="text-[10px] text-muted-foreground">C grades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
