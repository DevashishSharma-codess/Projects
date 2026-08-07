import React, { useState, useEffect } from "react";
import { Copy, Check, Bookmark, ArrowRight, ArrowLeft, RefreshCw, Trash2, MousePointer, Sparkles, ChevronRight, ChevronLeft, X, FileText, CornerDownLeft } from "lucide-react";
import type { QuoteItem } from "../types/journal";
export type { QuoteItem };

interface FolderQuoteItem {
    id: string;
    tabLabel: string;
    bgColor: string;
    textColor: string;
    quote: string;
    author: string;
    handle: string;
    codeRef?: string;
    dateStr?: string;
    tabLeftOffset: number;
}

const ALL_QUOTE_SETS: FolderQuoteItem[][] = [
    [
        {
            id: "q1",
            tabLabel: "Claude",
            bgColor: "#F472B6", // Vivid Pink
            textColor: "#111827",
            quote: "Happiness is not something readymade. It comes from your own actions.",
            author: "Dalai Lama",
            handle: "@dalailama",
            codeRef: "16B",
            dateStr: "Dec 13, 1956",
            tabLeftOffset: 0,
        },
        {
            id: "q2",
            tabLabel: "Aiko",
            bgColor: "#818CF8", // Soft Periwinkle Blue
            textColor: "#FFFFFF",
            quote: "Write it on your heart that every day is the best day in the year.",
            author: "Ralph Waldo Emerson",
            handle: "@emerson",
            codeRef: "18E",
            dateStr: "Jan 24, 1962",
            tabLeftOffset: 70,
        },
        {
            id: "q3",
            tabLabel: "Perplexity",
            bgColor: "#FFFFFF", // Crisp White
            textColor: "#0F172A",
            quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
            author: "Marcus Aurelius",
            handle: "@aurelius",
            codeRef: "04A",
            dateStr: "Nov 09, 1974",
            tabLeftOffset: 170,
        },
        {
            id: "q4",
            tabLabel: "Limitless",
            bgColor: "#3B82F6", // Vivid Royal Blue
            textColor: "#FFFFFF",
            quote: "What you do today can improve all your tomorrows.",
            author: "Ralph Marston",
            handle: "@marston",
            codeRef: "22D",
            dateStr: "Apr 15, 1988",
            tabLeftOffset: 250,
        },
        {
            id: "q5",
            tabLabel: "ChatGPT",
            bgColor: "#D4FE00", // Neon Lime / Yellow-Green (Front Card in Photo)
            textColor: "#111827",
            quote: "Design should dominate things, not dominate people.",
            author: "Dieter Rams",
            handle: "@dieterrams",
            codeRef: "15C",
            dateStr: "Mar 18, 1966",
            tabLeftOffset: 0,
        },
    ],
    [
        {
            id: "q6",
            tabLabel: "Claude",
            bgColor: "#F472B6",
            textColor: "#111827",
            quote: "Design is not just what it looks like and feels like. Design is how it works.",
            author: "Steve Jobs",
            handle: "@stevejobs",
            codeRef: "08F",
            dateStr: "Oct 05, 1997",
            tabLeftOffset: 0,
        },
        {
            id: "q7",
            tabLabel: "Aiko",
            bgColor: "#818CF8",
            textColor: "#FFFFFF",
            quote: "You can't use up creativity. The more you use, the more you have.",
            author: "Maya Angelou",
            handle: "@angelou",
            codeRef: "11A",
            dateStr: "May 20, 1978",
            tabLeftOffset: 70,
        },
        {
            id: "q8",
            tabLabel: "Perplexity",
            bgColor: "#FFFFFF",
            textColor: "#0F172A",
            quote: "Turn your wounds into wisdom.",
            author: "Oprah Winfrey",
            handle: "@oprah",
            codeRef: "09C",
            dateStr: "Sep 12, 1985",
            tabLeftOffset: 170,
        },
        {
            id: "q9",
            tabLabel: "Limitless",
            bgColor: "#3B82F6",
            textColor: "#FFFFFF",
            quote: "In the middle of difficulty lies opportunity.",
            author: "Albert Einstein",
            handle: "@einstein",
            codeRef: "21B",
            dateStr: "Jul 04, 1945",
            tabLeftOffset: 250,
        },
        {
            id: "q10",
            tabLabel: "ChatGPT",
            bgColor: "#D4FE00",
            textColor: "#111827",
            quote: "Simplicity is the ultimate sophistication.",
            author: "Leonardo da Vinci",
            handle: "@davinci",
            codeRef: "03E",
            dateStr: "Feb 14, 1968",
            tabLeftOffset: 0,
        },
    ],
    [
        {
            id: "q11",
            tabLabel: "Claude",
            bgColor: "#F472B6",
            textColor: "#111827",
            quote: "Peace comes from within. Do not seek it without.",
            author: "Buddha",
            handle: "@buddha",
            codeRef: "30A",
            dateStr: "Jun 30, 1950",
            tabLeftOffset: 0,
        },
        {
            id: "q12",
            tabLabel: "Aiko",
            bgColor: "#818CF8",
            textColor: "#FFFFFF",
            quote: "The secret of getting ahead is getting started.",
            author: "Mark Twain",
            handle: "@marktwain",
            codeRef: "07D",
            dateStr: "Aug 19, 1910",
            tabLeftOffset: 70,
        },
        {
            id: "q13",
            tabLabel: "Perplexity",
            bgColor: "#FFFFFF",
            textColor: "#0F172A",
            quote: "A journey of a thousand miles begins with a single step.",
            author: "Lao Tzu",
            handle: "@laotzu",
            codeRef: "19K",
            dateStr: "Dec 01, 1972",
            tabLeftOffset: 170,
        },
        {
            id: "q14",
            tabLabel: "Limitless",
            bgColor: "#3B82F6",
            textColor: "#FFFFFF",
            quote: "Luck is what happens when preparation meets opportunity.",
            author: "Seneca",
            handle: "@seneca",
            codeRef: "14X",
            dateStr: "Mar 23, 1960",
            tabLeftOffset: 250,
        },
        {
            id: "q15",
            tabLabel: "ChatGPT",
            bgColor: "#D4FE00",
            textColor: "#111827",
            quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
            author: "Aristotle",
            handle: "@aristotle",
            codeRef: "27N",
            dateStr: "Oct 18, 1982",
            tabLeftOffset: 0,
        },
    ],
];

