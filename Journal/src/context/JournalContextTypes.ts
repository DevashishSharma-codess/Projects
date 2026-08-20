/**
 * Types and Interfaces for Journal Context
 */

import React from "react";
import type { JournalFolder, JournalEntry, MoodLog, FolderQuoteItem, MoodGlassBlog } from "../types/journal";

/** Navigation tab identifier */
export type ActiveTabType = "hero" | "folders" | "editor" | "mood" | "quotes" | "bento";

/** Primary Context Interface for the Journal Application */
export interface JournalContextType {
    // Navigation & Header
    activeTab: ActiveTabType;
    setActiveTab: (tab: ActiveTabType) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    activeModeIndex: number;
    setActiveModeIndex: React.Dispatch<React.SetStateAction<number>>;
    scrolled: boolean;
    setScrolled: (scrolled: boolean) => void;
    scrollToSection: (id: string, tab: ActiveTabType) => void;

    // Folder Directory & Journal Entry Storage
    folders: JournalFolder[];
    activeFolderId: string | null;
    setActiveFolderId: (id: string | null) => void;
    selectedEntry: JournalEntry | null;
    setSelectedEntry: (entry: JournalEntry | null) => void;
    editingEntry: JournalEntry | null;
    setEditingEntry: (entry: JournalEntry | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    showNewFolderModal: boolean;
    setShowNewFolderModal: (show: boolean) => void;
    showNewJournalModal: boolean;
    setShowNewJournalModal: (show: boolean) => void;
    createFolder: (name: string, description: string, color: string) => JournalFolder;
    deleteFolder: (folderId: string) => void;
    addEntryToFolder: (folderId: string, entry: JournalEntry) => void;
    deleteEntryFromFolder: (folderId: string, entryId: string) => void;
    saveJournalEntry: (folderId: string, entryData: Partial<JournalEntry> & { title: string; content: string }) => JournalEntry;

    // Mood Tracker & Trend Analytics
    moodLogs: Record<string, MoodLog>;
    calYear: number;
    setCalYear: React.Dispatch<React.SetStateAction<number>>;
    calMonth: number;
    setCalMonth: React.Dispatch<React.SetStateAction<number>>;
    moodActiveNavTab: string;
    setMoodActiveNavTab: (tab: string) => void;
    categoryFilter: string;
    setCategoryFilter: (cat: string) => void;
    timeframe: "weekly" | "monthly" | "3months";
    setTimeframe: (tf: "weekly" | "monthly" | "3months") => void;
    selectedMoodOption: any;
    setSelectedMoodOption: (opt: any) => void;
    noteInput: string;
    setNoteInput: (note: string) => void;
    selectedDate: string | null;
    setSelectedDate: (date: string | null) => void;
    showMoodModal: boolean;
    setShowMoodModal: (show: boolean) => void;
    modalMood: any;
    setModalMood: (mood: any) => void;
    modalNote: string;
    setModalNote: (note: string) => void;
    logSuccess: boolean;
    setLogSuccess: (success: boolean) => void;
    logStatusActive: boolean;
    setLogStatusActive: (active: boolean) => void;
    autoSyncActive: boolean;
    setAutoSyncActive: (active: boolean) => void;
    isBreathing: boolean;
    setIsBreathing: (breathing: boolean) => void;
    addMoodLog: (
        day: string,
        moodKey: string,
        moodLabel: string,
        icon: string,
        score: number,
        color: string,
        note: string,
        time?: string
    ) => void;
    deleteMoodLog: (key: string) => void;

    // Daily Spark Quotes Hub & Bookmarks
    quoteSetIndex: number;
    setQuoteSetIndex: React.Dispatch<React.SetStateAction<number>>;
    activeQuoteIndex: number;
    setActiveQuoteIndex: React.Dispatch<React.SetStateAction<number>>;
    savedQuotes: FolderQuoteItem[];
    savedIndex: number;
    setSavedIndex: React.Dispatch<React.SetStateAction<number>>;
    isPaperOpened: boolean;
    setIsPaperOpened: (opened: boolean) => void;
    copiedQuoteId: string | null;
    setCopiedQuoteId: (id: string | null) => void;
    quoteReloading: boolean;
    setQuoteReloading: (reloading: boolean) => void;
    toggleSaveQuote: (quote: FolderQuoteItem) => void;
    removeSavedQuote: (id: string) => void;

    // Bento Archive Stage
    bentoActiveIndex: number;
    setBentoActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    selectedBlog: MoodGlassBlog | null;
    setSelectedBlog: (blog: MoodGlassBlog | null) => void;
}
