/**
 * Doodle Vector Illustrations Library
 * Renders custom SVG vector doodles, characters, and decorative background graphics.
 */

import React from "react";
import "./DoodleIllustrations.css";

/* -------------------------------------------------------------------------- */
/* 1. COLORFUL WAVING DOODLE CROWD                                            */
/* -------------------------------------------------------------------------- */
export function DoodleCrowd({ height = 150, className = "" }: { height?: number; className?: string }) {
    return (
        <svg
            viewBox="0 0 1150 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ height, width: "100%", maxWidth: 1280 }}
            className={className}
        >
            {/* Background decorative dots & squiggles */}
            <circle cx="45" cy="35" r="4" fill="#EC4899" opacity="0.7" />
            <circle cx="85" cy="20" r="3" fill="#F59E0B" opacity="0.8" />
            <circle cx="160" cy="40" r="5" fill="#3B82F6" opacity="0.6" />
            <circle cx="280" cy="25" r="4" fill="#10B981" opacity="0.7" />
            <circle cx="870" cy="30" r="4" fill="#EF4444" opacity="0.8" />
            <circle cx="980" cy="18" r="5" fill="#EC4899" opacity="0.7" />
            <circle cx="1070" cy="35" r="3" fill="#F59E0B" opacity="0.8" />

            {/* Squiggles */}
            <path d="M 120 25 Q 130 15, 140 25 T 150 25" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 920 20 Q 930 10, 940 20 T 950 20" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* CHARACTER 1 (Far Left - Pink & Green Waving Girl) */}
            <g transform="translate(20, 40)">
                <path d="M 15 50 Q -5 30, -10 15 Q -12 8, -5 5 Q 0 8, 5 20 Q 15 40, 20 48" fill="#EC4899" />
                <path d="M -10 15 C -15 10, -12 0, -5 2 C 0 4, -2 12, 0 16" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" fill="none" />
                <circle cx="35" cy="35" r="24" stroke="#10B981" strokeWidth="4.5" fill="#FFFFFF" />
                <path d="M 15 28 Q 10 15, 25 15 Q 35 10, 45 15 Q 55 12, 55 25" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
                <circle cx="28" cy="35" r="3" fill="#1E293B" />
                <circle cx="42" cy="35" r="3" fill="#1E293B" />
                <path d="M 28 44 Q 35 52, 42 44" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 20 60 L 15 120 M 35 60 L 35 120 M 50 60 L 55 120" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* CHARACTER 2 (Yellow & Blue High-Five Guy) */}
            <g transform="translate(110, 20)">
                <path d="M 40 30 Q 30 10, 32 -5 Q 35 -15, 45 -10 Q 50 -5, 46 15 Q 48 25, 45 35" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 28 0 Q 32 -18, 38 -16" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 38 -20 Q 42 -22, 45 -15" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <circle cx="35" cy="55" r="22" stroke="#3B82F6" strokeWidth="4.5" fill="#FFFFFF" />
                <path d="M 20 40 L 25 30 L 32 40 L 40 28 L 48 40" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <circle cx="28" cy="53" r="3" fill="#1E293B" />
                <circle cx="42" cy="53" r="3" fill="#1E293B" />
                <path d="M 27 63 Q 35 72, 43 63" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 18 78 Q 35 85, 52 78 L 55 140 L 15 140 Z" fill="#FFFFFF" stroke="#EC4899" strokeWidth="4" />
                <line x1="20" y1="95" x2="50" y2="95" stroke="#F59E0B" strokeWidth="3.5" />
                <line x1="18" y1="115" x2="52" y2="115" stroke="#3B82F6" strokeWidth="3.5" />
            </g>

            {/* CHARACTER 3 (Left Leader) */}
            <g transform="translate(230, 10)">
                <path d="M 20 60 Q -5 30, 0 10 Q 5 -5, 15 10 Q 18 30, 25 55" fill="#10B981" />
                <path d="M 70 60 Q 95 30, 90 10 Q 85 -5, 75 10 Q 72 30, 65 55" fill="#EF4444" />
                <circle cx="45" cy="50" r="26" stroke="#F59E0B" strokeWidth="5" fill="#FFFFFF" />
                <path d="M 22 35 C 20 20, 35 15, 45 25 C 55 15, 70 20, 68 35" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" fill="none" />
                <ellipse cx="36" cy="48" rx="3.5" ry="5" fill="#1E293B" />
                <ellipse cx="54" cy="48" rx="3.5" ry="5" fill="#1E293B" />
                <circle cx="28" cy="54" r="4" fill="#EC4899" opacity="0.6" />
                <circle cx="62" cy="54" r="4" fill="#EC4899" opacity="0.6" />
                <path d="M 33 58 Q 45 72, 57 58 Z" fill="#EF4444" stroke="#1E293B" strokeWidth="2" />
                <path d="M 25 76 Q 45 80, 65 76 L 70 160 L 20 160 Z" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="4" />
                <path d="M 25 100 Q 45 110, 65 100" stroke="#10B981" strokeWidth="4" fill="none" />
                <path d="M 23 125 Q 45 135, 67 125" stroke="#F59E0B" strokeWidth="4" fill="none" />
            </g>

            {/* --- WIDE MIDDLE GAP FOR OVERLAY TEXT (x = 350 to 780) --- */}

            {/* CHARACTER 4 (Blue & Pink Waving Boy) */}
            <g transform="translate(800, 25)">
                <path d="M 60 50 Q 80 25, 75 10 Q 70 0, 60 12 Q 55 25, 52 45" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" fill="none" />
                <ellipse cx="35" cy="50" rx="22" ry="24" stroke="#3B82F6" strokeWidth="4.5" fill="#FFFFFF" />
                <path d="M 18 35 L 25 20 L 32 30 L 40 18 L 48 30 L 53 22 L 55 35" stroke="#10B981" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 24 48 L 32 48" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx="44" cy="48" r="3" fill="#1E293B" />
                <path d="M 28 58 Q 36 67, 44 58" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 18 74 L 12 145 M 35 74 L 35 145 M 52 74 L 58 145" stroke="#EC4899" strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* CHARACTER 5 (Yellow & Green Peeking Friend) */}
            <g transform="translate(910, 30)">
                <path d="M 10 70 A 25 25 0 0 1 60 70 Z" stroke="#F59E0B" strokeWidth="4.5" fill="#FFFFFF" />
                <circle cx="35" cy="40" r="10" stroke="#10B981" strokeWidth="3.5" fill="#FFFFFF" />
                <circle cx="26" cy="58" r="3" fill="#1E293B" />
                <circle cx="44" cy="58" r="3" fill="#1E293B" />
                <path d="M 28 65 Q 35 72, 42 65" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 65 60 Q 75 45, 80 50 Q 82 58, 70 70" stroke="#EC4899" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </g>

            {/* CHARACTER 6 (Far Right - Cheering Crowd Pair) */}
            <g transform="translate(1010, 15)">
                <circle cx="35" cy="45" r="22" stroke="#EC4899" strokeWidth="4.5" fill="#FFFFFF" />
                <path d="M 20 30 Q 35 20, 50 30" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <circle cx="28" cy="45" r="3" fill="#1E293B" />
                <circle cx="42" cy="45" r="3" fill="#1E293B" />
                <path d="M 28 55 Q 35 63, 42 55" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M 18 67 L 10 140 M 52 67 L 60 140" stroke="#3B82F6" strokeWidth="4" />

                <circle cx="85" cy="55" r="20" stroke="#3B82F6" strokeWidth="4.5" fill="#FFFFFF" />
                <path d="M 72 42 Q 85 35, 98 42" stroke="#10B981" strokeWidth="3.5" fill="none" />
                <circle cx="78" cy="55" r="3" fill="#1E293B" />
                <circle cx="92" cy="55" r="3" fill="#1E293B" />
                <path d="M 78 63 Q 85 70, 92 63" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 105 45 Q 120 25, 125 35 Q 120 45, 108 60" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 115 25 Q 125 15, 128 20" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
        </svg>
    );
}

