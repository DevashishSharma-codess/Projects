/**
 * Folder Explorer Section Component
 * Desktop file directory browser supporting folder creation, filtering, entry browsing, and modal dialogs.
 */

import React, { useState } from "react";
import { FolderPlus, FileText, Search, Grid, List as ListIcon, Calendar, ArrowLeft, Plus, Eye, Trash2 } from "lucide-react";
import type { JournalEntry } from "../../../types/journal";
import { useJournal } from "../../../context/JournalContext";
import { MacFolderItem } from "../MacFolderItem/MacFolderItem";
import { COLOR_OPTIONS, cleanHtmlText, NewFolderModal, NewJournalModal, ReadEntryModal } from "../FolderModals/FolderModals";
import "./FolderExplorer.css";

export default function FolderExplorer({ onOpenEditor }: { onOpenEditor?: (folderId?: string) => void }) {
    const {
        folders,
        activeFolderId,
        setActiveFolderId,
        selectedEntry,
        setSelectedEntry,
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
    } = useJournal();

    const [newFolderName, setNewFolderName] = useState("");
    const [newFolderDesc, setNewFolderDesc] = useState("");
    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].hex);

    const [journalTitle, setJournalTitle] = useState("");
    const [journalContent, setJournalContent] = useState("");
    const [journalTag] = useState("Reflective");

    const activeFolder = folders.find((f) => f.id === activeFolderId);

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;
        const created = createFolder(newFolderName.trim(), newFolderDesc.trim(), selectedColor);
        setNewFolderName("");
        setNewFolderDesc("");
        setShowNewFolderModal(false);
        setActiveFolderId(created.id);
    };

    const handleDeleteFolder = (e: React.MouseEvent, folderId: string, folderName: string) => {
        e.stopPropagation();
        if (window.confirm(`Delete folder "${folderName}" and all its journal entries?`)) {
            deleteFolder(folderId);
        }
    };

    const handleDeleteJournal = (e: React.MouseEvent, folderId: string, entryId: string) => {
        e.stopPropagation();
        deleteEntryFromFolder(folderId, entryId);
    };

    const handleCreateJournalInFolder = () => {
        if (!activeFolderId || !journalContent.trim()) return;
        const newEntry: JournalEntry = {
            id: `entry-${Date.now()}`,
            folderId: activeFolderId,
            title: journalTitle.trim() || "Untitled Daily Journal",
            content: journalContent.trim(),
            tags: [journalTag],
            mood: "😌 Peaceful",
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            fontStyle: "handwriting",
        };
        addEntryToFolder(activeFolderId, newEntry);
        setJournalTitle("");
        setJournalContent("");
        setShowNewJournalModal(false);
    };

    const handleOpenInEditor = (e: React.MouseEvent, entry: JournalEntry) => {
        e.stopPropagation();
        setSelectedEntry(null);
        setEditingEntry(entry);
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("dogear_open_entry_in_editor", { detail: entry }));
        }
        if (onOpenEditor) {
            onOpenEditor(entry.folderId);
        } else {
            const el = document.getElementById("journal-studio");
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const displayedFolders = folders.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.entries.some((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <section
            id="folder-explorer"
            className="folder-explorer-section"
        >
            <div className="folder-explorer-wrapper">
                {/* Section Header */}
                <div className="folder-explorer-header">
                    <h2 className="folder-explorer-main-title">
                        Your Journal <span className="folder-explorer-serif-title">Folder Directory</span>
                    </h2>
                    <p className="folder-explorer-subtext">
                        Organize, create, and manage desktop folders and daily journals seamlessly.
                    </p>
                </div>

                {/* WINDOWS/MAC EXPLORER CONTAINER WITH TRANSPARENT GLASS STYLE */}
                <div className="folder-explorer-window">
                    {/* Window Top Titlebar */}
                    <div className="folder-explorer-titlebar">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div className="folder-explorer-window-dots">
                                <div className="dot-red" />
                                <div className="dot-yellow" />
                                <div className="dot-green" />
                            </div>
                            <span className="folder-explorer-path">
                                {activeFolder ? `Desktop > Journals > ${activeFolder.name}` : "Desktop > Journal Folders"}
                            </span>
                        </div>

                        {/* Controls: New Folder, Search & View Mode Switcher */}
                        <div className="folder-explorer-controls">
                            <button
                                onClick={() => setShowNewFolderModal(true)}
                                className="folder-explorer-new-btn"
                            >
                                <FolderPlus size={14} /> New Folder
                            </button>

                            <div className="folder-explorer-search-wrapper">
                                <Search size={14} color="#64748B" style={{ position: "absolute", left: 10 }} />
                                <input
                                    type="text"
                                    placeholder="Search folders or entries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="folder-explorer-search-input"
                                />
                            </div>

                            <div className="folder-explorer-view-toggle">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`folder-explorer-toggle-btn ${viewMode === "grid" ? "active" : "inactive"}`}
                                >
                                    <Grid size={14} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`folder-explorer-toggle-btn ${viewMode === "list" ? "active" : "inactive"}`}
                                >
                                    <ListIcon size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* EXPLORER MAIN CONTENT BODY WITH TRANSPARENT GLASS BACKGROUND */}
                    <div className="folder-explorer-body">
                        {/* BREADCRUMB & BACK BUTTON & NEW JOURNAL IN FOLDER BUTTON */}
                        {activeFolder && (
                            <div className="folder-explorer-breadcrumb">
                                <button
                                    onClick={() => setActiveFolderId(null)}
                                    className="folder-explorer-back-btn"
                                >
                                    <ArrowLeft size={14} /> Back to All Folders
                                </button>

                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span className="folder-explorer-folder-name-tag">
                                        📁 {activeFolder.name} ({activeFolder.entries.length} Items)
                                    </span>

                                    <button
                                        onClick={() => setShowNewJournalModal(true)}
                                        className="folder-explorer-add-journal-btn"
                                    >
                                        <Plus size={14} /> New Journal in {activeFolder.name}
                                    </button>

                                    <button
                                        onClick={(e) => handleDeleteFolder(e, activeFolder.id, activeFolder.name)}
                                        className="folder-explorer-delete-folder-btn"
                                        title="Delete Folder"
                                    >
                                        <Trash2 size={14} /> Delete Folder
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* MODE A: SHOW FOLDERS DIRECTORY */}
                        {!activeFolderId ? (
                            <div className="folder-explorer-folders-grid">
                                {displayedFolders.map((folder) => (
                                    <MacFolderItem
                                        key={folder.id}
                                        folder={folder}
                                        onClick={() => setActiveFolderId(folder.id)}
                                        onDelete={(e) => handleDeleteFolder(e, folder.id, folder.name)}
                                    />
                                ))}
                            </div>
                        ) : activeFolder ? (
                            /* MODE B: SHOW ENTRIES INSIDE SELECTED FOLDER */
                            <div>
                                {activeFolder.entries.length === 0 ? (
                                    <div className="folder-explorer-empty-box">
                                        <FileText size={36} color="#94A3B8" />
                                        <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, color: "#0F172A", marginTop: 10 }}>This folder is empty</h4>
                                        <p style={{ fontSize: 13.5, color: "#64748B" }}>Create your first daily journal reflection inside 📁 {activeFolder.name}.</p>
                                        <button
                                            onClick={() => setShowNewJournalModal(true)}
                                            style={{ border: "none", background: "#0F172A", color: "#FFFFFF", padding: "10px 20px", borderRadius: 9999, fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: 10 }}
                                        >
                                            + Create Journal Entry
                                        </button>
                                    </div>
                                ) : (
                                    <div className="folder-explorer-entries-grid">
                                        {activeFolder.entries.map((entry) => (
                                            <div
                                                key={entry.id}
                                                onClick={() => setSelectedEntry(entry)}
                                                className="folder-entry-card"
                                            >
                                                <div className="folder-entry-top">
                                                    <span className="folder-entry-date">
                                                        <Calendar size={13} /> {entry.date}
                                                    </span>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                        <span className="folder-entry-mood-badge">
                                                            {entry.mood}
                                                        </span>
                                                        <button
                                                            onClick={(e) => handleDeleteJournal(e, activeFolder.id, entry.id)}
                                                            className="folder-entry-delete-btn"
                                                            title="Delete journal entry"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <h4 className="folder-entry-title">
                                                    {entry.title}
                                                </h4>

                                                <p className={`folder-entry-snippet font-${entry.fontStyle === "handwriting" ? "handwriting" : "sans"}`}>
                                                    {cleanHtmlText(entry.content)}
                                                </p>

                                                <div className="folder-entry-footer">
                                                    <div className="folder-entry-tags">
                                                        {entry.tags.map((t) => (
                                                            <span key={t} className="folder-entry-tag">
                                                                #{t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span className="folder-entry-open-btn">
                                                        Open <Eye size={13} />
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>

                <NewFolderModal
                    show={showNewFolderModal}
                    onClose={() => setShowNewFolderModal(false)}
                    newFolderName={newFolderName}
                    setNewFolderName={setNewFolderName}
                    newFolderDesc={newFolderDesc}
                    setNewFolderDesc={setNewFolderDesc}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    handleCreateFolder={handleCreateFolder}
                />

                <NewJournalModal
                    show={showNewJournalModal}
                    activeFolder={activeFolder}
                    onClose={() => setShowNewJournalModal(false)}
                    journalTitle={journalTitle}
                    setJournalTitle={setJournalTitle}
                    journalContent={journalContent}
                    setJournalContent={setJournalContent}
                    handleCreateJournalInFolder={handleCreateJournalInFolder}
                />

                <ReadEntryModal
                    selectedEntry={selectedEntry}
                    activeFolderId={activeFolderId}
                    onClose={() => setSelectedEntry(null)}
                    handleDeleteJournal={handleDeleteJournal}
                    handleOpenInEditor={handleOpenInEditor}
                />
            </div>
        </section>
    );
}
