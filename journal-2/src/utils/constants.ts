/**
 * constants.ts - Application-wide Constants & Lookup Values
 * 
 * Central registry for fixed values:
 * - Category tags for journal classification.
 * - Mood scales (1 to 5) with semantic identifiers, labels, and theme colors.
 * - Browser localStorage keys for deterministic persistence.
 */

import type { MoodOption } from '../types/mood.types';

/**
 * Standard reflection tags available in the Journal Editor and Entry Cards.
 */
export const PRESET_TAGS: string[] = [
  'Grateful',
  'Calm',
  'Anxious',
  'Stressful'
];

/**
 * 5-point Mood Scale options:
 * - Great (Score: 5) - Emerald green
 * - Good (Score: 4) - Sky blue
 * - Okay (Score: 3) - Amber
 * - Anxious (Score: 2) - Violet
 * - Sad (Score: 1) - Crimson red
 */
export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'great', label: 'Great', score: 5, color: '#10b981' },
  { id: 'good', label: 'Good', score: 4, color: '#0284c7' },
  { id: 'okay', label: 'Okay', score: 3, color: '#f59e0b' },
  { id: 'anxious', label: 'Anxious', score: 2, color: '#8b5cf6' },
  { id: 'sad', label: 'Sad', score: 1, color: '#ef4444' }
];

/**
 * Unique keys used for storing and retrieving app state from localStorage.
 */
export const STORAGE_KEYS = {
  JOURNAL_ENTRIES: 'journal_app_entries',
  MOOD_LOGS: 'journal_app_moods',
  THEME_MODE: 'journal_app_theme'
};
