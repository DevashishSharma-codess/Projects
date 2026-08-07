import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
    Edit3,
    Tag,
    Save,
    Sparkles,
    CheckCircle2,
    Calendar,
    Trash2,
    BookOpen,
    Folder,
    Plus,
    X,
} from "lucide-react";
import { DoodleBadge } from "./DoodleIllustrations";
import type { JournalEntry, JournalFolder } from "../types/journal";
import { getSavedFolders, addEntryToFolder, deleteEntryFromFolder } from "../utils/folderStorage";

export type { JournalEntry };

const AVAILABLE_TAGS = [
    { name: "Grateful", color: "#10B981", bg: "rgba(16, 185, 129, 0.12)" },
    { name: "Stressful", color: "#EF4444", bg: "rgba(239, 68, 68, 0.12)" },
    { name: "Peaceful", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.12)" },
    { name: "Creative", color: "#8763E0", bg: "rgba(135, 99, 224, 0.12)" },
    { name: "Reflective", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.12)" },
    { name: "Productive", color: "#06B6D4", bg: "rgba(6, 182, 212, 0.12)" },
    { name: "Mindful", color: "#EC4899", bg: "rgba(236, 72, 153, 0.12)" },
];

const PROMPT_IDEAS = [
    "What made you smile today, even for a second?",
    "Write about a small win you experienced recently.",
    "Describe a challenge you faced and how you felt navigating it.",
    "What are three things in your life you feel thankful for today?",
    "If today was a chapter in a book, what would its title be?",
];

const QUILL_MODULES = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        [{ align: [] }],
        ["clean"],
    ],
};

const QUILL_FORMATS = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "align",
    "clean",
];

import { useJournal } from "../context/JournalContext";

