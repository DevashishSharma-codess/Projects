/**
 * Inspirational Daily Quotes Hub Component
 * Interactive folder tab card stack displaying daily wisdom quotes, API refresh capabilities, and bookmarking.
 */

import React, { useState, useCallback } from "react";
import { useQuotes } from "../../../hooks/useQuotes";
import { Copy, Check, Bookmark, Trash2, MousePointer, ChevronRight, ChevronLeft } from "lucide-react";
import type { QuoteItem } from "../../../types/journal";
import { useJournal } from "../../../context/JournalContext";
import { ALL_QUOTE_SETS, type FolderQuoteItem } from "../data/quotesData";
import { UnfoldedPaperModal } from "../UnfoldedPaperModal/UnfoldedPaperModal";
import "./QuotesHub.css";

export type { QuoteItem };

export default function QuotesHub() {
    const {
        quoteSetIndex: setIndex,
        setQuoteSetIndex: setSetIndex,
        activeQuoteIndex: activeIndex,
        setActiveQuoteIndex: setActiveIndex,
        savedQuotes,
        savedIndex,
        setSavedIndex,
        isPaperOpened,
        setIsPaperOpened,
        copiedQuoteId: copiedId,
        setCopiedQuoteId: setCopiedId,
        quoteReloading: reloading,
        setQuoteReloading: setReloading,
        toggleSaveQuote,
        removeSavedQuote: contextRemoveSavedQuote,
    } = useJournal();

    const [paperOpening, setPaperOpening] = useState(false);

    // ── React Query: fetch quotes from API ──
    const { data: apiQuotes } = useQuotes(setIndex);

    // Use API-fetched quotes when available, fall back to hardcoded data
    const folderQuotes = apiQuotes && apiQuotes.length > 0
        ? apiQuotes
        : ALL_QUOTE_SETS[setIndex % ALL_QUOTE_SETS.length];

    const currentSavedQuotes = savedQuotes.length > 0 ? savedQuotes : [ALL_QUOTE_SETS[0][4], ALL_QUOTE_SETS[0][0]];

    const handleReloadQuotes = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setReloading(true);
        const nextSetIdx = setIndex + 1;
        setSetIndex(nextSetIdx);
        setActiveIndex(4);
        setTimeout(() => setReloading(false), 350);
    };

    const toggleFavorite = (item: FolderQuoteItem, e: React.MouseEvent) => {
        e.stopPropagation();
        toggleSaveQuote(item);
    };

    const nextSavedQuote = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (currentSavedQuotes.length <= 1) return;
        setPaperOpening(true);
        setTimeout(() => {
            setSavedIndex((prev) => (prev + 1) % currentSavedQuotes.length);
            setTimeout(() => setPaperOpening(false), 50);
        }, 200);
    };

    const prevSavedQuote = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (currentSavedQuotes.length <= 1) return;
        setPaperOpening(true);
        setTimeout(() => {
            setSavedIndex((prev) => (prev - 1 + currentSavedQuotes.length) % currentSavedQuotes.length);
            setTimeout(() => setPaperOpening(false), 50);
        }, 200);
    };

    const removeSavedQuote = (item: FolderQuoteItem, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        contextRemoveSavedQuote(item.id);
        if (savedIndex >= currentSavedQuotes.length - 1 && currentSavedQuotes.length > 1) {
            setSavedIndex(currentSavedQuotes.length - 2);
        }
        setIsPaperOpened(false);
    };

    const copyQuote = (item: FolderQuoteItem, e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(`"${item.quote}" — ${item.author}`);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const nextCard = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveIndex((prev) => (prev + 1) % folderQuotes.length);
    };

    const safeSavedIdx = savedQuotes.length > 0 ? savedIndex % savedQuotes.length : 0;
    const activeSavedQuote = savedQuotes[safeSavedIdx] || ALL_QUOTE_SETS[0][4];

    return (
        <section
            id="inspirational-quotes"
            className="quotes-hub-section"
        >
            {/* LIGHTER GLASSMORPHIC FOLDER TOP TAB */}
            <div className="quotes-hub-top-tab">
                <span>DAILY SPARK FOLDER</span>
            </div>

            {/* LIGHTER GLASSMORPHIC FOLDER MAIN BODY CONTAINER */}
            <div className="quotes-hub-container">
                {/* WHITE PAPER SHEET SLIT PEEKING AT TOP EDGE OF FOLDER CONTAINER */}
                <div className="quotes-paper-peek-slit" />

                <div className="quotes-hub-inner">
                    {/* NORMAL CLEAN HEADING AT TOP */}
                    <div className="quotes-hub-header">
                        <h2 className="quotes-hub-title">
                            Daily Spark & <span className="quotes-hub-serif-title">Mindful Quotes</span>
                        </h2>
                        <p className="quotes-hub-subtext">
                            Start your journal session with perspective. Save your favorite quotes directly into your bookmarked folder.
                        </p>

                        {/* GLASSMORPHIC CONTROL CENTER GLASS BUTTON */}
                        <div className="quotes-reload-btn-row">
                            <button
                                onClick={handleReloadQuotes}
                                disabled={reloading}
                                title="Click to Rotate Direction & Reload New Quotes"
                                className="quotes-reload-glass-btn"
                            >
                                {/* LEFT CIRCULAR ICON BADGE WITH RETRO PIXEL ARROW */}
                                <div className="quotes-reload-icon-badge">
                                    <div
                                        className="quotes-reload-pixel-grid"
                                        style={{
                                            transform: `rotate(${setIndex * 90 + (reloading ? 180 : 0)}deg)`,
                                        }}
                                    >
                                        {[
                                            0, 0, 0, 1, 0, 0, 0,
                                            0, 0, 0, 1, 1, 0, 0,
                                            0, 0, 0, 1, 1, 1, 0,
                                            1, 1, 1, 1, 1, 1, 1,
                                            0, 0, 0, 1, 1, 1, 0,
                                            0, 0, 0, 1, 1, 0, 0,
                                            0, 0, 0, 1, 0, 0, 0,
                                        ].map((pixel, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    borderRadius: 1,
                                                    background: pixel === 1 ? "#FFFFFF" : "rgba(255,255,255,0.22)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* CENTER CLEAN TEXT */}
                                <div className="quotes-reload-text-wrapper">
                                    <span className="quotes-reload-label">
                                        Reload Quotes
                                    </span>
                                </div>

                                {/* RIGHT SIDE SUBTLE CHEVRON INDICATORS */}
                                <div className="quotes-reload-chevrons">
                                    <ChevronRight size={14} style={{ transform: "rotate(-90deg)" }} />
                                    <ChevronRight size={14} style={{ transform: "rotate(90deg)", marginTop: -6, opacity: 0.4 }} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* 2-COLUMN SPLIT LAYOUT WITH PROPER GAPS & SPACING */}
                    <div className="quotes-hub-grid">
                        {/* LEFT COLUMN: OVERLAPPING FOLDER TABS QUOTE CARDS STACK */}
                        <div className="quotes-cards-stack-wrapper">
                            {folderQuotes.map((item, idx) => {
                                const isFront = activeIndex === idx;
                                const isFav = savedQuotes.some((q) => q.quote === item.quote);
                                const isCopied = copiedId === item.id;

                                const offsetStep = 18;
                                const leftOffsetStep = 8;
                                const baseTop = 16 + idx * offsetStep;
                                const baseLeft = idx * leftOffsetStep;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setActiveIndex(idx)}
                                        className={`quotes-stack-card ${isFront ? "is-front" : "is-back"}`}
                                        style={{
                                            top: baseTop,
                                            left: baseLeft,
                                            zIndex: isFront ? 50 : 10 + idx,
                                        }}
                                    >
                                        {/* FOLDER TOP TAB */}
                                        <div
                                            className="quotes-stack-tab"
                                            style={{
                                                left: Math.min(item.tabLeftOffset, 180),
                                                background: item.bgColor,
                                                color: item.textColor,
                                            }}
                                        >
                                            {item.tabLabel}
                                        </div>

                                        {/* FOLDER MAIN BODY CARD */}
                                        <div
                                            className={`quotes-stack-card-body ${item.tabLeftOffset === 0 ? "tab-offset-zero" : "tab-offset-other"} ${isFront ? "is-front" : "is-back"}`}
                                            style={{
                                                background: item.bgColor,
                                                color: item.textColor,
                                            }}
                                        >
                                            {/* MAIN QUOTE TEXT */}
                                            <div style={{ position: "relative", zIndex: 2 }}>
                                                <h3 className={`quotes-card-text ${isFront ? "is-front" : "is-back"}`} style={{ color: item.textColor }}>
                                                    {item.quote}
                                                </h3>
                                            </div>

                                            {/* BOTTOM FOOTER: AUTHOR HANDLE & DOODLE ARROW / ACTIONS */}
                                            <div className="quotes-card-footer">
                                                <div>
                                                    <span className="quotes-author-handle" style={{ color: item.textColor }}>
                                                        {item.handle}
                                                    </span>
                                                    <span className="quotes-author-name" style={{ color: item.textColor }}>
                                                        — {item.author}
                                                    </span>
                                                </div>

                                                {/* RIGHT SIDE: DOODLE ARROW & QUICK ACTIONS */}
                                                <div className="quotes-actions-right">
                                                    {isFront && (
                                                        <>
                                                            <button
                                                                onClick={(e) => copyQuote(item, e)}
                                                                title="Copy Quote"
                                                                className="quotes-copy-btn"
                                                                style={{
                                                                    background: isCopied ? "rgba(0,0,0,0.85)" : "rgba(255, 255, 255, 0.4)",
                                                                    color: isCopied ? "#FFFFFF" : item.textColor,
                                                                }}
                                                            >
                                                                {isCopied ? <Check size={11} /> : <Copy size={11} />}
                                                                {isCopied ? "Copied" : "Copy"}
                                                            </button>

                                                            <button
                                                                onClick={(e) => toggleFavorite(item, e)}
                                                                title={isFav ? "Saved" : "Save Quote to Folder"}
                                                                className="quotes-bookmark-btn"
                                                                style={{
                                                                    background: isFav ? "#EF4444" : "rgba(255, 255, 255, 0.4)",
                                                                    color: isFav ? "#FFFFFF" : item.textColor,
                                                                }}
                                                            >
                                                                <Bookmark size={13} fill={isFav ? "#FFFFFF" : "none"} />
                                                            </button>
                                                        </>
                                                    )}

                                                    {/* HAND-DRAWN DOODLE ARROW */}
                                                    <div
                                                        onClick={nextCard}
                                                        title="Next Quote Card"
                                                        className="quotes-doodle-arrow"
                                                    >
                                                        <svg width="38" height="26" viewBox="0 0 46 32" fill="none">
                                                            <path
                                                                d="M3 24C12 28 28 28 41 12M41 12L31 10M41 12L37 21"
                                                                stroke={item.textColor}
                                                                strokeWidth="3"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* RIGHT COLUMN: BOOKMARKED SAVED QUOTES FOLDER */}
                        <div className="quotes-bookmarked-folder-container">
                            {/* TOP VIBRANT GRADIENT AREA WITH FANNING REAL SAVED QUOTE PAPERS */}
                            <div className="quotes-bookmarked-wallpaper">
                                <div className="quotes-bookmarked-overlay" />

                                <div className="quotes-bookmarked-sheets-wrapper">
                                    {/* Sheet 1 */}
                                    <div className="quotes-paper-sheet-1">
                                        <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#FFFFFF" }}>PROVENANCE</div>
                                        <div style={{ width: "80%", height: 3, background: "rgba(255, 255, 255, 0.7)", borderRadius: 2, margin: "6px 0 4px 0" }} />
                                        <div style={{ width: "60%", height: 3, background: "rgba(255, 255, 255, 0.5)", borderRadius: 2 }} />
                                    </div>

                                    {/* Sheet 2 */}
                                    <div className="quotes-paper-sheet-2">
                                        <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0F172A" }}>UNDATED</div>
                                        <div style={{ width: "85%", height: 3, background: "rgba(15, 23, 42, 0.4)", borderRadius: 2, margin: "6px 0 4px 0" }} />
                                        <div style={{ width: "55%", height: 3, background: "rgba(15, 23, 42, 0.3)", borderRadius: 2 }} />
                                    </div>

                                    {/* Sheet 3 - Active saved quote paper */}
                                    <div
                                        onClick={() => setIsPaperOpened(true)}
                                        title="Click Real Paper Document to Unfold Quote 📄"
                                        className={`quotes-paper-active ${paperOpening ? "opening" : "closed"}`}
                                        style={{
                                            background: activeSavedQuote.bgColor === "#D4FE00"
                                                ? "linear-gradient(135deg, #FFFBEB 0%, #FACC15 40%, #D4FE00 100%)"
                                                : activeSavedQuote.bgColor === "#F472B6"
                                                    ? "linear-gradient(135deg, #FFF1F2 0%, #F472B6 50%, #FB7185 100%)"
                                                    : activeSavedQuote.bgColor === "#818CF8"
                                                        ? "linear-gradient(135deg, #F5F3FF 0%, #C4B5FD 50%, #A78BFA 100%)"
                                                        : activeSavedQuote.bgColor === "#FFFFFF"
                                                            ? "linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 50%, #FDE68A 100%)"
                                                            : "linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 50%, #34D399 100%)",
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, padding: "0 8px" }}>
                                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(15,23,42,0.2)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)" }} />
                                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(15,23,42,0.2)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)" }} />
                                        </div>

                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 900, color: "#0F172A" }}>
                                                    {activeSavedQuote.codeRef || `15C`}
                                                </span>
                                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                    <button
                                                        onClick={prevSavedQuote}
                                                        disabled={savedQuotes.length <= 1}
                                                        style={{ border: "1px solid rgba(15,23,42,0.15)", background: "rgba(255,255,255,0.7)", color: "#0F172A", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: savedQuotes.length > 1 ? "pointer" : "default", opacity: savedQuotes.length > 1 ? 1 : 0.4 }}
                                                    >
                                                        <ChevronLeft size={13} />
                                                    </button>
                                                    <button
                                                        onClick={nextSavedQuote}
                                                        disabled={savedQuotes.length <= 1}
                                                        style={{ border: "none", background: "#0F172A", color: "#FFFFFF", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: savedQuotes.length > 1 ? "pointer" : "default", opacity: savedQuotes.length > 1 ? 1 : 0.4, boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
                                                    >
                                                        <ChevronRight size={13} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => removeSavedQuote(activeSavedQuote, e)}
                                                        title="Remove from Bookmarks 🗑️"
                                                        style={{ border: "none", background: "#FEE2E2", color: "#DC2626", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: 4, boxShadow: "0 2px 6px rgba(220, 38, 38, 0.25)" }}
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div style={{ borderBottom: "1.5px dotted rgba(15,23,42,0.18)", width: "100%", marginBottom: 8 }} />

                                            <h4
                                                style={{
                                                    fontFamily: "'Outfit', sans-serif",
                                                    fontSize: "clamp(14px, 1.5vw, 17px)",
                                                    fontWeight: 900,
                                                    color: "#0F172A",
                                                    margin: "0 0 4px 0",
                                                    lineHeight: 1.25,
                                                }}
                                            >
                                                "{activeSavedQuote.quote}"
                                            </h4>
                                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#334155" }}>
                                                — {activeSavedQuote.author}
                                            </span>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 4, borderTop: "1px solid rgba(15,23,42,0.12)" }}>
                                            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, fontWeight: 800, color: "#0F172A" }}>
                                                {activeSavedQuote.tabLabel.toUpperCase()}
                                            </span>
                                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: "#475569" }}>
                                                {safeSavedIdx + 1}/{savedQuotes.length || 1}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM MAC FOLDER SVG FRONT FLAP */}
                            <div className="quotes-folder-flap-area">
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 540 280"
                                    preserveAspectRatio="none"
                                    className="quotes-folder-svg-flap"
                                >
                                    <defs>
                                        <linearGradient id="bookmarkMacFolderGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#60A5FA" />
                                            <stop offset="100%" stopColor="#3B82F6" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M 0 32 C 0 14, 14 0, 32 0 L 230 0 C 255 0, 265 14, 275 32 L 285 48 C 295 56, 305 60, 320 60 L 508 60 C 524 60, 540 74, 540 90 L 540 248 C 540 264, 524 280, 508 280 L 32 280 C 14 280, 0 264, 0 248 Z"
                                        fill="url(#bookmarkMacFolderGrad)"
                                    />
                                </svg>

                                <div className="quotes-folder-info-header">
                                    <h3 className="quotes-folder-title">
                                        Bookmarked Quotes
                                    </h3>
                                    <p className="quotes-folder-subtitle">
                                        Saved Favorites • {savedQuotes.length} Items
                                    </p>
                                </div>

                                <div className="quotes-folder-bottom-banner">
                                    <span className="quotes-folder-level-text">
                                        LEVEL UP YOUR MIND
                                    </span>

                                    <div
                                        onClick={() => setIsPaperOpened(true)}
                                        title="Click to Open Paper Document"
                                        className="quotes-pointer-btn"
                                    >
                                        <MousePointer size={32} color="#FFFFFF" fill="#FFFFFF" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UnfoldedPaperModal
                isPaperOpened={isPaperOpened}
                setIsPaperOpened={setIsPaperOpened}
                activeSavedQuote={activeSavedQuote}
                safeSavedIdx={safeSavedIdx}
                copiedId={copiedId}
                copyQuote={copyQuote}
                removeSavedQuote={removeSavedQuote}
            />
        </section>
    );
}