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
    day: string;
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
