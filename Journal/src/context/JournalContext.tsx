/**
 * Central State Management for Journal Application
 * Provides global state for Navigation, Folder Directory, Editor Studio, Mood Tracker, Quotes Hub, and Bento Archive.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import type { JournalFolder, JournalEntry, MoodLog, FolderQuoteItem, MoodGlassBlog } from "../types/journal";
import {
    getSavedFolders,
    createNewFolder as storageCreateFolder,
    addEntryToFolder as storageAddEntry,
    deleteFolder as storageDeleteFolder,
    deleteEntryFromFolder as storageDeleteEntry,
} from "../utils/folderStorage";

// ── Time & Date Helpers ────────────────────────────────────────────────────────

/**
 * Calculates hour slot identifier and timestamp from day string and time input.
 * Used to group mood logs uniquely per hour slot (YYYY-MM-DD-HH).
 */
export const getHourSlotInfo = (day: string, timeStr: string) => {
    let hour = 12;
    let minute = 0;

    if (!timeStr) {
        const now = new Date();
        hour = now.getHours();
        minute = now.getMinutes();
    } else {
        const match24 = timeStr.match(/^(\d{1,2}):(\d{2})/);
        if (match24) {
            hour = parseInt(match24[1], 10);
            minute = parseInt(match24[2], 10);
        } else {
            const match12 = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
            if (match12) {
                hour = parseInt(match12[1], 10);
                minute = parseInt(match12[2], 10);
                const period = match12[3]?.toUpperCase();
                if (period === "PM" && hour < 12) hour += 12;
                if (period === "AM" && hour === 12) hour = 0;
            }
        }
    }

    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");
    const hourSlot = `${day}-${hh}`;
    const time = `${hh}:${mm}`;

    const dateObj = new Date(`${day}T${time}:00`);
    const timestamp = isNaN(dateObj.getTime()) ? Date.now() : dateObj.getTime();

    return { hourSlot, time, timestamp };
};

// ── Initial Seed Data ──────────────────────────────────────────────────────────

