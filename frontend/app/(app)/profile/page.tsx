"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProgressCard } from "@/components/ProgressCard";
import {
  Trophy, Clock, Brain, Settings, Bell, BookOpen, Edit2,
  Star, User, Flame, Zap, BarChart2, Users, GraduationCap,
  MessageSquare, ClipboardList, TrendingUp, LogOut, CheckCircle2,
} from "lucide-react";
import { getUserRole, getUserName, clearAuth, type UserRole } from "@/lib/auth";

/* ─── Student Profile Data ───────────────────────────────────── */
const STUDENT_SUBJECTS = [
  { name: "Machine Learning", mastery: 72, color: "bg-primary" },
  { name: "Linear Algebra",   mastery: 85, color: "bg-pastel-sky" },
  { name: "Calculus",         mastery: 62, color: "bg-warning" },
  { name: "Statistics",       mastery: 91, color: "bg-success" },
];

const STUDENT_ACTIVITY = [
  { icon: Brain,    text: "Completed Neural Networks Quiz", detail: "+80 XP · 92% score", time: "2h ago" },
  { icon: BookOpen, text: "Studied Machine Learning",       detail: "25 min session",      time: "4h ago" },
  { icon: Trophy,   text: "Earned Speed Reader badge",      detail: "3 hours in one day",  time: "Yesterday" },
  { icon: Zap,      text: "Reviewed 20 Flashcards",         detail: "Calculus · +40 XP",   time: "Yesterday" },
];

/* ─── Mentor Profile Data ────────────────────────────────────── */
const MENTOR_STATS = [
  { label: "Active Students", value: "4",   icon: Users,         iconBg: "bg-pastel-sky text-sky-700 dark:text-sky-300" },
  { label: "Feedback Sent",   value: "23",  icon: MessageSquare, iconBg: "bg-pastel-lavender text-purple-700 dark:text-purple-300" },
  { label: "Plans Created",   value: "6",   icon: ClipboardList, iconBg: "bg-pastel-mint text-emerald-700 dark:text-emerald-300" },
  { label: "Avg Student Score", value: "76%", icon: TrendingUp, iconBg: "bg-pastel-yellow text-yellow-700 dark:text-yellow-300" },
];

const MENTOR_STUDENTS_OVERVIEW = [
  { name: "Alex Johnson",    initials: "AJ", subject: "Machine Learning", score: 78, active: true },
  { name: "Priya Ramasamy",  initials: "PR", subject: "Statistics",        score: 95, active: true },
  { name: "James Mitchell",  initials: "JM", subject: "Calculus",          score: 55, active: false },
  { name: "Sofia Kim",       initials: "SK", subject: "Data Science",      score: 82, active: true },
];

