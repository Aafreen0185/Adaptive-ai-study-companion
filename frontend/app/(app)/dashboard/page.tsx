"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Flame, Zap, BookOpen, Target, Brain, Map, Upload,
  Users, Timer, Trophy, AlertTriangle, ChevronRight,
  BarChart2, CheckCircle2, FileText, AlignLeft, Loader2, X,
  Sparkles, ArrowUpRight,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ProgressCard } from "@/components/ProgressCard";
import { getUserName } from "@/lib/auth";

/* ─── Upload file type ───────────────────────────────────────── */
type UploadedFile = {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "done";
};

/* ─── Generated tool option ──────────────────────────────────── */
const TOOL_OPTIONS = [
  { id: "flashcards", icon: Zap,       label: "Flashcards",    desc: "Spaced repetition cards",        href: "/flashcards" },
  { id: "mindmap",    icon: Map,       label: "Mind Map",      desc: "Visual concept map",             href: "/mindmap" },
  { id: "quiz",       icon: Brain,     label: "Quiz",          desc: "AI-generated questions",         href: "/quiz" },
  { id: "summary",    icon: AlignLeft, label: "Summary",       desc: "Concise topic notes",            href: "/study" },
];

/* ─── Quick action card ──────────────────────────────────────── */
function QuickAction({
  href, icon: Icon, label, desc, iconBg,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  desc: string;
  iconBg: string;
}) {
  return (
    <Link href={href} className="card-interactive group flex items-center gap-4 p-4">
      <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground truncate">{desc}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0 group-hover:text-primary transition-colors" />
    </Link>
  );
}

const QUICK_ACTIONS = [
  { href: "/study",      icon: Sparkles, label: "AI Tutor",       desc: "Ask questions from your notes",     iconBg: "bg-pastel-lavender text-purple-700 dark:text-purple-300" },
  { href: "/flashcards", icon: Zap,      label: "Flashcards",     desc: "Spaced repetition review",          iconBg: "bg-pastel-yellow text-yellow-700 dark:text-yellow-300" },
  { href: "/quiz",       icon: Target,   label: "Quiz",           desc: "Test your knowledge",               iconBg: "bg-pastel-mint text-emerald-700 dark:text-emerald-300" },
  { href: "/mindmap",    icon: Map,      label: "Mind Map",       desc: "Visual concept exploration",        iconBg: "bg-pastel-pink text-rose-700 dark:text-rose-300" },
  { href: "/sessions",   icon: Timer,    label: "Study Session",  desc: "Start a Pomodoro focus session",    iconBg: "bg-pastel-sky text-sky-700 dark:text-sky-300" },
  { href: "/community",  icon: Users,    label: "Community",      desc: "Friends & leaderboard",             iconBg: "bg-pastel-lavender text-purple-700 dark:text-purple-300" },
];

