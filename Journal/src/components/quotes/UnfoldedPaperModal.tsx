/**
 * Unfolded Paper Modal Dialog Component
 * Displays a full unfolded document paper view when inspecting saved inspirational quotes.
 */

import React from "react";
import { FileText, X, Check, Copy, Trash2, CornerDownLeft } from "lucide-react";
import type { FolderQuoteItem } from "./quotesData";

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
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 999,
                background: "rgba(15, 23, 42, 0.78)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "relative",
                    maxWidth: 640,
                    width: "100%",
                    background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
                    borderRadius: 24,
                    padding: "clamp(28px, 4vw, 42px) clamp(28px, 4.5vw, 46px)",
                    boxShadow: "0 40px 100px rgba(0, 0, 0, 0.65), inset 0 2px 2px rgba(255, 255, 255, 1)",
                    border: "1px solid #E2E8F0",
                    transform: "perspective(1200px) rotateX(0deg)",
                    animation: "paperUnfoldModal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
            >
                {/* Dashed Paper Fold Line */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        right: 0,
                        height: 1,
                        background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.08) 80%, transparent 100%)",
                        borderTop: "1px dashed rgba(0, 0, 0, 0.14)",
                        pointerEvents: "none",
                    }}
                />

                {/* Close Button */}
                <button
                    onClick={() => setIsPaperOpened(false)}
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 20,
                        border: "1px solid #E2E8F0",
                        background: "#F8FAFC",
                        color: "#0F172A",
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        transition: "all 0.2s ease",
                    }}
                >
                    <X size={18} />
                </button>

                {/* Document Header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, borderBottom: "2px solid #0F172A", paddingBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF" }}>
                        <FileText size={20} />
                    </div>
                    <div>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 800, color: "#3B82F6", letterSpacing: "0.08em" }}>
                            DOGEAR MINDFUL PAPER SHEET • N° 0{safeSavedIdx + 1}
                        </span>
                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 900, color: "#0F172A", margin: "2px 0 0 0" }}>
                            Unfolded Quote Document
                        </h3>
                    </div>
                </div>

                {/* Quote Content */}
                <div style={{ padding: "10px 0 24px 0" }}>
                    <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "clamp(26px, 3.2vw, 34px)", lineHeight: 1.3, color: "#0F172A", margin: "0 0 20px 0" }}>
                        "{activeSavedQuote.quote}"
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: 800, color: "#3B82F6" }}>
                            — {activeSavedQuote.author} <span style={{ color: "#64748B", fontWeight: 600 }}>({activeSavedQuote.handle})</span>
                        </span>
                        <span style={{ background: "#F1F5F9", color: "#0F172A", padding: "4px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 700 }}>
                            {activeSavedQuote.tabLabel}
                        </span>
                    </div>
                </div>

                {/* Actions Footer */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: "1px solid #E2E8F0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button
                            onClick={(e) => copyQuote(activeSavedQuote, e)}
                            style={{
                                border: "none",
                                background: "#0F172A",
                                color: "#FFFFFF",
                                padding: "8px 20px",
                                borderRadius: 9999,
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.2)",
                            }}
                        >
                            {copiedId === activeSavedQuote.id ? <Check size={14} /> : <Copy size={14} />}
                            {copiedId === activeSavedQuote.id ? "Copied to Clipboard!" : "Copy Quote"}
                        </button>

                        <button
                            onClick={(e) => removeSavedQuote(activeSavedQuote, e)}
                            style={{
                                border: "none",
                                background: "#FEE2E2",
                                color: "#DC2626",
                                padding: "8px 18px",
                                borderRadius: 9999,
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.15)",
                            }}
                        >
                            <Trash2 size={14} />
                            Remove Bookmark
                        </button>
                    </div>

                    <button
                        onClick={() => setIsPaperOpened(false)}
                        style={{
                            border: "1px solid #CBD5E1",
                            background: "#F8FAFC",
                            color: "#334155",
                            padding: "8px 20px",
                            borderRadius: 9999,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <CornerDownLeft size={14} />
                        Fold Paper Back
                    </button>
                </div>
            </div>
        </div>
    );
};
