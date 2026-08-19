/**
 * Folder Explorer Modals & Utilities
 * Provides modal dialogs for creating new folders, writing journal entries, and viewing existing entry details.
 */

import React from "react";
import { FolderPlus, X, Check, Trash2, Edit3 } from "lucide-react";
import type { JournalFolder, JournalEntry } from "../../types/journal";

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
    return htmlStr
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/p>/gi, "\n")
        .replace(/<\/div>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n\s*\n/g, "\n\n")
        .trim();
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, maxWidth: 440, width: "100%", border: "2px solid #CBD5E1", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                        <FolderPlus size={20} color="#3B82F6" /> Create New Folder
                    </h3>
                    <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                        <X size={18} color="#64748B" />
                    </button>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#64748B", marginBottom: 6 }}>
                        FOLDER NAME
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Weekly Reflections..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 14, color: "#0F172A", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#64748B", marginBottom: 6 }}>
                        DESCRIPTION (OPTIONAL)
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Thoughts & weekly summaries"
                        value={newFolderDesc}
                        onChange={(e) => setNewFolderDesc(e.target.value)}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 13.5, color: "#0F172A", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#64748B", marginBottom: 8 }}>
                        FOLDER COLOR THEME
                    </label>
                    <div style={{ display: "flex", gap: 10 }}>
                        {COLOR_OPTIONS.map((c) => (
                            <button
                                key={c.hex}
                                onClick={() => setSelectedColor(c.hex)}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: c.hex,
                                    border: selectedColor === c.hex ? "3px solid #0F172A" : "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
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
                    style={{
                        width: "100%",
                        background: newFolderName.trim() ? "#0F172A" : "#CBD5E1",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "12px",
                        borderRadius: 9999,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: newFolderName.trim() ? "pointer" : "not-allowed",
                    }}
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, maxWidth: 540, width: "100%", border: "2px solid #CBD5E1", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                        Create Journal in 📁 {activeFolder.name}
                    </h3>
                    <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                        <X size={18} color="#64748B" />
                    </button>
                </div>

                <div style={{ marginBottom: 14 }}>
                    <input
                        type="text"
                        placeholder="Journal Title..."
                        value={journalTitle}
                        onChange={(e) => setJournalTitle(e.target.value)}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontSize: 15, fontWeight: 700, color: "#0F172A", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <textarea
                        rows={5}
                        placeholder={`Write entry for ${activeFolder.name}...`}
                        value={journalContent}
                        onChange={(e) => setJournalContent(e.target.value)}
                        style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #CBD5E1", outline: "none", fontFamily: "'Caveat', cursive", fontSize: 20, color: "#1E293B", boxSizing: "border-box" }}
                    />
                </div>

                <button
                    onClick={handleCreateJournalInFolder}
                    disabled={!journalContent.trim()}
                    style={{ width: "100%", background: journalContent.trim() ? "#0F172A" : "#CBD5E1", color: "#FFFFFF", border: "none", padding: "12px", borderRadius: 9999, fontWeight: 700, fontSize: 14, cursor: journalContent.trim() ? "pointer" : "not-allowed" }}
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
        <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ background: "#FFFFFF", borderRadius: 28, padding: 36, maxWidth: 640, width: "100%", boxShadow: "0 30px 60px rgba(0,0,0,0.3)", position: "relative" }}>
                <button
                    onClick={onClose}
                    style={{ position: "absolute", top: 20, right: 20, border: "none", background: "#F1F5F9", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <X size={18} color="#475569" />
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#2597D0", background: "#E0F2FE", padding: "4px 12px", borderRadius: 9999 }}>
                        {selectedEntry.mood}
                    </span>
                    <span style={{ fontSize: 13, color: "#64748B" }}>{selectedEntry.date} • {selectedEntry.time}</span>
                </div>

                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, color: "#0F172A", margin: "0 0 16px 0" }}>
                    {selectedEntry.title}
                </h2>

                <div style={{ background: "#F8FAFC", borderRadius: 16, padding: 24, border: "1px solid #E2E8F0", marginBottom: 24 }}>
                    <p
                        style={{
                            fontFamily: selectedEntry.fontStyle === "handwriting" ? "'Caveat', cursive" : "'Plus Jakarta Sans', sans-serif",
                            fontSize: selectedEntry.fontStyle === "handwriting" ? 22 : 16,
                            lineHeight: 1.6,
                            color: "#1E293B",
                            margin: 0,
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {cleanHtmlText(selectedEntry.content)}
                    </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button
                        onClick={(e) => {
                            if (activeFolderId && selectedEntry) {
                                handleDeleteJournal(e, activeFolderId, selectedEntry.id);
                            }
                        }}
                        style={{ border: "1px solid #FCA5A5", background: "#FEF2F2", color: "#EF4444", padding: "8px 16px", borderRadius: 9999, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                        <Trash2 size={14} /> Delete Entry
                    </button>

                    <button
                        onClick={(e) => handleOpenInEditor(e, selectedEntry)}
                        style={{ border: "none", background: "#2563EB", color: "#FFFFFF", padding: "10px 20px", borderRadius: 9999, fontWeight: 700, fontSize: 13.5, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}
                    >
                        <Edit3 size={14} /> Open in Studio Editor
                    </button>
                </div>
            </div>
        </div>
    );
};