const FOCUS_AREAS = [
  { topic: "Neural Networks",  score: 45 },
  { topic: "Integration",      score: 52 },
  { topic: "Backpropagation",  score: 58 },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState("Student");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUserName(getUserName());
  }, []);

  const XP       = 1240;
  const nextXP   = 3000;
  const streak   = 14;
  const xpPct    = Math.round((XP / nextXP) * 100);

  const addFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(f => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(1) + " MB",
      status: "uploading" as const,
    }));
    setFiles(prev => [...newFiles, ...prev]);
    setTimeout(() => {
      setFiles(prev => prev.map(f =>
        newFiles.find(n => n.id === f.id) ? { ...f, status: "done" as const } : f
      ));
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2000);
  };

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));
  const doneFiles = files.filter(f => f.status === "done");

  return (
    <div className="space-y-8">

      {/* ── Greeting header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, {userName} 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload your study material to get started.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 text-sm font-semibold text-orange-600 dark:text-orange-400">
            <Flame className="h-4 w-4" />
            <span>{streak} day streak</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
            <Zap className="h-4 w-4" />
            <span>{XP.toLocaleString()} XP</span>
          </div>
        </div>
      </div>

      {/* ── PRIMARY: Upload Section ─────────────────────────────── */}
      <div className="card-raised overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Upload className="h-[18px] w-[18px] text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Upload Study Material</h2>
              <p className="text-xs text-muted-foreground">Upload PDFs, notes, or documents to generate AI study tools</p>
            </div>
          </div>
        </div>

        {/* Drop zone */}
        <div
          className={`mx-6 mb-4 border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200 ${
            dragging
              ? "border-primary bg-primary/5 scale-[1.005]"
              : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/[0.02]"
          }`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
            className="hidden"
            onChange={e => addFiles(Array.from(e.target.files || []))}
          />
          <div className={`p-3 rounded-xl ${dragging ? "bg-primary/15" : "bg-muted"} transition-colors`}>
            <Upload className={`h-6 w-6 ${dragging ? "text-primary" : "text-muted-foreground"}`} />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Drop files here or click to browse</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOC, PPTX, TXT — up to 50 MB</p>
          </div>
        </div>

        {/* Uploaded files list */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="px-6 pb-4 space-y-2"
            >
              {files.map(file => (
                <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-[11px] text-muted-foreground">{file.size}</p>
                  </div>
                  {file.status === "uploading" ? (
                    <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                    className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generate button */}
        {doneFiles.length > 0 && !hasGenerated && (
          <div className="px-6 pb-6">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-11 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {isGenerating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Processing with AI...</>
              ) : (
                <><Brain className="h-4 w-4" /> Generate Study Tools</>
              )}
            </button>
          </div>
        )}

        {/* Generated tools */}
        <AnimatePresence>
          {hasGenerated && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-border"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <p className="text-sm font-semibold text-foreground">Generated Study Tools</p>
                  <span className="text-[11px] text-muted-foreground ml-auto">+80 XP earned</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {TOOL_OPTIONS.map(({ id, icon: Icon, label, desc, href }) => (
                    <Link
                      key={id}
                      href={href}
                      className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-200"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-semibold text-foreground">{label}</p>
                        <p className="text-[10px] text-muted-foreground">{desc}</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── XP level bar ──────────────────────────────────────── */}
      <div className="card-raised p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Level 3 — Scholar</p>
            <p className="text-sm font-medium text-foreground mt-0.5">
              {(nextXP - XP).toLocaleString()} XP to <span className="text-primary font-semibold">Expert</span>
            </p>
          </div>
          <span className="text-2xl font-bold text-primary">{xpPct}%</span>
        </div>
        <div className="progress-track">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="progress-fill bg-primary xp-glow"
          />
        </div>
        <div className="flex justify-between mt-2 text-[11px] text-muted-foreground font-medium">
          <span>0</span>
          <span>{nextXP.toLocaleString()} XP</span>
        </div>
      </div>

      {/* ── Stats row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard title="Today's Goal" value="39 / 60 min"   icon={<Target className="h-5 w-5 text-primary"  />} color="bg-primary/15"  />
        <StatCard title="Quizzes Done" value={38}            icon={<Brain  className="h-5 w-5 text-accent"   />} color="bg-accent/15"   />
        <StatCard title="Syllabus"     value="80%"           icon={<BookOpen className="h-5 w-5 text-success" />} color="bg-success/15" />
        <StatCard title="Badges"       value={5}             icon={<Trophy className="h-5 w-5 text-warning"  />} color="bg-warning/15"  trend="2 in progress" />
      </div>

      {/* ── Two-column section ──────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Quick actions (2/3 width) */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {QUICK_ACTIONS.map(action => (
              <QuickAction key={action.href} {...action} />
            ))}
          </div>
        </div>

        {/* Focus areas (1/3 width) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-danger" />
            <h2 className="text-sm font-semibold text-foreground">Weak Topics</h2>
          </div>
          <div className="card-raised divide-y divide-border">
            {FOCUS_AREAS.map(({ topic, score }) => (
              <div key={topic} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium text-foreground truncate pr-2">{topic}</span>
                <span className={`shrink-0 chip font-bold ${score < 55 ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning"}`}>
                  {score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Subject progress ────────────────────────────────── */}
      <div className="card-raised p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Subject Progress</h2>
          <Link href="/analytics" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
            <BarChart2 className="h-3.5 w-3.5" /> See all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ProgressCard title="Machine Learning" progress={72} colorClass="bg-primary" className="bg-transparent !shadow-none !border-0 !p-0" />
          <ProgressCard title="Linear Algebra"   progress={85} colorClass="bg-success"  className="bg-transparent !shadow-none !border-0 !p-0" />
          <ProgressCard title="Calculus"         progress={62} colorClass="bg-warning"  className="bg-transparent !shadow-none !border-0 !p-0" />
          <ProgressCard title="Statistics"       progress={91} colorClass="bg-accent"   className="bg-transparent !shadow-none !border-0 !p-0" />
        </div>
      </div>

      {/* ── Recent activity ─────────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
        <div className="card-raised divide-y divide-border">
          {[
            { icon: Brain,        text: "Completed Neural Networks Quiz",  detail: "+80 XP · 92% score",      time: "2h ago" },
            { icon: BookOpen,     text: "Studied Machine Learning",        detail: "25 min Pomodoro session",  time: "4h ago" },
            { icon: Trophy,       text: "Earned Speed Reader badge",       detail: "3 hrs in one day",         time: "Yesterday" },
            { icon: Zap,          text: "Reviewed 20 Flashcards",          detail: "Calculus · +40 XP",        time: "Yesterday" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
