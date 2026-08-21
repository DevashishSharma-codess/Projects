/**
 * App.tsx - Root Application Component & Layout Shell
 * 
 * Responsibilities:
 * - Wraps the entire application tree inside AppProvider for global state access (theme, journal entries, mood logs).
 * - Renders the top navigation bar (Navbar) across all views.
 * - Configures client-side page routing using React Router (Routes & Route).
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { MoodTrends } from './pages/MoodTrends';
import { CalendarPage } from './pages/Calendar';
import { Settings } from './pages/Settings';
import './styles/globals.css';
import './App.css';

/**
 * AppContent Component
 * 
 * Houses the structural layout:
 * - Top sticky navigation header (<Navbar />)
 * - Main viewport container (<main className="main-content">) which renders active route components
 */
export const AppContent: React.FC = () => {
  return (
    <div className="app-container">
      {/* Persistent top navigation bar */}
      <Navbar />

      {/* Main content area containing page routes */}
      <main className="main-content">
        <Routes>
          {/* Landing / Welcome Hero Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Core Dashboard Bento Overview (Daily quote, charts, mood selector, recent entries) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Daily Journal Editor & Past Reflection Log */}
          <Route path="/journal" element={<Journal />} />

          {/* Mood Analytics & Trend Charts */}
          <Route path="/mood" element={<MoodTrends />} />

          {/* Activity Calendar History over the last 14 days */}
          <Route path="/calendar" element={<CalendarPage />} />

          {/* User Preferences (Theme toggle & storage reset) */}
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

/**
 * Main App Root
 * 
 * Provides the global AppProvider context wrapper to supply state to all sub-components.
 */
export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
