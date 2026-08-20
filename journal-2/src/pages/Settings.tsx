// Settings Page component: Theme toggle and clear storage options.

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import './Settings.css';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your journal entries and mood logs?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Manage app theme and storage preferences.</p>
      </div>

      <Card className="settings-section-card">
        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-label">App Appearance</span>
            <span className="settings-row-desc">Currently active theme: <strong>{theme}</strong></span>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />

        <div className="settings-row">
          <div className="settings-row-info">
            <span className="settings-row-label">Reset Local Storage</span>
            <span className="settings-row-desc">Permanently erase all saved entries and mood logs.</span>
          </div>
          <Button variant="ghost" onClick={handleClearData} style={{ color: 'var(--text-stressful)' }}>
            Clear All Data
          </Button>
        </div>
      </Card>
    </div>
  );
};
