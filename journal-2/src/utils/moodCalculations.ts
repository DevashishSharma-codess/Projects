// Simple calculation functions for mood statistics.
// Scores: 1 = Sad, 2 = Anxious, 3 = Okay, 4 = Good, 5 = Great

import type { MoodLog } from '../types/mood.types';
import { getLastNDaysDates, formatReadableDate } from './dateUtils';

// Calculate overall average mood score
export function calculateAverageMood(moodLogs: MoodLog[]): number {
  if (moodLogs.length === 0) {
    return 0;
  }

  let totalScore = 0;
  for (let i = 0; i < moodLogs.length; i++) {
    totalScore = totalScore + moodLogs[i].score;
  }

  const average = totalScore / moodLogs.length;
  return Math.round(average * 10) / 10;
}

// Calculate the highest (top) mood score recorded in the last 7 days
export function calculateWeeklyTopScore(moodLogs: MoodLog[]): { topScore: number; topMood: string } {
  if (moodLogs.length === 0) {
    return { topScore: 0, topMood: 'None' };
  }

  const last7Dates = getLastNDaysDates(7);
  const weeklyLogs = moodLogs.filter((log) => last7Dates.includes(log.date));

  if (weeklyLogs.length === 0) {
    return { topScore: 0, topMood: 'None' };
  }

  let topScore = 0;
  let topMood = 'None';

  for (let i = 0; i < weeklyLogs.length; i++) {
    if (weeklyLogs[i].score > topScore) {
      topScore = weeklyLogs[i].score;
      topMood = weeklyLogs[i].label;
    }
  }

  return { topScore, topMood };
}

// Prepare data for line chart display
export function prepareMoodChartData(moodLogs: MoodLog[]) {
  const last14Dates = getLastNDaysDates(14);
  const chartData = [];

  for (let i = 0; i < last14Dates.length; i++) {
    const dateStr = last14Dates[i];
    
    let match: MoodLog | undefined = undefined;
    for (let j = 0; j < moodLogs.length; j++) {
      if (moodLogs[j].date === dateStr) {
        match = moodLogs[j];
        break;
      }
    }

    const readableLabel = formatReadableDate(dateStr).split(',')[0];

    chartData.push({
      date: readableLabel,
      score: match ? match.score : null,
      label: match ? match.label : 'No Entry'
    });
  }

  return chartData;
}