import { useJournal } from "../context/JournalContext";

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

    // Initial fallback if savedQuotes is empty
    const currentSavedQuotes = savedQuotes.length > 0 ? savedQuotes : [ALL_QUOTE_SETS[0][4], ALL_QUOTE_SETS[0][0]];
    const folderQuotes = ALL_QUOTE_SETS[setIndex % ALL_QUOTE_SETS.length];

    const handleReloadQuotes = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setReloading(true);
        setTimeout(() => {
            const nextSetIdx = (setIndex + 1) % ALL_QUOTE_SETS.length;
            setSetIndex(nextSetIdx);
            setActiveIndex(4);
            setReloading(false);
        }, 350);
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
            style={{
                position: "relative",
                maxWidth: 1280,
                margin: "60px auto",
                padding: "0 24px",
            }}
        >
            {/* LIGHTER GLASSMORPHIC FOLDER TOP TAB */}
            <div
                style={{
                    position: "relative",
                    width: 260,
                    height: 48,
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(59, 130, 246, 0.45) 100%)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderRadius: "22px 22px 0 0",
                    border: "1.5px solid rgba(255, 255, 255, 0.5)",
                    borderBottom: "none",
                    boxShadow: "0 -8px 20px rgba(0, 0, 0, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 26px",
                    color: "#FFFFFF",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 15,
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
                    borderRadius: "0 36px 36px 36px",
                    padding: "54px 36px",
                    boxShadow: "0 40px 100px rgba(15, 23, 42, 0.3), inset 0 2px 3px rgba(255, 255, 255, 0.6)",
                    border: "1.5px solid rgba(255, 255, 255, 0.4)",
                    overflow: "hidden",
                }}
            >
                <style>{`
                    @media (max-width: 640px) {
                        .quotes-hub-container {
                            padding: 32px 14px !important;
                            border-radius: 0 20px 20px 20px !important;
                        }
                    }
                `}</style>
                {/* WHITE PAPER SHEET SLIT PEEKING AT TOP EDGE OF FOLDER CONTAINER */}
                <div
                    style={{
                        position: "absolute",
                        top: 8,
                        left: 20,
                        right: 20,
                        height: 8,
                        background: "#FFFFFF",
                        borderRadius: 4,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                        opacity: 0.9,
                    }}
                />

                <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
                    {/* NORMAL CLEAN HEADING AT TOP */}
                    <div style={{ textAlign: "center", marginBottom: 44 }}>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 46px)", color: "#FFFFFF", marginTop: 0, marginBottom: 0 }}>
                            Daily Spark & <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#FFFFFF" }}>Mindful Quotes</span>
                        </h2>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255, 255, 255, 0.95)", fontSize: "16px", maxWidth: 620, margin: "10px auto 0 auto" }}>
                            Start your journal session with perspective. Save your favorite quotes directly into your bookmarked folder.
                        </p>

                        {/* GLASSMORPHIC CONTROL CENTER GLASS BUTTON */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 24 }}>
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
                                            0,0,0,1,0,0,0,
                                            0,0,0,1,1,0,0,
                                            0,0,0,1,1,1,0,
                                            1,1,1,1,1,1,1,
                                            0,0,0,1,1,1,0,
                                            0,0,0,1,1,0,0,
                                            0,0,0,1,0,0,0,
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
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: 32,
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
                                height: "clamp(400px, 60vh, 500px)",
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

                                // Compact staggered offset so left stack stays neatly inside left column
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
                                            height: isFront ? 350 : 250,
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
                                                padding: "28px 30px 22px 30px",
                                                boxShadow: isFront
                                                    ? "0 25px 60px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.12)"
                                                    : "0 12px 30px rgba(0, 0, 0, 0.2)",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                position: "relative",
                                                overflow: "hidden",
                                                color: item.textColor,
                                            }}
                                        >
                                            {/* MAIN QUOTE TEXT */}
                                            <div style={{ position: "relative", zIndex: 2 }}>
                                                <h3
                                                    style={{
                                                        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                                                        fontWeight: 800,
                                                        fontSize: isFront ? "clamp(22px, 2.4vw, 28px)" : "19px",
                                                        lineHeight: 1.2,
                                                        letterSpacing: "-0.02em",
                                                        margin: "0 0 14px 0",
                                                        color: item.textColor,
                                                    }}
                                                >
                                                    {item.quote}
                                                </h3>
                                            </div>

                                            {/* BOTTOM FOOTER: AUTHOR HANDLE & DOODLE ARROW / ACTIONS */}
                                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
                                                <div>
                                                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 700, display: "block", color: item.textColor }}>
                                                        {item.handle}
                                                    </span>
                                                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11.5, fontWeight: 600, opacity: 0.8, display: "block", marginTop: 2, color: item.textColor }}>
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
                                                        style={{ cursor: "pointer", display: "flex", alignItems: "center", padding: 2 }}
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

                        {/* RIGHT COLUMN: BOOKMARKED SAVED QUOTES FOLDER (MAC FOLDER SHAPE FROM JOURNAL FOLDER DIRECTORY) */}
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                maxWidth: 540,
                                height: 520,
                                margin: "0 auto",
                                background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
                                borderRadius: 36,
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
                                {/* Glossy Top Lighting Overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
                                    }}
                                />

                                {/* 3 FANNING SAVED QUOTE PAPER SHEETS STICKING OUT OF MAC FOLDER */}
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
                                    {/* Sheet 1 (Left Back Paper - Rose Pink to Magenta Gradient) */}
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

                                    {/* Sheet 2 (Right Back Paper - Sunset Yellow to Amber Gold Gradient) */}
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

                                    {/* Sheet 3 (Center Main Front Active Saved Quote Paper Sheet - High-Contrast Non-Blue Light Gradient) */}
                                    <div
                                        onClick={() => setIsPaperOpened(true)}
                                        title="Click Real Paper Document to Unfold Quote 📄"
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            width: "74%",
                                            height: "100%",
                                            background: activeSavedQuote.bgColor === "#D4FE00"
                                                ? "linear-gradient(135deg, #FFFBEB 0%, #FACC15 40%, #D4FE00 100%)" // Lime Gold
                                                : activeSavedQuote.bgColor === "#F472B6"
                                                ? "linear-gradient(135deg, #FFF1F2 0%, #F472B6 50%, #FB7185 100%)" // Rose Pink
                                                : activeSavedQuote.bgColor === "#818CF8"
                                                ? "linear-gradient(135deg, #F5F3FF 0%, #C4B5FD 50%, #A78BFA 100%)" // Lilac Lavender
                                                : activeSavedQuote.bgColor === "#FFFFFF"
                                                ? "linear-gradient(135deg, #FFFFFF 0%, #FFFBEB 50%, #FDE68A 100%)" // Pearl Ivory
                                                : "linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 50%, #34D399 100%)", // Mint Emerald (High Contrast vs Blue Folder!)
                                            borderRadius: "14px 14px 0 0",
                                            boxShadow: "0 -10px 30px rgba(0,0,0,0.25), inset 0 1.5px 2px rgba(255,255,255,0.9)",
                                            transform: paperOpening
                                                ? "rotateX(-18deg) scale(0.95) translateY(-8px)"
                                                : "rotate(-2deg) translateY(0px)",
                                            transformOrigin: "bottom center",
                                            zIndex: 2,
                                            padding: "16px 20px 10px 20px",
                                            boxSizing: "border-box",
                                            cursor: "pointer",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            border: "1px solid rgba(255, 255, 255, 0.8)",
                                            color: "#0F172A",
                                            transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                        }}
                                    >
                                        {/* BINDER HOLE PUNCH MARKS & CREASE */}
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, padding: "0 8px" }}>
                                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(15,23,42,0.2)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)" }} />
                                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(15,23,42,0.2)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)" }} />
                                        </div>

                                        {/* HEADER: CODE REF + SAVED COUNT + NAV CONTROLS */}
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
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                “{activeSavedQuote.quote}”
                                            </h4>
                                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, fontWeight: 700, color: "#334155" }}>
                                                — {activeSavedQuote.author}
                                            </span>
                                        </div>

                                        {/* FOOTER */}
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

                            {/* BOTTOM MAC FOLDER SVG FRONT FLAP (EXACT MATCH TO JOURNAL FOLDER DIRECTORY) */}
                            <div
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    height: "58%",
                                    marginTop: "-14%",
                                    zIndex: 3,
                                }}
                            >
                                {/* SVG Mac Folder Raised Shoulder Front Flap */}
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

                                {/* TITLE POSITIONED INSIDE THE RAISED LEFT TAB CUTOUT */}
                                <div style={{ position: "absolute", top: 12, left: 24, width: "45%", zIndex: 5 }}>
                                    <h3 style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontSize: 16, fontWeight: 800, color: "#FFFFFF", margin: 0, lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                                        Bookmarked Quotes
                                    </h3>
                                    <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: 11.5, color: "rgba(255, 255, 255, 0.85)", margin: "2px 0 0 0", fontWeight: 500 }}>
                                        Saved Favorites • {savedQuotes.length} Items
                                    </p>
                                </div>

                                {/* MAIN BODY CONTENT: HEADLINE & WHITE RETRO PIXEL CURSOR ARROW */}
                                <div style={{ position: "absolute", bottom: 28, left: 24, right: 24, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 5 }}>
                                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 900, color: "#FFFFFF", letterSpacing: "0.02em" }}>
                                        LEVEL UP YOUR MIND
                                    </span>

                                    {/* WHITE RETRO PIXEL CURSOR ARROW */}
                                    <div
                                        onClick={() => setIsPaperOpened(true)}
                                        title="Click to Open Paper Document"
                                        style={{ cursor: "pointer", transform: "rotate(-25deg)", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))", transition: "transform 0.2s ease" }}
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

            {/* FULL 3D UNFOLDED PAPER SHEET DOCUMENT MODAL OVERLAY */}
            {isPaperOpened && (
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
                            padding: "42px 46px",
                            boxShadow: "0 40px 100px rgba(0, 0, 0, 0.65), inset 0 2px 2px rgba(255, 255, 255, 1)",
                            border: "1px solid #E2E8F0",
                            transform: "perspective(1200px) rotateX(0deg)",
                            animation: "paperUnfoldModal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                    >
                        {/* FOLD CREASE LINE IN CENTER OF OPENED PAPER */}
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

                        {/* CLOSE / FOLD BACK BUTTON AT TOP RIGHT */}
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

                        {/* OPENED PAPER HEADER */}
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

                        {/* PAPER QUOTE BODY */}
                        <div style={{ padding: "10px 0 24px 0" }}>
                            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "clamp(26px, 3.2vw, 34px)", lineHeight: 1.3, color: "#0F172A", margin: "0 0 20px 0" }}>
                                “{activeSavedQuote.quote}”
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

                        {/* FOOTER ACTIONS */}
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
            )}
        </section>
    );
}
