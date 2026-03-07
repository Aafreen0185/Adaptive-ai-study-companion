# Adaptive AI Study Companion

A modern web app for students to upload syllabus PDFs, ask AI questions, generate quizzes, and track weak topics. Built for hackathon demos with a polished SaaS-style UI.

## Tech Stack

| Layer    | Tech                |
| -------- | ------------------- |
| Frontend | Next.js 14, TypeScript, Tailwind, shadcn-style UI |
| Backend  | Python FastAPI      |
| AI       | LangChain, OpenAI, FAISS (RAG pipeline) |

## Project Structure

```
adaptive-ai-study-companion/
├── frontend/           # Next.js App Router
│   ├── app/
│   │   ├── dashboard/
│   │   ├── study-assistant/
│   │   ├── quiz/
│   │   └── analytics/
│   ├── components/
│   └── lib/
├── backend/
│   ├── main.py         # FastAPI routes
│   ├── rag_pipeline.py # RAG Q&A
│   ├── quiz_engine.py  # Quiz generation
│   └── vector_store.py # FAISS
└── README.md
```

## Installation

### 1. Frontend

```bash
cd frontend
npm install
```

### 2. Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Environment (optional, for full AI features)

Create `backend/.env`:

```
OPENAI_API_KEY=sk-...
```

Create `frontend/.env.local` (for production API URL):

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

## Run Locally

### Terminal 1 – Backend

```bash
cd backend
.venv\Scripts\activate   # or source .venv/bin/activate on Mac/Linux
uvicorn main:app --reload --port 8000
```

### Terminal 2 – Frontend

```bash
cd frontend
npm run dev
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:8000  

The frontend proxies `/api/*` to `localhost:8000` in development.

## Features

| Page           | Description                                   |
| -------------- | --------------------------------------------- |
| Dashboard      | Study progress, weak topics, quizzes, activity |
| Study Assistant| Upload PDF, chat-style Q&A about syllabus      |
| Quiz Generator | AI-generated MCQs, interactive quiz UI        |
| Analytics      | Weak topics, progress chart, study plan       |

Placeholder data is used when the backend is not running or OpenAI is not configured, so the UI works for demos.

## Deployment

### Frontend → Vercel

1. Push repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo.
3. Set root directory: `frontend`.
4. Add env var: `NEXT_PUBLIC_API_URL=https://your-app.onrender.com`
5. Deploy.

### Backend → Render

1. Go to [render.com](https://render.com) → New → Web Service.
2. Connect your GitHub repo.
3. Settings:
   - Root directory: `backend`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Add env: `OPENAI_API_KEY` (and `CORS_ORIGINS` if needed)
4. Deploy.

### CORS

For production, set `CORS_ORIGINS` on Render to your Vercel URL, e.g.:

```
CORS_ORIGINS=https://adaptive-ai-study-companion.vercel.app
```

## API Endpoints

| Method | Endpoint       | Description                    |
| ------ | -------------- | ------------------------------ |
| POST   | `/upload`      | Upload syllabus PDF            |
| POST   | `/ask`         | Ask question (RAG)             |
| POST   | `/generate-quiz` | Generate MCQ quiz           |
| GET    | `/performance` | Analytics and recommendations  |
| GET    | `/health`      | Health check                   |
