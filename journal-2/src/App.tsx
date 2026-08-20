// Main Application Container component with React Router Routes.

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

export const AppContent: React.FC = () => {
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Page Content rendered by React Router */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/mood" element={<MoodTrends />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
