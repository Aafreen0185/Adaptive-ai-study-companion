"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Layers } from "lucide-react";

const CARDS = [
  {
    id: 1,
    topic: "Neural Networks",
    front: "What is backpropagation?",
    back: "Backpropagation is an algorithm used to train neural networks by computing gradients of the loss function with respect to each weight by the chain rule, propagating errors backward through the network.",
  },
  {
    id: 2,
    topic: "Neural Networks",
    front: "What is the vanishing gradient problem?",
    back: "When training deep networks, gradients can become very small as they propagate backward, causing earlier layers to learn very slowly or not at all. Common with sigmoid/tanh activations.",
  },
  {
    id: 3,
    topic: "Machine Learning",
    front: "What is overfitting?",
    back: "Overfitting occurs when a model learns the training data too well, including noise, resulting in poor generalization to new, unseen data. Detected when train accuracy >> test accuracy.",
  },
  {
    id: 4,
    topic: "Calculus",
    front: "What is the chain rule in calculus?",
    back: "The chain rule states that the derivative of a composite function f(g(x)) is f'(g(x)) · g'(x). It is fundamental to backpropagation in neural networks.",
  },
  {
    id: 5,
    topic: "Linear Algebra",
    front: "What is an eigenvector?",
    back: "An eigenvector of a matrix A is a non-zero vector v such that Av = λv, where λ is the eigenvalue. Eigenvectors represent directions that are only scaled (not rotated) by the transformation.",
  },
];

type Difficulty = "easy" | "medium" | "hard";

export default function FlashcardsPage() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(1);
  const [ratings, setRatings] = useState<Record<number, Difficulty>>({});
  const [isComplete, setIsComplete] = useState(false);

  const card = CARDS[index];
  const progress = ((index + 1) / CARDS.length) * 100;

  const goNext = () => {
    if (index >= CARDS.length - 1) {
      setIsComplete(true);
      return;
    }
    setDirection(1);
    setFlipped(false);
    setTimeout(() => setIndex(i => i + 1), 150);
  };

  const goPrev = () => {
    if (index === 0) return;
    setDirection(-1);
    setFlipped(false);
    setTimeout(() => setIndex(i => i - 1), 150);
  };

  const rate = (difficulty: Difficulty) => {
    setRatings(r => ({ ...r, [card.id]: difficulty }));
    goNext();
  };

  const restart = () => {
    setIndex(0);
    setFlipped(false);
    setRatings({});
    setIsComplete(false);
  };

  if (isComplete) {
    const easy = Object.values(ratings).filter(r => r === "easy").length;
    const medium = Object.values(ratings).filter(r => r === "medium").length;
    const hard = Object.values(ratings).filter(r => r === "hard").length;

    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] py-8 gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-7xl mb-4">🎉</div>
          <h1 className="text-3xl font-extrabold mb-2">Session Complete!</h1>
          <p className="text-muted-foreground text-lg">You reviewed all {CARDS.length} cards</p>
        </motion.div>
        <div className="clay bg-card w-full max-w-md p-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-extrabold text-emerald-500">{easy}</div>
            <div className="text-sm text-muted-foreground font-semibold">Easy</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-yellow-500">{medium}</div>
            <div className="text-sm text-muted-foreground font-semibold">Medium</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-red-500">{hard}</div>
            <div className="text-sm text-muted-foreground font-semibold">Hard</div>
          </div>
        </div>
        <div className="clay bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 w-full max-w-md p-4 text-center">
          <p className="text-sm font-semibold text-primary">+120 XP Earned · Flashcard Streak Maintained 🔥</p>
        </div>
        <Button onClick={restart} className="h-12 px-8 gap-2">
          <RotateCcw className="w-4 h-4" /> Review Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Flashcards</h1>
          <p className="text-muted-foreground text-sm">{card.topic}</p>
        </div>
        <div className="flex items-center gap-2 bg-card clay px-4 py-2 rounded-2xl text-sm font-bold">
          <Layers className="w-4 h-4 text-primary" />
          {index + 1} / {CARDS.length}
        </div>
      </div>

      {/* Progress */}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Flip Card */}
      <div
        className="relative w-full"
        style={{ perspective: "1200px", height: "320px" }}
        onClick={() => setFlipped(f => !f)}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Front */}
          <div
            className="clay absolute inset-0 bg-gradient-to-br from-pastel-lavender to-card flex flex-col items-center justify-center p-8 cursor-pointer text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4 bg-primary/10 px-3 py-1 rounded-full">Question</div>
            <p className="text-xl font-bold leading-snug">{card.front}</p>
            <p className="text-sm text-muted-foreground mt-6">Tap to reveal answer</p>
          </div>

          {/* Back */}
          <div
            className="clay absolute inset-0 bg-gradient-to-br from-pastel-mint to-card flex flex-col items-center justify-center p-8 cursor-pointer text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">Answer</div>
            <p className="text-base leading-relaxed text-foreground">{card.back}</p>
          </div>
        </motion.div>
      </div>

      {/* Rating Buttons (show after flip) */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex flex-col gap-3"
          >
            <p className="text-center text-sm text-muted-foreground font-semibold">How well did you know this?</p>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-2 border-red-300 text-red-600 hover:bg-red-50 font-bold"
                onClick={() => rate("hard")}
              >
                😓 Hard
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-2 border-yellow-300 text-yellow-600 hover:bg-yellow-50 font-bold"
                onClick={() => rate("medium")}
              >
                🤔 Medium
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-2 border-emerald-300 text-emerald-600 hover:bg-emerald-50 font-bold"
                onClick={() => rate("easy")}
              >
                ✅ Easy
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={goPrev} disabled={index === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
        <Button variant="ghost" onClick={() => setFlipped(f => !f)} className="text-muted-foreground">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button variant="ghost" onClick={goNext} className="gap-2">
          Skip <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
