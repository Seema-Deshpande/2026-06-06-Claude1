# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ThreadHive** is a Reddit-like discussion forum with two separate apps:

- `threadhive-backend/` — Node.js/Express REST API with MongoDB
- `threadhive-frontend/` — React SPA with Redux Toolkit and Vite

The project is a course assignment (Week 9 MLS). The `resources/prompts.md` file contains the two AI feature specifications to implement: **Thread Summary** and **Rephrase Text**, both using the Gemini API on the backend.

## Commands

### Backend (`threadhive-backend/`)

```bash
npm run dev        # Start with nodemon (auto-restart)
npm start          # Start with node
npm test           # Run all tests with vitest
npm run populate   # Seed MongoDB with sample data
npm run format     # Format with prettier
```

### Frontend (`threadhive-frontend/`)

```bash
npm run dev        # Start Vite dev server (http://localhost:5173)
npm run build      # Production build
npm run lint       # ESLint
npm test           # Run vitest tests
npm run test:ui    # Run tests with Vitest UI
npm run test:coverage  # Run tests with coverage report
```

## Environment Setup

Backend requires `threadhive-backend/.env` (copy from `.env.example`):

```
MONGODB_URI=mongodb://localhost:27017/w04Express
PORT=5000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=7d
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

The backend defaults to port `3000` if `PORT` is not set. The frontend's axios instance hardcodes `http://localhost:3000/api` as the base URL (`src/api/axiosInstance.js`).

## Architecture

### Backend

Layered architecture: `routes → controllers → services → models`

- `main.js` — entry point: loads `.env`, connects MongoDB, starts server
- `src/app.js` — Express app with helmet, rate-limiting, CORS, and route mounting
- `src/routes/` — route definitions that call controllers
- `src/controllers/` — HTTP request/response handling, delegates to services
- `src/services/` — business logic (auth, threads, comments, votes, subreddits)
- `src/models/` — Mongoose schemas: `User`, `Thread`, `Subreddit`, `Comment`
- `src/middleware/authHandler.js` — JWT verification middleware
- `src/middleware/errorHandler.js` — centralized error handling
- `src/utils/createAppError.js` — factory for structured error objects

All backend code uses **ES modules** (`"type": "module"` in package.json).

**Auth flow:** JWT tokens are issued on login/register. Protected routes use `authHandler.js` middleware to verify tokens.

### Backend Tests

Tests live in `tests/` and use **vitest** + **supertest** + **mongodb-memory-server**. The `tests/setup.js` spins up an in-memory MongoDB before all tests (60s timeout). Tests run sequentially (`fileParallelism: false`).

### Frontend

- `src/main.jsx` — mounts React app with Redux `<Provider>` and `<BrowserRouter>`
- `src/App.jsx` — top-level routing, sidebar visibility state, dark mode application
- `src/store/store.js` — Redux store with slices: `auth`, `threads`, `currentThread`, `comments`, `theme`, `subreddits`
- `src/reducers/` — Redux Toolkit slices (async thunks for API calls)
- `src/services/` — API call functions used by thunks
- `src/api/axiosInstance.js` — shared axios instance with base URL
- `src/config/apiConfig.js` — all API endpoint paths in one place
- `src/pages/` — full-page components: `Auth/Login`, `Auth/Register`, `User/Home`, `User/ThreadPage`, `User/Profile`
- `src/components/` — reusable UI components (Header, Sidebar, ThreadList, Comment, Forms, Shared)

**Auth state** is persisted in `localStorage` (token + user object) and re-hydrated into Redux on load (`authSlice.js` initial state reads from `localStorage`).

**Protected routes** use `<PrivateRoute>` which checks `state.auth.token`.

**Dark mode** is stored in `themeSlice` and applied by setting `data-theme="dark"` on `document.documentElement`.

### Frontend Tests

Tests use **vitest** + **@testing-library/react** + **msw** (Mock Service Worker) for API mocking. The `tests/setup.js` starts the MSW server before all tests.

## Adding a New Backend Route

1. Add the Mongoose model to `src/models/` if needed
2. Add business logic to `src/services/`
3. Add the controller to `src/controllers/`
4. Add routes to `src/routes/` and mount in `src/app.js`
5. Apply `authHandler` middleware to protected routes

## Adding AI (Gemini) Features

When adding Gemini API calls on the backend:
- The Gemini API key is loaded from `process.env.GEMINI_API_KEY` (set in `.env`)
- Create the Gemini client **after** `dotenv.config()` has run (i.e., inside a function, not at module load time)
- Add new AI endpoints to an appropriate route file or a dedicated `src/routes/ai.js`
