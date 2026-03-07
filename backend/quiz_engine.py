"""
AI quiz generation engine.
Uses LangChain + OpenAI to generate MCQ questions from syllabus content.
"""
import os
from typing import Optional

# Placeholder until full implementation
# Requires: OPENAI_API_KEY, syllabus content or vector store


def generate_quiz(topic: Optional[str] = None, num_questions: int = 5) -> dict:
    """
    Generate MCQ quiz questions from syllabus.
    Returns placeholder structure if OpenAI not configured.
    """
    if not os.getenv("OPENAI_API_KEY"):
        return {"questions": [], "topic": topic or "General"}
    # TODO: Retrieve relevant chunks, use OpenAI to generate MCQs
    return {"questions": [], "topic": topic or "General"}
