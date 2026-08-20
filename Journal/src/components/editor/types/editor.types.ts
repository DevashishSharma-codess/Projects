/**
 * Journal Editor Component Type Definitions
 * Interfaces and prop contracts for the rich text editor canvas and sidebar.
 */

import type { JournalEntry } from "../../../types/journal";

/** Props for the EditorCanvas workspace */
export interface EditorCanvasProps {
    title: string;
    setTitle: (val: string) => void;
    content: string;
    setContent: (val: string) => void;
    fontStyle: "sans" | "handwriting" | "serif";
    editingEntryId: string | null;
    wordCount: number;
    charCount: number;
    handleCancelEdit: () => void;
    availableTags: { name: string; color: string; bg: string }[];
    selectedTags: string[];
    toggleTag: (name: string) => void;
    savedNotification: boolean;
    handleSaveEntry: () => void;
    quillModules: any;
    quillFormats: string[];
}

/** Props for the EditorSidebar navigation panel */
export interface EditorSidebarProps {
    /** List of journal entries to render */
    entries: JournalEntry[];
    /** Currently editing entry ID */
    editingEntryId: string | null;
    /** Callback when user selects an entry to edit */
    handleSelectEntryForEdit: (entry: JournalEntry) => void;
    /** Callback to delete an entry by ID */
    handleDeleteEntry: (id: string) => void;
}
