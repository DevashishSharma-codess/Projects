export interface JournalEntry {
    id: string;
    folderId?: string;
    title: string;
    content: string;
    tags: string[];
    mood: string;
    date: string;
    time: string;
    fontStyle: "sans" | "handwriting" | "serif";
}

export interface JournalFolder {
    id: string;
    name: string;
    description: string;
    color: string;
    gradient: string;
    iconColor: string;
    categoryTag: string;
    entries: JournalEntry[];
}

export interface MoodLog {
    id: string;
    day: string; // "YYYY-MM-DD" e.g., "2026-08-10"
    time: string; // "HH:mm" e.g., "09:00"
    hourSlot: string; // "YYYY-MM-DD-HH" e.g., "2026-08-10-09"
    timestamp: number; // Unix timestamp in ms
    moodKey: string;
    moodLabel: string;
    icon: string;
    score: number;
    color: string;
    note: string;
}



export interface QuoteItem {
    id: string;
    text: string;
    author: string;
    category: string;
}

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
