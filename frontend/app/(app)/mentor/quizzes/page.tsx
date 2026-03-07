"use client";

import { ClipboardList, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUIZZES = [
  { id: 1, student: "Alex Johnson",    topic: "Neural Networks",      score: "78%", questions: 20, date: "2h ago",  reviewed: false },
  { id: 2, student: "Sofia Kim",       topic: "Feature Engineering",  score: "82%", questions: 15, date: "3h ago",  reviewed: false },
  { id: 3, student: "Priya Ramasamy",  topic: "Bayesian Statistics",  score: "95%", questions: 25, date: "1d ago",  reviewed: true },
  { id: 4, student: "James Mitchell",  topic: "Integration",          score: "55%", questions: 20, date: "2d ago",  reviewed: true },
];

export default function MentorQuizzesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quiz Reviews</h1>
        <p className="text-sm text-muted-foreground mt-1">Review student quiz performance and provide feedback</p>
      </div>

      <div className="space-y-3">
        {QUIZZES.map(q => (
          <div key={q.id} className="card-raised flex items-center gap-4 p-5">
            <div className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${q.reviewed ? "bg-success/10" : "bg-warning/10"}`}>
              {q.reviewed ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <ClipboardList className="h-5 w-5 text-warning" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{q.student}</p>
              <p className="text-xs text-muted-foreground">{q.topic} · {q.questions} questions · {q.date}</p>
            </div>
            <div className="text-right shrink-0 hidden sm:block">
              <p className={`text-sm font-bold ${parseInt(q.score) >= 70 ? "text-success" : parseInt(q.score) >= 55 ? "text-warning" : "text-danger"}`}>
                {q.score}
              </p>
            </div>
            {!q.reviewed && (
              <Button size="sm" variant="outline" className="shrink-0 gap-1.5">
                Review <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