/* -------------------------------------------------------------------------- */
/* 2. MINIMALIST MONKEY / CHARACTER READING A BOOK                            */
/* -------------------------------------------------------------------------- */
export function DoodleReader({ size = 120, className = "" }: { size?: number; className?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g transform="translate(10, 10)">
                <path
                    d="M 60 120 C 40 120, 30 100, 35 80 C 40 60, 55 50, 75 50 C 95 50, 110 65, 105 85 C 100 105, 85 120, 60 120 Z"
                    fill="#1E293B"
                />
                <circle cx="65" cy="42" r="22" fill="#1E293B" />
                <circle cx="44" cy="42" r="8" fill="#1E293B" />
                <circle cx="44" cy="42" r="4" fill="#64748B" />
                <circle cx="86" cy="42" r="8" fill="#1E293B" />
                <circle cx="86" cy="42" r="4" fill="#64748B" />
                <ellipse cx="65" cy="45" rx="14" ry="11" fill="#F8FAFC" />
                <circle cx="58" cy="43" r="2.5" fill="#1E293B" />
                <circle cx="72" cy="43" r="2.5" fill="#1E293B" />
                <path d="M 61 49 Q 65 53, 69 49" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />

                <g transform="translate(75, 70) rotate(-10)">
                    <path d="M 0 10 Q 20 0, 38 8 L 38 42 Q 20 34, 0 40 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
                    <path d="M 38 8 Q 56 0, 76 10 L 76 40 Q 56 34, 38 42 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
                    <line x1="8" y1="18" x2="30" y2="22" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                    <line x1="8" y1="26" x2="26" y2="30" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                    <line x1="46" y1="22" x2="68" y2="18" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                    <line x1="48" y1="30" x2="66" y2="26" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                </g>

                <ellipse cx="78" cy="88" rx="6" ry="4" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" />
            </g>
        </svg>
    );
}

/* -------------------------------------------------------------------------- */
/* 3. DOODLE STICKERS & BADGES                                               */
/* -------------------------------------------------------------------------- */
export function DoodleBadge({ text, color = "#F59E0B", icon }: { text: string; color?: string; icon?: React.ReactNode }) {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "9999px",
                background: "#FFFFFF",
                border: `2px solid ${color}`,
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                color: "#0F172A",
            }}
        >
            {icon}
            {text}
        </span>
    );
}

export function DoodleSparkleIcon({ color = "#8763E0", size = 24 }: { color?: string; size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill={color}
                stroke="#1E293B"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}
