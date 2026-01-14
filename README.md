# Movora

An elegant, fast, and responsive movie discovery web app built with React, Vite, and TypeScript. Movora uses The Movie Database (TMDB) API to search and explore movies, view popular/trending/top-rated/upcoming lists, and see detailed movie information.

---

## 🎯 Live Demo (Try it now)

Experience Movora instantly in your browser (deployed on Netlify):

- [Live Demo](https://movora-movie-app.netlify.app)

Open one of the URLs above to jump straight into the app and try searching, browsing categories, and viewing movie details.

---

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

## 🔗 Live Demo

You can see the app deployed on Vercel at the following URLs:

- https://movora-tau.vercel.app/
- https://movora-git-main-amankumar89s-projects.vercel.app/
- https://movora-4i4dwu8o0-amankumar89s-projects.vercel.app/

> Note: These are valid Vercel deployments — they may represent preview builds or different branches/projects.

---

## 🖼️ Screenshots

Below is a sample screenshot of Movora. Replace `public/screenshot.svg` with a real screenshot (PNG/JPG) if you want a higher fidelity image.

![Movora screenshot](public/screenshot.svg)

To replace this screenshot:

1. Open your deployed site or run it locally in your browser.
2. Take a screenshot (use OS or browser dev tools).
3. Save it as `screenshot.png` (or .jpg) and add it to the `public/` folder.
4. Commit and push; the README will render your new file instead of the SVG placeholder.

---

## 📤 Deploying to Vercel

You can deploy this project to Vercel (or any static site host) easily:

1. If you haven't already, sign in to https://vercel.com and connect your GitHub repository.
2. Create a new project, select the `Movora` repository, and configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add `VITE_TMDB_API_KEY` as an Environment Variable (Project Settings → Environment Variables). Use `Production` and `Preview` as needed.
4. Deploy — Vercel automatically builds and deploys your app. Every push to enabled branches will trigger a new deployment.

### Tip
If you see multiple deployments, Vercel may be producing a preview for a PR or branch — you can set which branch is the default production branch in the Vercel Project settings.

---


---

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
