"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { BookOpen, Sparkles, Brain, Zap, BarChart2, Users, ArrowRight, Star, Check } from "lucide-react";

const FEATURES = [
  { icon: Sparkles, title: "AI Study Assistant",    desc: "Ask questions from your syllabus; get instant, accurate answers.",      bg: "bg-pastel-lavender", tc: "text-purple-700 dark:text-purple-300" },
  { icon: Zap,      title: "Smart Flashcards",      desc: "AI generates spaced-repetition cards from your uploaded material.",      bg: "bg-pastel-yellow",   tc: "text-yellow-700 dark:text-yellow-300" },
  { icon: Brain,    title: "Adaptive Quizzes",      desc: "Topic-focused quizzes that adjust to your level as you improve.",        bg: "bg-pastel-mint",     tc: "text-emerald-700 dark:text-emerald-300" },
  { icon: BarChart2, title: "Progress Analytics",  desc: "Identify weak areas and track mastery across all your subjects.",         bg: "bg-pastel-sky",      tc: "text-sky-700 dark:text-sky-300" },
  { icon: Users,    title: "Study Sessions",        desc: "Create Pomodoro rooms with friends and stay accountable together.",       bg: "bg-pastel-pink",     tc: "text-rose-700 dark:text-rose-300" },
  { icon: BookOpen, title: "Mentor Dashboard",      desc: "Mentors can monitor student progress, quiz results, and weak topics.",   bg: "bg-pastel-lavender", tc: "text-purple-700 dark:text-purple-300" },
];

const STATS = [
  { value: "24K+",   label: "Active Learners" },
  { value: "840K+",  label: "Quizzes Taken" },
  { value: "38%",    label: "Avg. Score Boost" },
  { value: "4.9 ★",  label: "User Rating" },
];

const TESTIMONIALS = [
  { name: "Priya R.",  role: "Engineering Student",  quote: "My exam scores jumped 40% in a semester. The AI quizzes are frighteningly accurate.",  avatar: "👩🏽‍💻" },
  { name: "James M.",  role: "Medical Student",       quote: "Flashcards from my lecture notes in seconds. Can't imagine studying without this.",     avatar: "👨🏻‍⚕️" },
  { name: "Sofia K.",  role: "Data Science Major",    quote: "The streak system keeps me consistent. 3 months without missing a study day!",         avatar: "👩🏼‍🔬" },
];

const PLANS = [
  { name: "Free",    price: "₹0",    period: "/mo", cta: "Get started", features: ["AI Tutor (20 msgs/day)", "5 Flashcard sets", "Basic analytics", "Community access"] },
  { name: "Pro",     price: "₹299",  period: "/mo", cta: "Start free trial", highlight: true, features: ["Unlimited AI messages", "Unlimited flashcards", "Full analytics", "Study sessions & rooms", "Mentor support"] },
  { name: "Teams",   price: "₹899",  period: "/mo", cta: "Contact us", features: ["Everything in Pro", "Up to 10 students", "Mentor dashboard", "Priority support", "Custom branding"] },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
            <a href="#pricing"  className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#reviews"  className="hover:text-foreground transition-colors">Reviews</a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-1.5 h-9 rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-primary/90 transition-colors">
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-aurora py-24 md:py-32 text-center px-4">
        {mounted && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 mb-8 text-xs font-semibold text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> AI-powered · Trusted by 24,000 students
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground tracking-tight leading-none mb-6">
              Study smarter.<br />
              <span className="text-primary">Score higher.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Upload your syllabus and get AI-generated quizzes, flashcards, and mind maps. Track your progress with gamified streaks and compete with friends.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 h-12 rounded-xl bg-primary px-7 text-base font-semibold text-white hover:bg-primary/90 transition-colors">
                <Sparkles className="h-4 w-4" /> Start learning for free
              </Link>
              <Link href="/signup" className="inline-flex items-center gap-2 h-12 rounded-xl border border-border bg-card px-7 text-base font-semibold text-foreground hover:bg-muted transition-colors">
                View live demo
              </Link>
            </div>
          </motion.div>
        )}

        {/* Hero UI preview */}
        {mounted && (
          <motion.div initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-16 mx-auto max-w-4xl px-4">
            <div className="card-raised p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[["🔥", "14", "Day Streak"], ["⚡", "3,240", "XP Points"], ["🏆", "#3", "Leaderboard"]].map(([e, v, l]) => (
                  <div key={l} className="rounded-xl bg-muted/60 p-4">
                    <div className="text-xl mb-1">{e}</div>
                    <div className="text-xl font-bold">{v}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-muted/40 p-4">
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Machine Learning — Weekly Progress</span>
                  <span className="text-primary font-bold">78%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "78%" }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* ── Stats ──────────────────────────────────────── */}
      <section className="border-y border-border py-12 px-4">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-primary">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────── */}
      <section id="features" className="py-24 px-4 bg-aurora">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to ace your exams</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Each feature is purpose-built to make studying faster, more engaging, and measurably more effective.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, bg, tc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card-raised p-6 flex flex-col gap-4"
              >
                <div className={`${bg} flex h-11 w-11 items-center justify-center rounded-xl`}>
                  <Icon className={`h-5 w-5 ${tc}`} />
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

      {/* ── Testimonials ───────────────────────────────── */}
      <section id="reviews" className="py-24 px-4 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Students love it</h2>
            <div className="flex justify-center gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-warning text-warning" />)}
            </div>
            <p className="text-sm text-muted-foreground">Rated 4.9 / 5 across 2,400+ reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, quote, avatar }) => (
              <div key={name} className="card-raised p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{avatar}</span>
                  <div>
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{quote}"</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 bg-aurora border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">Start free. Upgrade when you&apos;re ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {PLANS.map(({ name, price, period, cta, highlight, features }) => (
              <div key={name} className={`card-raised p-6 flex flex-col gap-5 ${highlight ? "ring-2 ring-primary" : ""}`}>
                {highlight && <div className="chip bg-primary/10 text-primary self-start">Most popular</div>}
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{price}</span>
                    <span className="text-muted-foreground text-sm">{period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className={`inline-flex items-center justify-center h-10 rounded-xl text-sm font-semibold transition-colors ${highlight ? "bg-primary text-white hover:bg-primary/90" : "border border-border bg-card hover:bg-muted text-foreground"}`}>
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        © 2026 Adaptive AI Study Companion · Built for students everywhere
      </footer>
    </div>
  );
}
