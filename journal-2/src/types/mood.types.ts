// This file defines types for tracking user mood.

export interface MoodLog {
  id: string;          // Unique identifier for the mood log
  date: string;        // Date string in YYYY-MM-DD format
  moodId: string;      // Identifier matching one of our mood types (e.g. "great", "calm")
  label: string;       // Text label for the mood
  score: number;       // Numerical score from 1 (sad) to 5 (great) for line chart plotting
  note?: string;       // Optional short note about why the user feels this way
}

export interface MoodOption {
  id: string;          // ID used in code
  label: string;       // Human-readable name
  score: number;       // Numeric value for statistics
  color: string;       // Accent color for UI button
}
