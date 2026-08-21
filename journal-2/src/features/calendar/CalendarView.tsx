/**
 * CalendarView.tsx - 14-Day Activity Calendar & History View
 */

import React from 'react';
import { Card } from '../../components/ui/card';
import type { JournalEntry, MoodLog } from '../../types';
import { getLastNDaysDates, formatReadableDate } from '../../utils/dateUtils';
import './CalendarView.css';

interface CalendarViewProps {
  entries: JournalEntry[];
  moodLogs: MoodLog[];
}

/**
 * CalendarView Component
 * 
 * @param entries - User's journal entries
 * @param moodLogs - User's mood logs
 */
export const CalendarView: React.FC<CalendarViewProps> = ({ entries, moodLogs }) => {
  // Generate list of the last 14 dates (YYYY-MM-DD)
  const datesList = getLastNDaysDates(14);

  return (
    <Card className="calendar-container">
      <h3 className="calendar-header">Activity History (Last 14 Days)</h3>

      <div className="calendar-list">
        {datesList.map((dateStr) => {
          // Check if user has an entry or mood log for this specific calendar day
          const entryMatch = entries.find((e) => e.date === dateStr);
          const moodMatch = moodLogs.find((m) => m.date === dateStr);

          return (
            <div key={dateStr} className="calendar-day-row">
              {/* Readable Date Label (e.g. "Aug 21, 2026") */}
              <span className="calendar-day-date">{formatReadableDate(dateStr)}</span>

              {/* Status Badges for Mood and Journal */}
              <div className="calendar-day-status">
                {/* Mood Status Badge */}
                {moodMatch ? (
                  <span className="status-badge" title={`Mood: ${moodMatch.label}`}>
                    Mood: {moodMatch.label}
                  </span>
                ) : (
                  <span className="status-badge" style={{ opacity: 0.5 }}>
                    No mood
                  </span>
                )}

                {/* Journal Status Badge */}
                {entryMatch ? (
                  <span className="status-badge status-badge-logged">
                    Journal Logged
                  </span>
                ) : (
                  <span className="status-badge status-badge-empty">
                    No journal
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
