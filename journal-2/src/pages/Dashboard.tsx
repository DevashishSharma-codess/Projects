/**
 * Dashboard.tsx - Main User Dashboard with Bento Grid Layout
 * 
 * Aggregates core widgets into a modern Bento Grid:
 * 1. Hero Header greeting the user.
 * 2. Tile 1 (QuoteCard): Daily inspirational reflection.
 * 3. Tile 2 (MoodChart): Weekly mood activity graph.
 * 4. Tile 3 (MoodPicker): Interactive mood check-in widget.
 * 5. Tile 4 (EntryList): Quick preview of the 3 most recent journal entries.
 */

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

  // Retrieve today's date string and check if a mood has already been logged today
  const todayDate = getTodayDateString();
  const todayMood = moodLogs.find((m) => m.date === todayDate);

  // Slice the 3 most recent entries for compact overview display
  const recentEntries = entries.slice(0, 3);

  return (
    <div className="dashboard-page">
      {/* 1. Light-Weight Hero Heading */}
      <div className="dashboard-hero">
        <h1 className="dashboard-title">Your Mindful Space</h1>
        <p className="dashboard-subtitle">
          Pause, reflect, and track how your thoughts unfold today.
        </p>
      </div>

      {/* 2. Bento Grid Section */}
      <div className="dashboard-bento-grid">
        {/* Bento Tile 1: Daily Featured Quote */}
        <div className="bento-tile bento-quote">
          <QuoteCard />
        </div>

        {/* Bento Tile 2: Mood Activity Bar Graph */}
        <div className="bento-tile bento-chart">
          <MoodChart moodLogs={moodLogs} />
        </div>

        {/* Bento Tile 3: Mood Check-in Widget */}
        <div className="bento-tile bento-mood">
          <MoodPicker currentMoodLog={todayMood} onSaveMood={addMoodLog} />
        </div>

        {/* Bento Tile 4: Recent Reflections List */}
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
