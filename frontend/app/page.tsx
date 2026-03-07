"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  BookOpen, Sparkles, Brain, Zap, BarChart2, Users,
  ArrowRight, Upload, Map, GraduationCap, CheckCircle2,
} from "lucide-react";

const FEATURES = [
  {
    icon: Upload,
    title: "Upload & Generate",
    desc: "Upload your syllabus, notes, or PDFs. AI instantly generates flashcards, quizzes, and mind maps.",
    iconBg: "bg-pastel-sky",
    iconColor: "text-sky-700 dark:text-sky-300",
  },
  {
    icon: Sparkles,
    title: "AI Study Assistant",
    desc: "Ask questions about your uploaded material and get accurate, context-aware answers.",
    iconBg: "bg-pastel-lavender",
    iconColor: "text-purple-700 dark:text-purple-300",
  },
  {
    icon: Brain,
    title: "Adaptive Quizzes",
    desc: "AI generates quizzes that adapt to your level, focusing on weak areas to maximize learning.",
    iconBg: "bg-pastel-mint",
    iconColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    icon: Zap,
    title: "Smart Flashcards",
    desc: "Spaced repetition flashcards auto-generated from your study material for efficient review.",
    iconBg: "bg-pastel-yellow",
    iconColor: "text-yellow-700 dark:text-yellow-300",
  },
  {
    icon: BarChart2,
    title: "Progress Tracking",
    desc: "Track mastery across subjects, identify weak topics, and monitor your study habits over time.",
    iconBg: "bg-pastel-pink",
    iconColor: "text-rose-700 dark:text-rose-300",
  },
  {
    icon: GraduationCap,
    title: "Mentor Dashboard",
    desc: "Mentors get a separate portal to monitor students, review quizzes, and give targeted feedback.",
    iconBg: "bg-pastel-lavender",
    iconColor: "text-purple-700 dark:text-purple-300",
  },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Upload your material", desc: "Drop your PDFs, notes, or syllabi into the platform" },
  { step: "2", title: "AI processes content", desc: "Our AI reads, understands, and structures your material" },
  { step: "3", title: "Learn with generated tools", desc: "Use flashcards, quizzes, mind maps, and the AI tutor" },
  { step: "4", title: "Track your progress", desc: "See mastery levels, weak areas, and study streaks" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ── Navbar ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-foreground">StudyCompanion</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-1.5 h-9 rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
              Try it free <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-aurora py-24 md:py-32 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 mb-8 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> AI-powered study companion
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground tracking-tight leading-none mb-6">
            Study smarter.<br />
            <span className="text-primary">Score higher.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Upload your study material and get AI-generated quizzes, flashcards, and mind maps.
            Track your progress with gamified streaks and get mentor feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup" className="inline-flex items-center gap-2 h-12 rounded-xl bg-primary px-7 text-base font-semibold text-white hover:bg-primary/90 transition-colors">
              <Sparkles className="h-4 w-4" /> Get started — it&apos;s free
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 h-12 rounded-xl border border-border bg-card px-7 text-base font-semibold text-foreground hover:bg-muted transition-colors">
              Try the demo
            </Link>
          </div>
        </motion.div>

        {/* Hero Preview */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 mx-auto max-w-4xl px-4"
        >
          <div className="card-raised p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { icon: Upload, label: "Upload Material", desc: "Drop your PDFs" },
                { icon: Brain, label: "AI Generates Tools", desc: "Quizzes, flashcards, maps" },
                { icon: BarChart2, label: "Track Progress", desc: "See your mastery grow" },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-xl bg-muted/60 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 mb-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm font-semibold">{label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-muted/40 p-4">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span>Machine Learning — Weekly Progress</span>
                <span className="text-primary font-bold">78%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── How it works ──────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">From upload to mastery in four simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary text-lg font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="py-24 px-4 bg-aurora">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for how students actually learn</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Every feature is designed to make studying faster, more engaging, and measurably more effective.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, iconBg, iconColor }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-raised p-6 flex flex-col gap-4"
              >
                <div className={`${iconBg} flex h-11 w-11 items-center justify-center rounded-xl`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Role-based access ──────────────────────────── */}
      <section className="py-24 px-4 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Two roles, one platform</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Whether you&apos;re learning or teaching, the platform adapts to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student */}
            <div className="card-raised p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Student Dashboard</h3>
                  <p className="text-xs text-muted-foreground">Learn, practice, and track progress</p>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  "Upload materials & generate study tools",
                  "AI tutor for instant answers",
                  "Adaptive quizzes & flashcards",
                  "Progress tracking & streaks",
                  "View mentor feedback & grades",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Mentor */}
            <div className="card-raised p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Mentor Dashboard</h3>
                  <p className="text-xs text-muted-foreground">Guide, monitor, and give feedback</p>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  "View all assigned students",
                  "Monitor study progress & mastery",
                  "Review quiz performance",
                  "Create structured study plans",
                  "Send personalized feedback",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-aurora border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to study smarter?</h2>
          <p className="text-muted-foreground mb-8">
            Sign up as a student or mentor and explore the platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup" className="inline-flex items-center gap-2 h-12 rounded-xl bg-primary px-7 text-base font-semibold text-white hover:bg-primary/90 transition-colors">
              <Sparkles className="h-4 w-4" /> Get started free
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 h-12 rounded-xl border border-border bg-card px-7 text-base font-semibold text-foreground hover:bg-muted transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-3 w-3 text-white" />
            </div>
            <span className="font-semibold text-foreground text-sm">StudyCompanion</span>
          </div>
          <p>Built with AI · Hackathon Prototype 2026</p>
        </div>
      </footer>
    </div>
  );
}
