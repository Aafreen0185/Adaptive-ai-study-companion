"use client";

import { FileText, Plus, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  { id: 1, student: "James Mitchell",  topic: "Calculus Foundations",   status: "active",    weeks: 4, progress: 25 },
  { id: 2, student: "Alex Johnson",    topic: "Deep Learning Basics",   status: "active",    weeks: 6, progress: 50 },
  { id: 3, student: "Sofia Kim",       topic: "Feature Engineering",    status: "completed", weeks: 3, progress: 100 },
];

export default function MentorPlansPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Study Plans</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and manage structured study plans for your students</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Plan
        </Button>
      </div>

      <div className="space-y-3">
        {PLANS.map(plan => (
          <div key={plan.id} className="card-raised p-5 space-y-3">
            <div className="flex items-center gap-4">
              <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${plan.status === "completed" ? "bg-success/10" : "bg-primary/10"}`}>
                {plan.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <FileText className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{plan.topic}</p>
                <p className="text-xs text-muted-foreground">{plan.student} · {plan.weeks} weeks</p>
              </div>
              <span className={`chip text-xs font-semibold ${plan.status === "completed" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
                {plan.status === "completed" ? "Completed" : "Active"}
              </span>
            </div>
            <div className="progress-track">
              <div
                className={`progress-fill ${plan.status === "completed" ? "bg-success" : "bg-primary"}`}
                style={{ width: `${plan.progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{plan.progress}% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
}
