/**
 * Unfolded Paper Modal Dialog Component
 * Displays a full unfolded document paper view when inspecting saved inspirational quotes.
 */

import React from "react";
import { FileText, X, Check, Copy, Trash2, CornerDownLeft } from "lucide-react";
import type { FolderQuoteItem } from "../data/quotesData";
import "./UnfoldedPaperModal.css";

interface UnfoldedPaperModalProps {
    isPaperOpened: boolean;
    setIsPaperOpened: (open: boolean) => void;
    activeSavedQuote: FolderQuoteItem;
    safeSavedIdx: number;
    copiedId: string | null;
    copyQuote: (item: FolderQuoteItem, e: React.MouseEvent) => void;
    removeSavedQuote: (item: FolderQuoteItem, e?: React.MouseEvent) => void;
}

export const UnfoldedPaperModal: React.FC<UnfoldedPaperModalProps> = ({
    isPaperOpened,
    setIsPaperOpened,
    activeSavedQuote,
    safeSavedIdx,
    copiedId,
    copyQuote,
    removeSavedQuote,
}) => {
    if (!isPaperOpened) return null;

    return (
        <div
            onClick={() => setIsPaperOpened(false)}
            className="unfolded-modal-overlay"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="unfolded-paper-card"
            >
                {/* Dashed Paper Fold Line */}
                <div className="unfolded-fold-line" />

                {/* Close Button */}
                <button
                    onClick={() => setIsPaperOpened(false)}
                    className="unfolded-close-btn"
                >
                    <X size={18} />
                </button>

                {/* Document Header */}
                <div className="unfolded-header">
                    <div className="unfolded-icon-badge">
                        <FileText size={20} />
                    </div>
                    <div>
                        <span className="unfolded-subhead">
                            DOGEAR MINDFUL PAPER SHEET • N° 0{safeSavedIdx + 1}
                        </span>
                        <h3 className="unfolded-main-title">
                            Unfolded Quote Document
                        </h3>
                    </div>
                </div>

                {/* Quote Content */}
                <div className="unfolded-body">
                    <p className="unfolded-quote-text">
                        "{activeSavedQuote.quote}"
                    </p>
                    <div className="unfolded-author-row">
                        <span className="unfolded-author-name">
                            — {activeSavedQuote.author} <span className="unfolded-author-handle">({activeSavedQuote.handle})</span>
                        </span>
                        <span className="unfolded-tab-badge">
                            {activeSavedQuote.tabLabel}
                        </span>
                    </div>
                </div>

                {/* Actions Footer */}
                <div className="unfolded-footer-actions">
                    <div className="unfolded-action-group">
                        <button
                            onClick={(e) => copyQuote(activeSavedQuote, e)}
                            className="unfolded-copy-btn"
                        >
                            {copiedId === activeSavedQuote.id ? <Check size={14} /> : <Copy size={14} />}
                            {copiedId === activeSavedQuote.id ? "Copied to Clipboard!" : "Copy Quote"}
                        </button>

                        <button
                            onClick={(e) => removeSavedQuote(activeSavedQuote, e)}
                            className="unfolded-remove-btn"
                        >
                            <Trash2 size={14} />
                            Remove Bookmark
                        </button>
                    </div>

                    <button
                        onClick={() => setIsPaperOpened(false)}
                        className="unfolded-fold-btn"
                    >
                        <CornerDownLeft size={14} />
                        Fold Paper Back
                    </button>
                </div>
            </div>
        </div>
    );
};
