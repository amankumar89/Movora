# Movora

An elegant, fast, and responsive movie discovery web app built with React, Vite, and TypeScript. Movora uses The Movie Database (TMDB) API to search and explore movies, view popular/trending/top-rated/upcoming lists, and see detailed movie information.

---

## 🚀 Features

- Search movies with debounce and instant results
- Trending, Popular, Top Rated, and Upcoming categories
- Trending toggle (Today / This Week)
- Responsive grid with movie cards and ratings
- Movie details modal with full details and cast information
- Smooth UI powered by Tailwind CSS + DaisyUI

---

## 🧭 Tech Stack

- React + TypeScript
- Vite (bundler)
- Tailwind CSS + DaisyUI for UI/styling
- Axios for HTTP requests
- Lucide React icons
- TMDB API for movie data

---

## 📦 Prerequisites

- Node.js 18+ (or compatible LTS)
- npm (or yarn)

---

## 🔧 Getting Started (Local Dev)

1. Clone the repo:

```bash
git clone <repo-url>
cd Movora
```

2. Install dependencies:

```bash
npm install
```

3. Create a TMDB API Key:

   - Register for an account at https://www.themoviedb.org/ and obtain an API key (v3/v4 as needed).

4. Add the API key to a `.env` file (recommended) using a Vite env variable, and update `src/services/tmdb.ts` to use that env var instead of a hard-coded key.

Example `.env` (root folder):

```env
VITE_TMDB_API_KEY="your_tmdb_api_key_here"
```

Then, in `src/services/tmdb.ts`, update the key usage like so:

```ts
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "<fallback-if-any>";
```

> ⚠️ Note: The current repo contains a hard-coded API key at `src/services/tmdb.ts`. For security, don't commit your API keys — use environment variables instead.

5. Start the dev server:

```bash
npm run dev
```

Open http://localhost:5173 (or the displayed address) to view the app.

---

## 📁 Project Structure

- `index.html` — HTML entry file
- `src/main.tsx` — React entry
- `src/App.tsx` — Main layout and top-level components
- `src/index.css` — Tailwind entry (plus DaisyUI)
- `src/components/` — Reusable components (SearchBar, CategoryTabs, MovieGrid, MovieCard, MovieModal)
- `src/hooks/useMovies.ts` — Custom hook to manage movie fetching and search
- `src/services/tmdb.ts` — Axios client and wrapper functions for TMDB API
- `src/types/` — TypeScript types for Movie / API responses
- `vite.config.ts`, `tailwind.config.js`, `postcss.config.js` — Build & styling configs

---

## 💻 Scripts

- `npm run dev` — Start local dev server
- `npm run build` — Build production bundle
- `npm run preview` — Preview built app
- `npm run lint` — Run ESLint

---

## 🛠️ Development Notes & Suggestions

- Replace the hard-coded TMDB API key with `import.meta.env.VITE_TMDB_API_KEY` and add `.env` to `.gitignore`.
- Add simple pagination or infinite scroll for larger result sets.
- Add caching behavior or swr/react-query for performance and offline experience.
- Add unit and E2E tests (Vitest / Cypress) for stability.
- Add CI (GitHub Actions) to run lint/build/test on PRs.

---

## ✅ Contributing

Contributions are welcome — please open an issue or create a PR. Keep changes small, documented, and helpful.

---

## 📃 License

This project is open-source — choose a license file (MIT recommended). If you want me to add a `LICENSE` file, tell me which license you prefer and I'll add it.

---

## ⚠️ Security Note

The repository currently contains a TMDB API key in `src/services/tmdb.ts`. Replace it with a Vite environment variable and rotate the key if it is sensitive.

---

If you'd like, I can also:

- Add `.env` support and demonstrate how to safely load the key
- Add a sample `.env.example` template
- Add a `LICENSE` file (e.g., MIT), or tests and CI

Let me know which items you'd like next — I can implement any of them for you. 🙌
