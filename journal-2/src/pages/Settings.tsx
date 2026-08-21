/**
 * Settings.tsx - Application Settings & Preferences Page
 * 
 * Provides controls for:
 * 1. Switching between Light and Dark theme modes.
 * 2. Resetting / clearing all saved local storage entries and mood logs.
 */

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import './Settings.css';

/**
 * Settings Component
 * 
 * Manages user preferences and storage cleanup.
 */
export const Settings: React.FC = () => {
  // Access current theme and toggle function from AppContext
  const { theme, toggleTheme } = useContext(AppContext);

  /**
   * Prompts user for confirmation before wiping browser localStorage
   * and refreshing the application to restore initial clean state.
   */
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your journal entries and mood logs?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="settings-page">
      {/* 1. Page Header */}
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage app theme and storage preferences.</p>
      </div>

      {/* 2. Main Settings Options Card */}
      <Card className="settings-section-card">
        {/* Row 1: App Theme Toggle */}
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-label">App Appearance</span>
            <span className="settings-row-desc">
              Currently active theme: <strong>{theme}</strong>
            </span>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>

        {/* Visual Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

        {/* Row 2: Reset / Clear Local Storage */}
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-label">Reset Local Storage</span>
            <span className="settings-row-desc">
              Permanently erase all saved entries and mood logs.
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={handleClearData}
            style={{ color: 'var(--text-stressful)' }}
          >
            Clear All Data
          </Button>
        </div>
      </Card>
    </div>
  );
};
