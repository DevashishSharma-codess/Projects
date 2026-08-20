/**
 * Central State Management for Journal Application
 * Simple, beginner-friendly React Context for sharing global app state.
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ActiveTabType, JournalContextType } from "./JournalContextTypes";
import type { JournalFolder, JournalEntry, MoodLog, FolderQuoteItem, MoodGlassBlog } from "../types/journal";
import { getHourSlotInfo, SEED_MOOD_LOGS } from "./journalHelpers";
import {
    getSavedFolders,
    createNewFolder as storageCreateFolder,
    addEntryToFolder as storageAddEntry,
    deleteFolder as storageDeleteFolder,
    deleteEntryFromFolder as storageDeleteEntry,
} from "../utils/folderStorage";
import "./JournalContext.css";

export type { ActiveTabType, JournalContextType };
export { getHourSlotInfo };

/** React Context object holding global Journal state */
const JournalContext = createContext<JournalContextType | undefined>(undefined);

/**
 * JournalProvider Component
 * Main state container providing simple state management across all sections.
 */
export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 1. Navigation State
    const [activeTab, setActiveTab] = useState<ActiveTabType>("hero");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeModeIndex, setActiveModeIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const scrollToSection = (id: string, tab: ActiveTabType) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    // 2. Folder Directory & Journal Entries State
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
        if (selectedEntry?.id === entryId) setSelectedEntry(null);
        if (editingEntry?.id === entryId) setEditingEntry(null);
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

    // 3. Mood Tracker State
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
                        migrated[hourSlot] = { ...(item as MoodLog), day: key, time, hourSlot, timestamp };
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

    // 4. Daily Quotes State
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
 */
export const useJournal = (): JournalContextType => {
    const context = useContext(JournalContext);
    if (!context) {
        throw new Error("useJournal must be used within a JournalProvider");
    }
    return context;
};
