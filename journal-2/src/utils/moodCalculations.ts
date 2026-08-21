/**
 * moodCalculations.ts - Analytics & Statistical Aggregation for Mood Data
 * 
 * Provides pure helper functions for computing average mood scores,
 * finding weekly top highlights, and formatting time-series data
 * for Recharts graph visualization.
 * 
 * Score Scale Reference:
 * 1 = Sad | 2 = Anxious | 3 = Okay | 4 = Good | 5 = Great
 */

import type { MoodLog } from '../types/mood.types';
import { getLastNDaysDates, formatReadableDate } from './dateUtils';

/**
 * Computes the arithmetic mean of all recorded mood scores.
 * Rounds to one decimal place (e.g. 4.2).
 * 
 * @param moodLogs - Array of MoodLog records.
 * @returns Average score between 1.0 and 5.0, or 0 if empty.
 */
export function calculateAverageMood(moodLogs: MoodLog[]): number {
  if (moodLogs.length === 0) {
    return 0;
  }

  let totalScore = 0;
  for (let i = 0; i < moodLogs.length; i++) {
    totalScore = totalScore + moodLogs[i].score;
  }

  const average = totalScore / moodLogs.length;
  // Round to 1 decimal place (e.g. 4.25 -> 4.3)
  return Math.round(average * 10) / 10;
}

/**
 * Finds the highest mood score and its label recorded within the last 7 days.
 * 
 * @param moodLogs - Array of MoodLog records.
 * @returns Object containing the highest score and corresponding mood name (e.g. { topScore: 5, topMood: 'Great' }).
 */
export function calculateWeeklyTopScore(moodLogs: MoodLog[]): { topScore: number; topMood: string } {
  if (moodLogs.length === 0) {
    return { topScore: 0, topMood: 'None' };
  }

  const last7Dates = getLastNDaysDates(7);
  // Filter only logs recorded in the last 7 calendar days
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

/**
 * Prepares a continuous 14-day chronological time series array tailored for Recharts.
 * If a date has no recorded mood, it outputs a score of null to avoid false zero drops.
 * 
 * @param moodLogs - Array of recorded MoodLog records.
 * @returns Formatted data objects with date labels and scores for chart plotting.
 */
export function prepareMoodChartData(moodLogs: MoodLog[]) {
  const last14Dates = getLastNDaysDates(14);
  const chartData = [];

  for (let i = 0; i < last14Dates.length; i++) {
    const dateStr = last14Dates[i];
    
    // Find matching mood log for this specific date
    let match: MoodLog | undefined = undefined;
    for (let j = 0; j < moodLogs.length; j++) {
      if (moodLogs[j].date === dateStr) {
        match = moodLogs[j];
        break;
      }
    }

    // Format label to short format like "Aug 21"
    const readableLabel = formatReadableDate(dateStr).split(',')[0];

    chartData.push({
      date: readableLabel,
      score: match ? match.score : null,
      label: match ? match.label : 'No Entry'
    });
  }

  return chartData;
}