/* ─── Student Profile View ───────────────────────────────────── */
function StudentProfile({ userName }: { userName: string }) {
  return (
    <>
      {/* Profile Hero */}
      <div className="card-raised overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-transparent to-accent/10 p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white shadow-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg bg-card border border-border shadow-sm hover:bg-muted transition-colors">
                <Edit2 className="h-3 w-3" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-foreground">{userName}</h1>
              <p className="text-sm text-muted-foreground">Data Science Major · Year 3</p>
              <p className="text-xs text-muted-foreground mt-0.5">University of Technology</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                  <Flame className="h-3.5 w-3.5" /> 14
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <Zap className="h-3.5 w-3.5" /> 1,240 XP
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          {/* Level bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 progress-track">
              <motion.div
                className="progress-fill bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: "41%" }}
                transition={{ duration: 1.2 }}
              />
            </div>
            <span className="text-xs font-semibold text-primary whitespace-nowrap">Lv 3 Scholar</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total XP",      value: "1,240", icon: Trophy,  iconBg: "bg-pastel-yellow text-yellow-700 dark:text-yellow-300" },
          { label: "Study Hours",   value: "47h",   icon: Clock,   iconBg: "bg-pastel-sky text-sky-700 dark:text-sky-300" },
          { label: "Quizzes Done",  value: "38",    icon: Brain,   iconBg: "bg-pastel-lavender text-purple-700 dark:text-purple-300" },
          { label: "Badges Earned", value: "5",     icon: Star,    iconBg: "bg-pastel-mint text-emerald-700 dark:text-emerald-300" },
        ].map(({ label, value, icon: Icon, iconBg }) => (
          <div key={label} className="card-raised flex items-center gap-4 p-5">
            <div className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold text-foreground leading-none mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Subject Mastery */}
      <div className="card-raised p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Subject Mastery</h2>
        </div>
        {STUDENT_SUBJECTS.map(({ name, mastery, color }) => (
          <ProgressCard
            key={name}
            title={name}
            progress={mastery}
            colorClass={color}
            className="bg-transparent !shadow-none !border-0 !p-0"
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Recent Activity</h2>
        <div className="card-raised divide-y divide-border">
          {STUDENT_ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3">
              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ─── Mentor Profile View ────────────────────────────────────── */
function MentorProfile({ userName }: { userName: string }) {
  return (
    <>
      {/* Profile Hero */}
      <div className="card-raised overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-transparent to-accent/10 p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white shadow-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg bg-card border border-border shadow-sm hover:bg-muted transition-colors">
                <Edit2 className="h-3 w-3" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-foreground">{userName}</h1>
              <p className="text-sm text-muted-foreground">Senior Instructor · Machine Learning</p>
              <p className="text-xs text-muted-foreground mt-0.5">University of Technology</p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                  <span className="font-semibold text-foreground">4.9</span> rating
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <GraduationCap className="h-3.5 w-3.5" />
                  4 active students
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mentor Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {MENTOR_STATS.map(({ label, value, icon: Icon, iconBg }) => (
          <div key={label} className="card-raised flex items-center gap-4 p-5">
            <div className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold text-foreground leading-none mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Students Overview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">My Students</h2>
          </div>
          <Link href="/mentor/students" className="text-xs text-primary font-semibold hover:underline">
            View all
          </Link>
        </div>
        <div className="card-raised divide-y divide-border">
          {MENTOR_STUDENTS_OVERVIEW.map(student => (
            <div key={student.name} className="flex items-center gap-4 px-5 py-3">
              <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {student.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{student.name}</p>
                  {student.active && <span className="h-1.5 w-1.5 rounded-full bg-success" />}
                </div>
                <p className="text-xs text-muted-foreground">{student.subject}</p>
              </div>
              <span className={`text-sm font-bold ${student.score >= 70 ? "text-success" : student.score >= 55 ? "text-warning" : "text-danger"}`}>
                {student.score}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Feedback Sent */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Recent Feedback</h2>
        </div>
        <div className="card-raised divide-y divide-border">
          {[
            { student: "Alex Johnson",   message: "Focus on backpropagation examples",      time: "3d ago" },
            { student: "Priya Ramasamy", message: "Great progress on Bayesian Statistics!", time: "1d ago" },
            { student: "Sofia Kim",      message: "Try the Kaggle dataset I shared",        time: "2d ago" },
          ].map((fb, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3">
              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-4 w-4 text-primary" />
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
    </>
  );
}

/* ─── Main Profile Page ──────────────────────────────────────── */
export default function ProfilePage() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [userName, setUserNameLocal] = useState("User");

  useEffect(() => {
    setRole(getUserRole());
    setUserNameLocal(getUserName());
  }, []);

  return (
    <div className="space-y-6">
      {role === "mentor" ? (
        <MentorProfile userName={userName} />
      ) : (
        <StudentProfile userName={userName} />
      )}

      {/* Account settings — shared */}
      <div className="card-raised p-5 space-y-2">
        <h2 className="text-sm font-semibold text-foreground mb-3">Account</h2>
        {[
          { icon: Bell,     label: "Notifications", desc: "Daily reminders & alerts" },
          { icon: Settings, label: "Preferences",   desc: "Study goals & settings" },
          { icon: User,     label: "Privacy",        desc: "Control profile visibility" },
        ].map(({ icon: Icon, label, desc }) => (
          <button key={label} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Sign out */}
      <Link href="/" onClick={() => clearAuth()}>
        <Button variant="outline" className="w-full h-11 gap-2 text-danger border-danger/20 hover:bg-danger/5">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </Link>
    </div>
  );
}
