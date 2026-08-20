// Calendar Page component: activity timeline over the last 14 days.

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CalendarView } from '../features/calendar/CalendarView';
import './Calendar.css';

export const CalendarPage: React.FC = () => {
  const { entries, moodLogs } = useContext(AppContext);

  return (
    <div className="calendar-page">
      <div className="calendar-page-header">
        <h1 className="calendar-page-title">Activity Calendar</h1>
        <p className="calendar-page-subtitle">View your entries and moods logged over the recent weeks.</p>
      </div>

      <CalendarView entries={entries} moodLogs={moodLogs} />
    </div>
  );
};
