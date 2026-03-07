"use client";

export type UserRole = "student" | "mentor";

const ROLE_KEY = "study-companion-role";
const USER_KEY = "study-companion-user";

export function setUserRole(role: UserRole): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(ROLE_KEY, role);
  }
}

export function getUserRole(): UserRole | null {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem(ROLE_KEY);
  if (role === "student" || role === "mentor") return role;
  return null;
}

export function setUserName(name: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, name);
  }
}

export function getUserName(): string {
  if (typeof window === "undefined") return "User";
  return localStorage.getItem(USER_KEY) || "User";
}

export function clearAuth(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_KEY);
  }
}

export function getDashboardPath(role: UserRole | null): string {
  if (role === "mentor") return "/mentor";
  return "/dashboard";
}
