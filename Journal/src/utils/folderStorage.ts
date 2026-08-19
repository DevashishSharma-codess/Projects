/**
 * Folder & Journal Entry LocalStorage Manager
 * Handles local persistence, default seed data, and custom window sync events for journal folders.
 */

import type { JournalFolder, JournalEntry } from "../types/journal";

/** LocalStorage key for persisting journal folders */
const STORAGE_KEY = "dogear_journal_folders";

/** Default seed folders initialized on first load */
export const DEFAULT_FOLDERS: JournalFolder[] = [
    {
        id: "folder-morning",
        name: "Morning Pages",
        description: "10-minute early morning brain dump reflections.",
        color: "#FFD666",
        gradient: "linear-gradient(135deg, #FFE28E 0%, #FFC736 100%)",
        iconColor: "#D97706",
        categoryTag: "Reflective",
        entries: [
            {
                id: "m-1",
                folderId: "folder-morning",
                title: "Balcony Coffee & Morning Light",
                content: "Woke up early at 6:30 AM. Watched the horizon glow from deep violet into soft pink and light amber. Took three deep breaths and focused on gratitude for a calm day ahead.",
                tags: ["Grateful", "Reflective"],
                mood: "😌 Peaceful",
                date: "Aug 5, 2026",
                time: "07:15 AM",
                fontStyle: "handwriting",
            },
            {
                id: "m-2",
                folderId: "folder-morning",
                title: "Setting Intention for the Week",
                content: "Determined to focus on one main task at a time. No context switching or rushing. Slow, deliberate progress wins the long race.",
                tags: ["Mindful", "Productive"],
                mood: "🎯 Focused",
                date: "Aug 4, 2026",
                time: "08:00 AM",
                fontStyle: "sans",
            },
        ],
    },
    {
        id: "folder-gratitude",
        name: "Gratitude Vault",
        description: "Daily appreciation list of small wins & joys.",
        color: "#FF7FA6",
        gradient: "linear-gradient(135deg, #FFB3C6 0%, #FF7FA6 100%)",
        iconColor: "#DB2777",
        categoryTag: "Grateful",
        entries: [
            {
                id: "g-1",
                folderId: "folder-gratitude",
                title: "Three Small Joys Today",
                content: "1. A warm surprise text from an old college friend.\n2. The smell of rain hitting dry pavement.\n3. Finishing a project ahead of schedule.",
                tags: ["Grateful", "Peaceful"],
                mood: "😊 Radiant",
                date: "Aug 3, 2026",
                time: "09:30 PM",
                fontStyle: "handwriting",
            },
        ],
    },
    {
        id: "folder-dream",
        name: "Dream Journal",
        description: "Midnight dream recollections and surreal thoughts.",
        color: "#3E8FCC",
        gradient: "linear-gradient(135deg, #BAE6FD 0%, #38BDF8 100%)",
        iconColor: "#0284C7",
        categoryTag: "Creative",
        entries: [
            {
                id: "d-1",
                folderId: "folder-dream",
                title: "Floating City by the Cloud Coast",
                content: "Dreamed of walking through an endless library where books opened into glowing portals leading to quiet seaside towns.",
                tags: ["Creative", "Reflective"],
                mood: "😌 Peaceful",
                date: "Aug 2, 2026",
                time: "03:10 AM",
                fontStyle: "serif",
            },
        ],
    },
    {
        id: "folder-creative",
        name: "Creative Musings",
        description: "Idea sketches, design inspiration & poetry.",
        color: "#8763E0",
        gradient: "linear-gradient(135deg, #DDD6FE 0%, #A78BFA 100%)",
        iconColor: "#7C3AED",
        categoryTag: "Creative",
        entries: [
            {
                id: "c-1",
                folderId: "folder-creative",
                title: "Doodle Characters & Bento UI Ideas",
                content: "Sketched playful group doodle illustrations in vibrant primary colors. Combined with a modular bento grid layout to create a fresh, friendly aesthetic.",
                tags: ["Creative", "Productive"],
                mood: "⚡ Energetic",
                date: "Aug 1, 2026",
                time: "04:45 PM",
                fontStyle: "sans",
            },
        ],
    },
];

/**
 * Retrieves saved folders from LocalStorage.
 * Initializes LocalStorage with DEFAULT_FOLDERS if empty or invalid.
 */
export function getSavedFolders(): JournalFolder[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_FOLDERS));
        return DEFAULT_FOLDERS;
    }
    try {
        return JSON.parse(raw);
    } catch {
        return DEFAULT_FOLDERS;
    }
}

/**
 * Persists an array of journal folders to LocalStorage and triggers a custom window event for sync.
 */
export function saveFolders(folders: JournalFolder[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(folders));
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("dogear_folders_updated"));
    }
}

/**
 * Creates a new folder with custom color styling and appends it to storage.
 */
export function createNewFolder(name: string, description: string, color: string): JournalFolder {
    const folders = getSavedFolders();
    const newFolder: JournalFolder = {
        id: `folder-${Date.now()}`,
        name,
        description: description || "Custom journal folder.",
        color,
        gradient: `linear-gradient(135deg, ${color}44 0%, ${color} 100%)`,
        iconColor: color,
        categoryTag: "Custom",
        entries: [],
    };
    const updated = [...folders, newFolder];
    saveFolders(updated);
    return newFolder;
}

/**
 * Adds or updates a journal entry within a specific target folder.
 * Removes duplicate entry instances across all folders to support moving entries cleanly.
 */
export function addEntryToFolder(folderId: string, entry: JournalEntry): JournalFolder[] {
    const folders = getSavedFolders();
    const targetFolderId = folderId || (folders.length > 0 ? folders[0].id : "folder-morning");

    const updated = folders.map((folder) => {
        const filteredEntries = folder.entries.filter((e) => e.id !== entry.id);

        if (folder.id === targetFolderId) {
            const entryWithFolderId = { ...entry, folderId: targetFolderId };
            return {
                ...folder,
                entries: [entryWithFolderId, ...filteredEntries],
            };
        }
        return {
            ...folder,
            entries: filteredEntries,
        };
    });
    saveFolders(updated);
    return updated;
}

/**
 * Deletes a folder and all its associated journal entries by ID.
 */
export function deleteFolder(folderId: string): JournalFolder[] {
    const folders = getSavedFolders();
    const updated = folders.filter((folder) => folder.id !== folderId);
    saveFolders(updated);
    return updated;
}

/**
 * Deletes a specific journal entry from a target folder.
 */
export function deleteEntryFromFolder(folderId: string, entryId: string): JournalFolder[] {
    const folders = getSavedFolders();
    const updated = folders.map((folder) => {
        if (folder.id === folderId) {
            return {
                ...folder,
                entries: folder.entries.filter((e) => e.id !== entryId),
            };
        }
        return folder;
    });
    saveFolders(updated);
    return updated;
}
