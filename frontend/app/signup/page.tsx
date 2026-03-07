"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap, Users, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { setUserRole, setUserName, type UserRole } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!role || !name.trim()) return;
    setUserRole(role);
    setUserName(name.trim());
    router.push(role === "mentor" ? "/mentor" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-aurora px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Start learning smarter today — it&apos;s free</p>
          </div>
        </div>

        {/* Form */}
        <div className="card-raised p-6 space-y-6">
          {/* Role Selection */}
          <div className="space-y-2.5">
            <label className="text-sm font-medium text-foreground">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`relative flex flex-col items-center gap-2.5 rounded-xl border-2 p-5 transition-all duration-200 ${
                  role === "student"
                    ? "border-primary bg-primary/5 shadow-focus"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                {role === "student" && (
                  <div className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${role === "student" ? "bg-primary/15" : "bg-muted"}`}>
                  <GraduationCap className={`h-5 w-5 ${role === "student" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-semibold ${role === "student" ? "text-primary" : "text-foreground"}`}>Student</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Learn & track progress</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRole("mentor")}
                className={`relative flex flex-col items-center gap-2.5 rounded-xl border-2 p-5 transition-all duration-200 ${
                  role === "mentor"
                    ? "border-primary bg-primary/5 shadow-focus"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                {role === "mentor" && (
                  <div className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${role === "mentor" ? "bg-primary/15" : "bg-muted"}`}>
                  <Users className={`h-5 w-5 ${role === "mentor" ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-semibold ${role === "mentor" ? "text-primary" : "text-foreground"}`}>Mentor</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Guide & monitor students</p>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground" htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Alex Johnson"
              className="input-base"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
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
            <label className="text-sm font-medium text-foreground" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="min. 8 characters"
              className="input-base"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full gap-2"
            onClick={handleSignup}
            disabled={!role || !name.trim()}
          >
            Create account <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            By signing up you agree to our{" "}
            <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
