const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

export async function uploadSyllabus(formData: FormData) {
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function askQuestion(question: string) {
  const res = await fetch(`${API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error("Ask failed");
  return res.json();
}

export async function generateQuiz(topic?: string, numQuestions?: number) {
  const res = await fetch(`${API_BASE}/generate-quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, num_questions: numQuestions }),
  });
  if (!res.ok) throw new Error("Quiz generation failed");
  return res.json();
}

export async function getPerformance() {
  const res = await fetch(`${API_BASE}/performance`);
  if (!res.ok) throw new Error("Performance fetch failed");
  return res.json();
}
