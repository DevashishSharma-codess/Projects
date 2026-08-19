/**
 * Journal Application Types
 * Central definitions for entries, folders, mood logs, quotes, and blog articles.
 */

/** Represents a single journal entry inside a folder */
export interface JournalEntry {
    /** Unique identifier for the journal entry */
    id: string;
    /** Parent folder ID containing this entry */
    folderId?: string;
    /** Title of the journal entry */
    title: string;
    /** Full body content (supports HTML/markdown string) */
    content: string;
    /** Category tags associated with this entry */
    tags: string[];
    /** Selected mood emoji/label */
    mood: string;
    /** Date formatted string e.g., "Aug 5, 2026" */
    date: string;
    /** Time formatted string e.g., "07:15 AM" */
    time: string;
    /** Typography font style preference for displaying the entry */
    fontStyle: "sans" | "handwriting" | "serif";
}

/** Represents a desktop folder containing multiple journal entries */
export interface JournalFolder {
    /** Unique identifier for the folder */
    id: string;
    /** Display name of the folder */
    name: string;
    /** Brief description of folder content */
    description: string;
    /** Hex color representation */
    color: string;
    /** CSS linear gradient background */
    gradient: string;
    /** Accent color used for folder icons */
    iconColor: string;
    /** Category tag e.g., "Reflective", "Grateful", "Creative" */
    categoryTag: string;
    /** List of journal entries belonging to this folder */
    entries: JournalEntry[];
}

/** Represents a logged mood entry at a specific date and time slot */
export interface MoodLog {
    /** Unique log ID */
    id: string;
    /** ISO date string "YYYY-MM-DD" e.g., "2026-08-10" */
    day: string;
    /** Time string "HH:mm" e.g., "09:00" */
    time: string;
    /** Key formatted as "YYYY-MM-DD-HH" e.g., "2026-08-10-09" */
    hourSlot: string;
    /** Unix timestamp in milliseconds */
    timestamp: number;
    /** Internal key identifying mood type e.g., "peaceful" */
    moodKey: string;
    /** Human-readable mood title e.g., "Peaceful" */
    moodLabel: string;
    /** Icon name e.g., "Heart", "Zap", "Sparkles" */
    icon: string;
    /** Numerical score rating (1.0 to 5.0) */
    score: number;
    /** Visual theme color associated with the mood */
    color: string;
    /** Personal note describing the mood */
    note: string;
}

/** Simple quote representation */
export interface QuoteItem {
    id: string;
    text: string;
    author: string;
    category: string;
}

/** Detailed quote item formatted for folder-tab UI display */
export interface FolderQuoteItem {
    id: string;
    tabLabel: string;
    bgColor: string;
    textColor: string;
    quote: string;
    author: string;
    handle: string;
    codeRef?: string;
    dateStr?: string;
    tabLeftOffset: number;
}

/** Structured article content for Bento Grid Modal View */
export interface MoodGlassBlog {
    id: string;
    category: string;
    moodLabel: string;
    title: string;
    subtitle: string;
    readTime: string;
    author: string;
    date: string;
    imageUrl: string;
    content: {
        intro: string;
        quote: string;
        sections: { heading: string; body: string }[];
        takeaways: string[];
        reflectionPrompt: string;
    };
}
