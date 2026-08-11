import React, { useState } from "react";
import { FolderPlus, FileText, Search, Grid, List as ListIcon, Calendar, ArrowLeft, Plus, Eye, Trash2 } from "lucide-react";
import type { JournalEntry } from "../types/journal";
import { useJournal } from "../context/JournalContext";
import { MacFolderItem } from "./folder/MacFolderItem";
import { COLOR_OPTIONS, cleanHtmlText, NewFolderModal, NewJournalModal, ReadEntryModal } from "./folder/FolderModals";

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
            style={{
                position: "relative",
                background: "transparent",
                padding: "80px 24px",
                width: "100%",
                margin: 0,
                borderRadius: 0,
                boxShadow: "none",
                overflow: "hidden",
            }}
        >
            <div style={{ position: "relative", zIndex: 2, maxWidth: 1180, margin: "0 auto" }}>
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 46px)", color: "#FFFFFF", marginTop: 0, marginBottom: 0 }}>
                        Your Journal <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#FFFFFF" }}>Folder Directory</span>
                    </h2>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255, 255, 255, 0.95)", fontSize: "16px", maxWidth: 620, margin: "10px auto 0 auto" }}>
                        Organize, create, and manage desktop folders and daily journals seamlessly.
                    </p>
                </div>

                {/* WINDOWS/MAC EXPLORER CONTAINER WITH TRANSPARENT GLASS STYLE */}
                <div
                    style={{
                        background: "rgba(255, 255, 255, 0.45)",
                        backdropFilter: "blur(24px)",
                        WebkitBackdropFilter: "blur(24px)",
                        borderRadius: 24,
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        boxShadow: "0 25px 60px rgba(15, 23, 42, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.6)",
                        overflow: "hidden",
                    }}
                >
                    {/* Window Top Titlebar */}
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.4)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            padding: "14px 20px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ display: "flex", gap: 6 }}>
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
                                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginLeft: 10 }}>
                                {activeFolder ? `Desktop > Journals > ${activeFolder.name}` : "Desktop > Journal Folders"}
                            </span>
                        </div>

                        {/* Controls: New Folder, Search & View Mode Switcher */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <button
                                onClick={() => setShowNewFolderModal(true)}
                                style={{
                                    border: "none",
                                    background: "#3B82F6",
                                    color: "#FFFFFF",
                                    padding: "6px 14px",
                                    borderRadius: 9999,
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
                                }}
                            >
                                <FolderPlus size={14} /> New Folder
                            </button>

                            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                <Search size={14} color="#64748B" style={{ position: "absolute", left: 10 }} />
                                <input
                                    type="text"
                                    placeholder="Search folders or entries..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        padding: "6px 12px 6px 30px",
                                        borderRadius: 9999,
                                        border: "1px solid rgba(255, 255, 255, 0.7)",
                                        background: "rgba(255, 255, 255, 0.65)",
                                        fontSize: 12.5,
                                        outline: "none",
                                        width: 180,
                                        color: "#0F172A",
                                    }}
                                />
                            </div>

                            <div style={{ display: "flex", gap: 4, background: "rgba(255, 255, 255, 0.5)", padding: 3, borderRadius: 8, border: "1px solid rgba(255, 255, 255, 0.6)" }}>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    style={{ border: "none", background: viewMode === "grid" ? "#FFFFFF" : "transparent", padding: 5, borderRadius: 6, cursor: "pointer", color: "#334155" }}
                                >
                                    <Grid size={14} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    style={{ border: "none", background: viewMode === "list" ? "#FFFFFF" : "transparent", padding: 5, borderRadius: 6, cursor: "pointer", color: "#334155" }}
                                >
                                    <ListIcon size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* EXPLORER MAIN CONTENT BODY WITH TRANSPARENT GLASS BACKGROUND */}
                    <div style={{ padding: 32, minHeight: 380, background: "rgba(255, 255, 255, 0.25)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
                        {/* BREADCRUMB & BACK BUTTON & NEW JOURNAL IN FOLDER BUTTON */}
                        {activeFolder && (
                            <div style={{ marginBottom: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                                <button
                                    onClick={() => setActiveFolderId(null)}
                                    style={{
                                        border: "1px solid #CBD5E1",
                                        background: "#FFFFFF",
                                        padding: "6px 14px",
                                        borderRadius: 9999,
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: "#0F172A",
                                        cursor: "pointer",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                    }}
                                >
                                    <ArrowLeft size={14} /> Back to All Folders
                                </button>

                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#0F172A" }}>
                                        📁 {activeFolder.name} ({activeFolder.entries.length} Items)
                                    </span>

                                    <button
                                        onClick={() => setShowNewJournalModal(true)}
                                        style={{
                                            border: "none",
                                            background: "#0F172A",
                                            color: "#FFFFFF",
                                            padding: "7px 16px",
                                            borderRadius: 9999,
                                            fontSize: 12.5,
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 6,
                                            boxShadow: "0 4px 12px rgba(15,23,42,0.2)",
                                        }}
                                    >
                                        <Plus size={14} /> New Journal in {activeFolder.name}
                                    </button>

                                    <button
                                        onClick={(e) => handleDeleteFolder(e, activeFolder.id, activeFolder.name)}
                                        style={{
                                            border: "1px solid #FCA5A5",
                                            background: "#FEF2F2",
                                            color: "#EF4444",
                                            padding: "7px 14px",
                                            borderRadius: 9999,
                                            fontSize: 12.5,
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 4,
                                        }}
                                        title="Delete Folder"
                                    >
                                        <Trash2 size={14} /> Delete Folder
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* MODE A: SHOW FOLDERS DIRECTORY */}
                        {!activeFolderId ? (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
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
                                    <div style={{ textAlign: "center", padding: "40px 20px", background: "#FFFFFF", borderRadius: 20, border: "2px dashed #CBD5E1" }}>
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
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                                        {activeFolder.entries.map((entry) => (
                                            <div
                                                key={entry.id}
                                                onClick={() => setSelectedEntry(entry)}
                                                style={{
                                                    background: "#FFFFFF",
                                                    borderRadius: 18,
                                                    padding: 20,
                                                    border: "1.5px solid #CBD5E1",
                                                    boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
                                                    cursor: "pointer",
                                                    position: "relative",
                                                    transition: "transform 0.2s ease",
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                                                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#64748B", display: "flex", alignItems: "center", gap: 4 }}>
                                                        <Calendar size={13} /> {entry.date}
                                                    </span>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                        <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 9999, background: "#F1F5F9", color: "#0F172A", fontWeight: 700 }}>
                                                            {entry.mood}
                                                        </span>
                                                        <button
                                                            onClick={(e) => handleDeleteJournal(e, activeFolder.id, entry.id)}
                                                            style={{ border: "none", background: "#FEF2F2", color: "#EF4444", width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                                                            title="Delete journal entry"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#0F172A", margin: "0 0 8px 0" }}>
                                                    {entry.title}
                                                </h4>

                                                <p
                                                    style={{
                                                        fontFamily: entry.fontStyle === "handwriting" ? "'Caveat', cursive" : "'Plus Jakarta Sans', sans-serif",
                                                        fontSize: entry.fontStyle === "handwriting" ? 18 : 14,
                                                        color: "#475569",
                                                        lineHeight: 1.5,
                                                        margin: "0 0 12px 0",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {cleanHtmlText(entry.content)}
                                                </p>

                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px stroke #E2E8F0" }}>
                                                    <div style={{ display: "flex", gap: 4 }}>
                                                        {entry.tags.map((t) => (
                                                            <span key={t} style={{ fontSize: 11, fontWeight: 700, background: "#E2E8F0", color: "#334155", padding: "2px 8px", borderRadius: 9999 }}>
                                                                #{t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#2597D0", display: "flex", alignItems: "center", gap: 2 }}>
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
