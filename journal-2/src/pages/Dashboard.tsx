// Dashboard Page: Beautiful Hero Header, Bento Grid (Quote, Mood Picker, Mood Bar Chart, Recent Reflections).

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { QuoteCard } from '../features/quotes/QuoteCard';
import { MoodPicker } from '../features/mood/MoodPicker';
import { MoodChart } from '../features/mood/MoodChart';
import { EntryList } from '../features/journal/EntryList';
import { getTodayDateString } from '../utils/dateUtils';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { entries, moodLogs, addMoodLog } = useContext(AppContext);

  const todayDate = getTodayDateString();
  const todayMood = moodLogs.find((m) => m.date === todayDate);
  const recentEntries = entries.slice(0, 3);

  return (
    <div className="dashboard-page">
      {/* 1. Big Light-Weight Hero Heading */}
      <div className="dashboard-hero">
        <h1 className="dashboard-title">Your Mindful Space</h1>
        <p className="dashboard-subtitle">
          Pause, reflect, and track how your thoughts unfold today.
        </p>
      </div>

      {/* 2. Bento Grid Section */}
      <div className="dashboard-bento-grid">
        {/* Bento Tile 1: EnactOn Inspired Featured Quote (Span 7) */}
        <div className="bento-tile bento-quote">
          <QuoteCard />
        </div>

        {/* Bento Tile 2: Mood Bar Graph (Span 5) */}
        <div className="bento-tile bento-chart">
          <MoodChart moodLogs={moodLogs} />
        </div>

        {/* Bento Tile 3: Mood Check-in (Span 6) */}
        <div className="bento-tile bento-mood">
          <MoodPicker currentMoodLog={todayMood} onSaveMood={addMoodLog} />
        </div>

        {/* Bento Tile 4: Recent Reflections (Span 6) */}
        <div className="bento-tile bento-recent">
          <div className="bento-recent-card">
            <div className="bento-recent-header">
              <h3 className="bento-recent-title">Recent Reflections</h3>
            </div>
            <EntryList entries={recentEntries} />
          </div>
        </div>
      </div>
    </div>
  );
};
