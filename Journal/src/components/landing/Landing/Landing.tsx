/**
 * Main Landing Page View Component
 * Assembles animated hero stage, header navigation, section wrappers, continuous background gradient canvas, and footer.
 */

import React, { useEffect } from "react";
import { BookOpen, Smile, Heart, Moon, Compass, Folder } from "lucide-react";
import FolderExplorer from "../../folder/FolderExplorer/FolderExplorer";
import JournalEditor from "../../editor/JournalEditor/JournalEditor";
import MoodTracker from "../../mood/MoodTracker/MoodTracker";
import QuotesHub from "../../quotes/QuotesHub/QuotesHub";
import BentoArchive from "../../bento/BentoArchive/BentoArchive";
import { useJournal } from "../../../context/JournalContext";
import { LandingHeader } from "../LandingHeader/LandingHeader";
import { LandingFooter } from "../LandingFooter/LandingFooter";
import "./Landing.css";

const MODES = [
    { label: "Morning Pages", icon: BookOpen, color: "#FF6B4A" },
    { label: "Track a Mood", icon: Smile, color: "#E8A93A" },
    { label: "Gratitude List", icon: Heart, color: "#FF7FA6" },
    { label: "Dream Journal", icon: Moon, color: "#3E8FCC" },
    { label: "Ask Your Journal", icon: Compass, color: "#8763E0" },
];

const STAR_PARTICLES = Array.from({ length: 42 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 1.5 + Math.random() * 2.5,
    duration: 9 + Math.random() * 10,
    delay: Math.random() * 12,
    drift: -20 + Math.random() * 40,
    opacity: 0.35 + Math.random() * 0.5,
}));

