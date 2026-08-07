import React, { useState, useEffect } from "react";
import { Folder, FolderPlus, FileText, Search, Grid, List as ListIcon, X, Calendar, Tag, ArrowLeft, Plus, ChevronRight, Eye, Edit3, Check, Trash2, MoreHorizontal } from "lucide-react";
import type { JournalEntry, JournalFolder } from "../types/journal";
import { DoodleBadge } from "./DoodleIllustrations";
import { getSavedFolders, createNewFolder, addEntryToFolder, deleteFolder, deleteEntryFromFolder } from "../utils/folderStorage";
import { useJournal } from "../context/JournalContext";

const COLOR_OPTIONS = [

    { name: "Amber Gold", hex: "#F59E0B" },
    { name: "Rose Pink", hex: "#EC4899" },
    { name: "Sky Blue", hex: "#3B82F6" },
    { name: "Royal Purple", hex: "#8763E0" },
    { name: "Emerald Green", hex: "#10B981" },
    { name: "Dark Slate", hex: "#475569" },
];

function MacFolderItem({
    folder,
    onClick,
    onDelete,
}: {
    folder: JournalFolder;
    onClick: () => void;
    onDelete: (e: React.MouseEvent) => void;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 0.86",
                background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
                borderRadius: 34,
                border: "none",
                boxShadow: hovered
                    ? "0 22px 48px rgba(59, 130, 246, 0.45)"
                    : "0 14px 32px rgba(15, 23, 42, 0.18)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: hovered ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
                display: "flex",
                flexDirection: "column",
                userSelect: "none",
                boxSizing: "border-box",
            }}
        >
            {/* TOP VIBRANT GRADIENT WALLPAPER AREA WITH FANNING PAPERS */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "44%",
                    background: folder.gradient || `linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)`,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                {/* Glossy Top Lighting Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
                    }}
                />

                {/* 3 Fanned White Paper Sheets Sticking out of Pocket */}
                <div
                    style={{
                        position: "relative",
                        bottom: "-5px",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: "80%",
                        height: "82%",
                        zIndex: 1,
                    }}
                >
                    {/* Sheet 1 (Left) */}
                    <div
                        style={{
                            width: "36%",
                            height: "84%",
                            background: "#FFFFFF",
                            borderRadius: "6px 6px 0 0",
                            boxShadow: "-2px 4px 8px rgba(0,0,0,0.15)",
                            transform: "rotate(-14deg) translateY(4px)",
                            transformOrigin: "bottom center",
                            padding: 5,
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "70%", height: 3, background: "#CBD5E1", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ width: "90%", height: 3, background: "#E2E8F0", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ width: "50%", height: 3, background: "#E2E8F0", borderRadius: 2 }} />
                    </div>

                    {/* Sheet 2 (Center) */}
                    <div
                        style={{
                            width: "42%",
                            height: "98%",
                            background: "#FFFFFF",
                            borderRadius: "7px 7px 0 0",
                            boxShadow: "0 6px 14px rgba(0,0,0,0.20)",
                            transform: "rotate(-3deg) translateY(0px)",
                            transformOrigin: "bottom center",
                            zIndex: 2,
                            padding: 7,
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "75%", height: 3.5, background: "#94A3B8", borderRadius: 2, marginBottom: 5 }} />
                        <div style={{ width: "88%", height: 3.5, background: "#CBD5E1", borderRadius: 2, marginBottom: 5 }} />
                        <div style={{ width: "60%", height: 3.5, background: "#CBD5E1", borderRadius: 2 }} />
                    </div>

                    {/* Sheet 3 (Right) */}
                    <div
                        style={{
                            width: "36%",
                            height: "88%",
                            background: "#FFFFFF",
                            borderRadius: "6px 6px 0 0",
                            boxShadow: "2px 4px 8px rgba(0,0,0,0.15)",
                            transform: "rotate(10deg) translateY(2px)",
                            transformOrigin: "bottom center",
                            zIndex: 1,
                            padding: 5,
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "80%", height: 3, background: "#CBD5E1", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ width: "65%", height: 3, background: "#E2E8F0", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ width: "85%", height: 3, background: "#E2E8F0", borderRadius: 2 }} />
                    </div>
                </div>
            </div>

            {/* BOTTOM LIGHTER BLUE GRADIENT FOLDER FLAP BODY WITH SVG TAB CUTOUT */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "60%",
                    marginTop: "-16%",
                    zIndex: 3,
                }}
            >
                {/* SVG Folder Front Flap */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 220 150"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
                >
                    <defs>
                        <linearGradient id="folderLightBlueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0 18 C 0 8, 8 0, 18 0 L 105 0 C 118 0, 124 6, 130 16 L 136 24 C 140 28, 146 30, 154 30 L 202 30 C 212 30, 220 38, 220 48 L 220 132 C 220 142, 212 150, 202 150 L 18 150 C 8 150, 0 142, 0 132 Z"
                        fill="url(#folderLightBlueGrad)"
                    />
                </svg>

                {/* TITLE & SUBTITLE POSITIONED INSIDE THE RAISED TAB CUTOUT */}
                <div style={{ position: "absolute", top: 10, left: 16, width: "48%", zIndex: 5 }}>
                    <h3 style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontSize: 14, fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.25, letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {folder.name}
                    </h3>
                    <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: 10.5, color: "rgba(255, 255, 255, 0.85)", margin: "2px 0 0 0", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {folder.description && folder.description.length < 20 ? folder.description : "Notes & More"}
                    </p>
                </div>

                {/* OPTIONS / DELETE BUTTON ON RIGHT SHOULDER */}
                <button
                    onClick={onDelete}
                    style={{
                        position: "absolute",
                        top: 32,
                        right: 12,
                        zIndex: 5,
                        border: "none",
                        outline: "none",
                        background: hovered ? "rgba(239, 68, 68, 0.25)" : "transparent",
                        color: hovered ? "#EF4444" : "rgba(255, 255, 255, 0.9)",
                        padding: "3px 5px",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                    }}
                    title="Delete Folder"
                >
                    {hovered ? <Trash2 size={13} color="#EF4444" /> : <MoreHorizontal size={16} color="rgba(255, 255, 255, 0.9)" />}
                </button>

                {/* BOTTOM FILE COUNT */}
                <div style={{ position: "absolute", bottom: 12, left: 16, zIndex: 5, display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, color: "rgba(255, 255, 255, 0.9)" }}>
                    <FileText size={12} color="rgba(255, 255, 255, 0.9)" />
                    <span>{folder.entries.length} Files</span>
                </div>
            </div>
        </div>
    );
}


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

    // Local form field inputs for modals
    const [newFolderName, setNewFolderName] = useState("");
    const [newFolderDesc, setNewFolderDesc] = useState("");
    const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].hex);

    const [journalTitle, setJournalTitle] = useState("");
    const [journalContent, setJournalContent] = useState("");
    const [journalTag, setJournalTag] = useState("Reflective");

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
                                                    {entry.content}
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

                {/* MODAL 1: CREATE NEW FOLDER MODAL */}
                {showNewFolderModal && (
                    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                        <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, maxWidth: 440, width: "100%", border: "2px solid #CBD5E1", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                                    <FolderPlus size={20} color="#3B82F6" /> Create New Folder
                                </h3>
                                <button onClick={() => setShowNewFolderModal(false)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
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
                )}

                {/* MODAL 2: CREATE JOURNAL DIRECTLY IN ACTIVE FOLDER */}
                {showNewJournalModal && activeFolder && (
                    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                        <div style={{ background: "#FFFFFF", borderRadius: 24, padding: 32, maxWidth: 540, width: "100%", border: "2px solid #CBD5E1", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                                    Create Journal in 📁 {activeFolder.name}
                                </h3>
                                <button onClick={() => setShowNewJournalModal(false)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
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
                )}

                {/* MODAL 3: JOURNAL ENTRY READING MODAL */}
                {selectedEntry && (
                    <div style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                        <div style={{ background: "#FFFFFF", borderRadius: 28, padding: 36, maxWidth: 640, width: "100%", boxShadow: "0 30px 60px rgba(0,0,0,0.3)", position: "relative" }}>
                            <button
                                onClick={() => setSelectedEntry(null)}
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
                                    {selectedEntry.content}
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
                )}
            </div>
        </section>
    );
}


