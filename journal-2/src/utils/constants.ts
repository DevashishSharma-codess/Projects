// App Constants and Helper Arrays.

import type { MoodOption } from '../types/mood.types';

export const PRESET_TAGS: string[] = [
  'Grateful',
  'Calm',
  'Anxious',
  'Stressful'
];

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'great', label: 'Great', score: 5, color: '#10b981' },
  { id: 'good', label: 'Good', score: 4, color: '#0284c7' },
  { id: 'okay', label: 'Okay', score: 3, color: '#f59e0b' },
  { id: 'anxious', label: 'Anxious', score: 2, color: '#8b5cf6' },
  { id: 'sad', label: 'Sad', score: 1, color: '#ef4444' }
];

export const STORAGE_KEYS = {
  JOURNAL_ENTRIES: 'journal_app_entries',
  MOOD_LOGS: 'journal_app_moods',
  THEME_MODE: 'journal_app_theme'
};
