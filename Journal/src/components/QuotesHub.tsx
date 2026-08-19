/**
 * Inspirational Daily Quotes Hub Component
 * Interactive folder tab card stack displaying daily wisdom quotes, API refresh capabilities, and bookmarking.
 */

import React, { useState, useCallback } from "react";
import { useQuotes } from "../hooks/useQuotes";
import { Copy, Check, Bookmark, Trash2, MousePointer, ChevronRight, ChevronLeft } from "lucide-react";
import type { QuoteItem } from "../types/journal";
import { useJournal } from "../context/JournalContext";
import { ALL_QUOTE_SETS, type FolderQuoteItem } from "./quotes/quotesData";
import { UnfoldedPaperModal } from "./quotes/UnfoldedPaperModal";

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

    const handleReloadQuotes = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setReloading(true);
        const nextSetIdx = setIndex + 1;
        setSetIndex(nextSetIdx);
        setActiveIndex(4);
        setTimeout(() => setReloading(false), 350);
    }, [setIndex, setSetIndex, setActiveIndex, setReloading]);

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
            style={{
                position: "relative",
                maxWidth: 1280,
                margin: "clamp(24px, 4vh, 48px) auto clamp(32px, 5vh, 56px) auto",
                padding: "0 20px",
                boxSizing: "border-box",
            }}
        >
            {/* LIGHTER GLASSMORPHIC FOLDER TOP TAB */}
            <div
                style={{
                    position: "relative",
                    width: 220,
                    height: 38,
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(59, 130, 246, 0.45) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderRadius: "18px 18px 0 0",
                    border: "1.5px solid rgba(255, 255, 255, 0.5)",
                    borderBottom: "none",
                    boxShadow: "0 -8px 20px rgba(0, 0, 0, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 20px",
                    color: "#FFFFFF",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 13.5,
                    fontWeight: 900,
                    letterSpacing: "0.06em",
                    zIndex: 10,
                }}
            >
                <span>DAILY SPARK FOLDER</span>
            </div>

            {/* LIGHTER GLASSMORPHIC FOLDER MAIN BODY CONTAINER */}
            <div
                className="quotes-hub-container"
                style={{
                    position: "relative",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(59, 130, 246, 0.26) 50%, rgba(147, 197, 253, 0.2) 100%)",
                    backdropFilter: "blur(32px) saturate(180%)",
                    WebkitBackdropFilter: "blur(32px) saturate(180%)",
                    borderRadius: "0 28px 28px 28px",
                    padding: "clamp(28px, 4vw, 44px) clamp(24px, 5vw, 48px) clamp(32px, 4vw, 44px)",
                    boxShadow: "0 40px 100px rgba(15, 23, 42, 0.3), inset 0 2px 3px rgba(255, 255, 255, 0.6)",
                    border: "1.5px solid rgba(255, 255, 255, 0.4)",
                    overflow: "hidden",
                    boxSizing: "border-box",
                }}
            >
                <style>{`
                    @media (max-width: 640px) {
                        .quotes-hub-container {
                            padding: 24px 16px 28px !important;
                            border-radius: 0 20px 20px 20px !important;
                        }
                    }
                `}</style>
                {/* WHITE PAPER SHEET SLIT PEEKING AT TOP EDGE OF FOLDER CONTAINER */}
                <div
                    style={{
                        position: "absolute",
                        top: 6,
                        left: 20,
                        right: 20,
                        height: 6,
                        background: "#FFFFFF",
                        borderRadius: 3,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                        opacity: 0.9,
                    }}
                />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
                    {/* NORMAL CLEAN HEADING AT TOP */}
                    <div style={{ textAlign: "center", marginBottom: "clamp(20px, 3vw, 32px)" }}>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 38px)", color: "#FFFFFF", marginTop: 0, marginBottom: 0 }}>
                            Daily Spark & <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#FFFFFF" }}>Mindful Quotes</span>
                        </h2>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255, 255, 255, 0.95)", fontSize: "14.5px", maxWidth: 580, margin: "8px auto 0 auto" }}>
                            Start your journal session with perspective. Save your favorite quotes directly into your bookmarked folder.
                        </p>

                        {/* GLASSMORPHIC CONTROL CENTER GLASS BUTTON */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "clamp(16px, 2.4vw, 24px)" }}>
                            <button
                                onClick={handleReloadQuotes}
                                disabled={reloading}
                                title="Click to Rotate Direction & Reload New Quotes"
                                style={{
                                    position: "relative",
                                    border: "1px solid rgba(255, 255, 255, 0.45)",
                                    background: "rgba(255, 255, 255, 0.18)",
                                    backdropFilter: "blur(24px) saturate(180%)",
                                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                                    padding: "8px 28px 8px 10px",
                                    borderRadius: 9999,
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 16,
                                    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25), inset 0 1.5px 2.5px rgba(255, 255, 255, 0.6)",
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                    userSelect: "none",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.28)";
                                    e.currentTarget.style.transform = "scale(1.04) translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)";
                                    e.currentTarget.style.transform = "scale(1) translateY(0)";
                                }}
                            >
                                {/* LEFT CIRCULAR ICON BADGE WITH RETRO PIXEL ARROW */}
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 6px 16px rgba(79, 70, 229, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.5)",
                                        flexShrink: 0,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 24,
                                            height: 24,
                                            display: "grid",
                                            gridTemplateColumns: "repeat(7, 1fr)",
                                            gridTemplateRows: "repeat(7, 1fr)",
                                            gap: 1,
                                            transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
                                <div style={{ textAlign: "left" }}>
                                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#FFFFFF", display: "block", letterSpacing: "-0.01em" }}>
                                        Reload Quotes
                                    </span>
                                </div>

                                {/* RIGHT SIDE SUBTLE CHEVRON INDICATORS */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 2, opacity: 0.7, color: "#FFFFFF", marginLeft: 8 }}>
                                    <ChevronRight size={14} style={{ transform: "rotate(-90deg)" }} />
                                    <ChevronRight size={14} style={{ transform: "rotate(90deg)", marginTop: -6, opacity: 0.4 }} />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* 2-COLUMN SPLIT LAYOUT WITH PROPER GAPS & SPACING */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "clamp(28px, 5vw, 64px)",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >
                        {/* LEFT COLUMN: OVERLAPPING FOLDER TABS QUOTE CARDS STACK */}
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                maxWidth: 520,
                                height: "clamp(300px, 34vw, 360px)",
                                margin: "0 auto",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
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
                                        style={{
                                            position: "absolute",
                                            top: baseTop,
                                            left: baseLeft,
                                            width: isFront ? "94%" : "88%",
                                            height: isFront ? "82%" : "62%",
                                            zIndex: isFront ? 50 : 10 + idx,
                                            cursor: "pointer",
                                            transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                                            transform: isFront ? "scale(1.02) translateY(-4px)" : "scale(1) translateY(0)",
                                            userSelect: "none",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        {/* FOLDER TOP TAB */}
                                        <div
                                            style={{
                                                position: "relative",
                                                left: Math.min(item.tabLeftOffset, 180),
                                                width: 120,
                                                height: 34,
                                                background: item.bgColor,
                                                borderRadius: "12px 12px 0 0",
                                                padding: "6px 14px",
                                                display: "flex",
                                                alignItems: "center",
                                                fontFamily: "'Outfit', sans-serif",
                                                fontSize: 14,
                                                fontWeight: 800,
                                                color: item.textColor,
                                                boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.08)",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {item.tabLabel}
                                        </div>

                                        {/* FOLDER MAIN BODY CARD */}
                                        <div
                                            style={{
                                                flex: 1,
                                                background: item.bgColor,
                                                borderRadius: item.tabLeftOffset === 0 ? "0 22px 22px 22px" : "22px",
                                                padding: "clamp(16px, 2vw, 22px) clamp(18px, 2.4vw, 24px) clamp(14px, 1.8vw, 18px)",
                                                boxShadow: isFront
                                                    ? "0 25px 60px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.12)"
                                                    : "0 12px 30px rgba(0, 0, 0, 0.2)",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                position: "relative",
                                                overflow: "hidden",
                                                color: item.textColor,
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            {/* MAIN QUOTE TEXT */}
                                            <div style={{ position: "relative", zIndex: 2 }}>
                                                <h3
                                                    style={{
                                                        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                                                        fontWeight: 800,
                                                        fontSize: isFront ? "clamp(17px, 2vw, 22px)" : "16px",
                                                        lineHeight: 1.3,
                                                        letterSpacing: "-0.02em",
                                                        margin: "0 0 10px 0",
                                                        color: item.textColor,
                                                    }}
                                                >
                                                    {item.quote}
                                                </h3>
                                            </div>

                                            {/* BOTTOM FOOTER: AUTHOR HANDLE & DOODLE ARROW / ACTIONS */}
                                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative", zIndex: 2, gap: 10 }}>
                                                <div>
                                                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, display: "block", color: item.textColor }}>
                                                        {item.handle}
                                                    </span>
                                                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11.5, fontWeight: 600, opacity: 0.8, display: "block", marginTop: 3, color: item.textColor }}>
                                                        — {item.author}
                                                    </span>
                                                </div>

                                                {/* RIGHT SIDE: DOODLE ARROW & QUICK ACTIONS */}
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    {isFront && (
                                                        <>
                                                            <button
                                                                onClick={(e) => copyQuote(item, e)}
                                                                title="Copy Quote"
                                                                style={{
                                                                    border: "1px solid rgba(0, 0, 0, 0.15)",
                                                                    background: isCopied ? "rgba(0,0,0,0.85)" : "rgba(255, 255, 255, 0.4)",
                                                                    color: isCopied ? "#FFFFFF" : item.textColor,
                                                                    padding: "5px 12px",
                                                                    borderRadius: 9999,
                                                                    fontSize: 11.5,
                                                                    fontWeight: 700,
                                                                    cursor: "pointer",
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: 4,
                                                                    backdropFilter: "blur(8px)",
                                                                }}
                                                            >
                                                                {isCopied ? <Check size={11} /> : <Copy size={11} />}
                                                                {isCopied ? "Copied" : "Copy"}
                                                            </button>

                                                            <button
                                                                onClick={(e) => toggleFavorite(item, e)}
                                                                title={isFav ? "Saved" : "Save Quote to Folder"}
                                                                style={{
                                                                    border: "1px solid rgba(0, 0, 0, 0.15)",
                                                                    background: isFav ? "#EF4444" : "rgba(255, 255, 255, 0.4)",
                                                                    color: isFav ? "#FFFFFF" : item.textColor,
                                                                    width: 32,
                                                                    height: 32,
                                                                    borderRadius: "50%",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    cursor: "pointer",
                                                                    backdropFilter: "blur(8px)",
                                                                    transition: "all 0.2s ease",
                                                                    flexShrink: 0,
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
                                                        style={{ cursor: "pointer", display: "flex", alignItems: "center", padding: 2, flexShrink: 0 }}
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
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                maxWidth: 540,
                                height: "clamp(300px, 34vw, 360px)",
                                margin: "0 auto",
                                background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
                                borderRadius: 28,
                                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                                boxShadow: "0 30px 80px rgba(59, 130, 246, 0.35), inset 0 2px 3px rgba(255, 255, 255, 0.6)",
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                userSelect: "none",
                                boxSizing: "border-box",
                            }}
                        >
                            {/* TOP VIBRANT GRADIENT AREA WITH FANNING REAL SAVED QUOTE PAPERS */}
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "52%",
                                    background: "linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    paddingTop: 10,
                                }}
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
                                    }}
                                />

                                <div
                                    style={{
                                        position: "relative",
                                        bottom: "-6px",
                                        display: "flex",
                                        alignItems: "flex-end",
                                        justifyContent: "center",
                                        width: "92%",
                                        height: "90%",
                                        zIndex: 1,
                                    }}
                                >
                                    {/* Sheet 1 */}
                                    <div
                                        style={{
                                            width: "36%",
                                            height: "82%",
                                            background: "linear-gradient(135deg, #FF7EA5 0%, #F472B6 50%, #E11D48 100%)",
                                            borderRadius: "10px 10px 0 0",
                                            boxShadow: "-4px 4px 14px rgba(0,0,0,0.22)",
                                            transform: "rotate(-12deg) translateY(6px)",
                                            transformOrigin: "bottom center",
                                            padding: 8,
                                            boxSizing: "border-box",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#FFFFFF" }}>PROVENANCE</div>
                                        <div style={{ width: "80%", height: 3, background: "rgba(255, 255, 255, 0.7)", borderRadius: 2, margin: "6px 0 4px 0" }} />
                                        <div style={{ width: "60%", height: 3, background: "rgba(255, 255, 255, 0.5)", borderRadius: 2 }} />
                                    </div>

                                    {/* Sheet 2 */}
                                    <div
                                        style={{
                                            width: "36%",
                                            height: "85%",
                                            background: "linear-gradient(135deg, #FDE047 0%, #F59E0B 50%, #EA580C 100%)",
                                            borderRadius: "10px 10px 0 0",
                                            boxShadow: "4px 4px 14px rgba(0,0,0,0.22)",
                                            transform: "rotate(10deg) translateY(4px)",
                                            transformOrigin: "bottom center",
                                            padding: 8,
                                            boxSizing: "border-box",
                                            color: "#713F12",
                                        }}
                                    >
                                        <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0F172A" }}>UNDATED</div>
                                        <div style={{ width: "85%", height: 3, background: "rgba(15, 23, 42, 0.4)", borderRadius: 2, margin: "6px 0 4px 0" }} />
                                        <div style={{ width: "55%", height: 3, background: "rgba(15, 23, 42, 0.3)", borderRadius: 2 }} />
                                    </div>

                                    {/* Sheet 3 - Active saved quote paper */}
                                    <div
                                        onClick={() => setIsPaperOpened(true)}
                                        title="Click Real Paper Document to Unfold Quote 📄"
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            width: "74%",
                                            height: "100%",
                                            background: activeSavedQuote.bgColor === "#D4FE00"
                                                ? "linear-gradient(135deg, #FFFBEB 0%, #FACC15 40%, #D4FE00 100%)"
                                                : activeSavedQuote.bgColor === "#F472B6"
                                                    ? "linear-gradient(135deg, #FFF1F2 0%, #F472B6 50%, #FB7185 100%)"
                                                    : activeSavedQuote.bgColor === "#818CF8"
                                                        ? "linear-gradient(135deg, #F5F3FF 0%, #C4B5FD 50%, #A78BFA 100%)"
                                                        : activeSavedQuote.bgColor === "#FFFFFF"
                                                            ? "linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 50%, #FDE68A 100%)"
                                                            : "linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 50%, #34D399 100%)",
                                            borderRadius: "14px 14px 0 0",
                                            boxShadow: "0 -10px 30px rgba(0,0,0,0.25), inset 0 1.5px 2px rgba(255,255,255,0.9)",
                                            transform: paperOpening
                                                ? "rotateX(-18deg) scale(0.95) translateY(-8px)"
                                                : "rotate(-2deg) translateY(0px)",
                                            transformOrigin: "bottom center",
                                            zIndex: 2,
                                            padding: "clamp(12px, 1.6vw, 16px) clamp(14px, 2vw, 20px) 10px",
                                            boxSizing: "border-box",
                                            cursor: "pointer",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            border: "1px solid rgba(255, 255, 255, 0.8)",
                                            color: "#0F172A",
                                            transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                            overflow: "hidden",
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
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "58%",
                                    marginTop: "-14%",
                                    zIndex: 3,
                                }}
                            >
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 540 280"
                                    preserveAspectRatio="none"
                                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
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

                                <div style={{ position: "absolute", top: 14, left: 24, width: "48%", zIndex: 5 }}>
                                    <h3 style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontSize: 16, fontWeight: 800, color: "#FFFFFF", margin: 0, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
                                        Bookmarked Quotes
                                    </h3>
                                    <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: 11.5, color: "rgba(255, 255, 255, 0.85)", margin: "4px 0 0 0", fontWeight: 500 }}>
                                        Saved Favorites • {savedQuotes.length} Items
                                    </p>
                                </div>

                                <div style={{ position: "absolute", bottom: 28, left: 24, right: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, zIndex: 5 }}>
                                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.02em" }}>
                                        LEVEL UP YOUR MIND
                                    </span>

                                    <div
                                        onClick={() => setIsPaperOpened(true)}
                                        title="Click to Open Paper Document"
                                        style={{ cursor: "pointer", transform: "rotate(-25deg)", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))", transition: "transform 0.2s ease", flexShrink: 0 }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(-25deg) scale(1.15)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(-25deg) scale(1)")}
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