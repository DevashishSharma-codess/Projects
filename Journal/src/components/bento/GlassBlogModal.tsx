/**
 * Glass Blog Article Modal Reader Component
 * Renders full-screen article view with magazine headers, typography, key takeaways, and reflection prompts.
 */

import React from "react";
import { X, CheckCircle2, Lightbulb } from "lucide-react";
import type { MoodGlassBlog } from "./bentoBlogsData";

interface GlassBlogModalProps {
    /** Target blog object selected for reading */
    selectedBlog: MoodGlassBlog | null;
    /** Close modal handler */
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
                {/* Magazine Titlebar Header */}
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

                {/* Article Content Scroll Workspace */}
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

                    {/* Hero Feature Image */}
                    <div style={{ width: "100%", height: 340, borderRadius: 16, overflow: "hidden", marginBottom: 32, border: "2px solid #0F172A" }}>
                        <img
                            src={selectedBlog.imageUrl}
                            alt={selectedBlog.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "grayscale(100%) contrast(105%)",
                            }}
                        />
                    </div>

                    {/* Article Intro Paragraph */}
                    <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, lineHeight: 1.7, color: "#1E293B", fontWeight: 500, marginBottom: 32 }}>
                        {selectedBlog.content.intro}
                    </p>

                    {/* Pull Quote Block */}
                    {selectedBlog.content.quote && (
                        <blockquote
                            style={{
                                margin: "0 0 36px 0",
                                padding: "24px 28px",
                                background: "#FFFFFF",
                                borderLeft: "4px solid #0F172A",
                                borderRadius: "0 16px 16px 0",
                                border: "2px solid #0F172A",
                                borderLeftWidth: 6,
                            }}
                        >
                            <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 24, margin: 0, color: "#0F172A", lineHeight: 1.4 }}>
                                "{selectedBlog.content.quote}"
                            </p>
                        </blockquote>
                    )}

                    {/* Content Sections */}
                    {selectedBlog.content.sections.map((section, idx) => (
                        <div key={idx} style={{ marginBottom: 32 }}>
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 12px 0" }}>
                                {section.heading}
                            </h3>
                            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: "#334155", margin: 0 }}>
                                {section.body}
                            </p>
                        </div>
                    ))}

                    {/* Key Takeaways */}
                    {selectedBlog.content.takeaways && selectedBlog.content.takeaways.length > 0 && (
                        <div style={{ background: "#FFFFFF", border: "2px solid #0F172A", borderRadius: 18, padding: 24, marginBottom: 32 }}>
                            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: 8 }}>
                                <CheckCircle2 size={18} color="#10B981" /> Key Takeaways
                            </h4>
                            <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                                {selectedBlog.content.takeaways.map((item, i) => (
                                    <li key={i} style={{ fontSize: 14.5, color: "#334155", fontWeight: 600, lineHeight: 1.5 }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Reflection Prompt Box */}
                    {selectedBlog.content.reflectionPrompt && (
                        <div style={{ background: "#F1F5F9", border: "2px dashed #0F172A", borderRadius: 18, padding: 24 }}>
                            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "0 0 8px 0", display: "flex", alignItems: "center", gap: 8 }}>
                                <Lightbulb size={18} color="#F59E0B" /> Journaling Prompt
                            </h4>
                            <p style={{ fontSize: 15, color: "#1E293B", fontWeight: 600, margin: 0, fontStyle: "italic" }}>
                                "{selectedBlog.content.reflectionPrompt}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
