"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Sparkles, Brain, Zap, Map, BarChart2,
  Users, Timer, Trophy, User, Upload, GraduationCap,
  BookOpen, ChevronRight, ClipboardList, MessageSquare,
  TrendingUp, FileText, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { getUserRole, type UserRole } from "@/lib/auth";
import { useEffect, useState } from "react";

/* ─── Navigation definitions ─────────────────────────────────── */
const STUDENT_NAV = [
  { section: "Learn", items: [
    { href: "/dashboard",  label: "Home",          icon: LayoutDashboard },
    { href: "/upload",     label: "Upload",        icon: Upload },
    { href: "/study",      label: "AI Assistant",  icon: Sparkles },
    { href: "/quiz",       label: "Quizzes",       icon: Brain },
    { href: "/flashcards", label: "Flashcards",    icon: Zap },
    { href: "/mindmap",    label: "Mind Maps",     icon: Map },
  ]},
  { section: "Track", items: [
    { href: "/analytics",  label: "Progress",      icon: BarChart2 },
    { href: "/badges",     label: "Badges",        icon: Trophy },
  ]},
  { section: "Mentor", items: [
    { href: "/my-mentor",  label: "My Mentor",     icon: GraduationCap },
  ]},
  { section: "Social", items: [
    { href: "/community",  label: "Community",     icon: Users },
    { href: "/sessions",   label: "Study Sessions", icon: Timer },
  ]},
];

const MENTOR_NAV = [
  { section: "Overview", items: [
    { href: "/mentor",     label: "Dashboard",     icon: LayoutDashboard },
  ]},
  { section: "Students", items: [
    { href: "/mentor/students",    label: "My Students",    icon: Users },
    { href: "/mentor/progress",    label: "Progress",       icon: TrendingUp },
    { href: "/mentor/quizzes",     label: "Quiz Reviews",   icon: ClipboardList },
  ]},
  { section: "Tools", items: [
    { href: "/mentor/plans",       label: "Study Plans",    icon: FileText },
    { href: "/mentor/feedback",    label: "Feedback",       icon: MessageSquare },
  ]},
];

export function getStudentBottomNav() {
  return [
    { href: "/dashboard",  label: "Home",     icon: LayoutDashboard },
    { href: "/upload",     label: "Upload",   icon: Upload },
    { href: "/quiz",       label: "Quiz",     icon: Brain },
    { href: "/analytics",  label: "Progress", icon: BarChart2 },
    { href: "/profile",    label: "Me",       icon: User },
  ];
}

export function getMentorBottomNav() {
  return [
    { href: "/mentor",             label: "Home",      icon: LayoutDashboard },
    { href: "/mentor/students",    label: "Students",  icon: Users },
    { href: "/mentor/quizzes",     label: "Reviews",   icon: ClipboardList },
    { href: "/mentor/feedback",    label: "Feedback",  icon: MessageSquare },
    { href: "/profile",           label: "Me",        icon: User },
  ];
}

/* ─── NavLink component ───────────────────────────────────────── */
function NavLink({
  href, label, icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  const pathname = usePathname();
  const isActive = pathname === href ||
    (href !== "/dashboard" && href !== "/mentor" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <Icon className={cn(
        "shrink-0 h-[18px] w-[18px]",
        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
      )} />
      <span className="truncate">{label}</span>
      {isActive && <ChevronRight className="ml-auto h-4 w-4 text-primary/60" />}
    </Link>
  );
}

/* ─── Sidebar component ───────────────────────────────────────── */
export function Sidebar() {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  const navItems = role === "mentor" ? MENTOR_NAV : STUDENT_NAV;

  return (
    <aside className="sidebar-glass hidden md:flex md:flex-col w-sidebar min-w-sidebar h-screen sticky top-0 overflow-y-auto z-30 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
          <BookOpen className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold leading-none text-foreground">StudyCompanion</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {role === "mentor" ? "Mentor Portal" : "AI Learning Platform"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-6 flex-1 p-4 pt-5">
        {navItems.map(({ section, items }) => (
          <div key={section} className="flex flex-col gap-1">
            <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              {section}
            </p>
            {items.map(item => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>
        ))}
      </nav>

      {/* Profile link + theme toggle */}
      <div className="border-t border-border p-4 flex flex-col gap-2">
        <NavLink href="/profile" label="Profile" icon={User} />
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm font-medium text-muted-foreground">Theme</span>
          <ThemeToggle />
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          <LogOut className="h-[18px] w-[18px]" />
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
