/**
 * Landing Page Curved Footer Component
 * Features rich landscape imagery, navigation columns, folder helper illustrations, and large brand branding.
 */

import React from "react";
import { DogearWhiteLogo } from "./LandingHeader";

export const LandingFooter: React.FC = () => {
    return (
        <footer
            style={{
                position: "relative",
                width: "calc(100% - 28px)",
                margin: "32px 14px 14px 14px",
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "0 20px 48px rgba(15, 23, 42, 0.08)",
                fontFamily: "'Outfit', sans-serif",
                minHeight: 620,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
                background: "#CFE4EF",
            }}
        >
            {/* FULL LOCAL BACKGROUND IMAGE - ORIGINAL ASPECT RATIO */}
            <img
                src="https://framerusercontent.com/images/AWpFQZVt9LgBCWegzj8BjzNbFMI.webp?scale-down-to=2048&width=3109&height=1696"
                alt="Footer Landscape Background"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "bottom center",
                    display: "block",
                    zIndex: 1,
                }}
            />

            {/* UPPER NAVIGATION & BRAND DETAILS SECTION */}
            <div
                className="footer-grid-main"
                style={{
                    position: "relative",
                    zIndex: 10,
                    maxWidth: 1280,
                    width: "100%",
                    margin: "0 auto",
                    padding: "44px 36px 0 36px",
                    display: "grid",
                    gridTemplateColumns: "1.2fr 2fr",
                    gap: 48,
                    boxSizing: "border-box",
                }}
            >
                {/* LEFT COLUMN: BRAND LOGO & DESCRIPTION */}
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)",
                            }}
                        >
                            <DogearWhiteLogo size={24} color="#0F172A" />
                        </div>
                        <span
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: 32,
                                fontWeight: 800,
                                color: "#0F172A",
                                letterSpacing: "-0.03em",
                            }}
                        >
                            Dog<span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#1D4ED8" }}>ear</span>
                        </span>
                    </div>

                    <p
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 14.5,
                            lineHeight: 1.65,
                            color: "#1E293B",
                            fontWeight: 600,
                            maxWidth: 380,
                            margin: 0,
                        }}
                    >
                        Dogear helps individuals cultivate mindful daily reflection, organize thoughts in folders, track moods, and elevate emotional wellbeing—all in a peaceful space.
                    </p>
                </div>

                {/* RIGHT COLUMNS: PRODUCT, RESOURCES, COMPANY */}
                <div className="footer-grid-links" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36 }}>
                    {/* Col 1: Product Links */}
                    <div>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "0 0 16px 0", letterSpacing: "0.01em" }}>
                            Product
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11, fontSize: 14, fontWeight: 700 }}>
                            <li><a href="#folder-explorer" style={{ color: "#1E293B", textDecoration: "none" }}>Folder Explorer</a></li>
                            <li><a href="#journal-studio" style={{ color: "#1E293B", textDecoration: "none" }}>Journal Editor</a></li>
                            <li><a href="#mood-tracker" style={{ color: "#1E293B", textDecoration: "none" }}>Mood Analytics</a></li>
                            <li><a href="#inspirational-quotes" style={{ color: "#1E293B", textDecoration: "none" }}>Quotes Hub</a></li>
                            <li><a href="#bento-archive" style={{ color: "#1E293B", textDecoration: "none" }}>Bento Memory Vault</a></li>
                        </ul>
                    </div>

                    {/* Col 2: Resources Links */}
                    <div>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "0 0 16px 0", letterSpacing: "0.01em" }}>
                            Resources
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11, fontSize: 14, fontWeight: 700 }}>
                            <li><a href="#journal-studio" style={{ color: "#1E293B", textDecoration: "none" }}>Documentation</a></li>
                            <li><a href="#mood-tracker" style={{ color: "#1E293B", textDecoration: "none" }}>Mindfulness Guides</a></li>
                            <li><a href="#bento-archive" style={{ color: "#1E293B", textDecoration: "none" }}>Daily Prompts</a></li>
                            <li><a href="#inspirational-quotes" style={{ color: "#1E293B", textDecoration: "none" }}>Inspiration Library</a></li>
                            <li><a href="#folder-explorer" style={{ color: "#1E293B", textDecoration: "none" }}>Community & Support</a></li>
                        </ul>
                    </div>

                    {/* Col 3: Company Links */}
                    <div>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "0 0 16px 0", letterSpacing: "0.01em" }}>
                            Company
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11, fontSize: 14, fontWeight: 700 }}>
                            <li><a href="#folder-explorer" style={{ color: "#1E293B", textDecoration: "none" }}>About Us</a></li>
                            <li><a href="#journal-studio" style={{ color: "#1E293B", textDecoration: "none" }}>Philosophy</a></li>
                            <li><a href="#bento-archive" style={{ color: "#1E293B", textDecoration: "none" }}>Changelog</a></li>
                            <li><a href="#mood-tracker" style={{ color: "#1E293B", textDecoration: "none" }}>Privacy Policy</a></li>
                            <li><a href="#inspirational-quotes" style={{ color: "#1E293B", textDecoration: "none" }}>Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* BRAND TITLE & COPYRIGHT AT FOOTER BOTTOM */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingBottom: 16,
                    marginTop: 60,
                }}
            >
                {/* FOLDER HELPERS ILLUSTRATION */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: -24, zIndex: 12, position: "relative" }}>
                    <img
                        src="/folder_helpers_transparent.png"
                        alt="Folder Carrying Helpers"
                        style={{
                            height: "clamp(100px, 14vw, 230px)",
                            width: "auto",
                            filter: "drop-shadow(0 12px 24px rgba(15, 46, 34, 0.18))",
                            pointerEvents: "none",
                            transition: "transform 0.3s ease",
                        }}
                    />
                </div>

                {/* BRAND TEXT DISPLAY WITH LOGO INTEGRATION */}
                <h1
                    style={{
                        margin: 0,
                        padding: 0,
                        fontSize: "clamp(2.4rem, 13.5vw, 15rem)",
                        fontWeight: 900,
                        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
                        letterSpacing: "-0.04em",
                        lineHeight: 0.82,
                        color: "#0F2E22",
                        textTransform: "uppercase",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        textShadow: "0 2px 12px rgba(255, 255, 255, 0.4)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        maxWidth: "100%",
                    }}
                >
                    D
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "0.75em", height: "0.75em", margin: "0 0.02em" }}>
                        <DogearWhiteLogo size="100%" color="#0F2E22" />
                    </span>
                    GEAR
                </h1>

                {/* COPYRIGHT & LEGAL BAR */}
                <div
                    className="footer-legal-bar"
                    style={{
                        width: "100%",
                        maxWidth: 1280,
                        margin: "12px auto 0 auto",
                        padding: "0 36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: "#0F2E22",
                        fontSize: 13,
                        fontWeight: 800,
                        boxSizing: "border-box",
                    }}
                >
                    <span>© 2026 DOGEAR. All rights reserved. Crafted with care for daily reflection.</span>
                    <div style={{ display: "flex", gap: 24 }}>
                        <a href="#terms" style={{ color: "#0F2E22", textDecoration: "underline" }}>Terms of Service</a>
                        <a href="#privacy" style={{ color: "#0F2E22", textDecoration: "underline" }}>Privacy Policy</a>
                        <a href="#security" style={{ color: "#0F2E22", textDecoration: "underline" }}>Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
