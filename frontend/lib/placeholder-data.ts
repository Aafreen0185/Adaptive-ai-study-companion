// Placeholder data for UI demo before AI integration (Step 6)

export const PLACEHOLDER_DASHBOARD = {
  studyProgress: 67,
  weakTopics: [
    { topic: "Quantum Mechanics", score: 42 },
    { topic: "Thermodynamics", score: 58 },
    { topic: "Electromagnetism", score: 65 },
  ],
  quizzesCompleted: 12,
  recentActivity: [
    { id: "1", action: "Completed Quiz", detail: "Classical Mechanics - 85%", time: "2 hours ago" },
    { id: "2", action: "Asked Question", detail: "What is Newton's second law?", time: "5 hours ago" },
    { id: "3", action: "Uploaded Syllabus", detail: "Physics 101.pdf", time: "Yesterday" },
  ],
};

export const PLACEHOLDER_QUIZ = {
  questions: [
    {
      id: 1,
      question: "What is the formula for Newton's second law of motion?",
      options: ["F = ma", "E = mc²", "F = G(m1m2)/r²", "KE = ½mv²"],
      correctIndex: 0,
    },
    {
      id: 2,
      question: "Which property of a wave determines its color in visible light?",
      options: ["Amplitude", "Frequency", "Speed", "Phase"],
      correctIndex: 1,
    },
    {
      id: 3,
      question: "What is the SI unit of force?",
      options: ["Joule", "Watt", "Newton", "Pascal"],
      correctIndex: 2,
    },
  ],
  topic: "Physics Fundamentals",
};

export const PLACEHOLDER_ANALYTICS = {
  weakTopics: [
    { topic: "Quantum Mechanics", score: 42, recommendedHours: 4 },
    { topic: "Thermodynamics", score: 58, recommendedHours: 3 },
    { topic: "Electromagnetism", score: 65, recommendedHours: 2 },
  ],
  progressData: [
    { week: "Week 1", score: 55, quizzes: 2 },
    { week: "Week 2", score: 62, quizzes: 3 },
    { week: "Week 3", score: 68, quizzes: 4 },
    { week: "Week 4", score: 75, quizzes: 3 },
  ],
  recommendedPlan: [
    "Review Quantum Mechanics basics (Ch. 1-3)",
    "Practice thermodynamics problems",
    "Take quiz on Electromagnetism",
  ],
};
