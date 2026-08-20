// Beginner-friendly Calendar view listing activity for the last 14 days.

import React from 'react';
import { Card } from '../../components/ui/card';
import type { JournalEntry, MoodLog } from '../../types';
import { getLastNDaysDates, formatReadableDate } from '../../utils/dateUtils';
import './CalendarView.css';

interface CalendarViewProps {
  entries: JournalEntry[];
  moodLogs: MoodLog[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ entries, moodLogs }) => {
  const datesList = getLastNDaysDates(14);

  return (
    <Card className="calendar-container">
      <h3 className="calendar-header">Activity History (Last 14 Days)</h3>

      <div className="calendar-list">
        {datesList.map((dateStr) => {
          const entryMatch = entries.find((e) => e.date === dateStr);
          const moodMatch = moodLogs.find((m) => m.date === dateStr);

          return (
            <div key={dateStr} className="calendar-day-row">
              <span className="calendar-day-date">{formatReadableDate(dateStr)}</span>

              <div className="calendar-day-status">
                {moodMatch ? (
                  <span className="status-badge" title={moodMatch.label}>
                    Mood: {moodMatch.label}
                  </span>
                ) : (
                  <span className="status-badge" style={{ opacity: 0.5 }}>No mood</span>
                )}

                {entryMatch ? (
                  <span className="status-badge status-badge-logged">
                    Journal Logged
                  </span>
                ) : (
                  <span className="status-badge status-badge-empty">No journal</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
