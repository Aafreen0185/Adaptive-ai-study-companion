"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Heart, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const QUESTIONS = [
  {
    id: 1,
    question: "What is the primary purpose of an activation function in a neural network?",
    options: [
      { id: "a", text: "To store weights" },
      { id: "b", text: "To introduce non-linearity into the network" },
      { id: "c", text: "To connect layers together" },
      { id: "d", text: "To compute the final loss" },
    ],
    correctId: "b",
    explanation: "Activation functions introduce non-linearity, allowing the network to learn complex patterns. Without them, the network could only model linear relationships.",
  },
  {
    id: 2,
    question: "Which optimisation algorithm adapts the learning rate for each parameter?",
    options: [
      { id: "a", text: "SGD (Stochastic Gradient Descent)" },
      { id: "b", text: "Adam" },
      { id: "c", text: "Batch Gradient Descent" },
      { id: "d", text: "Perceptron" },
    ],
    correctId: "b",
    explanation: "Adam combines the benefits of AdaGrad and RMSProp, maintaining adaptive learning rates per parameter and momentum estimates.",
  },
  {
    id: 3,
    question: "What does 'overfitting' mean in machine learning?",
    options: [
      { id: "a", text: "The model fails to learn from training data" },
      { id: "b", text: "The model memorises training data but generalises poorly" },
      { id: "c", text: "The model has too few parameters" },
      { id: "d", text: "The training loss is too high" },
    ],
    correctId: "b",
    explanation: "Overfitting occurs when a model learns the training data, including noise, too well and therefore performs poorly on unseen data.",
  },
];

type AnswerState = "idle" | "correct" | "incorrect";

export default function QuizPage() {
  const router = useRouter();
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[qIndex];
  const isCorrect = selected === q.correctId;
  const progress = Math.round(((qIndex + (submitted ? 1 : 0)) / QUESTIONS.length) * 100);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected === q.correctId) {
      setScore(s => s + 1);
    } else {
      setHearts(h => Math.max(0, h - 1));
    }
  };

  const handleNext = () => {
    if (qIndex + 1 >= QUESTIONS.length) {
      setDone(true);
      return;
    }
    setQIndex(i => i + 1);
    setSelected(null);
    setSubmitted(false);
  };

  const getOptionState = (optId: string): AnswerState => {
    if (!submitted) return "idle";
    if (optId === q.correctId) return "correct";
    if (optId === selected) return "incorrect";
    return "idle";
  };

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="text-6xl mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "📖"}</div>
          <h1 className="text-3xl font-bold">{pct >= 80 ? "Excellent!" : pct >= 50 ? "Good effort!" : "Keep practising!"}</h1>
          <p className="text-muted-foreground mt-2">{score}/{QUESTIONS.length} correct · {pct}% score</p>
        </motion.div>
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
          {[
            { label: "Score",    value: `${pct}%` },
            { label: "XP Earned", value: `+${score * 40}` },
            { label: "Hearts",  value: `${hearts}/3` },
          ].map(({ label, value }) => (
            <div key={label} className="card-raised p-4 text-center">
              <p className="text-xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { setQIndex(0); setSelected(null); setSubmitted(false); setScore(0); setHearts(3); setDone(false); }}>
            Try again
          </Button>
          <Button onClick={() => router.push("/analytics")}>
            View Progress <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Quiz header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <X className="h-5 w-5" />
        </button>
        <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-success"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold text-danger shrink-0">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} className={cn("h-5 w-5", i < hearts ? "fill-danger text-danger" : "text-muted-foreground")} />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="space-y-2">
        <span className="chip bg-primary/10 text-primary">Question {qIndex + 1} of {QUESTIONS.length}</span>
        <h2 className="text-xl font-semibold text-foreground leading-snug">{q.question}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {q.options.map(opt => {
          const state = getOptionState(opt.id);
          return (
            <button
              key={opt.id}
              disabled={submitted}
              onClick={() => setSelected(opt.id)}
              className={cn(
                "flex items-center gap-4 w-full rounded-xl border px-5 py-4 text-left text-sm font-medium transition-all duration-200",
                state === "correct"   && "border-success bg-success/8 text-success",
                state === "incorrect" && "border-danger  bg-danger/8  text-danger",
                state === "idle" && selected === opt.id && "border-primary bg-primary/8 text-primary",
                state === "idle" && selected !== opt.id && "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/4",
              )}
            >
              <span className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                state === "correct"   && "border-success bg-success text-white",
                state === "incorrect" && "border-danger  bg-danger  text-white",
                state === "idle" && selected === opt.id && "border-primary bg-primary text-white",
                state === "idle" && selected !== opt.id && "border-border bg-muted text-muted-foreground",
              )}>
                {opt.id.toUpperCase()}
              </span>
              <span className="flex-1">{opt.text}</span>
              {state === "correct"   && <CheckCircle2 className="h-5 w-5 text-success shrink-0" />}
              {state === "incorrect" && <XCircle      className="h-5 w-5 text-danger  shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Feedback panel */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "rounded-xl border p-4 space-y-3",
              isCorrect ? "border-success/30 bg-success/6" : "border-danger/30 bg-danger/6"
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect
                ? <CheckCircle2 className="h-5 w-5 text-success" />
                : <XCircle className="h-5 w-5 text-danger" />}
              <p className={cn("font-semibold", isCorrect ? "text-success" : "text-danger")}>
                {isCorrect ? "Correct! Well done." : "Incorrect — see explanation below."}
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
            <Button onClick={handleNext} className="w-full gap-2">
              {qIndex + 1 < QUESTIONS.length ? "Next Question" : "See Results"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      {!submitted && (
        <Button className="w-full" disabled={!selected} onClick={handleSubmit}>
          Check Answer
        </Button>
      )}
    </div>
  );
}
