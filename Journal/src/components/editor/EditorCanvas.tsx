/**
 * Journal Editor Canvas Component
 * Renders entry title input, rich text ReactQuill editor workspace, word counters, tag selectors, and save actions.
 */

import React from "react";
import ReactQuill from "react-quill-new";
import { Edit3, BookOpen, X, Tag, CheckCircle2, Save } from "lucide-react";

interface EditorCanvasProps {
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

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
    title,
    setTitle,
    content,
    setContent,
    fontStyle,
    editingEntryId,
    wordCount,
    charCount,
    handleCancelEdit,
    availableTags,
    selectedTags,
    toggleTag,
    savedNotification,
    handleSaveEntry,
    quillModules,
    quillFormats,
}) => {
    const isSaveDisabled = !content.replace(/<[^>]*>/g, "").trim();

    return (
        <>
            {/* ENTRY TITLE SECTION */}
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
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11.5,
                        fontWeight: 800,
                        color: "#64748B",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                    }}
                >
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
                        fontFamily:
                            fontStyle === "serif"
                                ? "'Fraunces', serif"
                                : fontStyle === "handwriting"
                                ? "'Caveat', cursive"
                                : "'Outfit', sans-serif",
                        fontSize: fontStyle === "handwriting" ? 28 : 22,
                        fontWeight: 700,
                        color: "#0F172A",
                        background: "transparent",
                    }}
                />
            </div>

            {/* JOURNAL REFLECTION CANVAS WITH QUILL RICH TEXT EDITOR */}
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
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                        paddingBottom: 10,
                        borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {/* Window Indicator */}
                        <div style={{ display: "flex", gap: 6, marginRight: 4 }}>
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
                            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
                        </div>
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                fontSize: 11.5,
                                fontWeight: 800,
                                color: "#64748B",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                            }}
                        >
                            <BookOpen size={13} color="#2563EB" /> JOURNAL REFLECTION CANVAS
                        </label>
                        {editingEntryId && (
                            <span
                                style={{
                                    background: "#FEF3C7",
                                    color: "#B45309",
                                    padding: "2px 10px",
                                    borderRadius: 9999,
                                    fontSize: 11,
                                    fontWeight: 800,
                                    border: "1px solid #FDE68A",
                                }}
                            >
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
                                style={{
                                    border: "1px solid #CBD5E1",
                                    background: "#FFFFFF",
                                    color: "#64748B",
                                    padding: "3px 10px",
                                    borderRadius: 9999,
                                    fontSize: 11,
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                }}
                            >
                                <X size={12} /> Cancel Edit
                            </button>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        fontFamily:
                            fontStyle === "handwriting"
                                ? "'Caveat', cursive"
                                : fontStyle === "serif"
                                ? "'Instrument Serif', serif"
                                : "'Plus Jakarta Sans', sans-serif",
                        fontSize: fontStyle === "handwriting" ? 20 : fontStyle === "serif" ? 18 : 15,
                    }}
                >
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Write your rich formatted daily thoughts, ideas, and reflections here..."
                    />
                </div>
            </div>

            {/* CATEGORIZATION TAGS */}
            <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(255, 255, 255, 0.4)" }}>
                <label
                    style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#64748B",
                        marginBottom: 10,
                        letterSpacing: "0.05em",
                    }}
                >
                    CATEGORIZATION TAGS
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {availableTags.map((tag) => {
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

            {/* SAVE ACTION FOOTER */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    marginTop: 24,
                    paddingTop: 18,
                    borderTop: "1px solid rgba(255, 255, 255, 0.4)",
                }}
            >
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
                        <span
                            style={{
                                color: "#10B981",
                                fontSize: 13,
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            <CheckCircle2 size={16} /> {editingEntryId ? "Entry Updated!" : "Saved to Folder!"}
                        </span>
                    )}
                    <button
                        onClick={handleSaveEntry}
                        disabled={isSaveDisabled}
                        style={{
                            background: !isSaveDisabled
                                ? editingEntryId
                                    ? "#2563EB"
                                    : "#0F172A"
                                : "rgba(148, 163, 184, 0.4)",
                            color: "#FFFFFF",
                            border: "none",
                            padding: "11px 24px",
                            borderRadius: 9999,
                            fontWeight: 700,
                            fontSize: 14,
                            cursor: !isSaveDisabled ? "pointer" : "not-allowed",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            boxShadow: !isSaveDisabled ? "0 10px 24px rgba(37,99,235,0.25)" : "none",
                            transition: "all 0.2s ease",
                        }}
                    >
                        <Save size={15} /> {editingEntryId ? "Update Entry" : "Save Journal Entry"}
                    </button>
                </div>
            </div>
        </>
    );
};
