# 📔 Dogear Journal – Technical Documentation

[![Live Production App](https://img.shields.io/badge/Live_App-dogear--theta.vercel.app-10B981?style=for-the-badge&logo=vercel)](https://dogear-theta.vercel.app/)
[![Spotify Soundscapes](https://img.shields.io/badge/Spotify_Integration-spotify--fe--weld.vercel.app-1DB954?style=for-the-badge&logo=spotify)](https://spotify-fe-weld.vercel.app/)

> **"Capture, reflect, and grow – right from your browser with a sleek macOS-inspired glassmorphic UI."**

Official Production URL: **[https://dogear-theta.vercel.app/](https://dogear-theta.vercel.app/)**

---

## 📋 Table of Contents

- [Live Deployments & Integration](#-live-deployments--integration)
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Mood Soundscapes & Spotify Redirection](#-mood-soundscapes--spotify-redirection)
- [Getting Started & Development](#-getting-started--development)

---

## 🌐 Live Deployments & Integration

- 📔 **Dogear Journal Web App**: [https://dogear-theta.vercel.app/](https://dogear-theta.vercel.app/)
- 🎧 **Spotify Web App Integration**: [https://spotify-fe-weld.vercel.app/](https://spotify-fe-weld.vercel.app/)

---

## ☕ Overview

**Dogear Journal** is a client-side journaling application featuring a macOS desktop glassmorphic design. Built with **React 19**, **TypeScript 6**, **Vite 8**, **TanStack React Query**, **Recharts**, and **Lucide Icons**, it provides personal writing, emotional tracking, and reflection tools.

---

## ✨ Key Features

- 📁 **macOS-Style Folder Explorer**: Customizable folder cards, gradient themes, search filtering, and list/grid layouts.
- ✍️ **Rich-Text Studio Editor**: Built with `react-quill-new` featuring custom toolbars, typography options (Sans, Handwriting, Serif), mood chips, auto-save status, and character/word counters.
- 📊 **Mood & Wellness Tracker**: Calendar heatmaps, hourly slotting, Recharts analytics, and integrated box breathing exercises.
- 🎵 **Mood Soundscapes & Spotify Redirection**: Recommends tunes based on your mood (Radiant, Peaceful, Focused, Energetic, Stressed, Low Energy) and redirects directly to Our Spotify web app ([`https://spotify-fe-weld.vercel.app/`](https://spotify-fe-weld.vercel.app/)).
- 💬 **Quotes Portal**: Powered by React Query, fetching inspirational quotes with typewriter animations and local bookmarking.
- 🍱 **Bento Archive Grid**: Modern bento layout displaying stats, folder breakdowns, timelines, and tag clouds.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 19, TypeScript 6, Vite 8
- **State & Data**: React Context API, TanStack React Query v5, LocalStorage reactive sync
- **Styling**: Vanilla CSS, Glassmorphism, Tailwind CSS, Lucide Icons
- **Analytics & Visuals**: Recharts, Canvas Confetti

---

## 🎵 Mood Soundscapes & Spotify Redirection

Selecting a mood in the *Mood Music & Soundscapes* widget dynamically generates direct links to **Our Spotify Project** (`https://spotify-fe-weld.vercel.app/?mood=...&from=journal&notice=artist`).

When redirected to Spotify:
1. The corresponding mood playlist automatically opens.
2. Users can play soundscapes or create custom playlists.
3. Sound designers and creators are invited to **Sign Up as an Artist** to upload their own tracks.

---

## 🚀 Getting Started & Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/enacton-interns/Devashish-Repo.git
   cd Journal
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   VITE_SPOTIFY_APP_URL=https://spotify-fe-weld.vercel.app
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```
