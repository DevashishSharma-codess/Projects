// Navigation bar component using simple React Router Links.

import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LayoutDashboard, BookOpen, Smile, Calendar, Settings, Sun, Moon, Sparkles, Home } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useContext(AppContext);
  const location = useLocation();

  // Helper to check if a route path is currently active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isLanding = location.pathname === '/';

  return (
    <header className={`navbar ${isLanding ? 'navbar-landing' : ''}`}>
      {/* App Logo & Title linking to Landing */}
      <Link to="/" className="navbar-brand">
        <Sparkles size={20} className="brand-icon" />
        <span>MindfulJournal</span>
      </Link>

      {/* Navigation Links using React Router Link */}
      <nav className="navbar-links">
        <Link
          to="/"
          className={`nav-button ${isActive('/') ? 'active' : ''}`}
        >
          <Home size={17} />
          <span>Home</span>
        </Link>

        <Link
          to="/dashboard"
          className={`nav-button ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <LayoutDashboard size={17} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/journal"
          className={`nav-button ${isActive('/journal') ? 'active' : ''}`}
        >
          <BookOpen size={17} />
          <span>Journal</span>
        </Link>

        <Link
          to="/mood"
          className={`nav-button ${isActive('/mood') ? 'active' : ''}`}
        >
          <Smile size={17} />
          <span>Mood</span>
        </Link>

        <Link
          to="/calendar"
          className={`nav-button ${isActive('/calendar') ? 'active' : ''}`}
        >
          <Calendar size={17} />
          <span>Calendar</span>
        </Link>

        <Link
          to="/settings"
          className={`nav-button ${isActive('/settings') ? 'active' : ''}`}
        >
          <Settings size={17} />
          <span>Settings</span>
        </Link>

        {/* Theme mode toggle button */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title="Toggle Light/Dark Theme"
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
        </button>
      </nav>
    </header>
  );
};
