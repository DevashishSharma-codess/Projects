/**
 * macOS Style Desktop Folder Component
 * Renders an interactive 3D folder item complete with custom SVG tab shapes, fanned paper preview sheets, and hover animations.
 */

import React, { useState } from "react";
import { FileText, Trash2, MoreHorizontal } from "lucide-react";
import type { JournalFolder } from "../../types/journal";

interface MacFolderItemProps {
    /** Target folder data */
    folder: JournalFolder;
    /** Select/open folder callback */
    onClick: () => void;
    /** Delete folder callback */
    onDelete: (e: React.MouseEvent) => void;
}

export function MacFolderItem({
    folder,
    onClick,
    onDelete,
}: MacFolderItemProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 0.86",
                background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
                borderRadius: 34,
                border: "none",
                boxShadow: hovered
                    ? "0 22px 48px rgba(59, 130, 246, 0.45)"
                    : "0 14px 32px rgba(15, 23, 42, 0.18)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: hovered ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
                display: "flex",
                flexDirection: "column",
                userSelect: "none",
                boxSizing: "border-box",
            }}
        >
            {/* TOP VIBRANT GRADIENT WALLPAPER AREA WITH FANNING PAPERS */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "44%",
                    background: folder.gradient || `linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)`,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                {/* Glossy Top Lighting Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
                    }}
                />

                {/* Fanned White Paper Sheets */}
                <div
                    style={{
                        position: "relative",
                        bottom: "-5px",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: "80%",
                        height: "82%",
                        zIndex: 1,
                    }}
                >
                    {/* Sheet 1 (Left) */}
                    <div
                        style={{
                            width: "36%",
                            height: "84%",
                            background: "#FFFFFF",
                            borderRadius: "6px 6px 0 0",
                            boxShadow: "-2px 4px 8px rgba(0,0,0,0.15)",
                            transform: "rotate(-14deg) translateY(4px)",
                            transformOrigin: "bottom center",
                            padding: 5,
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "70%", height: 3, background: "#CBD5E1", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ width: "90%", height: 3, background: "#E2E8F0", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ width: "50%", height: 3, background: "#E2E8F0", borderRadius: 2 }} />
                    </div>

                    {/* Sheet 2 (Center) */}
                    <div
                        style={{
                            width: "42%",
                            height: "98%",
                            background: "#FFFFFF",
                            borderRadius: "7px 7px 0 0",
                            boxShadow: "0 6px 14px rgba(0,0,0,0.20)",
                            transform: "rotate(-3deg) translateY(0px)",
                            transformOrigin: "bottom center",
                            zIndex: 2,
                            padding: 7,
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "75%", height: 3.5, background: "#94A3B8", borderRadius: 2, marginBottom: 5 }} />
                        <div style={{ width: "88%", height: 3.5, background: "#CBD5E1", borderRadius: 2, marginBottom: 5 }} />
                        <div style={{ width: "60%", height: 3.5, background: "#CBD5E1", borderRadius: 2 }} />
                    </div>

                    {/* Sheet 3 (Right) */}
                    <div
                        style={{
                            width: "36%",
                            height: "88%",
                            background: "#FFFFFF",
                            borderRadius: "6px 6px 0 0",
                            boxShadow: "2px 4px 8px rgba(0,0,0,0.15)",
                            transform: "rotate(10deg) translateY(2px)",
                            transformOrigin: "bottom center",
                            zIndex: 1,
                            padding: 5,
                            boxSizing: "border-box",
                        }}
                    >
                        <div style={{ width: "80%", height: 3, background: "#CBD5E1", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ width: "65%", height: 3, background: "#E2E8F0", borderRadius: 2, marginBottom: 4 }} />
                        <div style={{ width: "85%", height: 3, background: "#E2E8F0", borderRadius: 2 }} />
                    </div>
                </div>
            </div>

            {/* BOTTOM GRADIENT FOLDER FLAP BODY WITH SVG TAB CUTOUT */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "60%",
                    marginTop: "-16%",
                    zIndex: 3,
                }}
            >
                {/* SVG Folder Front Flap Path */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 220 150"
                    preserveAspectRatio="none"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
                >
                    <defs>
                        <linearGradient id="folderLightBlueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0 18 C 0 8, 8 0, 18 0 L 105 0 C 118 0, 124 6, 130 16 L 136 24 C 140 28, 146 30, 154 30 L 202 30 C 212 30, 220 38, 220 48 L 220 132 C 220 142, 212 150, 202 150 L 18 150 C 8 150, 0 142, 0 132 Z"
                        fill="url(#folderLightBlueGrad)"
                    />
                </svg>

                {/* TITLE & DESCRIPTION */}
                <div style={{ position: "absolute", top: 10, left: 16, width: "48%", zIndex: 5 }}>
                    <h3 style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', fontSize: 14, fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.25, letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {folder.name}
                    </h3>
                    <p style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: 10.5, color: "rgba(255, 255, 255, 0.85)", margin: "2px 0 0 0", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {folder.description && folder.description.length < 20 ? folder.description : "Notes & More"}
                    </p>
                </div>

                {/* DELETE FOLDER BUTTON */}
                <button
                    onClick={onDelete}
                    style={{
                        position: "absolute",
                        top: 32,
                        right: 12,
                        zIndex: 5,
                        border: "none",
                        outline: "none",
                        background: hovered ? "rgba(239, 68, 68, 0.25)" : "transparent",
                        color: hovered ? "#EF4444" : "rgba(255, 255, 255, 0.9)",
                        padding: "3px 5px",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                    }}
                    title="Delete Folder"
                >
                    {hovered ? <Trash2 size={13} color="#EF4444" /> : <MoreHorizontal size={16} color="rgba(255, 255, 255, 0.9)" />}
                </button>

                {/* FILE COUNT INDICATOR */}
                <div style={{ position: "absolute", bottom: 12, left: 16, zIndex: 5, display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, color: "rgba(255, 255, 255, 0.9)" }}>
                    <FileText size={12} color="rgba(255, 255, 255, 0.9)" />
                    <span>{folder.entries.length} Files</span>
                </div>
            </div>
        </div>
    );
}
