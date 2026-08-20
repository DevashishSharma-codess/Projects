// Seed data file for initial mood logs.
// Score mapping: 1 = Sad, 2 = Anxious, 3 = Okay, 4 = Good, 5 = Great

import type { MoodLog } from '../types/mood.types';
import { getLastNDaysDates } from '../utils/dateUtils';

export function getSeedMoodLogs(): MoodLog[] {
  const dates = getLastNDaysDates(7);

  const sampleMoods = [
    { moodId: 'good', label: 'Good', score: 4, note: 'Had a productive morning' },
    { moodId: 'okay', label: 'Okay', score: 3, note: 'Routine day, felt peaceful' },
    { moodId: 'great', label: 'Great', score: 5, note: 'Celebrated a win today' },
    { moodId: 'anxious', label: 'Anxious', score: 2, note: 'Busy with tight deadlines' },
    { moodId: 'good', label: 'Good', score: 4, note: 'Relaxing walk and meditation' },
    { moodId: 'great', label: 'Great', score: 5, note: 'High energy and positive mood' },
    { moodId: 'good', label: 'Good', score: 4, note: 'Felt calm and balanced' }
  ];

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
