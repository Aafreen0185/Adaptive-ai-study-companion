"""
Adaptive AI Study Companion - FastAPI Backend
REST API with /upload, /ask, /generate-quiz, /performance
"""
import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Adaptive AI Study Companion API")

_cors = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
_origins = [o.strip() for o in _cors if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins if _origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Request/Response Models ---
class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str


class QuizRequest(BaseModel):
    topic: Optional[str] = None
    num_questions: Optional[int] = 5


class QuizOption(BaseModel):
    text: str
    is_correct: bool


class QuizQuestion(BaseModel):
    question: str
    options: list[QuizOption]


class QuizResponse(BaseModel):
    questions: list[QuizQuestion]
    topic: str


class WeakTopic(BaseModel):
    topic: str
    score: float
    recommended_hours: Optional[int] = None


class PerformanceResponse(BaseModel):
    study_progress: float
    weak_topics: list[WeakTopic]
    quizzes_completed: int
    recent_activity: list[dict]
    progress_data: list[dict]
    recommended_plan: list[str]


# --- Placeholder data (until AI/RAG integration) ---
PLACEHOLDER_ANSWER = (
    "Placeholder: AI answers will appear here once the RAG pipeline is connected. "
    "Upload a syllabus PDF and set OPENAI_API_KEY to enable full Q&A."
)
PLACEHOLDER_QUIZ = {
    "questions": [
        {
            "question": "What is the formula for Newton's second law of motion?",
            "options": [
                {"text": "F = ma", "is_correct": True},
                {"text": "E = mc²", "is_correct": False},
                {"text": "F = G(m1m2)/r²", "is_correct": False},
                {"text": "KE = ½mv²", "is_correct": False},
            ],
        },
        {
            "question": "Which property of a wave determines its color in visible light?",
            "options": [
                {"text": "Amplitude", "is_correct": False},
                {"text": "Frequency", "is_correct": True},
                {"text": "Speed", "is_correct": False},
                {"text": "Phase", "is_correct": False},
            ],
        },
    ],
    "topic": "Physics Fundamentals",
}
PLACEHOLDER_PERFORMANCE = {
    "study_progress": 67,
    "weak_topics": [
        {"topic": "Quantum Mechanics", "score": 42, "recommended_hours": 4},
        {"topic": "Thermodynamics", "score": 58, "recommended_hours": 3},
        {"topic": "Electromagnetism", "score": 65, "recommended_hours": 2},
    ],
    "quizzes_completed": 12,
    "recent_activity": [
        {"action": "Completed Quiz", "detail": "Classical Mechanics - 85%", "time": "2 hours ago"},
        {"action": "Asked Question", "detail": "What is Newton's second law?", "time": "5 hours ago"},
        {"action": "Uploaded Syllabus", "detail": "Physics 101.pdf", "time": "Yesterday"},
    ],
    "progress_data": [
        {"week": "Week 1", "score": 55, "quizzes": 2},
        {"week": "Week 2", "score": 62, "quizzes": 3},
        {"week": "Week 3", "score": 68, "quizzes": 4},
        {"week": "Week 4", "score": 75, "quizzes": 3},
    ],
    "recommended_plan": [
        "Review Quantum Mechanics basics (Ch. 1-3)",
        "Practice thermodynamics problems",
        "Take quiz on Electromagnetism",
    ],
}


# --- Endpoints ---
@app.post("/upload")
async def upload_syllabus(file: UploadFile = File(...)):
    """Upload syllabus PDF. Placeholder: accepts file, returns success."""
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="PDF file required")
    # TODO: Process with RAG pipeline, store in FAISS
    return {"status": "ok", "filename": file.filename, "message": "Syllabus uploaded (placeholder)"}


@app.post("/ask", response_model=AskResponse)
async def ask_question(req: AskRequest):
    """RAG-based Q&A about syllabus. Placeholder response until OpenAI connected."""
    # TODO: Use rag_pipeline to answer from vector store
    return AskResponse(answer=PLACEHOLDER_ANSWER)


@app.post("/generate-quiz", response_model=QuizResponse)
async def generate_quiz(req: QuizRequest):
    """Generate MCQ quiz from syllabus. Placeholder until AI integration."""
    # TODO: Use quiz_engine with LangChain/OpenAI
    return QuizResponse(**PLACEHOLDER_QUIZ)


@app.get("/performance", response_model=PerformanceResponse)
async def get_performance():
    """Get study analytics and recommendations."""
    return PerformanceResponse(**PLACEHOLDER_PERFORMANCE)


@app.get("/health")
async def health():
    return {"status": "ok"}
