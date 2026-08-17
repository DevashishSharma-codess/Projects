# 🎧 Spotify Clone – Full-Stack Web Application

[![Live Frontend App](https://img.shields.io/badge/Live_Frontend-spotify--fe--weld.vercel.app-1DB954?style=for-the-badge&logo=vercel)](https://spotify-fe-weld.vercel.app/)
[![Live Backend API](https://img.shields.io/badge/Live_Backend_API-spotify--be--seven.vercel.app-121212?style=for-the-badge&logo=express)](https://spotify-be-seven.vercel.app/)

> **"A full-stack Spotify clone featuring dark glassmorphic Apple UI, mood soundscape integration with Mood Journal, custom user playlists, and artist music upload studios."**

Official Frontend URL: **[https://spotify-fe-weld.vercel.app/](https://spotify-fe-weld.vercel.app/)**  
Official Backend API: **[https://spotify-be-seven.vercel.app/](https://spotify-be-seven.vercel.app/)**

---

## 📋 Table of Contents

- [Live Deployments](#-live-deployments)
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Mood Journal Integration](#-mood-journal-integration)
- [Getting Started & Local Development](#-getting-started--local-development)

---

## 🌐 Live Deployments

- 🎵 **Spotify Frontend Web App**: [https://spotify-fe-weld.vercel.app/](https://spotify-fe-weld.vercel.app/)
- ⚙️ **Spotify Backend REST API**: [https://spotify-be-seven.vercel.app/](https://spotify-be-seven.vercel.app/)
- 📓 **Dogear Mood Journal App**: [https://dogear-theta.vercel.app/](https://dogear-theta.vercel.app/)

---

## 🎧 Overview

This repository contains the full-stack **Spotify Web Application**, built with **React 19**, **Vite 8**, **Node.js**, **Express**, **MongoDB Atlas**, and **ImageKit**. Designed with a professional dark glassmorphic interface inspired by Spotify & Apple UI, it features seamless audio playback, mood soundscapes, artist upload studios, and custom playlist creation.

---

## ✨ Key Features

- 🎵 **Interactive Audio Player**: Bottom persistent player with play/pause, volume control, track scrubber, queue management, and next/prev controls.
- 🎨 **Dark Glassmorphic Apple UI**: Clean SVG icon typography, dark translucent panels, micro-hover animations, and minimal Spotify green accents.
- ➕ **Top Navigation & Sidebar Playlist Creator**: Users can create custom playlists via the top nav button or sidebar link, assign mood tags, select tracks, and save them.
- 🌿 **Pre-Seeded Mood Playlists**: Curated soundscapes matching Journal moods (Radiant, Peaceful, Focused, Energetic, Stressed, Low Energy).
- 🎙️ **Artist Studio & Audio Uploads**: Artists can upload MP3 audio files to ImageKit storage and publish tracks to the community music feed.
- 🔒 **Authentication & Role Access**: User and Artist role registration with JWT & cookie management.
- 🌐 **Vercel Edge CORS Handling**: Configured with dynamic CORS preflight interceptors for cross-origin access.

---

## 🛠️ Tech Stack & Architecture

### Frontend (`/frontend`)
- **React 19** + **Vite 8**
- **Axios** (with credentials & token interceptors)
- **Lucide Icons** (clean SVG iconography)
- **Vanilla CSS** (Custom dark glassmorphic design system)

### Backend (`/backend`)
- **Node.js** + **Express 5**
- **MongoDB Atlas** + **Mongoose**
- **ImageKit Node SDK** (Cloud audio file storage)
- **JWT Authentication** + **Cookie Parser** + **Multer**

---

## 📓 Mood Journal Integration

When users navigate from **Dogear Journal** ([`https://dogear-theta.vercel.app/`](https://dogear-theta.vercel.app/)), Spotify receives URL parameters (`?mood=radiant&from=journal&notice=artist`):

1. **Auto-Filtered Mood Feed**: Spotify automatically opens the pre-seeded playlist matching the user's journal mood.
2. **Artist Upload Notice Banner**: Displays a banner inviting music creators and sound designers to **Sign Up as an Artist** to upload their tracks.

---

## 🚀 Getting Started & Local Development

### 1. Clone & Setup
```bash
git clone https://github.com/enacton-interns/Devashish-Repo.git
cd Spotify
```

### 2. Frontend Development (`/frontend`)
```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Development (`/backend`)
```bash
cd ../backend
npm install
node server.js
```
