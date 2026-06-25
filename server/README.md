# AI Venture Studio Backend

Express/MongoDB backend for the existing AI Venture Studio frontend. It runs independently under `server/` and supports MongoDB fallback to in-memory storage when no database is available.

## Setup

1. Copy `server/.env.example` to `server/.env`.
2. Add keys only when ready:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GROQ_API_KEY`
   - `GROQ_MODEL`
   - `OLLAMA_BASE_URL`
   - `OLLAMA_MODEL`
   - `TAVILY_API_KEY`
   - `RESEND_API_KEY`, `RESEND_FROM`
   - `RESEND_REPLY_TO` is optional
3. Run from `server/`:

```bash
npm install
npm run dev
```

Demo login is seeded in fallback mode:

```text
founder@example.com
password123
```

## API

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects/:id/run`
- `POST /api/projects/:id/agents/:agentKey/approve`
- `POST /api/projects/:id/agents/:agentKey/regenerate`
- `POST /api/projects/:id/email`
- `GET /api/exports/:id/json`
- `GET /api/exports/:id/markdown`
- `GET /api/exports/:id/pdf`
- `POST /api/boardroom/debate`
- `GET /api/memory/search?q=term`
- `GET /api/analytics`

Protected routes require:

```text
An authenticated httpOnly `avs_token` cookie set by `/api/auth/login` or `/api/auth/register`.
```