/** Default seed mood logs used on initial render when no custom logs exist */
const SEED_MOOD_LOGS: Record<string, MoodLog> = {
    "2026-07-01-09": { id: "s1", day: "2026-07-01", time: "09:00", hourSlot: "2026-07-01-09", timestamp: new Date("2026-07-01T09:00:00").getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "Great morning coffee." },
    "2026-07-05-14": { id: "s2", day: "2026-07-05", time: "14:00", hourSlot: "2026-07-05-14", timestamp: new Date("2026-07-05T14:00:00").getTime(), moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.2, color: "#10B981", note: "Completed sprint goal!" },
    "2026-07-09-18": { id: "s3", day: "2026-07-09", time: "18:00", hourSlot: "2026-07-09-18", timestamp: new Date("2026-07-09T18:00:00").getTime(), moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Family weekend getaway." },
    "2026-07-13-10": { id: "s4", day: "2026-07-13", time: "10:00", hourSlot: "2026-07-13-10", timestamp: new Date("2026-07-13T10:00:00").getTime(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.0, color: "#A855F7", note: "Deep work session." },
    "2026-07-16-16": { id: "s5", day: "2026-07-16", time: "16:00", hourSlot: "2026-07-16-16", timestamp: new Date("2026-07-16T16:00:00").getTime(), moodKey: "stressed", moodLabel: "Stressed", icon: "Activity", score: 2.0, color: "#EF4444", note: "Tight deadline." },
    "2026-07-20-11": { id: "s6", day: "2026-07-20", time: "11:00", hourSlot: "2026-07-20-11", timestamp: new Date("2026-07-20T11:00:00").getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "Relaxing Sunday walk." },
    "2026-07-24-15": { id: "s7", day: "2026-07-24", time: "15:00", hourSlot: "2026-07-24-15", timestamp: new Date("2026-07-24T15:00:00").getTime(), moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Key project milestone!" },
    "2026-07-27-09": { id: "s8", day: "2026-07-27", time: "09:00", hourSlot: "2026-07-27-09", timestamp: new Date("2026-07-27T09:00:00").getTime(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.0, color: "#A855F7", note: "Strategic roadmap planning." },
    "2026-07-30-17": { id: "s9", day: "2026-07-30", time: "17:00", hourSlot: "2026-07-30-17", timestamp: new Date("2026-07-30T17:00:00").getTime(), moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.2, color: "#10B981", note: "High energy team workout." },
    "2026-08-01-08": { id: "s10", day: "2026-08-01", time: "08:00", hourSlot: "2026-08-01-08", timestamp: new Date("2026-08-01T08:00:00").getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "New month fresh start." },
    "2026-08-03-12": { id: "s11", day: "2026-08-03", time: "12:00", hourSlot: "2026-08-03-12", timestamp: new Date("2026-08-03T12:00:00").getTime(), moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Product launch success!" },
    "2026-08-05-14": { id: "s12", day: "2026-08-05", time: "14:00", hourSlot: "2026-08-05-14", timestamp: new Date("2026-08-05T14:00:00").getTime(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.0, color: "#A855F7", note: "Dark glassmorphic dashboard." },
    "2026-08-07-10": { id: "s13", day: "2026-08-07", time: "10:00", hourSlot: "2026-08-07-10", timestamp: new Date("2026-08-07T10:00:00").getTime(), moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.2, color: "#10B981", note: "Morning run." },
    "2026-08-08-16": { id: "s14", day: "2026-08-08", time: "16:00", hourSlot: "2026-08-08-16", timestamp: new Date("2026-08-08T16:00:00").getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "Weekend reading." },
    "2026-08-09-11": { id: "s15", day: "2026-08-09", time: "11:00", hourSlot: "2026-08-09-11", timestamp: new Date("2026-08-09T11:00:00").getTime(), moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Sunny afternoon." },
    "2026-08-10-09": { id: "s16", day: "2026-08-10", time: "09:00", hourSlot: "2026-08-10-09", timestamp: new Date("2026-08-10T09:00:00").getTime(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.0, color: "#A855F7", note: "Morning planning." },
    [`${new Date().toISOString().slice(0, 10)}-09`]: { id: "s-today-1", day: new Date().toISOString().slice(0, 10), time: "09:33", hourSlot: `${new Date().toISOString().slice(0, 10)}-09`, timestamp: new Date(`${new Date().toISOString().slice(0, 10)}T09:33:00`).getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "Morning peaceful reflection." },
    [`${new Date().toISOString().slice(0, 10)}-10`]: { id: "s-today-2", day: new Date().toISOString().slice(0, 10), time: "10:45", hourSlot: `${new Date().toISOString().slice(0, 10)}-10`, timestamp: new Date(`${new Date().toISOString().slice(0, 10)}T10:45:00`).getTime(), moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.2, color: "#10B981", note: "Mid-morning boost!" },
};

// ── Context Types ──────────────────────────────────────────────────────────────

export type ActiveTabType = "hero" | "folders" | "editor" | "mood" | "quotes" | "bento";

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

    // Folder & Journal Entry Management
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

    // Folder Actions
    createFolder: (name: string, description: string, color: string) => JournalFolder;
    deleteFolder: (folderId: string) => void;
    addEntryToFolder: (folderId: string, entry: JournalEntry) => void;
    deleteEntryFromFolder: (folderId: string, entryId: string) => void;
    saveJournalEntry: (folderId: string, entryData: Partial<JournalEntry> & { title: string; content: string }) => JournalEntry;

    // Mood Tracker State
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

    // Mood Log Actions
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

    // Quotes Hub State
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

    // Quote Actions
    toggleSaveQuote: (quote: FolderQuoteItem) => void;
    removeSavedQuote: (id: string) => void;

    // Bento Archive State
    bentoActiveIndex: number;
    setBentoActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    selectedBlog: MoodGlassBlog | null;
    setSelectedBlog: (blog: MoodGlassBlog | null) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

// ── Context Provider Implementation ──────────────────────────────────────────

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 1. Navigation State
    const [activeTab, setActiveTab] = useState<ActiveTabType>("hero");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeModeIndex, setActiveModeIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    /** Smooth scroll helper for navigating page sections */
    const scrollToSection = (id: string, tab: ActiveTabType) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    // 2. Folder & Journal Entries State
    const [folders, setFolders] = useState<JournalFolder[]>([]);
    const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
    const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [showNewJournalModal, setShowNewJournalModal] = useState(false);

    const reloadFolders = () => {
        setFolders(getSavedFolders());
    };

    useEffect(() => {
        reloadFolders();
        const handleSync = () => reloadFolders();
        window.addEventListener("dogear_folders_updated", handleSync);
        return () => window.removeEventListener("dogear_folders_updated", handleSync);
    }, []);

    const createFolder = (name: string, description: string, color: string): JournalFolder => {
        const newF = storageCreateFolder(name, description, color);
        reloadFolders();
        return newF;
    };

    const deleteFolder = (folderId: string) => {
        const updated = storageDeleteFolder(folderId);
        setFolders(updated);
        if (activeFolderId === folderId) {
            setActiveFolderId(null);
        }
    };

    const addEntryToFolder = (folderId: string, entry: JournalEntry) => {
        const updated = storageAddEntry(folderId, entry);
        setFolders(updated);
    };

    const deleteEntryFromFolder = (folderId: string, entryId: string) => {
        const updated = storageDeleteEntry(folderId, entryId);
        setFolders(updated);
        if (selectedEntry?.id === entryId) {
            setSelectedEntry(null);
        }
        if (editingEntry?.id === entryId) {
            setEditingEntry(null);
        }
    };

    const saveJournalEntry = (
        folderId: string,
        entryData: Partial<JournalEntry> & { title: string; content: string }
    ): JournalEntry => {
        const targetFolder = folderId || (folders.length > 0 ? folders[0].id : "folder-morning");
        const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const timeStr = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        const entry: JournalEntry = {
            id: entryData.id || `entry-${Date.now()}`,
            folderId: targetFolder,
            title: entryData.title || "Untitled Entry",
            content: entryData.content || "",
            tags: entryData.tags || ["Reflective"],
            mood: entryData.mood || "😌 Peaceful",
            date: entryData.date || dateStr,
            time: entryData.time || timeStr,
            fontStyle: entryData.fontStyle || "sans",
        };

        const updatedFolders = storageAddEntry(targetFolder, entry);
        setFolders(updatedFolders);
        setEditingEntry(null);
        return entry;
    };

    // 3. Mood Tracker State & LocalStorage Persistence
    const today = new Date();
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [moodLogs, setMoodLogs] = useState<Record<string, MoodLog>>(() => {
        const raw = localStorage.getItem("dogear_mood_logs");
        if (raw) {
            try {
                const parsed: Record<string, any> = JSON.parse(raw);
                const migrated: Record<string, MoodLog> = {};
                for (const [key, item] of Object.entries(parsed)) {
                    if (key.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        const { hourSlot, time, timestamp } = getHourSlotInfo(key, (item as any).time || "12:00");
                        migrated[hourSlot] = {
                            ...(item as MoodLog),
                            day: key,
                            time,
                            hourSlot,
                            timestamp,
                        };
                    } else {
                        migrated[key] = item as MoodLog;
                    }
                }
                return { ...SEED_MOOD_LOGS, ...migrated };
            } catch { /* ignore parsing errors */ }
        }
        return SEED_MOOD_LOGS;
    });

    const [moodActiveNavTab, setMoodActiveNavTab] = useState("Dashboard");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "3months">("monthly");
    const [selectedMoodOption, setSelectedMoodOption] = useState<any>(null);
    const [noteInput, setNoteInput] = useState("");
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showMoodModal, setShowMoodModal] = useState(false);
    const [modalMood, setModalMood] = useState<any>(null);
    const [modalNote, setModalNote] = useState("");
    const [logSuccess, setLogSuccess] = useState(false);
    const [logStatusActive, setLogStatusActive] = useState(true);
    const [autoSyncActive, setAutoSyncActive] = useState(true);
    const [isBreathing, setIsBreathing] = useState(false);

    const saveMoodLogsToStorage = (updated: Record<string, MoodLog>) => {
        setMoodLogs(updated);
        localStorage.setItem("dogear_mood_logs", JSON.stringify(updated));
    };

    const addMoodLog = (
        day: string,
        moodKey: string,
        moodLabel: string,
        icon: string,
        score: number,
        color: string,
        note: string,
        timeInput?: string
    ) => {
        const rawTime = timeInput || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
        const { hourSlot, time, timestamp } = getHourSlotInfo(day, rawTime);

        const newLog: MoodLog = {
            id: `mood-${Date.now()}`,
            day,
            time,
            hourSlot,
            timestamp,
            moodKey,
            moodLabel,
            icon,
            score,
            color,
            note: note || "",
        };

        const updated = { ...moodLogs, [hourSlot]: newLog };
        saveMoodLogsToStorage(updated);
    };

    const deleteMoodLog = (key: string) => {
        const updated = { ...moodLogs };
        delete updated[key];
        saveMoodLogsToStorage(updated);
    };

    // 4. Quotes Hub State
    const [quoteSetIndex, setQuoteSetIndex] = useState(0);
    const [activeQuoteIndex, setActiveQuoteIndex] = useState(4);
    const [savedQuotes, setSavedQuotes] = useState<FolderQuoteItem[]>(() => {
        const raw = localStorage.getItem("dogear_saved_quotes");
        if (raw) {
            try { return JSON.parse(raw); } catch { /* ignore */ }
        }
        return [];
    });
    const [savedIndex, setSavedIndex] = useState(0);
    const [isPaperOpened, setIsPaperOpened] = useState(false);
    const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);
    const [quoteReloading, setQuoteReloading] = useState(false);

    const toggleSaveQuote = (quote: FolderQuoteItem) => {
        setSavedQuotes((prev) => {
            const exists = prev.some((q) => q.id === quote.id);
            const updated = exists ? prev.filter((q) => q.id !== quote.id) : [...prev, quote];
            localStorage.setItem("dogear_saved_quotes", JSON.stringify(updated));
            return updated;
        });
    };

    const removeSavedQuote = (id: string) => {
        setSavedQuotes((prev) => {
            const updated = prev.filter((q) => q.id !== id);
            localStorage.setItem("dogear_saved_quotes", JSON.stringify(updated));
            return updated;
        });
    };

    // 5. Bento Archive State
    const [bentoActiveIndex, setBentoActiveIndex] = useState(2);
    const [selectedBlog, setSelectedBlog] = useState<MoodGlassBlog | null>(null);

    const value: JournalContextType = {
        activeTab,
        setActiveTab,
        mobileMenuOpen,
        setMobileMenuOpen,
        activeModeIndex,
        setActiveModeIndex,
        scrolled,
        setScrolled,
        scrollToSection,

        folders,
        activeFolderId,
        setActiveFolderId,
        selectedEntry,
        setSelectedEntry,
        editingEntry,
        setEditingEntry,
        searchQuery,
        setSearchQuery,
        viewMode,
        setViewMode,
        showNewFolderModal,
        setShowNewFolderModal,
        showNewJournalModal,
        setShowNewJournalModal,

        createFolder,
        deleteFolder,
        addEntryToFolder,
        deleteEntryFromFolder,
        saveJournalEntry,

        moodLogs,
        calYear,
        setCalYear,
        calMonth,
        setCalMonth,
        moodActiveNavTab,
        setMoodActiveNavTab,
        categoryFilter,
        setCategoryFilter,
        timeframe,
        setTimeframe,
        selectedMoodOption,
        setSelectedMoodOption,
        noteInput,
        setNoteInput,
        selectedDate,
        setSelectedDate,
        showMoodModal,
        setShowMoodModal,
        modalMood,
        setModalMood,
        modalNote,
        setModalNote,
        logSuccess,
        setLogSuccess,
        logStatusActive,
        setLogStatusActive,
        autoSyncActive,
        setAutoSyncActive,
        isBreathing,
        setIsBreathing,

        addMoodLog,
        deleteMoodLog,

        quoteSetIndex,
        setQuoteSetIndex,
        activeQuoteIndex,
        setActiveQuoteIndex,
        savedQuotes,
        savedIndex,
        setSavedIndex,
        isPaperOpened,
        setIsPaperOpened,
        copiedQuoteId,
        setCopiedQuoteId,
        quoteReloading,
        setQuoteReloading,
        toggleSaveQuote,
        removeSavedQuote,

        bentoActiveIndex,
        setBentoActiveIndex,
        selectedBlog,
        setSelectedBlog,
    };

    return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
};

/**
 * Custom Hook to consume Journal Context state safely throughout the application.
 * Throws an error if invoked outside of a JournalProvider.
 */
export const useJournal = (): JournalContextType => {
    const context = useContext(JournalContext);
    if (!context) {
        throw new Error("useJournal must be used within a JournalProvider");
    }
    return context;
};
