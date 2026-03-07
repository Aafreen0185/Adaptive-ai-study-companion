"use client";

import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEEDBACK_HISTORY = [
  { id: 1, student: "Alex Johnson",    message: "Focus on backpropagation examples this week. Try the exercises in Ch.5.",      date: "3d ago" },
  { id: 2, student: "Priya Ramasamy",  message: "Great progress on Bayesian Statistics! Ready to move on to MCMC methods.",     date: "1d ago" },
  { id: 3, student: "James Mitchell",  message: "Let's start with basic integration techniques before moving to advanced topics.", date: "5d ago" },
  { id: 4, student: "Sofia Kim",       message: "Your feature engineering skills are improving. Try the Kaggle dataset I shared.", date: "2d ago" },
];

export default function MentorFeedbackPage() {
  const [newFeedback, setNewFeedback] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Feedback</h1>
        <p className="text-sm text-muted-foreground mt-1">Send personalized feedback to your students</p>
      </div>

      {/* Quick feedback form */}
      <div className="card-raised p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Send className="h-[18px] w-[18px] text-primary" />
          </div>
          <h2 className="text-base font-semibold text-foreground">Send Feedback</h2>
        </div>
        <div className="space-y-3">
          <select className="input-base">
            <option value="">Select student...</option>
            <option>Alex Johnson</option>
            <option>Priya Ramasamy</option>
            <option>James Mitchell</option>
            <option>Sofia Kim</option>
          </select>
          <textarea
            value={newFeedback}
            onChange={e => setNewFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            rows={3}
            className="input-base resize-none py-3"
          />
          <Button className="gap-2" disabled={!newFeedback.trim()}>
            <Send className="h-4 w-4" /> Send Feedback
          </Button>
        </div>
      </div>

      {/* History */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Feedback History</h2>
        <div className="card-raised divide-y divide-border">
          {FEEDBACK_HISTORY.map(fb => (
            <div key={fb.id} className="flex items-start gap-4 px-5 py-4">
              <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-foreground">{fb.student}</p>
                  <span className="text-xs text-muted-foreground">{fb.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{fb.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
