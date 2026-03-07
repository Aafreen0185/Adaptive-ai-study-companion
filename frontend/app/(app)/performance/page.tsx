"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPerformance } from "@/lib/api";
import { PLACEHOLDER_ANALYTICS } from "@/lib/placeholder-data";
import { Target } from "lucide-react";

function ProgressRing({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  const style = useMemo(
    () => ({
      background: `conic-gradient(hsl(var(--primary)) ${pct}%, hsl(var(--muted)) 0)`,
    }),
    [pct]
  );

  return (
    <div className="relative h-24 w-24 rounded-full p-[10px]" style={style}>
      <div className="flex h-full w-full items-center justify-center rounded-full bg-card">
        <span className="text-lg font-semibold">{pct}%</span>
      </div>
    </div>
  );
}

export default function PerformancePage() {
  const [data, setData] = useState(PLACEHOLDER_ANALYTICS);
  const [studyProgress, setStudyProgress] = useState(67);

  useEffect(() => {
    getPerformance()
      .then((res) => {
        setStudyProgress(res.study_progress ?? 67);
        setData({
          weakTopics: res.weak_topics.map(
            (t: { topic: string; score: number; recommended_hours?: number }) => ({
              topic: t.topic,
              score: t.score,
              recommendedHours: t.recommended_hours ?? 0,
            })
          ),
          progressData: res.progress_data,
          recommendedPlan: res.recommended_plan,
        });
      })
      .catch(() => {});
  }, []);

  const { weakTopics, progressData, recommendedPlan } = data;

  return (
    <div className="space-y-4">
      <div className="clay p-5">
        <p className="text-sm text-muted-foreground">Performance</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your progress</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              A calm snapshot of where to focus next.
            </p>
          </div>
          <ProgressRing value={Math.round(studyProgress)} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly trend</CardTitle>
          <p className="text-sm text-muted-foreground">Average quiz scores</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {progressData.map((d) => (
            <div key={d.week} className="flex items-center gap-3">
              <span className="w-16 text-xs text-muted-foreground">{d.week}</span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary/80"
                  style={{ width: `${d.score}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs font-medium">{d.score}%</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Weak topics
          </CardTitle>
          <p className="text-sm text-muted-foreground">Where to spend time</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {weakTopics.map((t, idx) => (
            <div
              key={t.topic}
              className={[
                "flex items-center justify-between rounded-[22px] border border-border bg-card/70 px-4 py-4",
                idx === 0 ? "bg-pastel-pink/20" : "",
              ].join(" ")}
            >
              <div>
                <p className="text-sm font-semibold">{t.topic}</p>
                <p className="text-xs text-muted-foreground">
                  Recommended: ~{t.recommendedHours}h
                </p>
              </div>
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                {t.score}%
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommended plan</CardTitle>
          <p className="text-sm text-muted-foreground">Next steps</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendedPlan.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold">
                  {i + 1}
                </span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

