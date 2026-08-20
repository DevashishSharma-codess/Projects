// This file defines what a single Journal Entry looks like in our app.
// TypeScript interfaces help us catch typos when using entry properties.

export interface JournalEntry {
  id: string;          // Unique ID for each entry (e.g. timestamp or random string)
  date: string;        // Date string in YYYY-MM-DD format
  title: string;       // Entry title written by user
  content: string;     // Rich text content (HTML string from Quill editor)
  tag: string;         // Category tag (e.g. "Grateful", "Calm", "Stressful")
  createdAt: string;   // Full ISO timestamp of when entry was created
}
