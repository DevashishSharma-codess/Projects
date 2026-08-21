import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import {
  Home,
  LayoutDashboard,
  BookOpen,
  Smile,
  Calendar,
  Settings,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";

import "./Navbar.css";

export function Navbar() {

  // Get theme and toggle function from context
  const { theme, toggleTheme } = useContext(AppContext);

  // Get current URL
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className={`navbar ${isLanding ? "navbar-landing" : ""}`}>
      {/* Logo */}
      <Link to="/" className="navbar-brand">
        <Sparkles size={20} />
        <span>MindfulJournal</span>
      </Link>

      <nav className="navbar-links">

        <Link
          to="/"
          className={location.pathname === "/" ? "nav-button active" : "nav-button"}
        >
          <Home size={16} />
          Home
        </Link>

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "nav-button active" : "nav-button"}
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>

        <Link
          to="/journal"
          className={location.pathname === "/journal" ? "nav-button active" : "nav-button"}
        >
          <BookOpen size={16} />
          Journal
        </Link>

        <Link
          to="/mood"
          className={location.pathname === "/mood" ? "nav-button active" : "nav-button"}
        >
          <Smile size={16} />
          Mood
        </Link>

        <Link
          to="/calendar"
          className={location.pathname === "/calendar" ? "nav-button active" : "nav-button"}
        >
          <Calendar size={16} />
          Calendar
        </Link>

        <Link
          to="/settings"
          className={location.pathname === "/settings" ? "nav-button active" : "nav-button"}
        >
          <Settings size={16} />
          Settings
        </Link>

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

      </nav>

    </header>
  );
}