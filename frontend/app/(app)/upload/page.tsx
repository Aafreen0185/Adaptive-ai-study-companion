"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Upload, FileText, Brain, Zap, Map, AlignLeft,
  CheckCircle2, Loader2, X, Plus, ArrowUpRight,
} from "lucide-react";

type UploadedFile = {
  id: string;
  name: string;
  size: string;
  status: "uploading" | "done" | "error";
};

const GENERATE_OPTIONS = [
  { id: "flashcards", icon: Zap,       label: "Flashcards",      desc: "AI creates flip cards from key concepts",       href: "/flashcards" },
  { id: "quiz",       icon: Brain,     label: "Quiz Questions",   desc: "AI generates MCQs and true/false questions",    href: "/quiz" },
  { id: "mindmap",    icon: Map,       label: "Mind Map",         desc: "Visual concept map of your material",           href: "/mindmap" },
  { id: "summary",    icon: AlignLeft, label: "Summary",          desc: "Concise topic-by-topic summary notes",          href: "/study" },
];

const RECENT_FILES: UploadedFile[] = [
  { id: "1", name: "ML_Lecture_Week4.pdf",         size: "2.3 MB", status: "done" },
  { id: "2", name: "Calculus_Notes.pdf",            size: "1.1 MB", status: "done" },
  { id: "3", name: "Linear_Algebra_Syllabus.pdf",   size: "890 KB", status: "done" },
];

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>(RECENT_FILES);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const addFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(f => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(1) + " MB",
      status: "uploading" as const,
    }));
    setFiles(prev => [...newFiles, ...prev]);
    setTimeout(() => {
      setFiles(prev => prev.map(f => newFiles.find(n => n.id === f.id) ? { ...f, status: "done" as const } : f));
    }, 1800);
  };

  const toggleOption = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleGenerate = () => {
    if (selected.length === 0) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));
  const doneCount = files.filter(f => f.status === "done").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Materials</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload your study material and let AI generate learning tools.</p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-primary bg-primary/5 scale-[1.005]"
            : "border-border bg-card hover:border-primary/50 hover:bg-primary/[0.02]"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
          className="hidden"
          onChange={e => addFiles(Array.from(e.target.files || []))}
        />
        <div className={`p-4 rounded-2xl ${dragging ? "bg-primary/15" : "bg-muted"} transition-colors`}>
          <Upload className={`h-8 w-8 ${dragging ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <div className="text-center">
          <p className="text-base font-semibold text-foreground">Drop files here or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">Supports PDF, DOC, PPTX, TXT · Max 50 MB per file</p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="card-raised overflow-hidden">
          <div className="flex items-center gap-3 p-5 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-[18px] w-[18px] text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Your Files</h2>
              <p className="text-xs text-muted-foreground">{doneCount} file{doneCount !== 1 ? "s" : ""} ready</p>
            </div>
          </div>
          <div className="px-5 pb-4 space-y-2">
            {files.map(file => (
              <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-[11px] text-muted-foreground">{file.size}</p>
                </div>
                {file.status === "uploading" ? (
                  <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-border text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all"
            >
              <Plus className="h-4 w-4" /> Add More Files
            </button>
          </div>
        </div>
      )}

      {/* Generate Options */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-foreground">What should AI generate?</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GENERATE_OPTIONS.map(({ id, icon: Icon, label, desc }) => (
            <button
              key={id}
              onClick={() => toggleOption(id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selected.includes(id)
                  ? "border-primary bg-primary/5 shadow-focus"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-3 ${
                selected.includes(id) ? "bg-primary/15" : "bg-muted"
              }`}>
                <Icon className={`h-5 w-5 ${selected.includes(id) ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
              {selected.includes(id) && (
                <div className="mt-2.5 flex items-center gap-1 text-xs text-primary font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Selected
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        className="w-full h-12 text-base gap-2"
        disabled={selected.length === 0 || generating || doneCount === 0}
        onClick={handleGenerate}
      >
        {generating ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Generating with AI...</>
        ) : (
          <><Brain className="h-4 w-4" /> Generate {selected.length > 0 ? `(${selected.length} selected)` : ""}</>
        )}
      </Button>

      {/* Success State */}
      <AnimatePresence>
        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-raised border-success/20 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">All Done!</h3>
                  <p className="text-xs text-muted-foreground">
                    AI has generated {selected.length} content type{selected.length > 1 ? "s" : ""} from your files
                  </p>
                </div>
                <span className="ml-auto chip bg-success/10 text-success">+80 XP</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {selected.map(s => {
                  const opt = GENERATE_OPTIONS.find(o => o.id === s)!;
                  const Icon = opt.icon;
                  return (
                    <Link
                      key={s}
                      href={opt.href}
                      className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-xs font-semibold text-foreground">{opt.label}</p>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
