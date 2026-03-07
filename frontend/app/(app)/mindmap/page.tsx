"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Share2, Download } from "lucide-react";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  level: number;
  color: string;
  children?: string[];
};

const NODES: Node[] = [
  { id: "root", label: "Machine Learning", x: 300, y: 280, level: 0, color: "#a78bfa", children: ["supervised", "unsupervised", "reinforcement", "deeplearning"] },
  { id: "supervised", label: "Supervised", x: 100, y: 120, level: 1, color: "#60a5fa", children: ["regression", "classification"] },
  { id: "unsupervised", label: "Unsupervised", x: 520, y: 120, level: 1, color: "#34d399", children: ["clustering", "pca"] },
  { id: "reinforcement", label: "Reinforcement", x: 100, y: 440, level: 1, color: "#f97316", children: ["qlearning", "policy"] },
  { id: "deeplearning", label: "Deep Learning", x: 520, y: 440, level: 1, color: "#ec4899", children: ["cnn", "rnn"] },
  { id: "regression", label: "Regression", x: 30, y: 30, level: 2, color: "#93c5fd" },
  { id: "classification", label: "Classification", x: 30, y: 210, level: 2, color: "#93c5fd" },
  { id: "clustering", label: "Clustering", x: 580, y: 30, level: 2, color: "#6ee7b7" },
  { id: "pca", label: "PCA", x: 580, y: 210, level: 2, color: "#6ee7b7" },
  { id: "qlearning", label: "Q-Learning", x: 30, y: 370, level: 2, color: "#fdba74" },
  { id: "policy", label: "Policy Gradient", x: 30, y: 510, level: 2, color: "#fdba74" },
  { id: "cnn", label: "CNN", x: 570, y: 370, level: 2, color: "#f9a8d4" },
  { id: "rnn", label: "RNN / LSTM", x: 570, y: 510, level: 2, color: "#f9a8d4" },
];

const EDGES: [string, string][] = [
  ["root", "supervised"], ["root", "unsupervised"], ["root", "reinforcement"], ["root", "deeplearning"],
  ["supervised", "regression"], ["supervised", "classification"],
  ["unsupervised", "clustering"], ["unsupervised", "pca"],
  ["reinforcement", "qlearning"], ["reinforcement", "policy"],
  ["deeplearning", "cnn"], ["deeplearning", "rnn"],
];

export default function MindMapPage() {
  const [scale, setScale] = useState(0.9);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const getNodeById = (id: string) => NODES.find(n => n.id === id);

  const nodeInfoMap: Record<string, string> = {
    root: "The study of algorithms that learn from data.",
    supervised: "Training with labeled examples (input-output pairs).",
    unsupervised: "Finding patterns in data without labeled outputs.",
    reinforcement: "Learning through reward and punishment signals.",
    deeplearning: "Neural networks with many layers.",
    regression: "Predicting continuous values (e.g., house prices).",
    classification: "Predicting categorical labels (e.g., spam/not spam).",
    clustering: "Grouping similar data points (e.g., K-Means).",
    pca: "Dimensionality reduction via principal components.",
    qlearning: "Off-policy RL algorithm using Q-value tables.",
    policy: "Optimizing policy directly using gradient ascent.",
    cnn: "Convolutional Neural Networks for image processing.",
    rnn: "Recurrent Neural Networks for sequential data.",
  };

  return (
    <div className="flex flex-col gap-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Mind Map</h1>
          <p className="text-muted-foreground text-sm">Machine Learning · AI Generated</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl" onClick={() => setScale(s => Math.min(s + 0.1, 1.5))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl" onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl" onClick={() => setScale(0.9)}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mind Map Canvas */}
      <div className="clay bg-card border-2 overflow-hidden" style={{ height: "480px" }}>
        <div className="w-full h-full overflow-auto">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              width: "640px",
              height: "580px",
              position: "relative",
            }}
          >
            <svg
              width="640"
              height="580"
              className="absolute inset-0"
              style={{ pointerEvents: "none" }}
            >
              {EDGES.map(([from, to]) => {
                const a = getNodeById(from);
                const b = getNodeById(to);
                if (!a || !b) return null;
                const ax = a.x + 52, ay = a.y + 18;
                const bx = b.x + 52, by = b.y + 18;
                return (
                  <line
                    key={`${from}-${to}`}
                    x1={ax} y1={ay} x2={bx} y2={by}
                    stroke={a.color}
                    strokeWidth="2"
                    strokeOpacity="0.5"
                    strokeDasharray="6 3"
                  />
                );
              })}
            </svg>

            {NODES.map((node, i) => (
              <motion.button
                key={node.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 300 }}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                className={`absolute flex items-center justify-center text-white text-xs font-bold rounded-2xl shadow-lg transition-all hover:scale-110 ${
                  activeNode === node.id ? "ring-4 ring-white/60 scale-110" : ""
                }`}
                style={{
                  left: node.x,
                  top: node.y,
                  width: node.level === 0 ? 108 : node.level === 1 ? 96 : 90,
                  height: node.level === 0 ? 48 : 36,
                  backgroundColor: node.color,
                  zIndex: node.level === 0 ? 10 : node.level === 1 ? 7 : 5,
                  fontSize: node.level === 0 ? 13 : 11,
                }}
              >
                {node.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Node Info Panel */}
      {activeNode && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="clay bg-card p-5 border-2 border-primary/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getNodeById(activeNode)?.color }}
            />
            <h3 className="font-extrabold text-lg">{getNodeById(activeNode)?.label}</h3>
          </div>
          <p className="text-muted-foreground text-sm">{nodeInfoMap[activeNode]}</p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline" className="rounded-xl gap-1">
              <Download className="w-3 h-3" /> Study This
            </Button>
            <Button size="sm" className="rounded-xl gap-1">
              Quiz Me →
            </Button>
          </div>
        </motion.div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Tap any node to learn more · Pinch or use buttons to zoom
      </p>
    </div>
  );
}
