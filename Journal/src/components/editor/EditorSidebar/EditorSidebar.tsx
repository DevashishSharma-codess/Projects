/**
 * Journal Editor Past Reflections Sidebar Component
 * Lists saved journal entries for quick review, entry selection, editing, and deletion.
 */

import React from "react";
import { BookOpen, Calendar, Edit3, Trash2 } from "lucide-react";
import type { EditorSidebarProps } from "../types/editor.types";
import "./EditorSidebar.css";

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
    entries,
    editingEntryId,
    handleSelectEntryForEdit,
    handleDeleteEntry,
}) => {
    return (
        <div className="journal-sidebar-right journal-sidebar-right-container">
            {/* SIDEBAR HEADER */}
            <div className="editor-sidebar-header">
                <h3 className="editor-sidebar-title">
                    <BookOpen size={17} color="#2597D0" /> Past Reflections
                </h3>
                <span className="editor-sidebar-count-badge">
                    {entries.length} Entries
                </span>
            </div>

            {/* PAST ENTRY CARDS SCROLL LIST */}
            <div className="editor-sidebar-list">
                {entries.length === 0 ? (
                    <div className="editor-sidebar-empty">
                        No entries found. Start writing on the left!
                    </div>
                ) : (
                    entries.map((entry) => {
                        const cleanText = entry.content ? entry.content.replace(/<[^>]*>/g, "").trim() : "";
                        const isEditing = editingEntryId === entry.id;
                        return (
                            <div
                                key={entry.id}
                                onClick={() => handleSelectEntryForEdit(entry)}
                                title="Click to Edit this Journal Entry ✏️"
                                className={`editor-sidebar-card ${isEditing ? "is-editing" : ""}`}
                            >
                                <div className="editor-sidebar-card-top">
                                    <span className="editor-sidebar-card-date">
                                        <Calendar size={12} /> {entry.date}
                                    </span>
                                    <div className="editor-sidebar-card-actions">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectEntryForEdit(entry);
                                            }}
                                            className="editor-sidebar-edit-btn"
                                            title="Edit entry"
                                        >
                                            <Edit3 size={11} /> Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteEntry(entry.id);
                                            }}
                                            className="editor-sidebar-delete-btn"
                                            title="Delete entry"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <h4 className="editor-sidebar-card-title">
                                    {entry.title}
                                </h4>
                                <p className={`editor-sidebar-card-body font-${entry.fontStyle === "handwriting" ? "handwriting" : "sans"}`}>
                                    {cleanText}
                                </p>
                                <div className="editor-sidebar-card-tags">
                                    {entry.tags.map((tg) => (
                                        <span key={tg} className="editor-sidebar-tag">
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
