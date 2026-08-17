const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db");

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

// 1. Bulletproof CORS Header & Preflight Interceptor for Vercel Serverless
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization, Cookie");
  res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");

  // Instantly resolve browser preflight OPTIONS requests before DB connection
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// 2. Cors package fallback
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// 3. DB Connection Middleware (Runs AFTER CORS setup so DB errors never block CORS headers)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("[DB MIDDLEWARE ERROR]", error.message);
    res.status(500).json({ message: "Database connection error", error: error.message });
  }
});

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log("[REQUEST] Origin:", req.get("origin"));
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = app;