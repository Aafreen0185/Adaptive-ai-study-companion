"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { getStudentBottomNav, getMentorBottomNav } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { getUserRole } from "@/lib/auth";
import { useEffect, useState } from "react";
import type { UserRole } from "@/lib/auth";

export function BottomNav() {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  const items = role === "mentor" ? getMentorBottomNav() : getStudentBottomNav();

  return (
    <div className="md:hidden pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(12px,env(safe-area-inset-bottom))]">
      <nav className="glass-nav pointer-events-auto rounded-2xl px-2 py-2">
        <ul className="flex items-stretch justify-around gap-1">
          {items.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && href !== "/mentor" && pathname.startsWith(href));

            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[10px] font-semibold transition-all duration-200 select-none",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottom-pill"
                      className="absolute inset-0 rounded-xl bg-primary/10"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="relative leading-none">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
