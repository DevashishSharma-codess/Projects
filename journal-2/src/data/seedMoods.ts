/**
 * seedMoods.ts - Mock / Seed Data Generator for Mood Analytics
 * 
 * Provides a realistic set of initial mood logs spanning the past 7 days.
 * This ensures new users immediately see visual graphs, weekly analytics,
 * and calendar trends upon first launching the application.
 * 
 * Score Scale:
 * 1 = Sad | 2 = Anxious | 3 = Okay | 4 = Good | 5 = Great
 */

import type { MoodLog } from '../types/mood.types';
import { getLastNDaysDates } from '../utils/dateUtils';

/**
 * Generates an array of seed mood logs for the last 7 calendar days.
 * 
 * @returns Array of 7 MoodLog objects with varied mood scores and notes.
 */
export function getSeedMoodLogs(): MoodLog[] {
  // Retrieve the YYYY-MM-DD date strings for the last 7 days
  const dates = getLastNDaysDates(7);

  // Template mood patterns to distribute across the past week
  const sampleMoods = [
    { moodId: 'good', label: 'Good', score: 4, note: 'Had a productive morning' },
    { moodId: 'okay', label: 'Okay', score: 3, note: 'Routine day, felt peaceful' },
    { moodId: 'great', label: 'Great', score: 5, note: 'Celebrated a win today' },
    { moodId: 'anxious', label: 'Anxious', score: 2, note: 'Busy with tight deadlines' },
    { moodId: 'good', label: 'Good', score: 4, note: 'Relaxing walk and meditation' },
    { moodId: 'great', label: 'Great', score: 5, note: 'High energy and positive mood' },
    { moodId: 'good', label: 'Good', score: 4, note: 'Felt calm and balanced' }
  ];

  // Map each date to a sample mood entry
  return dates.map((date, index) => {
    const sample = sampleMoods[index % sampleMoods.length];
    return {
      id: `seed-mood-${index}`,
      date: date,
      moodId: sample.moodId,
      label: sample.label,
      score: sample.score,
      note: sample.note
    };
  });
}
