/**
 * Landing Page Navigation Header & Mobile Drawer
 * Provides responsive top navigation bar with dynamic glassmorphic pill background on scroll and mobile drawer.
 */

import React from "react";
import { Menu, X } from "lucide-react";
import "./LandingHeader.css";

/** Brand Diamond Logo SVG Icon */
export function DogearWhiteLogo({ size = 30, color = "#FFFFFF" }: { size?: number | string; color?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="dogear-logo-svg"
        >
            {/* 8-Dot Diamond Logo Pattern */}
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
    /** True when user has scrolled down past initial hero threshold */
    scrolled: boolean;
    /** Mobile drawer visibility state */
    mobileMenuOpen: boolean;
    /** Toggle handler for mobile menu */
    setMobileMenuOpen: (open: boolean) => void;
    /** Scroll navigation handler */
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
                    <div className="mobile-drawer-header">
                        <div className="mobile-drawer-brand">
                            <DogearWhiteLogo size={32} />
                            <span className="mobile-drawer-brand-text">
                                Dogear
                            </span>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-drawer-close-btn"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <nav className="mobile-drawer-nav">
                        <a
                            onClick={() => scrollToSection("folder-explorer", "folders")}
                            className="mobile-drawer-link"
                        >
                            📁 Folders Directory
                        </a>
                        <a
                            onClick={() => scrollToSection("journal-studio", "editor")}
                            className="mobile-drawer-link"
                        >
                            ✏️ Daily Studio Editor
                        </a>
                        <a
                            onClick={() => scrollToSection("mood-tracker", "mood")}
                            className="mobile-drawer-link"
                        >
                            📊 Mood Analytics
                        </a>
                        <a
                            onClick={() => scrollToSection("inspirational-quotes", "quotes")}
                            className="mobile-drawer-link"
                        >
                            💡 Daily Quotes Hub
                        </a>
                        <a
                            onClick={() => scrollToSection("bento-archive", "bento")}
                            className="mobile-drawer-link"
                        >
                            🔮 Bento Memory Vault
                        </a>
                    </nav>

                    <div className="mobile-drawer-footer">
                        <button
                            onClick={() => scrollToSection("journal-studio", "editor")}
                            className="cta-btn-white mobile-drawer-cta-btn"
                        >
                            Open Journal Studio
                        </button>
                    </div>
                </div>
            )}

            {/* STICKY FLOATING PILL NAVBAR ON SCROLL */}
            <header className={`header-container ${scrolled ? "is-scrolled" : "is-top"}`}>
                <div className="header-brand" onClick={() => scrollToSection("hero", "hero")}>
                    <DogearWhiteLogo size={scrolled ? 26 : 34} />
                    <span className={`header-brand-text ${scrolled ? "is-scrolled" : "is-top"}`}>
                        Dogear
                    </span>
                </div>

                {/* Desktop Navigation Links */}
                <nav className={`nav-center header-nav ${scrolled ? "is-scrolled" : "is-top"}`}>
                    <a className="nav-link" href="#folder-explorer">Folders</a>
                    <a className="nav-link" href="#journal-studio">Daily Studio</a>
                    <a className="nav-link" href="#mood-tracker">Mood Analytics</a>
                    <a className="nav-link" href="#inspirational-quotes">Quotes</a>
                    <a className="nav-link" href="#bento-archive">Community</a>
                </nav>

                {/* Desktop Auth CTA Actions */}
                <div className={`nav-auth-actions header-auth-actions ${scrolled ? "is-scrolled" : "is-top"}`}>
                    <a href="#journal-studio" className="header-login-link">Log in</a>
                    <button
                        className={`cta-btn-white header-signup-btn ${scrolled ? "is-scrolled" : "is-top"}`}
                        onClick={() => {
                            const el = document.getElementById("journal-studio");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
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
