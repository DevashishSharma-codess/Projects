/**
 * Journal Editor Past Reflections Sidebar Component
 * Lists saved journal entries for quick review, entry selection, editing, and deletion.
 */

import React from "react";
import { BookOpen, Calendar, Edit3, Trash2 } from "lucide-react";
import type { JournalEntry } from "../../types/journal";

interface EditorSidebarProps {
    /** List of journal entries to render */
    entries: JournalEntry[];
    /** Currently editing entry ID */
    editingEntryId: string | null;
    /** Callback when user selects an entry to edit */
    handleSelectEntryForEdit: (entry: JournalEntry) => void;
    /** Callback to delete an entry by ID */
    handleDeleteEntry: (id: string) => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
    entries,
    editingEntryId,
    handleSelectEntryForEdit,
    handleDeleteEntry,
}) => {
    return (
        <div
            className="journal-sidebar-right"
            style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* SIDEBAR HEADER */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h3
                    style={{
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Outfit', sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#0F172A",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <BookOpen size={17} color="#2597D0" /> Past Reflections
                </h3>
                <span
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        background: "rgba(255, 255, 255, 0.7)",
                        padding: "3px 10px",
                        borderRadius: 9999,
                        color: "#334155",
                        border: "1px solid rgba(255,255,255,0.8)",
                    }}
                >
                    {entries.length} Entries
                </span>
            </div>

            {/* PAST ENTRY CARDS SCROLL LIST */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    maxHeight: 520,
                    overflowY: "auto",
                    paddingRight: 4,
                    flexGrow: 1,
                }}
            >
                {entries.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 30, color: "#64748B", fontSize: 14 }}>
                        No entries found. Start writing on the left!
                    </div>
                ) : (
                    entries.map((entry) => {
                        const cleanText = entry.content
                            ? entry.content
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
                                  .trim()
                            : "";
                        const isEditing = editingEntryId === entry.id;
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
                                    boxShadow: isEditing
                                        ? "0 8px 20px rgba(37,99,235,0.2)"
                                        : "0 4px 14px rgba(15,23,42,0.04)",
                                    position: "relative",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 6,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 11.5,
                                            fontWeight: 700,
                                            color: "#64748B",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                        }}
                                    >
                                        <Calendar size={12} /> {entry.date}
                                    </span>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectEntryForEdit(entry);
                                            }}
                                            style={{
                                                border: "none",
                                                background: "rgba(37,99,235,0.1)",
                                                color: "#2563EB",
                                                padding: "2px 8px",
                                                borderRadius: 9999,
                                                fontSize: 11,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 3,
                                            }}
                                            title="Edit entry"
                                        >
                                            <Edit3 size={11} /> Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteEntry(entry.id);
                                            }}
                                            style={{
                                                border: "none",
                                                background: "transparent",
                                                color: "#94A3B8",
                                                cursor: "pointer",
                                                padding: 2,
                                            }}
                                            title="Delete entry"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <h4
                                    style={{
                                        fontFamily:
                                            "-apple-system, BlinkMacSystemFont, 'Outfit', sans-serif",
                                        fontSize: 15,
                                        fontWeight: 700,
                                        color: "#0F172A",
                                        margin: "0 0 6px 0",
                                    }}
                                >
                                    {entry.title}
                                </h4>
                                <p
                                    style={{
                                        fontFamily:
                                            entry.fontStyle === "handwriting"
                                                ? "'Caveat', cursive"
                                                : "'Plus Jakarta Sans', sans-serif",
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
    );
};
