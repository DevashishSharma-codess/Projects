# 🚀 GitHub Explorer (`git-project`)

A modern, high-performance web application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **TanStack React Query v5**. It provides real-time GitHub repository searching with autocomplete, debounced API calls, interactive repository filtering, and smooth pagination.

🔗 **Live Application URL**: [https://git-project-zeta.vercel.app/](https://git-project-zeta.vercel.app/)

---

## ✨ Features

- 🔍 **Real-Time Search Autocomplete**: Search GitHub repositories on the fly with live dropdown suggestions.
- ⚡ **Debounced API Requests**: Implements a custom `useDebounce` hook (350ms delay) to minimize network overhead and stay within GitHub API rate limits.
- 📦 **Smart In-Memory Caching**: Powered by `@tanstack/react-query` to cache query results (`staleTime`, `gcTime`) and eliminate unnecessary network refetches.
- 📑 **Smooth Paginated Repo Directory (`/repos`)**: Browse trending GitHub repositories with zero-layout-shift page transitions (`keepPreviousData`).
- 🎨 **Language & Metric Filtering**: Filter repositories by programming language (TypeScript, JavaScript, Python, C++, etc.) and sort by stars or forks.
- 💎 **Glassmorphism & Micro-animations**: Modern aesthetic featuring dark mode gradient glows, glass-effect components (`AuraGlassButton`), and `framer-motion` animations.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Core Framework** | [React 19](https://react.dev/), [TypeScript 6](https://www.typescriptlang.org/), [Vite 8](https://vitejs.dev/) |
| **Data Fetching & Cache** | [TanStack React Query v5](https://tanstack.com/query/latest) |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), Glassmorphism CSS |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/), [Remixicon](https://remixicon.com/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Linter** | [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Architecture

```text
src/
├── api/                   # GitHub REST API integrations
│   ├── fetchRepos.ts      # Trending repository fetcher & response types
│   └── searchRepos.ts     # Search endpoint fetcher
├── components/
│   ├── Section1/          # Hero section, Navbar & branding
│   ├── Section2/          # Featured repos section & AllReposPage directory
│   │   ├── AllReposPage.tsx
│   │   └── Section2.tsx
│   ├── common/            # Shared UI components
│   │   ├── AuraGlassButton.tsx
│   │   └── SearchAutocomplete.tsx
│   └── Footer.tsx         # Responsive footer component
├── hooks/                 # Custom React hooks
│   ├── useDebounce.ts     # Input debounce hook
│   ├── useRepos.ts        # React Query hook for paginated repos
│   └── useSearchRepos.ts  # React Query hook for autocomplete search
├── redux/                 # Redux state slices
├── store/                 # Store configuration
├── App.tsx                # Client-side routing configuration
└── main.tsx               # App entry point with Providers
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/DevashishSharma-codess/Projects.git
cd git-project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Available Scripts

- **`npm run dev`**: Starts the Vite development server with HMR.
- **`npm run build`**: Runs TypeScript type-check (`tsc -b`) and builds the production bundle with Vite.
- **`npm run preview`**: Locally previews the production build.
- **`npm run lint`**: Runs `oxlint` to check code quality.

---

## 🌐 Deployment

The application is deployed on Vercel and configured to automatically build and deploy changes pushed to the `main` branch.

- **Live URL**: [https://git-project-zeta.vercel.app/](https://git-project-zeta.vercel.app/)
