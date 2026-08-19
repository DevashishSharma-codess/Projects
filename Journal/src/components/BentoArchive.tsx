/**
 * Bento Box Memory Vault & Article Archive Component
 * Modular Bento Grid layout showcasing wellness articles, photography cards, and modal reader view.
 */

import React, { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useJournal } from "../context/JournalContext";
import { GLASS_BLOGS, type MoodGlassBlog } from "./bento/bentoBlogsData";
import { GlassBlogModal } from "./bento/GlassBlogModal";

export type { MoodGlassBlog };

export default function BentoArchive() {
    const {
        bentoActiveIndex: activeIndex,
        setBentoActiveIndex: setActiveIndex,
        selectedBlog,
        setSelectedBlog,
    } = useJournal();

    const [winWidth, setWinWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
    const containerRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const activeBlog = GLASS_BLOGS[activeIndex] || GLASS_BLOGS[2];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % GLASS_BLOGS.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + GLASS_BLOGS.length) % GLASS_BLOGS.length);
    };

    const isMobile = winWidth < 640;

    return (
        <section
            id="bento-archive"
            style={{
                position: "relative",
                background: "transparent",
                padding: isMobile ? "60px 16px 80px 16px" : "90px 24px 110px 24px",
                width: "100%",
                margin: 0,
                overflow: "hidden",
                color: "#0F172A",
            }}
        >
            <div style={{ position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
                
                {/* 3D CIRCULAR DOME ARCH CAROUSEL */}
                <div
                    ref={containerRef}
                    style={{
                        position: "relative",
                        height: isMobile ? 320 : 440,
                        width: "100%",
                        maxWidth: 1140,
                        margin: "0 auto 20px auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Floating Glass Prev / Next Controls */}
                    <button
                        onClick={handlePrev}
                        style={{
                            position: "absolute",
                            left: isMobile ? 4 : 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 130,
                            border: "1px solid rgba(255, 255, 255, 0.8)",
                            background: "rgba(255, 255, 255, 0.75)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            color: "#0F172A",
                            width: isMobile ? 40 : 50,
                            height: isMobile ? 40 : 50,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
                            transition: "transform 0.2s ease",
                        }}
                        title="Previous Drop Card"
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
                    >
                        <ChevronLeft size={isMobile ? 20 : 24} />
                    </button>

                    <button
                        onClick={handleNext}
                        style={{
                            position: "absolute",
                            right: isMobile ? 4 : 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 130,
                            border: "1px solid rgba(255, 255, 255, 0.8)",
                            background: "rgba(255, 255, 255, 0.75)",
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            color: "#0F172A",
                            width: isMobile ? 40 : 50,
                            height: isMobile ? 40 : 50,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
                            transition: "transform 0.2s ease",
                        }}
                        title="Next Drop Card"
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
                    >
                        <ChevronRight size={isMobile ? 20 : 24} />
                    </button>

                    {/* ROTATIONAL CIRCULAR DOME ARCH TRACK */}
                    {GLASS_BLOGS.map((blog, idx) => {
                        const total = GLASS_BLOGS.length;
                        let offset = idx - activeIndex;

                        if (offset > total / 2) offset -= total;
                        if (offset < -total / 2) offset += total;

                        const isCenter = offset === 0;

                        const angleStep = isMobile ? 26 : 20;
                        const angleDeg = offset * angleStep;
                        const angleRad = (angleDeg * Math.PI) / 180;

                        const radiusX = Math.min(460, Math.max(120, (winWidth - 80) * 0.36));
                        const radiusY = Math.min(170, Math.max(70, (winWidth - 80) * 0.12));

                        const posX = Math.sin(angleRad) * radiusX;
                        const posY = (1 - Math.cos(angleRad)) * radiusY;

                        const rotation = angleDeg;
                        const scale = isCenter ? 1.2 : Math.max(0.78, 1.08 - Math.abs(offset) * 0.08);
                        const opacity = Math.abs(offset) > 2 ? 0 : Math.max(0.5, 1 - Math.abs(offset) * 0.16);
                        const zIndex = 100 - Math.abs(offset) * 10;

                        const cardWidth = isCenter ? (isMobile ? 155 : 215) : (isMobile ? 125 : 175);
                        const cardHeight = isCenter ? (isMobile ? 215 : 285) : (isMobile ? 170 : 235);

                        return (
                            <div
                                key={blog.id}
                                onClick={() => {
                                    setActiveIndex(idx);
                                    if (isCenter) setSelectedBlog(blog);
                                }}
                                style={{
                                    position: "absolute",
                                    width: cardWidth,
                                    height: cardHeight,
                                    borderRadius: 32,
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    transform: `translate3d(${posX}px, ${posY}px, 0px) rotate(${rotation}deg) scale(${scale})`,
                                    opacity: opacity,
                                    zIndex: zIndex,
                                    boxShadow: isCenter
                                        ? "0 30px 70px rgba(15, 23, 42, 0.25)"
                                        : "0 14px 35px rgba(15, 23, 42, 0.12)",
                                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                                    border: isCenter ? "4px solid #FFFFFF" : "2px solid rgba(255, 255, 255, 0.75)",
                                    pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                                }}
                            >
                                {/* Full Cover Pinterest Image */}
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.category}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                        transform: isCenter ? "scale(1.06)" : "scale(1)",
                                        transition: "transform 0.4s ease",
                                    }}
                                />

                                {/* Dark Gradient Overlay */}
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 60%)" }} />

                                {/* Category Name Glass Pill Tag */}
                                <div style={{ position: "absolute", bottom: 18, left: 12, right: 12, textAlign: "center" }}>
                                    <span
                                        style={{
                                            fontSize: isCenter ? 12 : 10.5,
                                            fontWeight: 800,
                                            color: "#FFFFFF",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            fontFamily: "'Outfit', sans-serif",
                                            background: "rgba(15, 23, 42, 0.55)",
                                            backdropFilter: "blur(12px)",
                                            WebkitBackdropFilter: "blur(12px)",
                                            padding: "6px 14px",
                                            borderRadius: 999,
                                            border: "1px solid rgba(255, 255, 255, 0.45)",
                                            display: "inline-block",
                                            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "100%",
                                        }}
                                    >
                                        {blog.category}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* MAIN ELEGANT HEADLINE CENTERED BELOW THE ARCH */}
                <div style={{ position: "relative", zIndex: 110, marginTop: 10 }}>
                    <h2
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(38px, 5.5vw, 62px)",
                            lineHeight: 1.08,
                            color: "#0F172A",
                            letterSpacing: "-0.03em",
                            maxWidth: 820,
                            margin: "0 auto 12px auto",
                        }}
                    >
                        Explore Mindset &{" "}
                        <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#0F172A" }}>
                            Mood Collections.
                        </span>
                    </h2>

                    <p
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            color: "#475569",
                            fontSize: "clamp(14px, 1.5vw, 17px)",
                            maxWidth: 600,
                            margin: "0 auto 26px auto",
                            lineHeight: 1.5,
                            fontWeight: 500,
                        }}
                    >
                        Transform your daily reflection with curated wisdom and mood-driven guidance.
                    </p>

                    {/* Start Reading Action Pill Button */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
                        <button
                            onClick={() => setSelectedBlog(activeBlog)}
                            style={{
                                border: "none",
                                background: "#0F172A",
                                color: "#FFFFFF",
                                fontSize: 14.5,
                                fontWeight: 700,
                                padding: "13px 32px",
                                borderRadius: 999,
                                cursor: "pointer",
                                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.2)",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <span>Read {activeBlog.category} Article</span>
                            <ArrowRight size={17} />
                        </button>
                    </div>

                    {/* Active Mood Category Indicator */}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255, 255, 255, 0.7)", padding: "7px 18px", borderRadius: 999, border: "1px solid rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10px)" }}>
                        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                            Selected Drop • {activeBlog.category} ({activeBlog.moodLabel})
                        </span>
                    </div>
                </div>
            </div>

            {/* FYRRE MAGAZINE EDITORIAL READER MODAL WINDOW WITH SUBTLE SKY-BLUE TINT */}
            <GlassBlogModal selectedBlog={selectedBlog} onClose={() => setSelectedBlog(null)} />
        </section>
    );
}
