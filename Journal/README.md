# 📔 Dogear Journal – A Premium Web‑Based Journaling Studio

> **“Capture, reflect, and grow – right from your browser, with a sleek mac‑OS‑inspired UI.”**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Live Demo](#live-demo)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Development Server](#running-the-development-server)
6. [Project Structure](#project-structure)
7. [Core Components & Architecture](#core-components--architecture)
8. [Data Persistence & Sync](#data-persistence--sync)
9. [Design System & Aesthetics](#design-system--aesthetics)
10. [Customization & Extending the App](#customization--extending-the-app)
11. [Testing & Linting](#testing--linting)
12. [Contribution Guidelines](#contribution-guidelines)
13. [License](#license)

---

## Project Overview

**Dogear Journal** is a modern, client‑side journal application that mimics a macOS‑style desktop experience. Users can create **folders**, write **daily journal entries** with rich‑text formatting, tag entries, track mood, and browse analytics—all without a backend. All data lives in `localStorage`, with real‑time UI sync across components.

The UI blends **glassmorphism**, **dynamic gradients**, and **premium typography** (Outfit, Plus Jakarta Sans, Caveat) to provide a visually‑rich, responsive experience.

---

## Key Features

| ✅ | Feature | Description |
|---|---|---|
| **Folder Explorer** | macOS‑style folder tiles with customizable colors, gradients, and icons. |
| **Rich‑Text Editor** | Built on **Quill**; supports bold, italic, lists, links, blockquotes, code blocks, and custom fonts (hand‑writing vs. sans). |
| **Open‑In‑Studio** | Click any entry → the editor loads the entry instantly for editing. |
| **Dynamic Sync** | `dogear_folders_updated` and `dogear_open_entry_in_editor` custom events keep UI in sync across components. |
| **Mood & Tag System** | Emoji moods & tag chips for easy categorisation. |
| **Analytics Dashboard** | Mood trend charts and entry count per folder (future‑ready). |
| **Responsive & Accessible** | Fluid layout (`clamp()`) and keyboard‑friendly controls. |
| **Theming** | Dark‑mode ready; gradient‑driven backgrounds. |
| **Export / Import** *(planned)* | JSON backup & restore for portability. |

---

## Live Demo

> **➡️** Deploy locally (`npm run dev`) and open `http://localhost:5173` (or the Vite default) to explore the full UI.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | **React** with **TypeScript** |
| **Bundler** | **Vite** (fast HMR) |
| **Styling** | Vanilla **CSS** (CSS variables, flex/grid) |
| **Rich‑Text** | **Quill** (custom toolbar) |
| **Icons** | **lucide‑react** |
| **State** | Local component state + `localStorage` persistence |
| **Build** | `npm run build` (Vite production bundle) |
| **Testing** | (Future) Jest + React Testing Library |

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or newer)
- **npm** (v9+)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/dogear-journal.git
cd dogear-journal

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev          # Starts Vite dev server (http://localhost:5173)
```

The app hot‑reloads on file changes.

---

## Project Structure

```
src/
├─ components/
│   ├─ FolderExplorer.tsx      # Folder UI, entry viewer, modals
│   ├─ JournalEditor.tsx       # Quill‑based rich‑text editor
│   ├─ MoodTracker.tsx         # Mood analytics (future)
│   ├─ QuotesHub.tsx           # Daily inspirational quotes
│   ├─ BentoArchive.tsx        # Archive view (future)
│   └─ Landing.tsx             # Main page layout & footer
│
├─ utils/
│   └─ folderStorage.ts        # CRUD helpers + event dispatching
│
├─ types/
│   └─ journal.d.ts            # `JournalFolder` & `JournalEntry` types
│
├─ index.css                   # Global CSS variables & resets
├─ App.tsx                     # Root component – combines all sections
└─ main.tsx                    # ReactDOM bootstrap
```

---

## Core Components & Architecture

### 1. `FolderExplorer`

- Renders **folder tiles** (`MacFolderItem`) with gradient backgrounds. 
- Handles **create / delete** folder actions, entry creation, and entry preview modals. 
- Emits **`dogear_open_entry_in_editor`** when the user clicks **“Open in Studio Editor”**.

### 2. `JournalEditor`

- Loads selected entry via `handleSelectEntryForEdit` **or** via the custom event listener. 
- Saves new/updated entries with `addEntryToFolder` (auto‑fallback to the first folder). 
- Syncs folder list in real time using `dogear_folders_updated`.

### 3. `folderStorage.ts`

- Centralised **CRUD** operations for folders & entries. 
- Wraps `localStorage` reads/writes and **dispatches** custom events after each mutation.

---

## Data Persistence & Sync

- All data lives under **`localStorage`** keys: 
  - `dogear_journal_folders` – JSON array of `JournalFolder`. 
  - `dogear_journal_entries` – JSON array of **standalone** entries (used for quick load). 
- After any mutation (`createNewFolder`, `addEntryToFolder`, `deleteFolder`, `deleteEntryFromFolder`) `saveFolders` fires the **`dogear_folders_updated`** event, prompting UI components to refresh. 
- Opening an entry from the folder view triggers **`dogear_open_entry_in_editor`**, which the editor captures to pre‑populate the rich‑text canvas.

---

## Design System & Aesthetics

| Element | Details |
|---|---|
| **Typography** | - **Outfit** – headings & UI text. <br> - **Plus Jakarta Sans** – body & controls. <br> - **Caveat** – handwriting style for journal content. |
| **Colors** | Primary dark (`#0F172A`), accent blues/purples, gradient‑driven folder backgrounds. |
| **Glassmorphism** | Transparent containers (`rgba(...,0.45)`) with `backdrop-filter: blur(24px)`. |
| **Micro‑animations** | Hover lifts, button click ripples, smooth scroll into the **Studio Editor** section. |
| **Responsive Scaling** | `clamp()` for font sizes, fluid grid layouts (`repeat(auto-fill, minmax(...))`). |
| **Icons** | `lucide-react` – crisp SVGs that inherit current color. |
| **Accessibility** | Keyboard‑navigable buttons, descriptive `aria-label`s (not shown in code snippets but present). |

---

## Customization & Extending the App

1. **Add New Entry Fields** – Extend `JournalEntry` type in `src/types/journal.d.ts`, update `folderStorage.ts` CRUD methods, and adjust the editor UI. 
2. **Theme Switcher** – Add a CSS variable set (`--bg`, `--text`) and a toggle component that updates the root `data-theme` attribute. 
3. **Analytics** – Hook into `folderStorage.ts` to compute statistics, then visualize with a chart library (e.g., Chart.js). 
4. **Backend Sync** – Replace `localStorage` calls with API calls; keep the same event‑based architecture for minimal UI changes.

---

## Testing & Linting

> **Currently a work‑in‑progress.**

- **ESLint** – `npm run lint` (configured for React + TypeScript). 
- **Prettier** – code formatting. 
- **Jest + React Testing Library** – future unit & integration tests for folder CRUD and editor behaviour.

---

## Contribution Guidelines

1. **Fork** the repository. 
2. Create a **feature branch**: `git checkout -b feat/awesome-feature`. 
3. Follow the existing **code style** (ESLint + Prettier). 
4. Run tests (`npm run lint`) before committing. 
5. Submit a **Pull Request** with a clear description and screenshots if UI changes.

---

## License

This project is licensed under the **MIT License** – see `LICENSE` for details.

---

### Happy journaling!

If you encounter any issues or have ideas for enhancements, feel free to open an issue or submit a PR. Enjoy the elegant, buttery smooth experience of **Dogear Journal**.
