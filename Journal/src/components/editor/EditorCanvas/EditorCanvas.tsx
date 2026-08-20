/**
 * Journal Editor Canvas Component
 * Renders entry title input, rich text ReactQuill editor workspace, word counters, tag selectors, and save actions.
 */

import React from "react";
import ReactQuill from "react-quill-new";
import { Edit3, BookOpen, X, Tag, CheckCircle2, Save } from "lucide-react";
import type { EditorCanvasProps } from "../types/editor.types";
import "./EditorCanvas.css";

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
    const isSaveDisabled = !content.trim();

    return (
        <>
            {/* ENTRY TITLE SECTION */}
            <div className="editor-title-container">
                <label className="editor-title-label">
                    <Edit3 size={13} color="#2563EB" /> ENTRY TITLE
                </label>
                <input
                    type="text"
                    placeholder="Give your journal entry a title (e.g. Quiet Morning Coffee)..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`editor-title-input font-${fontStyle}`}
                />
            </div>

            {/* JOURNAL REFLECTION CANVAS WITH QUILL RICH TEXT EDITOR */}
            <div className="editor-canvas-container">
                <div className="editor-canvas-header">
                    <div className="editor-canvas-header-left">
                        {/* Window Indicator */}
                        <div className="editor-window-dots">
                            <div className="editor-dot dot-red" />
                            <div className="editor-dot dot-amber" />
                            <div className="editor-dot dot-green" />
                        </div>
                        <label className="editor-canvas-label">
                            <BookOpen size={13} color="#2563EB" /> JOURNAL REFLECTION CANVAS
                        </label>
                        {editingEntryId && (
                            <span className="editor-editing-badge">
                                ✏️ Editing Past Entry
                            </span>
                        )}
                    </div>

                    <div className="editor-canvas-header-right">
                        <span className="editor-word-count-text">
                            {wordCount} words
                        </span>
                        {editingEntryId && (
                            <button
                                onClick={handleCancelEdit}
                                className="editor-cancel-btn"
                            >
                                <X size={12} /> Cancel Edit
                            </button>
                        )}
                    </div>
                </div>

                <div className={`editor-quill-wrapper font-${fontStyle}`}>
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
            <div className="editor-tags-section">
                <label className="editor-tags-label">
                    CATEGORIZATION TAGS
                </label>
                <div className="editor-tags-container">
                    {availableTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag.name);
                        return (
                            <button
                                key={tag.name}
                                onClick={() => toggleTag(tag.name)}
                                className="editor-tag-pill"
                                style={{
                                    border: isSelected ? `2px solid ${tag.color}` : "1px solid rgba(255,255,255,0.8)",
                                    background: isSelected ? tag.bg : "rgba(255, 255, 255, 0.6)",
                                    color: isSelected ? tag.color : "#475569",
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
            <div className="editor-footer-row">
                <div className="editor-footer-stats">
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>{charCount} chars</span>
                </div>

                <div className="editor-footer-actions">
                    {editingEntryId && (
                        <button
                            onClick={handleCancelEdit}
                            className="editor-footer-cancel-btn"
                        >
                            Cancel
                        </button>
                    )}

                    {savedNotification && (
                        <span className="editor-saved-notification">
                            <CheckCircle2 size={16} /> {editingEntryId ? "Entry Updated!" : "Saved to Folder!"}
                        </span>
                    )}
                    <button
                        onClick={handleSaveEntry}
                        disabled={isSaveDisabled}
                        className={`editor-save-btn ${
                            isSaveDisabled
                                ? "btn-disabled"
                                : editingEntryId
                                ? "btn-active-editing"
                                : "btn-active"
                        }`}
                    >
                        <Save size={15} /> {editingEntryId ? "Update Entry" : "Save Journal Entry"}
                    </button>
                </div>
            </div>
        </>
    );
};
