const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db");

const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

const corsOrigin = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
console.log('[CORS] Configured origin:', corsOrigin);

// Middleware
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);

// DB Connection Middleware for Serverless & Standalone deployments
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('[DB MIDDLEWARE ERROR]', error.message);
    res.status(500).json({ message: "Database connection error", error: error.message });
  }
});

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('[REQUEST] Origin:', req.get('origin'));
  next();
});

app.use(express.json());
app.use(cookieParser());

// Serve uploaded music static files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = app;