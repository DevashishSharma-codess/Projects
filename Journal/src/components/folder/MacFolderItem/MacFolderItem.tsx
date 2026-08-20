/**
 * macOS Style Desktop Folder Component
 * Renders an interactive 3D folder item complete with custom SVG tab shapes, fanned paper preview sheets, and hover animations.
 */

import React, { useState } from "react";
import { FileText, Trash2, MoreHorizontal } from "lucide-react";
import type { JournalFolder } from "../../../types/journal";
import "./MacFolderItem.css";

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
            className="mac-folder-item-container"
        >
            {/* TOP VIBRANT GRADIENT WALLPAPER AREA WITH FANNING PAPERS */}
            <div
                className="mac-folder-wallpaper"
                style={{
                    background: folder.gradient || `linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)`,
                }}
            >
                {/* Glossy Top Lighting Overlay */}
                <div className="mac-folder-lighting-overlay" />

                {/* Fanned White Paper Sheets */}
                <div className="mac-folder-sheets-wrapper">
                    {/* Sheet 1 (Left) */}
                    <div className="mac-folder-sheet mac-folder-sheet-1">
                        <div className="sheet-line-1a" />
                        <div className="sheet-line-1b" />
                        <div className="sheet-line-1c" />
                    </div>

                    {/* Sheet 2 (Center) */}
                    <div className="mac-folder-sheet mac-folder-sheet-2">
                        <div className="sheet-line-2a" />
                        <div className="sheet-line-2b" />
                        <div className="sheet-line-2c" />
                    </div>

                    {/* Sheet 3 (Right) */}
                    <div className="mac-folder-sheet mac-folder-sheet-3">
                        <div className="sheet-line-3a" />
                        <div className="sheet-line-3b" />
                        <div className="sheet-line-3c" />
                    </div>
                </div>
            </div>

            {/* BOTTOM GRADIENT FOLDER FLAP BODY WITH SVG TAB CUTOUT */}
            <div className="mac-folder-flap-container">
                {/* SVG Folder Front Flap Path */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 220 150"
                    preserveAspectRatio="none"
                    className="mac-folder-svg-path"
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
                <div className="mac-folder-info">
                    <h3 className="mac-folder-title">
                        {folder.name}
                    </h3>
                    <p className="mac-folder-desc">
                        {folder.description && folder.description.length < 20 ? folder.description : "Notes & More"}
                    </p>
                </div>

                {/* DELETE FOLDER BUTTON */}
                <button
                    onClick={onDelete}
                    className="mac-folder-delete-btn"
                    title="Delete Folder"
                >
                    {hovered ? <Trash2 size={13} color="#EF4444" /> : <MoreHorizontal size={16} color="rgba(255, 255, 255, 0.9)" />}
                </button>

                {/* FILE COUNT INDICATOR */}
                <div className="mac-folder-count">
                    <FileText size={12} color="rgba(255, 255, 255, 0.9)" />
                    <span>{folder.entries.length} Files</span>
                </div>
            </div>
        </div>
    );
}
