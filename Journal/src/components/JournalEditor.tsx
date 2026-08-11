import React, { useState, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import { Folder, Sparkles } from "lucide-react";
import type { JournalEntry } from "../types/journal";
import { useJournal } from "../context/JournalContext";
import { EditorSidebar } from "./editor/EditorSidebar";
import { EditorCanvas } from "./editor/EditorCanvas";

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

export default function JournalEditor({ onEntrySaved }: { onEntrySaved?: (entry: JournalEntry) => void }) {
    const {
        folders,
        editingEntry,
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
    const [selectedFolderId, setSelectedFolderId] = useState<string>("");

    useEffect(() => {
        if (folders.length > 0 && !selectedFolderId) {
            setSelectedFolderId(folders[0].id);
        }
    }, [folders, selectedFolderId]);

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

                            <EditorCanvas
                                title={title}
                                setTitle={setTitle}
                                content={content}
                                setContent={setContent}
                                fontStyle={fontStyle}
                                editingEntryId={editingEntryId}
                                wordCount={wordCount}
                                charCount={charCount}
                                handleCancelEdit={handleCancelEdit}
                                availableTags={AVAILABLE_TAGS}
                                selectedTags={selectedTags}
                                toggleTag={toggleTag}
                                savedNotification={savedNotification}
                                handleSaveEntry={handleSaveEntry}
                                quillModules={QUILL_MODULES}
                                quillFormats={QUILL_FORMATS}
                            />
                        </div>

                        {/* RIGHT macOS SIDEBAR: PAST REFLECTIONS */}
                        <EditorSidebar
                            entries={entries}
                            editingEntryId={editingEntryId}
                            handleSelectEntryForEdit={handleSelectEntryForEdit}
                            handleDeleteEntry={handleDeleteEntry}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
