import React from "react";
import { Menu, X } from "lucide-react";

export function DogearWhiteLogo({ size = 30, color = "#FFFFFF" }: { size?: number | string; color?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0, display: "inline-block" }}
        >
            {/* 8-Dot Diamond Logo */}
            <circle cx="16" cy="3.5" r="2.8" fill={color} />
            <circle cx="22.5" cy="10" r="2.8" fill={color} />
            <circle cx="28.5" cy="16.5" r="2.8" fill={color} />
            <circle cx="22.5" cy="23" r="2.8" fill={color} />
            <circle cx="16" cy="29.5" r="2.8" fill={color} />
            <circle cx="9.5" cy="23" r="2.8" fill={color} />
            <circle cx="3.5" cy="16.5" r="2.8" fill={color} />
            <circle cx="9.5" cy="10" r="2.8" fill={color} />
        </svg>
    );
}

interface LandingHeaderProps {
    scrolled: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
    scrollToSection: (id: string, tab?: any) => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
    scrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    scrollToSection,
}) => {
    return (
        <>
            {/* MOBILE MENU DRAWER OVERLAY */}
            {mobileMenuOpen && (
                <div className="mobile-drawer-overlay">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <DogearWhiteLogo size={32} />
                            <span style={{ fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 24, color: "#FFFFFF" }}>
                                Dogear
                            </span>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                background: "rgba(255,255,255,0.2)",
                                border: "none",
                                color: "#FFFFFF",
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <nav style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
                        <a
                            onClick={() => scrollToSection("folder-explorer", "folders")}
                            style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}
                        >
                            📁 Folders Directory
                        </a>
                        <a
                            onClick={() => scrollToSection("journal-studio", "editor")}
                            style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}
                        >
                            ✏️ Daily Studio Editor
                        </a>
                        <a
                            onClick={() => scrollToSection("mood-tracker", "mood")}
                            style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}
                        >
                            📊 Mood Analytics
                        </a>
                        <a
                            onClick={() => scrollToSection("inspirational-quotes", "quotes")}
                            style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}
                        >
                            💡 Daily Quotes Hub
                        </a>
                        <a
                            onClick={() => scrollToSection("bento-archive", "bento")}
                            style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}
                        >
                            🔮 Bento Memory Vault
                        </a>
                    </nav>

                    <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
                        <button
                            onClick={() => scrollToSection("journal-studio", "editor")}
                            className="cta-btn-white"
                            style={{ width: "100%", padding: "14px", fontSize: 16 }}
                        >
                            Open Journal Studio
                        </button>
                    </div>
                </div>
            )}

            {/* STICKY FLOATING PILL NAVBAR ON SCROLL */}
            <header
                style={{
                    position: scrolled ? "fixed" : "relative",
                    top: scrolled ? 16 : 0,
                    left: scrolled ? "50%" : "auto",
                    transform: scrolled ? "translateX(-50%)" : "none",
                    width: scrolled ? "calc(100% - 32px)" : "100%",
                    maxWidth: scrolled ? 1040 : "100%",
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: scrolled ? "10px 20px" : "0px",
                    borderRadius: scrolled ? 9999 : 0,
                    background: scrolled ? "rgba(15, 23, 42, 0.75)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
                    border: scrolled ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid transparent",
                    boxShadow: scrolled ? "0 16px 36px rgba(15, 23, 42, 0.25)" : "none",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxSizing: "border-box",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollToSection("hero", "hero")}>
                    <DogearWhiteLogo size={scrolled ? 26 : 34} />
                    <span style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 700, fontSize: scrolled ? 20 : 24, color: "#FFFFFF", letterSpacing: "-0.035em" }}>
                        Dogear
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="nav-center" style={{ display: "flex", alignItems: "center", gap: scrolled ? 24 : 32 }}>
                    <a className="nav-link" href="#folder-explorer">Folders</a>
                    <a className="nav-link" href="#journal-studio">Daily Studio</a>
                    <a className="nav-link" href="#mood-tracker">Mood Analytics</a>
                    <a className="nav-link" href="#inspirational-quotes">Quotes</a>
                    <a className="nav-link" href="#bento-archive">Community</a>
                </nav>

                {/* Desktop Auth Links */}
                <div className="nav-auth-actions" style={{ display: "flex", alignItems: "center", gap: scrolled ? 14 : 20 }}>
                    <a href="#journal-studio" style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 600, fontSize: 14, opacity: 0.95 }}>Log in</a>
                    <button
                        className="cta-btn-white"
                        onClick={() => {
                            const el = document.getElementById("journal-studio");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                            padding: scrolled ? "7px 18px" : "10px 22px",
                            fontSize: scrolled ? 13.5 : 14.5,
                        }}
                    >
                        Sign up
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                    <Menu size={20} />
                </button>
            </header>
        </>
    );
};
