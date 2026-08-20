// Mood Trends Page component: Mood Picker + Analytics Chart + Average Mood score.

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MoodPicker } from '../features/mood/MoodPicker';
import { MoodChart } from '../features/mood/MoodChart';
import { Card } from '../components/ui/card';
import { calculateAverageMood, calculateWeeklyTopScore } from '../utils/moodCalculations';
import { getTodayDateString } from '../utils/dateUtils';
import './MoodTrends.css';

export const MoodTrends: React.FC = () => {
  const { moodLogs, addMoodLog } = useContext(AppContext);

  const todayDate = getTodayDateString();
  const todayMood = moodLogs.find((m) => m.date === todayDate);

  const avgMood = calculateAverageMood(moodLogs);
  const weeklyTop = calculateWeeklyTopScore(moodLogs);

  return (
    <div className="mood-trends-page">
      <div className="mood-trends-header">
        <h1 className="mood-trends-title">Mood Analytics</h1>
        <p className="mood-trends-subtitle">Track your emotional well-being over time.</p>
      </div>

      <MoodPicker currentMoodLog={todayMood} onSaveMood={addMoodLog} />

      <div className="stat-grid">
        <Card>
          <span className="stat-card-title">Average Mood Score</span>
          <div className="stat-card-value">{avgMood} / 5</div>
        </Card>

        <Card>
          <span className="stat-card-title">Weekly Top Score</span>
          <div className="stat-card-value">
            {weeklyTop.topScore} / 5
            {weeklyTop.topScore > 0 && (
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                ({weeklyTop.topMood})
              </span>
            )}
          </div>
        </Card>

        <Card>
          <span className="stat-card-title">Total Days Logged</span>
          <div className="stat-card-value">{moodLogs.length} days</div>
        </Card>
      </div>

      <MoodChart moodLogs={moodLogs} />
    </div>
  );
};
