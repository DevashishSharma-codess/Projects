/**
 * mood.types.ts - Type Definitions for Mood Tracking & Analytics
 * 
 * Defines data structures used for recording daily mood check-ins, rendering
 * mood option buttons, and calculating chart metrics.
 */

export interface MoodLog {
  /** Unique ID for the mood log entry */
  id: string;
  /** Date of the check-in in YYYY-MM-DD format */
  date: string;
  /** Machine-readable mood identifier (e.g. 'great', 'good', 'okay', 'anxious', 'sad') */
  moodId: string;
  /** Human-readable display label (e.g. 'Great', 'Good', 'Okay', 'Anxious', 'Sad') */
  label: string;
  /** Numerical score from 1 (Sad) to 5 (Great) used for graphing and averages */
  score: number;
  /** Optional personal note or reflection associated with the mood */
  note?: string;
}

export interface MoodOption {
  /** Unique mood identifier */
  id: string;
  /** Display label for the mood button */
  label: string;
  /** Numeric rating (1 to 5) */
  score: number;
  /** Associated UI accent color for the mood */
  color: string;
}
