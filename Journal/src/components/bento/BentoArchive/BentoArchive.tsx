/**
 * Bento Box Memory Vault & Article Archive Component
 * Modular Bento Grid layout showcasing wellness articles, photography cards, and modal reader view.
 */

import React, { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useJournal } from "../../../context/JournalContext";
import { GLASS_BLOGS, type MoodGlassBlog } from "../data/bentoBlogsData";
import { GlassBlogModal } from "../GlassBlogModal/GlassBlogModal";
import "./BentoArchive.css";

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
            className={`bento-archive-section ${isMobile ? "is-mobile" : "is-desktop"}`}
        >
            <div className="bento-archive-wrapper">
                
                {/* 3D CIRCULAR DOME ARCH CAROUSEL */}
                <div
                    ref={containerRef}
                    className={`bento-dome-carousel ${isMobile ? "is-mobile" : "is-desktop"}`}
                >
                    {/* Floating Glass Prev / Next Controls */}
                    <button
                        onClick={handlePrev}
                        className={`bento-carousel-control prev ${isMobile ? "is-mobile" : "is-desktop"}`}
                        title="Previous Drop Card"
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
                    >
                        <ChevronLeft size={isMobile ? 20 : 24} />
                    </button>

                    <button
                        onClick={handleNext}
                        className={`bento-carousel-control next ${isMobile ? "is-mobile" : "is-desktop"}`}
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
                                className={`bento-carousel-card ${isCenter ? "is-center" : "is-side"}`}
                                style={{
                                    width: cardWidth,
                                    height: cardHeight,
                                    transform: `translate3d(${posX}px, ${posY}px, 0px) rotate(${rotation}deg) scale(${scale})`,
                                    opacity: opacity,
                                    zIndex: zIndex,
                                    pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                                }}
                            >
                                {/* Full Cover Pinterest Image */}
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.category}
                                    className={`bento-card-img ${isCenter ? "is-center" : "is-side"}`}
                                />

                                {/* Dark Gradient Overlay */}
                                <div className="bento-card-overlay" />

                                {/* Category Name Glass Pill Tag */}
                                <div className="bento-card-tag-wrapper">
                                    <span
                                        className={`bento-card-tag ${isCenter ? "is-center" : "is-side"}`}
                                    >
                                        {blog.category}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* MAIN ELEGANT HEADLINE CENTERED BELOW THE ARCH */}
                <div className="bento-headline-wrapper">
                    <h2 className="bento-main-title">
                        Explore Mindset &{" "}
                        <span className="bento-serif-accent">
                            Mood Collections.
                        </span>
                    </h2>

                    <p className="bento-subtext">
                        Transform your daily reflection with curated wisdom and mood-driven guidance.
                    </p>

                    {/* Start Reading Action Pill Button */}
                    <div className="bento-cta-row">
                        <button
                            onClick={() => setSelectedBlog(activeBlog)}
                            className="bento-read-btn"
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <span>Read {activeBlog.category} Article</span>
                            <ArrowRight size={17} />
                        </button>
                    </div>

                    {/* Active Mood Category Indicator */}
                    <div className="bento-selected-indicator">
                        <span className="bento-selected-text">
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
