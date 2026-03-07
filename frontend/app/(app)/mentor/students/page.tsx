"use client";

import { useState } from "react";
import {
  Users, Search, ChevronRight, TrendingUp,
  AlertTriangle, MessageSquare, BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STUDENTS = [
  { id: "1", name: "Alex Johnson",    initials: "AJ", subject: "Machine Learning", score: 78, mastery: 72, weakTopics: ["Neural Networks", "Backprop"], active: true,  lastSeen: "2h ago",  sessions: 38 },
  { id: "2", name: "Priya Ramasamy",  initials: "PR", subject: "Statistics",        score: 95, mastery: 91, weakTopics: ["Bayesian Inference"],          active: true,  lastSeen: "Just now", sessions: 84 },
  { id: "3", name: "James Mitchell",  initials: "JM", subject: "Calculus",          score: 55, mastery: 58, weakTopics: ["Integration", "Limits"],       active: false, lastSeen: "3d ago",  sessions: 12 },
  { id: "4", name: "Sofia Kim",       initials: "SK", subject: "Data Science",      score: 82, mastery: 79, weakTopics: ["Feature Engineering"],         active: true,  lastSeen: "30m ago", sessions: 56 },
];

export default function MentorStudentsPage() {
  const [query, setQuery] = useState("");
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Students</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and monitor all your assigned students</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search students..."
          className="input-base pl-9"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map(student => (
          <div key={student.id} className="card-raised p-5">
            <div className="flex items-center gap-4">
              <div className="shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                {student.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground">{student.name}</p>
                  {student.active && <span className="h-2 w-2 rounded-full bg-success" />}
                </div>
                <p className="text-xs text-muted-foreground">{student.subject} · {student.sessions} sessions · Last seen {student.lastSeen}</p>
              </div>

              <div className="hidden sm:flex items-center gap-4">
                <div className="text-center">
                  <p className={`text-sm font-bold ${student.score >= 70 ? "text-success" : student.score >= 55 ? "text-warning" : "text-danger"}`}>
                    {student.score}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">Avg Score</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">{student.mastery}%</p>
                  <p className="text-[10px] text-muted-foreground">Mastery</p>
                </div>
              </div>

              <Button size="sm" variant="outline" className="shrink-0 gap-1.5">
                <MessageSquare className="h-3.5 w-3.5" /> Message
              </Button>
            </div>

            {student.weakTopics.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 flex-wrap">
                <AlertTriangle className="h-3.5 w-3.5 text-danger shrink-0" />
                <span className="text-xs text-muted-foreground shrink-0">Weak:</span>
                {student.weakTopics.map(t => (
                  <span key={t} className="chip bg-danger/10 text-danger text-xs">{t}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
