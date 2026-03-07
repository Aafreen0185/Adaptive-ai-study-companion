"""
FAISS vector store for syllabus embeddings.
Stores and retrieves chunks for RAG.
"""
import os
from pathlib import Path
from typing import Optional

# Placeholder until full implementation
# Requires: langchain, faiss-cpu, langchain-openai

VECTOR_STORE_DIR = Path(__file__).parent.parent / "vector_store"


def create_from_pdf(pdf_path: str) -> Optional[str]:
    """
    Extract text from PDF, chunk, embed, save to FAISS.
    Returns path to saved index.
    """
    if not os.getenv("OPENAI_API_KEY"):
        return None
    # TODO: pypdf extract, RecursiveCharacterTextSplitter, OpenAIEmbeddings, FAISS
    return None


def load_store(path: str):
    """
    Load FAISS vector store from disk.
    """
    # TODO: FAISS.load_local
    return None
