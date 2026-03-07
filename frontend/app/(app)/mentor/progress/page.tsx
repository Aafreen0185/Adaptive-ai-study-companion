"use client";

import { ProgressCard } from "@/components/ProgressCard";
import { BarChart2, TrendingUp } from "lucide-react";

const STUDENT_PROGRESS = [
  { name: "Alex Johnson",    subject: "Machine Learning", mastery: 72 },
  { name: "Priya Ramasamy",  subject: "Statistics",        mastery: 91 },
  { name: "James Mitchell",  subject: "Calculus",          mastery: 58 },
  { name: "Sofia Kim",       subject: "Data Science",      mastery: 79 },
];

export default function MentorProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Student Progress</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor mastery levels across all students</p>
      </div>

      <div className="space-y-4">
        {STUDENT_PROGRESS.map(s => (
          <div key={s.name} className="card-raised p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.subject}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className={`text-sm font-bold ${s.mastery >= 80 ? "text-success" : s.mastery >= 60 ? "text-warning" : "text-danger"}`}>
                  {s.mastery}%
                </span>
              </div>
            </div>
            <div className="progress-track">
              <div
                className={`progress-fill ${s.mastery >= 80 ? "bg-success" : s.mastery >= 60 ? "bg-warning" : "bg-danger"}`}
                style={{ width: `${s.mastery}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
