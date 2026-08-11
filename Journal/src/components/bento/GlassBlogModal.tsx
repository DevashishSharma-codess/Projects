import React from "react";
import { X, CheckCircle2, Lightbulb } from "lucide-react";
import type { MoodGlassBlog } from "./bentoBlogsData";

interface GlassBlogModalProps {
    selectedBlog: MoodGlassBlog | null;
    onClose: () => void;
}

export const GlassBlogModal: React.FC<GlassBlogModalProps> = ({ selectedBlog, onClose }) => {
    if (!selectedBlog) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "rgba(15, 23, 42, 0.75)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "100%",
                    maxWidth: 880,
                    maxHeight: "90vh",
                    background: "linear-gradient(180deg, #EBF5FE 0%, #F0F7FF 40%, #F8FAFC 100%)",
                    borderRadius: 28,
                    border: "2px solid #0F172A",
                    boxShadow: "0 30px 90px rgba(15, 23, 42, 0.35)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    animation: "modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
            >
                {/* Header Bar with Sky-Blue Tint */}
                <div
                    style={{
                        padding: "20px 36px",
                        borderBottom: "2px solid #0F172A",
                        background: "linear-gradient(135deg, #BAE6FD 0%, #E0F2FE 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <span style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0F172A" }}>
                        DOGEAR MAGAZINE • {selectedBlog.category}
                    </span>
                    <button
                        onClick={onClose}
                        style={{
                            border: "1.5px solid #0F172A",
                            background: "#0F172A",
                            color: "#FFFFFF",
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Article Scroll Body */}
                <div style={{ padding: "40px 48px", overflowY: "auto", flex: 1, color: "#0F172A" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", color: "#475569" }}>
                            {selectedBlog.date} • {selectedBlog.readTime} read
                        </span>
                        <span style={{ border: "1px solid #0F172A", background: "#E0F2FE", color: "#0F172A", padding: "3px 12px", borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>
                            {selectedBlog.category}
                        </span>
                    </div>

                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(30px, 3.5vw, 44px)", fontWeight: 900, margin: "0 0 14px 0", lineHeight: 1.15, letterSpacing: "-0.03em" }}>
                        {selectedBlog.title}
                    </h2>
                    
                    <span style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 28, color: "#334155" }}>
                        Written by {selectedBlog.author}
                    </span>

                    {/* B&W Hero Fine Art Image */}
                    <div style={{ width: "100%", height: 340, borderRadius: 16, overflow: "hidden", marginBottom: 32, border: "2px solid #0F172A" }}>
                        <img
                            src={selectedBlog.imageUrl}
                            alt={selectedBlog.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "grayscale(100%) contrast(115%)",
                            }}
                        />
                    </div>

                    {/* Quote Box with Sky-Blue Accent */}
                    <div style={{ borderLeft: "4px solid #2563EB", background: "rgba(224, 242, 254, 0.6)", padding: "18px 24px", borderRadius: "0 16px 16px 0", marginBottom: 32 }}>
                        <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 23, margin: 0, color: "#0F172A", lineHeight: 1.4 }}>
                            {selectedBlog.content.quote}
                        </p>
                    </div>

                    {/* Intro */}
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16.5, lineHeight: 1.8, color: "#334155", marginBottom: 36 }}>
                        {selectedBlog.content.intro}
                    </p>

                    {/* Article Sections */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 28, marginBottom: 36 }}>
                        {selectedBlog.content.sections.map((sec, idx) => (
                            <div key={idx} style={{ borderTop: "1px solid #CBD5E1", paddingTop: 22 }}>
                                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 21, fontWeight: 800, color: "#0F172A", margin: "0 0 10px 0" }}>
                                    {sec.heading}
                                </h3>
                                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15.5, lineHeight: 1.75, color: "#334155", margin: 0 }}>
                                    {sec.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Key Takeaways Box in Sky-Blue Light Tint */}
                    <div style={{ background: "#F0F9FF", border: "1.5px solid #0F172A", borderRadius: 20, padding: "28px", marginBottom: 30 }}>
                        <span style={{ fontSize: 12, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 14, color: "#2563EB" }}>
                            Key Mindset Takeaways
                        </span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {selectedBlog.content.takeaways.map((point, pIdx) => (
                                <div key={pIdx} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <CheckCircle2 size={17} color="#2563EB" style={{ marginTop: 2, flexShrink: 0 }} />
                                    <span style={{ fontSize: 15, color: "#0F172A", fontWeight: 700 }}>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reflection Prompt in Deep Navy */}
                    <div style={{ background: "#0F172A", color: "#F0F9FF", borderRadius: 20, padding: "26px 30px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <Lightbulb size={18} color="#38BDF8" />
                            <span style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "#38BDF8" }}>
                                Journal Reflection Prompt
                            </span>
                        </div>
                        <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 21, margin: 0, lineHeight: 1.4 }}>
                            "{selectedBlog.content.reflectionPrompt}"
                        </p>
                    </div>
                </div>

                {/* Modal Footer Bar */}
                <div style={{ padding: "18px 36px", borderTop: "2px solid #0F172A", background: "linear-gradient(135deg, #BAE6FD 0%, #E0F2FE 100%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>
                        Dogear Editorial • Issue 2026
                    </span>
                    <button
                        onClick={onClose}
                        style={{
                            border: "none",
                            background: "#0F172A",
                            color: "#FFFFFF",
                            fontSize: 13,
                            fontWeight: 800,
                            padding: "9px 24px",
                            borderRadius: 999,
                            cursor: "pointer",
                        }}
                    >
                        Close Article
                    </button>
                </div>
            </div>
        </div>
    );
};
