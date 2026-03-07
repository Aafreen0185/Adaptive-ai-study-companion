"""
RAG pipeline for syllabus Q&A.
Uses LangChain + OpenAI + FAISS for retrieval-augmented generation.
"""
import os
from typing import Optional

# Placeholder until full implementation
# Requires: OPENAI_API_KEY, vector store from vector_store.py


def answer_question(question: str, vector_store_path: Optional[str] = None) -> str:
    """
    Answer a question about the syllabus using RAG.
    Returns placeholder if OpenAI not configured.
    """
    if not os.getenv("OPENAI_API_KEY"):
        return "Configure OPENAI_API_KEY to enable AI-powered answers."
    # TODO: Load FAISS index, retrieve chunks, build prompt, call OpenAI
    return "RAG answer will appear here when configured."
