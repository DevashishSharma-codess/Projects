/**
 * Main Landing Page View Component
 * Assembles animated hero stage, header navigation, section wrappers, continuous background gradient canvas, and footer.
 */

import React, { useEffect } from "react";
import { BookOpen, Smile, Heart, Moon, Compass, Folder } from "lucide-react";
import FolderExplorer from "./FolderExplorer";
import JournalEditor from "./JournalEditor";
import MoodTracker from "./MoodTracker";
import QuotesHub from "./QuotesHub";
import BentoArchive from "./BentoArchive";
import { useJournal } from "../context/JournalContext";
import { LandingHeader } from "./landing/LandingHeader";
import { LandingFooter } from "./landing/LandingFooter";

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
        <div style={{ background: "#FFFFFF", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", color: "#1E293B" }}>
            <style>{`
        body { margin: 0; padding: 0; background-color: #FFFFFF; color: #070709; overflow-x: hidden; }

        .page {
          background: #FFFFFF;
        }

        .hero-section {
          position: relative;
          background:
            radial-gradient(
              ellipse 100% 70% at 50% 35%,
              rgba(255, 255, 255, 0.10) 0%,
              rgba(255, 255, 255, 0.05) 30%,
              rgba(255, 255, 255, 0.02) 55%,
              rgba(255, 255, 255, 0.00) 75%
            ),
            radial-gradient(
              ellipse 80% 60% at 50% -10%,
              rgba(255, 255, 255, 0.08) 0%,
              rgba(255, 255, 255, 0.00) 60%
            ),
            linear-gradient(
              180deg,
              #6F8FAF 0%,
              #7FA1BF 25%,
              #98BCD6 60%,
              #CFE4EF 100%
            );

          padding: 16px 24px 0 24px;
          margin: 12px;
          border-radius: 28px;
          box-shadow: 0 20px 48px rgba(15, 23, 42, 0.12);
          overflow: hidden;
          height: calc(100vh - 24px);
          min-height: 540px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .star-field { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .star-particle {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: #FFFFFF;
          animation-name: floatUp;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes floatUp {
          0%   { transform: translate(0, 0); opacity: 0; }
          8%   { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translate(var(--drift), -620px); opacity: 0; }
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.92);
          text-decoration: none;
          font-size: 14.5px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: opacity 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .nav-link:hover { opacity: 0.75; }

        .cta-btn-white {
          background: #FFFFFF;
          color: #0F172A;
          border: none;
          padding: 10px 22px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 14.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          white-space: nowrap;
        }
        .cta-btn-white:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12); }

        .cta-btn-dark {
          background: #0F172A;
          color: #FFFFFF;
          border: none;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 14.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.28);
          white-space: nowrap;
        }
        .cta-btn-dark:hover { transform: translateY(-2px); background: #1E293B; box-shadow: 0 16px 34px rgba(15, 23, 42, 0.38); }

        .hero-cta-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .hero-text-block {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 740px;
          margin: 10px auto 0 auto;
          padding: 0 16px;
          flex-shrink: 0;
        }

        .hero-scene {
          position: relative;
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          transform: scale(0.82);
          transform-origin: bottom center;
          z-index: 2;
          min-height: 220px;
        }

        .fanned-paper-stack {
          position: absolute;
          bottom: 40px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        .fanned-sheet {
          width: 110px;
          height: 145px;
          background: #FFFFFF;
          border-radius: 10px;
          border: 1px solid rgba(226, 232, 240, 0.95);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.10);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .sheet-line { height: 5px; border-radius: 3px; background: rgba(183, 210, 229, 0.6); }

        .card-paper {
          position: absolute;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.16), 0 2px 6px rgba(15, 23, 42, 0.05);
          border: 1px solid rgba(226, 232, 240, 0.95);
          transition: transform 0.3s ease;
          z-index: 3;
        }
        .card-left {
          left: 18%;
          bottom: 60px;
          width: 230px;
          height: 235px;
          transform: rotate(-6deg);
          transform-origin: bottom right;
        }
        .card-left:hover { transform: rotate(-3deg) translateY(-6px); }
        .card-right {
          right: 18%;
          bottom: 64px;
          width: 235px;
          height: 240px;
          transform: rotate(3deg);
          transform-origin: bottom left;
        }
        .card-right:hover { transform: rotate(1deg) translateY(-6px); }

        .pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
          border-radius: 9999px;
          padding: 5px 13px;
          font-size: 12.5px;
          font-weight: 700;
          color: #0F172A;
          margin-bottom: 12px;
        }

        .folder-3d-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 640px;
          height: 360px;
          z-index: 1;
        }
        .folder-tab-back {
          position: absolute;
          top: -22px;
          left: 34px;
          width: 190px;
          height: 28px;
          background: linear-gradient(160deg, #FFD666 0%, #EEA716 100%);
          border-radius: 14px 16px 0 0;
          border-top: 1px solid rgba(255, 255, 255, 0.55);
        }
        .folder-back-plate {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, #FFD666 0%, #F3AC1D 55%, #DE8E0B 100%);
          border-radius: 64px 64px 22px 22px;
          box-shadow: 0 30px 60px rgba(150, 88, 0, 0.32), inset 0 2px 0 rgba(255, 255, 255, 0.35);
        }

        .folder-front-flap {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 660px;
          height: 115px;
          z-index: 4;
          background: linear-gradient(180deg, #FFE28E 0%, #FFC736 42%, #F0A61C 100%);
          border-radius: 40px 40px 22px 22px;
          box-shadow:
            0 18px 34px rgba(180, 106, 0, 0.30),
            inset 0 14px 22px rgba(255, 255, 255, 0.35),
            inset 0 -8px 14px rgba(120, 65, 0, 0.10);
        }

        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: #FFFFFF;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          flex-shrink: 0;
        }

        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 24px;
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-height: 820px) {
          .hero-text-block { margin-top: 4px !important; }
          .hero-text-block h1 { font-size: clamp(30px, 4.8vw, 54px) !important; }
          .hero-text-block p { font-size: 14px !important; margin-top: 10px !important; }
          .hero-scene { transform: scale(0.72) !important; }
        }

        @media (max-height: 700px) {
          .hero-text-block h1 { font-size: clamp(26px, 4vw, 42px) !important; }
          .hero-text-block p { font-size: 13px !important; margin-top: 6px !important; }
          .hero-cta-row { margin-top: 10px !important; }
          .hero-scene { transform: scale(0.60) !important; }
        }

        @media (max-width: 1100px) {
          .hero-section {
            padding: 16px 20px 0 20px !important;
            margin: 10px !important;
            border-radius: 24px !important;
          }
          .hero-scene {
            transform: scale(0.70) !important;
          }
          .nav-center { gap: 20px !important; }
        }

        @media (max-width: 900px) {
          .hero-section {
            padding: 14px 16px 0 16px !important;
            margin: 8px !important;
            border-radius: 20px !important;
          }
          .hero-scene {
            transform: scale(0.55) !important;
          }
          .nav-center { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .nav-auth-actions { display: none !important; }
          .footer-grid-main {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            padding: 24px 20px 0 20px !important;
          }
          .footer-grid-links {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 20px !important;
          }
          .footer-legal-bar {
            flex-direction: column !important;
            gap: 12px !important;
            text-align: center !important;
            padding: 0 16px !important;
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            margin: 6px !important;
            padding: 12px 10px 0 10px !important;
            border-radius: 18px !important;
            height: auto !important;
            min-height: calc(100vh - 12px) !important;
          }
          .hero-scene {
            transform: scale(0.42) !important;
            min-height: 180px !important;
          }
          .hero-cta-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 10px !important;
          }
          .hero-cta-row button {
            width: 100% !important;
            max-width: 320px !important;
            justify-content: center !important;
          }
          .card-left { left: 5% !important; bottom: 30px !important; }
          .card-right { right: 5% !important; bottom: 30px !important; }
          .folder-3d-container { width: 90vw !important; max-width: 500px !important; }
          .folder-front-flap { width: 92vw !important; max-width: 520px !important; }
          .footer-grid-links {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .footer-grid-main {
            padding: 20px 16px 0 16px !important;
          }
        }
      `}</style>

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
                        <h1 style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "clamp(38px, 5.5vw, 68px)", lineHeight: 1.05, color: "#FFFFFF", letterSpacing: "-0.025em" }}>
                            Days, <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, opacity: 0.95 }}>not</span><br />
                            blank <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>pages.</span>
                        </h1>
                        <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255, 255, 255, 0.92)", fontSize: "clamp(15px, 1.6vw, 17.5px)", lineHeight: 1.6, marginTop: 16, fontWeight: 500, maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
                            Write it down <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "1.22em", fontWeight: 400 }}>before it fades.</span><br />
                            Get <b>structured desktop folders</b>, daily mood trend charts, and inspirational sparks.
                        </p>
                        <div className="hero-cta-row">
                            <button onClick={() => scrollToSection("folder-explorer", "folders")} className="cta-btn-dark">
                                Open Journal Folders <Folder size={16} />
                            </button>
                            <button onClick={() => scrollToSection("journal-studio", "editor")} style={{ background: "rgba(255,255,255,0.2)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.5)", padding: "13px 26px", borderRadius: 9999, fontWeight: 700, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap" }}>
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
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        background: "linear-gradient(180deg, #6F8FAF 0%, #7FA1BF 20%, #98BCD6 45%, #CFE4EF 70%, #FFFFFF 100%)",
                    }}
                >
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