export default function Landing() {
    const {
        activeModeIndex,
        setActiveModeIndex,
        mobileMenuOpen,
        setMobileMenuOpen,
        scrolled,
        setScrolled,
        scrollToSection,
    } = useJournal();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [setScrolled]);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveModeIndex((prev) => (prev + 1) % MODES.length);
        }, 2800);
        return () => clearInterval(timer);
    }, [setActiveModeIndex]);

    const activeMode = MODES[activeModeIndex];

    return (
        <div className="landing-page-root">
            <div className="page grid-canvas">
                {/* HERO SECTION */}
                <section className="hero-section" id="hero">
                    {/* Drifting white star particles */}
                    <div className="star-field">
                        {STAR_PARTICLES.map((p) => (
                            <span
                                key={p.id}
                                className="star-particle"
                                style={{
                                    left: `${p.left}%`,
                                    width: p.size,
                                    height: p.size,
                                    opacity: p.opacity,
                                    animationDuration: `${p.duration}s`,
                                    animationDelay: `${p.delay}s`,
                                    "--drift": `${p.drift}px`,
                                } as React.CSSProperties}
                            />
                        ))}
                    </div>

                    <LandingHeader
                        scrolled={scrolled}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                        scrollToSection={scrollToSection}
                    />

                    {/* HERO HEADLINE & TEXT */}
                    <div className="hero-text-block">
                        <h1 className="landing-hero-h1">
                            Days, <span className="landing-serif-accent">not</span><br />
                            blank <span className="landing-serif-accent-lg">pages.</span>
                        </h1>
                        <p className="landing-hero-p">
                            Write it down <span className="landing-serif-inline">before it fades.</span><br />
                            Get <b>structured desktop folders</b>, daily mood trend charts, and inspirational sparks.
                        </p>
                        <div className="hero-cta-row">
                            <button onClick={() => scrollToSection("folder-explorer", "folders")} className="cta-btn-dark">
                                Open Journal Folders <Folder size={16} />
                            </button>
                            <button onClick={() => scrollToSection("journal-studio", "editor")} className="landing-cta-editor-btn">
                                Open Editor Studio
                            </button>
                        </div>
                    </div>

                    {/* 3D HERO SCENE */}
                    <div className="hero-scene">
                        <div className="fanned-paper-stack" style={{ left: "9%" }}>
                            <div className="fanned-sheet" style={{ transform: "rotate(-22deg)", transformOrigin: "bottom center" }}>
                                <div className="sheet-line" style={{ width: "70%" }} />
                                <div className="sheet-line" style={{ width: "90%" }} />
                                <div className="sheet-line" style={{ width: "50%" }} />
                            </div>
                            <div className="fanned-sheet" style={{ transform: "rotate(-14deg)", transformOrigin: "bottom center" }}>
                                <div className="sheet-line" style={{ width: "80%" }} />
                                <div className="sheet-line" style={{ width: "60%" }} />
                            </div>
                            <div className="fanned-sheet" style={{ transform: "rotate(-6deg)", transformOrigin: "bottom center" }}>
                                <div className="sheet-line" style={{ width: "90%" }} />
                                <div className="sheet-line" style={{ width: "70%" }} />
                            </div>
                        </div>

                        <div className="fanned-paper-stack" style={{ right: "9%" }}>
                            <div className="fanned-sheet" style={{ transform: "rotate(6deg)", transformOrigin: "bottom center" }}>
                                <div className="sheet-line" style={{ width: "85%" }} />
                                <div className="sheet-line" style={{ width: "65%" }} />
                            </div>
                            <div className="fanned-sheet" style={{ transform: "rotate(14deg)", transformOrigin: "bottom center" }}>
                                <div className="sheet-line" style={{ width: "75%" }} />
                                <div className="sheet-line" style={{ width: "90%" }} />
                            </div>
                            <div className="fanned-sheet" style={{ transform: "rotate(22deg)", transformOrigin: "bottom center" }}>
                                <div className="sheet-line" style={{ width: "60%" }} />
                                <div className="sheet-line" style={{ width: "80%" }} />
                            </div>
                        </div>

                        <div className="card-paper card-left">
                            <div>
                                <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: "#0F172A", marginBottom: 6 }}>Morning Reflection</h4>
                                <p style={{ fontFamily: "'Caveat', cursive", fontSize: 17, color: "#64748B", lineHeight: 1.45 }}>
                                    Woke up early with coffee on the balcony. The sky was soft yellow and cold. Wrote down three things I want to build this spring...
                                </p>
                            </div>
                        </div>

                        <div className="card-paper card-right">
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: activeMode.color }} />
                                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "#64748B" }}>Active Journal Entry</span>
                                </div>
                                <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 12, border: "1px solid #E2E8F0" }}>
                                    <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.45, fontWeight: 500 }}>“What brought you joy today?”</p>
                                    <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
                                        <div style={{ height: 5, borderRadius: 3, background: "#E2E8F0", width: "88%" }} />
                                        <div style={{ height: 5, borderRadius: 3, background: "#E2E8F0", width: "72%" }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="folder-3d-container">
                            <div className="folder-tab-back" />
                            <div className="folder-back-plate" />
                        </div>

                        <div className="folder-front-flap" />
                    </div>
                </section>

                {/* CONTINUOUS GRADIENT CANVAS FROM FOLDER SECTION ONWARDS */}
                <div className="landing-continuous-gradient-canvas">
                    {/* 1. WINDOWS FOLDER EXPLORER SECTION */}
                    <FolderExplorer onOpenEditor={() => scrollToSection("journal-studio", "editor")} />

                    {/* 2. DAILY JOURNALING STUDIO */}
                    <JournalEditor />

                    {/* 3. MOOD TRACKER & TREND ANALYTICS */}
                    <MoodTracker />

                    {/* 4. INSPIRATIONAL DAILY QUOTES */}
                    <QuotesHub />

                    {/* 5. BENTO BOX ARCHIVE */}
                    <BentoArchive />

                    {/* FLOATING CURVED FOOTER CARD WITH FULL LANDSCAPE IMAGE BACKGROUND */}
                    <LandingFooter />
                </div>
            </div>
        </div>
    );
}
