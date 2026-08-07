import React, { createContext, useContext, useState, useEffect } from "react";
import type { JournalFolder, JournalEntry, MoodLog, FolderQuoteItem, MoodGlassBlog } from "../types/journal";
import {
    getSavedFolders,
    createNewFolder as storageCreateFolder,
    addEntryToFolder as storageAddEntry,
    deleteFolder as storageDeleteFolder,
    deleteEntryFromFolder as storageDeleteEntry,
} from "../utils/folderStorage";

// Seed mood logs for initial load if none saved
const todayStr = () => new Date().toISOString().slice(0, 10);
const SEED_MOOD_LOGS: Record<string, MoodLog> = {
    "2026-07-01": { id: "s1", day: "2026-07-01", moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.2, color: "#3B82F6", note: "Great morning coffee." },
    "2026-07-05": { id: "s2", day: "2026-07-05", moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.5, color: "#10B981", note: "Completed sprint goal!" },
    "2026-07-09": { id: "s3", day: "2026-07-09", moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 4.9, color: "#F59E0B", note: "Family weekend getaway." },
    "2026-07-13": { id: "s4", day: "2026-07-13", moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 3.9, color: "#A855F7", note: "Deep work session." },
    "2026-07-16": { id: "s5", day: "2026-07-16", moodKey: "stressed", moodLabel: "Stressed", icon: "Activity", score: 2.4, color: "#EF4444", note: "Tight deadline." },
    "2026-07-20": { id: "s6", day: "2026-07-20", moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.6, color: "#3B82F6", note: "Relaxing Sunday walk." },
    "2026-07-24": { id: "s7", day: "2026-07-24", moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Key project milestone!" },
    "2026-07-27": { id: "s8", day: "2026-07-27", moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.3, color: "#A855F7", note: "Strategic roadmap planning." },
    "2026-07-30": { id: "s9", day: "2026-07-30", moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.7, color: "#10B981", note: "High energy team workout." },
    "2026-08-01": { id: "s10", day: "2026-08-01", moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.1, color: "#3B82F6", note: "New month fresh start." },
    "2026-08-03": { id: "s11", day: "2026-08-03", moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 4.8, color: "#F59E0B", note: "Product launch success!" },
    "2026-08-05": { id: "s12", day: todayStr(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.2, color: "#A855F7", note: "Dark glassmorphic dashboard." },
};

export type ActiveTabType = "hero" | "folders" | "editor" | "mood" | "quotes" | "bento";

export interface JournalContextType {
    // --- Navigation & Header ---
    activeTab: ActiveTabType;
    setActiveTab: (tab: ActiveTabType) => void;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    activeModeIndex: number;
    setActiveModeIndex: React.Dispatch<React.SetStateAction<number>>;
    scrolled: boolean;
    setScrolled: (scrolled: boolean) => void;
    scrollToSection: (id: string, tab: ActiveTabType) => void;

    // --- Folder & Entries State ---
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

    // Actions
    createFolder: (name: string, description: string, color: string) => JournalFolder;
    deleteFolder: (folderId: string) => void;
    addEntryToFolder: (folderId: string, entry: JournalEntry) => void;
    deleteEntryFromFolder: (folderId: string, entryId: string) => void;
    saveJournalEntry: (folderId: string, entryData: Partial<JournalEntry> & { title: string; content: string }) => JournalEntry;

    // --- Mood Tracker State ---
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

    // Actions
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
    deleteMoodLog: (day: string) => void;


    // --- Quotes Hub State ---
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

    // --- Bento Archive State ---
    bentoActiveIndex: number;
    setBentoActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    selectedBlog: MoodGlassBlog | null;
    setSelectedBlog: (blog: MoodGlassBlog | null) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // --- Navigation ---
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

    // --- Folders & Entries ---
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

    // --- Mood Tracker ---
    const today = new Date();
    const [calYear, setCalYear] = useState(today.getFullYear());
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [moodLogs, setMoodLogs] = useState<Record<string, MoodLog>>(() => {
        const raw = localStorage.getItem("dogear_mood_logs");
        if (raw) {
            try { return JSON.parse(raw); } catch { /* ignore */ }
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
        time?: string
    ) => {
        const formattedTime = time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        const newLog: MoodLog = {
            id: `mood-${Date.now()}`,
            day,
            moodKey,
            moodLabel,
            icon,
            score,
            color,
            note: note || "",
            time: formattedTime,
        };
        const updated = { ...moodLogs, [day]: newLog };
        saveMoodLogsToStorage(updated);
    };


    const deleteMoodLog = (day: string) => {
        const updated = { ...moodLogs };
        delete updated[day];
        saveMoodLogsToStorage(updated);
    };

    // --- Quotes Hub ---
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
            let updated: FolderQuoteItem[];
            if (exists) {
                updated = prev.filter((q) => q.id !== quote.id);
            } else {
                updated = [...prev, quote];
            }
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

    // --- Bento Archive ---
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

export const useJournal = (): JournalContextType => {
    const context = useContext(JournalContext);
    if (!context) {
        throw new Error("useJournal must be used within a JournalProvider");
    }
    return context;
};
