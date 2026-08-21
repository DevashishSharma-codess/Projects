/**
 * Calendar.tsx - Activity Calendar History Page
 * 
 * Renders the 14-day chronological activity breakdown connecting
 * journal reflection status and mood logs for each day.
 */

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CalendarView } from '../features/calendar/CalendarView';
import './Calendar.css';

/**
 * CalendarPage Component
 * 
 * View for inspecting past daily habit consistency and journal activity.
 */
export const CalendarPage: React.FC = () => {
  // Extract entries and mood logs from global state
  const { entries, moodLogs } = useContext(AppContext);

  return (
    <div className="calendar-page">
      {/* Page Title Header */}
      <div className="calendar-page-header">
        <h1 className="calendar-page-title">Activity Calendar</h1>
        <p className="calendar-page-subtitle">View your entries and moods logged over the recent weeks.</p>
      </div>

      {/* 14-Day Calendar Timeline */}
      <CalendarView entries={entries} moodLogs={moodLogs} />
    </div>
  );
};
