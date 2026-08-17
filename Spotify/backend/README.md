# ⚙️ Spotify Backend – REST API Service

[![Live Backend API](https://img.shields.io/badge/Live_Backend_API-spotify--be--seven.vercel.app-121212?style=for-the-badge&logo=express)](https://spotify-be-seven.vercel.app/)

Official Backend API URL: **[https://spotify-be-seven.vercel.app/](https://spotify-be-seven.vercel.app/)**  
Official Frontend Application: **[https://spotify-fe-weld.vercel.app/](https://spotify-fe-weld.vercel.app/)**

---

## 🎧 Overview

The backend service for the Spotify application built with **Node.js**, **Express 5**, **MongoDB Atlas**, and **ImageKit**. Manages audio track uploads, user authentication, and CORS preflight handling for Vercel serverless deployments.

---

## 🌐 Live Service Endpoints

- ⚙️ **API Root**: `https://spotify-be-seven.vercel.app/`
- 🎵 **Music Feed API**: `GET /api/music`
- 🎙️ **Upload Music API**: `POST /api/music` (Artist role required)
- 🔑 **Auth API**: `POST /api/auth/register`, `POST /api/auth/login`

---

## 🛠️ Key Technical Features

- **Pre-Flight OPTIONS CORS Interceptor**: Instant 200 OK handling for cross-origin preflights before DB connection logic.
- **ImageKit Storage Integration**: Direct cloud buffer uploads for artist audio files.
- **JWT & Role Authentication**: Dual-role user and artist permission control.

---

## 🚀 Local Development

```bash
npm install
node server.js
```
