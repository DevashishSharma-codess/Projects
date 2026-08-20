/**
 * Folder Explorer Type Definitions
 * Type interfaces for Mac desktop folders, entry creation, and viewing modals.
 */

import type { JournalFolder, JournalEntry } from "../../../types/journal";

/** Props for macOS styled desktop folder items */
export interface MacFolderItemProps {
    folder: JournalFolder;
    onClick: () => void;
    onDelete?: (id: string) => void;
    isSelected?: boolean;
}

/** Props for creating a new folder modal */
export interface NewFolderModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (name: string, color: string) => void;
}

/** Props for creating a new journal entry modal */
export interface NewJournalModalProps {
    show: boolean;
    folders: JournalFolder[];
    activeFolderId: string;
    onClose: () => void;
    onSave: (title: string, folderId: string) => void;
}

/** Props for reading/viewing a journal entry modal */
export interface ReadEntryModalProps {
    entry: JournalEntry | null;
    onClose: () => void;
    onEdit: (entry: JournalEntry) => void;
    onDelete: (id: string) => void;
}