export default function JournalEditor({ onEntrySaved }: { onEntrySaved?: (entry: JournalEntry) => void }) {
    const {
        folders,
        editingEntry,
        setEditingEntry,
        saveJournalEntry,
        deleteEntryFromFolder,
    } = useJournal();

    const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>(["Grateful"]);
    const [selectedMood, setSelectedMood] = useState("😌 Peaceful");
    const [fontStyle, setFontStyle] = useState<"sans" | "handwriting" | "serif">("handwriting");
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [activePrompt, setActivePrompt] = useState(PROMPT_IDEAS[0]);
    const [savedNotification, setSavedNotification] = useState(false);
    const [filterTag, setFilterTag] = useState<string | null>(null);
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");

    // Set default selected folder
    useEffect(() => {
        if (folders.length > 0 && !selectedFolderId) {
            setSelectedFolderId(folders[0].id);
        }
    }, [folders, selectedFolderId]);

    // Handle editing entry from context
    useEffect(() => {
        if (editingEntry) {
            handleSelectEntryForEdit(editingEntry);
        }
    }, [editingEntry]);

    useEffect(() => {
        const handleOpenEntryEvent = (e: Event) => {
            const customEv = e as CustomEvent<JournalEntry>;
            if (customEv.detail) {
                handleSelectEntryForEdit(customEv.detail);
            }
        };

        window.addEventListener("dogear_open_entry_in_editor", handleOpenEntryEvent);

        // Load entries from all folders for display list
        const allEntries = folders.flatMap((f) => f.entries || []);
        if (allEntries.length > 0) {
            setEntries(allEntries);
        }

        return () => {
            window.removeEventListener("dogear_open_entry_in_editor", handleOpenEntryEvent);
        };
    }, [folders]);


    const toggleTag = (tagName: string) => {
        setSelectedTags((prev) =>
            prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
        );
    };

    const handleSelectEntryForEdit = (entry: JournalEntry) => {
        setEditingEntryId(entry.id);
        setTitle(entry.title);
        setContent(entry.content);
        setSelectedTags(entry.tags && entry.tags.length > 0 ? entry.tags : ["Reflective"]);
        setSelectedMood(entry.mood || "😌 Peaceful");
        setFontStyle(entry.fontStyle || "handwriting");
        if (entry.folderId) {
            setSelectedFolderId(entry.folderId);
        }
    };

    const handleCancelEdit = () => {
        setEditingEntryId(null);
        setTitle("");
        setContent("");
    };

    const handleSaveEntry = () => {
        const plainText = content.replace(/<[^>]*>/g, "").trim();
        if (!plainText && !content.trim()) return;

        const targetFolderId = selectedFolderId || (folders.length > 0 ? folders[0].id : "folder-morning");

        const saved = saveJournalEntry(targetFolderId, {
            id: editingEntryId || undefined,
            title: title.trim() || "Untitled Daily Reflection",
            content,
            tags: selectedTags.length > 0 ? selectedTags : ["Reflective"],
            mood: selectedMood,
            fontStyle,
        });

        setEditingEntryId(null);
        setTitle("");
        setContent("");
        setSavedNotification(true);
        setTimeout(() => setSavedNotification(false), 3000);
        if (onEntrySaved) onEntrySaved(saved);
    };

    const handleDeleteEntry = (id: string) => {
        const target = entries.find((e) => e.id === id);
        if (target && target.folderId) {
            deleteEntryFromFolder(target.folderId, id);
        }
    };


    const applyPrompt = () => {
        setContent((prev) => (prev ? `${prev}\n\nPrompt: ${activePrompt}\n` : `Prompt: ${activePrompt}\n\n`));
    };

    const nextPrompt = () => {
        const nextIdx = (PROMPT_IDEAS.indexOf(activePrompt) + 1) % PROMPT_IDEAS.length;
        setActivePrompt(PROMPT_IDEAS[nextIdx]);
    };

    const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
    const charCount = content.length;

    const filteredEntries = filterTag ? entries.filter((e) => e.tags.includes(filterTag)) : entries;

    return (
        <section
            id="journal-studio"
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
            <style>{`
                .journal-studio-layout {
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 0;
                    min-height: 560px;
                }
                .journal-editor-left {
                    padding: 32px;
                    border-right: 1px solid rgba(255, 255, 255, 0.4);
                    display: flex;
                    flex-direction: column;
                }
                .journal-sidebar-right {
                    padding: 24px;
                }
                @media (max-width: 960px) {
                    .journal-studio-layout {
                        grid-template-columns: 1fr !important;
                    }
                    .journal-editor-left {
                        padding: 18px 14px !important;
                        border-right: none !important;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.4) !important;
                    }
                    .journal-sidebar-right {
                        padding: 18px 14px !important;
                    }
                }
            `}</style>
            <div style={{ position: "relative", zIndex: 2, maxWidth: 1180, margin: "0 auto" }}>
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 46px)", color: "#FFFFFF", marginTop: 0, marginBottom: 0 }}>
                        Your Daily Journaling <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#FFFFFF" }}>Canvas</span>
                    </h2>
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255, 255, 255, 0.95)", fontSize: "16px", maxWidth: 620, margin: "10px auto 0 auto" }}>
                        Write freely without blank-page intimidation. Choose target folders, tag your emotions, and keep years of reflections organized.
                    </p>
                </div>

                {/* macOS PROFESSIONAL STUDIO WINDOW WITH BLURRED TRANSPARENT GLASS BACKGROUND */}
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
                    {/* macOS Titlebar with Traffic Lights */}
                    <div
                        style={{
                            background: "rgba(255, 255, 255, 0.4)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            padding: "14px 22px",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 10,
                        }}
                    >
                        {/* Traffic Lights */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.2)" }} />
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.2)" }} />
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.2)" }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginLeft: 14, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>
                                Pages — Daily Studio Journal Editor
                            </span>
                        </div>

                        {/* macOS Status Pill */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#475569", background: "rgba(255,255,255,0.6)", padding: "4px 12px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.7)" }}>
                                {wordCount} words • {charCount} characters
                            </span>
                        </div>
                    </div>

                    {/* MAIN EDITOR & SIDEBAR LAYOUT */}
                    <div className="journal-studio-layout">
                        {/* LEFT EDITOR CANVAS */}
                        <div className="journal-editor-left">
                            {/* macOS Toolbar */}
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255, 255, 255, 0.4)" }}>
                                {/* Folder Selector */}
                                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255, 255, 255, 0.65)", border: "1px solid rgba(255, 255, 255, 0.8)", padding: "6px 14px", borderRadius: 9999, backdropFilter: "blur(8px)" }}>
                                    <Folder size={14} color="#2597D0" />
                                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1E40AF" }}>Save to Folder:</span>
                                    <select
                                        value={selectedFolderId}
                                        onChange={(e) => setSelectedFolderId(e.target.value)}
                                        style={{
                                            border: "none",
                                            background: "transparent",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif",
                                            fontSize: 13,
                                            fontWeight: 700,
                                            color: "#0F172A",
                                            outline: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {folders.map((f) => (
                                            <option key={f.id} value={f.id}>
                                                📁 {f.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* macOS Segmented Control Font Style Switcher */}
                                <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(255, 255, 255, 0.5)", padding: "4px", borderRadius: 9999, border: "1px solid rgba(255, 255, 255, 0.6)" }}>
                                    <button
                                        onClick={() => setFontStyle("handwriting")}
                                        style={{
                                            border: "none",
                                            padding: "6px 14px",
                                            borderRadius: 9999,
                                            background: fontStyle === "handwriting" ? "#FFFFFF" : "transparent",
                                            boxShadow: fontStyle === "handwriting" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                                            fontFamily: "'Caveat', cursive",
                                            fontWeight: 700,
                                            fontSize: 17,
                                            color: "#0F172A",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        Handwritten
                                    </button>
                                    <button
                                        onClick={() => setFontStyle("sans")}
                                        style={{
                                            border: "none",
                                            padding: "6px 14px",
                                            borderRadius: 9999,
                                            background: fontStyle === "sans" ? "#FFFFFF" : "transparent",
                                            boxShadow: fontStyle === "sans" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif",
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: "#0F172A",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        Sans Clean
                                    </button>
                                    <button
                                        onClick={() => setFontStyle("serif")}
                                        style={{
                                            border: "none",
                                            padding: "6px 14px",
                                            borderRadius: 9999,
                                            background: fontStyle === "serif" ? "#FFFFFF" : "transparent",
                                            boxShadow: fontStyle === "serif" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                                            fontFamily: "'Fraunces', serif",
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: "#0F172A",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        Serif Classic
                                    </button>
                                </div>
                            </div>

                            {/* Prompt Generator Card */}
                            <div style={{ background: "rgba(255, 255, 255, 0.65)", backdropFilter: "blur(12px)", borderRadius: 16, padding: "12px 18px", marginBottom: 24, border: "1px solid rgba(255, 255, 255, 0.8)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <Sparkles size={16} color="#0284C7" />
                                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0369A1" }}>“{activePrompt}”</span>
                                </div>
                                <div style={{ display: "flex", gap: 6 }}>
                                    <button onClick={applyPrompt} style={{ border: "none", background: "#0284C7", color: "#FFFFFF", padding: "5px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 8px rgba(2,132,199,0.3)" }}>
                                        Insert
                                    </button>
                                    <button onClick={nextPrompt} style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.7)", color: "#0284C7", padding: "5px 12px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                                        Next
                                    </button>
                                </div>
                            </div>

                            {/* PROPER SECTION 1: ENTRY TITLE SECTION */}
                            <div
                                style={{
                                    background: "rgba(255, 255, 255, 0.75)",
                                    backdropFilter: "blur(16px)",
                                    borderRadius: 18,
                                    border: "1.5px solid rgba(255, 255, 255, 0.9)",
                                    padding: "16px 20px",
                                    marginBottom: 20,
                                    boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.8)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                                    <Edit3 size={13} color="#2563EB" /> ENTRY TITLE
                                </label>
                                <input
                                    type="text"
                                    placeholder="Give your journal entry a title (e.g. Quiet Morning Coffee)..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{
                                        width: "100%",
                                        border: "none",
                                        outline: "none",
                                        fontFamily: fontStyle === "serif" ? "'Fraunces', serif" : fontStyle === "handwriting" ? "'Caveat', cursive" : "'Outfit', sans-serif",
                                        fontSize: fontStyle === "handwriting" ? 28 : 22,
                                        fontWeight: 700,
                                        color: "#0F172A",
                                        background: "transparent",
                                    }}
                                />
                            </div>

                            {/* PROPER SECTION 2: JOURNAL REFLECTION CANVAS SECTION WITH QUILL RICH TEXT EDITOR */}
                            <div
                                style={{
                                    background: "rgba(255, 255, 255, 0.85)",
                                    backdropFilter: "blur(20px)",
                                    borderRadius: 22,
                                    border: "1.5px solid rgba(255, 255, 255, 0.95)",
                                    padding: "18px 22px",
                                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06), inset 0 1.5px 2px rgba(255, 255, 255, 1)",
                                    display: "flex",
                                    flexDirection: "column",
                                    minHeight: 340,
                                    maxWidth: "100%",
                                    overflow: "hidden",
                                    boxSizing: "border-box",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid rgba(226, 232, 240, 0.8)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        {/* macOS Window Controls */}
                                        <div style={{ display: "flex", gap: 6, marginRight: 4 }}>
                                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
                                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
                                        </div>
                                        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, color: "#64748B", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                            <BookOpen size={13} color="#2563EB" /> JOURNAL REFLECTION CANVAS
                                        </label>
                                        {editingEntryId && (
                                            <span style={{ background: "#FEF3C7", color: "#B45309", padding: "2px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 800, border: "1px solid #FDE68A" }}>
                                                ✏️ Editing Past Entry
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", fontFamily: "'JetBrains Mono', monospace" }}>
                                            {wordCount} words
                                        </span>
                                        {editingEntryId && (
                                            <button
                                                onClick={handleCancelEdit}
                                                style={{ border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#64748B", padding: "3px 10px", borderRadius: 9999, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
                                            >
                                                <X size={12} /> Cancel Edit
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        fontFamily: fontStyle === "handwriting" ? "'Caveat', cursive" : fontStyle === "serif" ? "'Instrument Serif', serif" : "'Plus Jakarta Sans', sans-serif",
                                        fontSize: fontStyle === "handwriting" ? 20 : fontStyle === "serif" ? 18 : 15,
                                    }}
                                >
                                    <ReactQuill
                                        theme="snow"
                                        value={content}
                                        onChange={setContent}
                                        modules={QUILL_MODULES}
                                        formats={QUILL_FORMATS}
                                        placeholder="Write your rich formatted daily thoughts, ideas, and reflections here..."
                                    />
                                </div>
                            </div>

                            {/* Categorization Tags Section */}
                            <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.4)" }}>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#64748B", marginBottom: 10, letterSpacing: "0.05em" }}>
                                    CATEGORIZATION TAGS
                                </label>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {AVAILABLE_TAGS.map((tag) => {
                                        const isSelected = selectedTags.includes(tag.name);
                                        return (
                                            <button
                                                key={tag.name}
                                                onClick={() => toggleTag(tag.name)}
                                                style={{
                                                    border: isSelected ? `2px solid ${tag.color}` : "1px solid rgba(255,255,255,0.8)",
                                                    background: isSelected ? tag.bg : "rgba(255, 255, 255, 0.6)",
                                                    color: isSelected ? tag.color : "#475569",
                                                    padding: "6px 14px",
                                                    borderRadius: 9999,
                                                    fontWeight: 700,
                                                    fontSize: 12.5,
                                                    cursor: "pointer",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: 4,
                                                    transition: "all 0.2s ease",
                                                    backdropFilter: "blur(6px)",
                                                }}
                                            >
                                                <Tag size={12} />
                                                {tag.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Save Action Footer */}
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.4)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13, color: "#475569", fontWeight: 600 }}>
                                    <span>{wordCount} words</span>
                                    <span>•</span>
                                    <span>{charCount} chars</span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    {editingEntryId && (
                                        <button
                                            onClick={handleCancelEdit}
                                            style={{
                                                background: "rgba(255, 255, 255, 0.8)",
                                                color: "#475569",
                                                border: "1px solid #CBD5E1",
                                                padding: "11px 18px",
                                                borderRadius: 9999,
                                                fontWeight: 700,
                                                fontSize: 13.5,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    )}

                                    {savedNotification && (
                                        <span style={{ color: "#10B981", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                                            <CheckCircle2 size={16} /> {editingEntryId ? "Entry Updated!" : "Saved to Folder!"}
                                        </span>
                                    )}
                                    <button
                                        onClick={handleSaveEntry}
                                        disabled={!content.replace(/<[^>]*>/g, "").trim()}
                                        style={{
                                            background: content.replace(/<[^>]*>/g, "").trim() ? (editingEntryId ? "#2563EB" : "#0F172A") : "rgba(148, 163, 184, 0.4)",
                                            color: "#FFFFFF",
                                            border: "none",
                                            padding: "11px 24px",
                                            borderRadius: 9999,
                                            fontWeight: 700,
                                            fontSize: 14,
                                            cursor: content.replace(/<[^>]*>/g, "").trim() ? "pointer" : "not-allowed",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 8,
                                            boxShadow: content.replace(/<[^>]*>/g, "").trim() ? "0 10px 24px rgba(37,99,235,0.25)" : "none",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        <Save size={15} /> {editingEntryId ? "Update Entry" : "Save Journal Entry"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT macOS SIDEBAR: PAST REFLECTIONS */}
                        <div className="journal-sidebar-right" style={{ background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                <h3 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                                    <BookOpen size={17} color="#2597D0" /> Past Reflections
                                </h3>
                                <span style={{ fontSize: 12, fontWeight: 700, background: "rgba(255, 255, 255, 0.7)", padding: "3px 10px", borderRadius: 9999, color: "#334155", border: "1px solid rgba(255,255,255,0.8)" }}>
                                    {entries.length} Entries
                                </span>
                            </div>

                            {/* Entry Cards List */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxHeight: 520, overflowY: "auto", paddingRight: 4, flexGrow: 1 }}>
                                {entries.length === 0 ? (
                                    <div style={{ textAlign: "center", padding: 30, color: "#64748B", fontSize: 14 }}>
                                        No entries found. Start writing on the left!
                                    </div>
                                ) : (
                                    entries.map((entry) => {
                                        const isEditing = editingEntryId === entry.id;
                                        const cleanText = entry.content.replace(/<[^>]*>/g, "");
                                        return (
                                            <div
                                                key={entry.id}
                                                onClick={() => handleSelectEntryForEdit(entry)}
                                                title="Click to Edit this Journal Entry ✏️"
                                                style={{
                                                    background: isEditing ? "#EFF6FF" : "rgba(255, 255, 255, 0.75)",
                                                    backdropFilter: "blur(12px)",
                                                    WebkitBackdropFilter: "blur(12px)",
                                                    borderRadius: 16,
                                                    padding: 16,
                                                    border: isEditing ? "2px solid #2563EB" : "1px solid rgba(255, 255, 255, 0.8)",
                                                    boxShadow: isEditing ? "0 8px 20px rgba(37,99,235,0.2)" : "0 4px 14px rgba(15,23,42,0.04)",
                                                    position: "relative",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s ease",
                                                }}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                                                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "#64748B", display: "flex", alignItems: "center", gap: 4 }}>
                                                        <Calendar size={12} /> {entry.date}
                                                    </span>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleSelectEntryForEdit(entry); }}
                                                            style={{ border: "none", background: "rgba(37,99,235,0.1)", color: "#2563EB", padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}
                                                            title="Edit entry"
                                                        >
                                                            <Edit3 size={11} /> Edit
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry.id); }}
                                                            style={{ border: "none", background: "transparent", color: "#94A3B8", cursor: "pointer", padding: 2 }}
                                                            title="Delete entry"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <h4 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                                                    {entry.title}
                                                </h4>
                                                <p
                                                    style={{
                                                        fontFamily: entry.fontStyle === "handwriting" ? "'Caveat', cursive" : "'Plus Jakarta Sans', sans-serif",
                                                        fontSize: entry.fontStyle === "handwriting" ? 17 : 13.5,
                                                        color: "#475569",
                                                        lineHeight: 1.45,
                                                        margin: "0 0 10px 0",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {cleanText}
                                                </p>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                                    {entry.tags.map((tg) => (
                                                        <span
                                                            key={tg}
                                                            style={{
                                                                fontSize: 10.5,
                                                                fontWeight: 700,
                                                                background: "rgba(255, 255, 255, 0.8)",
                                                                color: "#334155",
                                                                padding: "2px 8px",
                                                                borderRadius: 9999,
                                                                border: "1px solid rgba(255, 255, 255, 0.9)",
                                                            }}
                                                        >
                                                            #{tg}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
