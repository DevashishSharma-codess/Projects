/**
 * Landing Page Curved Footer Component
 * Features rich landscape imagery, navigation columns, folder helper illustrations, and large brand branding.
 */

import React from "react";
import { DogearWhiteLogo } from "../LandingHeader/LandingHeader";
import "./LandingFooter.css";

export const LandingFooter: React.FC = () => {
    return (
        <footer className="landing-footer-container">
            {/* FULL LOCAL BACKGROUND IMAGE - ORIGINAL ASPECT RATIO */}
            <img
                src="https://framerusercontent.com/images/AWpFQZVt9LgBCWegzj8BjzNbFMI.webp?scale-down-to=2048&width=3109&height=1696"
                alt="Footer Landscape Background"
                className="landing-footer-bg-img"
            />

            {/* UPPER NAVIGATION & BRAND DETAILS SECTION */}
            <div className="footer-grid-main">
                {/* LEFT COLUMN: BRAND LOGO & DESCRIPTION */}
                <div>
                    <div className="footer-brand-header">
                        <div className="footer-logo-box">
                            <DogearWhiteLogo size={24} color="#0F172A" />
                        </div>
                        <span className="footer-brand-title">
                            Dog<span className="footer-brand-serif">ear</span>
                        </span>
                    </div>

                    <p className="footer-brand-desc">
                        Dogear helps individuals cultivate mindful daily reflection, organize thoughts in folders, track moods, and elevate emotional wellbeing—all in a peaceful space.
                    </p>
                </div>

                {/* RIGHT COLUMNS: PRODUCT, RESOURCES, COMPANY */}
                <div className="footer-grid-links">
                    {/* Col 1: Product Links */}
                    <div>
                        <h4 className="footer-column-heading">
                            Product
                        </h4>
                        <ul className="footer-links-list">
                            <li><a href="#folder-explorer" className="footer-link-item">Folder Explorer</a></li>
                            <li><a href="#journal-studio" className="footer-link-item">Journal Editor</a></li>
                            <li><a href="#mood-tracker" className="footer-link-item">Mood Analytics</a></li>
                            <li><a href="#inspirational-quotes" className="footer-link-item">Quotes Hub</a></li>
                            <li><a href="#bento-archive" className="footer-link-item">Bento Memory Vault</a></li>
                        </ul>
                    </div>

                    {/* Col 2: Resources Links */}
                    <div>
                        <h4 className="footer-column-heading">
                            Resources
                        </h4>
                        <ul className="footer-links-list">
                            <li><a href="#journal-studio" className="footer-link-item">Documentation</a></li>
                            <li><a href="#mood-tracker" className="footer-link-item">Mindfulness Guides</a></li>
                            <li><a href="#bento-archive" className="footer-link-item">Daily Prompts</a></li>
                            <li><a href="#inspirational-quotes" className="footer-link-item">Inspiration Library</a></li>
                            <li><a href="#folder-explorer" className="footer-link-item">Community & Support</a></li>
                        </ul>
                    </div>

                    {/* Col 3: Company Links */}
                    <div>
                        <h4 className="footer-column-heading">
                            Company
                        </h4>
                        <ul className="footer-links-list">
                            <li><a href="#folder-explorer" className="footer-link-item">About Us</a></li>
                            <li><a href="#journal-studio" className="footer-link-item">Philosophy</a></li>
                            <li><a href="#bento-archive" className="footer-link-item">Changelog</a></li>
                            <li><a href="#mood-tracker" className="footer-link-item">Privacy Policy</a></li>
                            <li><a href="#inspirational-quotes" className="footer-link-item">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* BRAND TITLE & COPYRIGHT AT FOOTER BOTTOM */}
            <div className="footer-bottom-section">
                {/* FOLDER HELPERS ILLUSTRATION */}
                <div className="footer-helpers-wrapper">
                    <img
                        src="/folder_helpers_transparent.png"
                        alt="Folder Carrying Helpers"
                        className="footer-helpers-img"
                    />
                </div>

                {/* BRAND TEXT DISPLAY WITH LOGO INTEGRATION */}
                <h1 className="footer-big-brand-title">
                    D
                    <span className="footer-logo-inline">
                        <DogearWhiteLogo size="100%" color="#0F2E22" />
                    </span>
                    GEAR
                </h1>

                {/* COPYRIGHT & LEGAL BAR */}
                <div className="footer-legal-bar">
                    <span>© 2026 DOGEAR. All rights reserved. Crafted with care for daily reflection.</span>
                    <div className="footer-legal-links">
                        <a href="#terms" className="footer-legal-link">Terms of Service</a>
                        <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
                        <a href="#security" className="footer-legal-link">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
