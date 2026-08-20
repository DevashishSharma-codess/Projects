/**
 * Folder Explorer Modals & Utilities
 * Provides modal dialogs for creating new folders, writing journal entries, and viewing existing entry details.
 */

import React from "react";
import { FolderPlus, X, Check, Trash2, Edit3 } from "lucide-react";
import type { JournalFolder, JournalEntry } from "../../../types/journal";
import "./FolderModals.css";

/** Available color theme options for folder creation */
export const COLOR_OPTIONS = [
    { name: "Amber Gold", hex: "#F59E0B" },
    { name: "Rose Pink", hex: "#EC4899" },
    { name: "Sky Blue", hex: "#3B82F6" },
    { name: "Royal Purple", hex: "#8763E0" },
    { name: "Emerald Green", hex: "#10B981" },
    { name: "Dark Slate", hex: "#475569" },
];

/** Helper utility to sanitize HTML strings into clean text */
export function cleanHtmlText(htmlStr: string): string {
    if (!htmlStr) return "";
    return htmlStr.replace(/<[^>]*>/g, "").trim();
}

// ── New Folder Creation Modal ──────────────────────────────────────────────────

interface NewFolderModalProps {
    show: boolean;
    onClose: () => void;
    newFolderName: string;
    setNewFolderName: (val: string) => void;
    newFolderDesc: string;
    setNewFolderDesc: (val: string) => void;
    selectedColor: string;
    setSelectedColor: (val: string) => void;
    handleCreateFolder: () => void;
}

export const NewFolderModal: React.FC<NewFolderModalProps> = ({
    show,
    onClose,
    newFolderName,
    setNewFolderName,
    newFolderDesc,
    setNewFolderDesc,
    selectedColor,
    setSelectedColor,
    handleCreateFolder,
}) => {
    if (!show) return null;
    return (
        <div className="folder-modal-overlay">
            <div className="folder-modal-card-small">
                <div className="folder-modal-header">
                    <h3 className="folder-modal-title">
                        <FolderPlus size={20} color="#3B82F6" /> Create New Folder
                    </h3>
                    <button onClick={onClose} className="folder-modal-close-icon">
                        <X size={18} color="#64748B" />
                    </button>
                </div>

                <div className="folder-modal-field">
                    <label className="folder-modal-label">
                        FOLDER NAME
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Weekly Reflections..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="folder-modal-input"
                    />
                </div>

                <div className="folder-modal-field">
                    <label className="folder-modal-label">
                        DESCRIPTION (OPTIONAL)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Thoughts & weekly summaries"
                        value={newFolderDesc}
                        onChange={(e) => setNewFolderDesc(e.target.value)}
                        className="folder-modal-input"
                    />
                </div>

                <div className="folder-modal-field">
                    <label className="folder-modal-label">
                        FOLDER COLOR THEME
                    </label>
                    <div className="folder-modal-color-grid">
                        {COLOR_OPTIONS.map((c) => (
                            <button
                                key={c.hex}
                                onClick={() => setSelectedColor(c.hex)}
                                className="folder-modal-color-btn"
                                style={{
                                    background: c.hex,
                                    border: selectedColor === c.hex ? "3px solid #0F172A" : "none",
                                }}
                            >
                                {selectedColor === c.hex && <Check size={16} color="#FFFFFF" />}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleCreateFolder}
                    disabled={!newFolderName.trim()}
                    className={`folder-modal-action-btn ${newFolderName.trim() ? "active" : "disabled"}`}
                >
                    Create Folder
                </button>
            </div>
        </div>
    );
};

// ── New Journal Entry Modal ────────────────────────────────────────────────────

interface NewJournalModalProps {
    show: boolean;
    activeFolder: JournalFolder | undefined;
    onClose: () => void;
    journalTitle: string;
    setJournalTitle: (val: string) => void;
    journalContent: string;
    setJournalContent: (val: string) => void;
    handleCreateJournalInFolder: () => void;
}

export const NewJournalModal: React.FC<NewJournalModalProps> = ({
    show,
    activeFolder,
    onClose,
    journalTitle,
    setJournalTitle,
    journalContent,
    setJournalContent,
    handleCreateJournalInFolder,
}) => {
    if (!show || !activeFolder) return null;
    return (
        <div className="folder-modal-overlay">
            <div className="folder-modal-card-medium">
                <div className="folder-modal-header">
                    <h3 className="folder-modal-title">
                        Create Journal in 📁 {activeFolder.name}
                    </h3>
                    <button onClick={onClose} className="folder-modal-close-icon">
                        <X size={18} color="#64748B" />
                    </button>
                </div>

                <div className="folder-modal-field">
                    <input
                        type="text"
                        placeholder="Journal Title..."
                        value={journalTitle}
                        onChange={(e) => setJournalTitle(e.target.value)}
                        className="folder-modal-input title-input"
                    />
                </div>

                <div className="folder-modal-field">
                    <textarea
                        rows={5}
                        placeholder={`Write entry for ${activeFolder.name}...`}
                        value={journalContent}
                        onChange={(e) => setJournalContent(e.target.value)}
                        className="folder-modal-textarea"
                    />
                </div>

                <button
                    onClick={handleCreateJournalInFolder}
                    disabled={!journalContent.trim()}
                    className={`folder-modal-action-btn ${journalContent.trim() ? "active" : "disabled"}`}
                >
                    Save Entry to {activeFolder.name}
                </button>
            </div>
        </div>
    );
};

// ── Read Entry Details Modal ───────────────────────────────────────────────────

interface ReadEntryModalProps {
    selectedEntry: JournalEntry | null;
    activeFolderId: string | null;
    onClose: () => void;
    handleDeleteJournal: (e: React.MouseEvent, folderId: string, entryId: string) => void;
    handleOpenInEditor: (e: React.MouseEvent, entry: JournalEntry) => void;
}

export const ReadEntryModal: React.FC<ReadEntryModalProps> = ({
    selectedEntry,
    activeFolderId,
    onClose,
    handleDeleteJournal,
    handleOpenInEditor,
}) => {
    if (!selectedEntry) return null;
    return (
        <div className="folder-modal-overlay">
            <div className="folder-modal-card-large">
                <button
                    onClick={onClose}
                    className="folder-modal-close-circle"
                >
                    <X size={18} color="#475569" />
                </button>

                <div className="read-modal-meta">
                    <span className="read-modal-mood-badge">
                        {selectedEntry.mood}
                    </span>
                    <span className="read-modal-date-str">{selectedEntry.date} • {selectedEntry.time}</span>
                </div>

                <h2 className="read-modal-entry-title">
                    {selectedEntry.title}
                </h2>

                <div className="read-modal-content-box">
                    <p className={`read-modal-text font-${selectedEntry.fontStyle === "handwriting" ? "handwriting" : "sans"}`}>
                        {cleanHtmlText(selectedEntry.content)}
                    </p>
                </div>

                <div className="read-modal-actions">
                    <button
                        onClick={(e) => {
                            if (activeFolderId && selectedEntry) {
                                handleDeleteJournal(e, activeFolderId, selectedEntry.id);
                            }
                        }}
                        className="read-modal-delete-btn"
                    >
                        <Trash2 size={14} /> Delete Entry
                    </button>

                    <button
                        onClick={(e) => handleOpenInEditor(e, selectedEntry)}
                        className="read-modal-edit-btn"
                    >
                        <Edit3 size={14} /> Open in Studio Editor
                    </button>
                </div>
            </div>
        </div>
    );
};
