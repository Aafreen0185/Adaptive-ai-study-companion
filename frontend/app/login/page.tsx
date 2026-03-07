"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserRole, setUserRole, setUserName } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Demo: set a default role if none exists, else use stored role
    let role = getUserRole();
    if (!role) {
      // Default to student for demo
      role = "student";
      setUserRole(role);
    }
    setUserName(email.split("@")[0] || "User");
    router.push(role === "mentor" ? "/mentor" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-aurora px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Continue your learning journey</p>
          </div>
        </div>

        {/* Form card */}
        <div className="card-raised p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="input-base"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
              <Link href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="input-base"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full gap-2" onClick={handleLogin}>
            Log in <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
