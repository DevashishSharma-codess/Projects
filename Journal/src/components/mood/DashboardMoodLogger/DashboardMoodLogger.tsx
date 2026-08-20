/**
 * Dashboard Mood Logger Component
 * Interactive widget allowing users to select current mood, add notes, pick time slots, and log mood ratings.
 */

import React, { useState } from "react";
import { Sparkles, Heart, Compass, Zap, Activity, Moon, CheckCircle2, Clock, Calendar as CalendarIcon, Plus } from "lucide-react";
import { MOOD_OPTIONS, getMoodOption, todayStr, type MoodOption } from "../data/moodTrackerData";
import { getHourSlotInfo } from "../../../context/JournalContext";
import type { MoodLog } from "../../../types/journal";
import "./DashboardMoodLogger.css";

interface DashboardMoodLoggerProps {
    addMoodLog: (
        day: string,
        moodKey: string,
        moodLabel: string,
        icon: string,
        score: number,
        color: string,
        note: string,
        time?: string
    ) => void;
    logs: Record<string, MoodLog>;
    isFutureDateTime: (date: string, time: string) => boolean;
}

export const DashboardMoodLogger: React.FC<DashboardMoodLoggerProps> = ({
    addMoodLog,
    logs,
    isFutureDateTime,
}) => {
    const [selectedMood, setSelectedMood] = useState<MoodOption>(MOOD_OPTIONS[1]); // Peaceful default
    const [logDate, setLogDate] = useState(() => todayStr());
    const [logTime, setLogTime] = useState(() => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    });
    const [note, setNote] = useState("");
    const [logSuccess, setLogSuccess] = useState(false);
    const [futureError, setFutureError] = useState(false);

    const currentHourSlot = getHourSlotInfo(logDate, logTime).hourSlot;
    const isEditing = Boolean(logs[currentHourSlot]);

    const handleQuickTime = (t: string) => {
        if (t === "Now") {
            const now = new Date();
            setLogTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
        } else {
            setLogTime(t);
        }
    };

    const handleLogSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isFutureDateTime(logDate, logTime)) {
            setFutureError(true);
            setTimeout(() => setFutureError(false), 3000);
            return;
        }

        addMoodLog(
            logDate,
            selectedMood.key,
            selectedMood.label,
            selectedMood.iconName,
            selectedMood.score,
            selectedMood.color,
            note.trim() || `Feeling ${selectedMood.label}`,
            logTime
        );

        setNote("");
        setLogSuccess(true);
        setTimeout(() => setLogSuccess(false), 2500);
    };

    return (
        <div className="dashboard-mood-logger-card">
            <div className="dashboard-mood-logger-header">
                <div className="dashboard-mood-logger-title-group">
                    <div className="dashboard-mood-logger-icon-badge">
                        <Plus size={20} color="#FFFFFF" />
                    </div>
                    <div>
                        <h3 className="dashboard-mood-logger-title">
                            Log Your Mood & Reflection
                        </h3>
                        <span className="dashboard-mood-logger-subhead">
                            Record how you are feeling right now directly into your daily wellness tracker
                        </span>
                    </div>
                </div>

                <div
                    className="dashboard-mood-logger-score-badge"
                    style={{
                        background: selectedMood.bg,
                        color: selectedMood.color,
                        border: `1px solid ${selectedMood.color}40`,
                    }}
                >
                    {React.createElement(selectedMood.Icon, { size: 14, color: selectedMood.color })}
                    <span>Score: {selectedMood.score.toFixed(1)} / 5.0</span>
                </div>
            </div>

            <form onSubmit={handleLogSubmit}>
                {/* 1. Date & Time Selection Row */}
                <div className="dashboard-mood-logger-date-row">
                    <div className="dashboard-mood-logger-field-col">
                        <CalendarIcon size={15} color="#475569" />
                        <label className="dashboard-mood-logger-field-label">Date:</label>
                        <input
                            type="date"
                            max={todayStr()}
                            value={logDate}
                            onChange={(e) => setLogDate(e.target.value)}
                            className="dashboard-mood-logger-input"
                        />
                    </div>

                    <div className="dashboard-mood-logger-field-col" style={{ minWidth: 220 }}>
                        <Clock size={15} color="#475569" />
                        <label className="dashboard-mood-logger-field-label">Time:</label>
                        <input
                            type="time"
                            value={logTime}
                            onChange={(e) => setLogTime(e.target.value)}
                            className="dashboard-mood-logger-input"
                        />
                    </div>

                    {/* Quick Time Pills */}
                    <div className="dashboard-mood-logger-quick-times">
                        {["09:00", "12:00", "15:00", "18:00", "Now"].map((t) => {
                            const active = t === "Now" ? false : logTime.startsWith(t.slice(0, 2));
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => handleQuickTime(t)}
                                    className={`dashboard-mood-logger-time-btn ${active ? "active" : "inactive"}`}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Info Banners */}
                {futureError && (
                    <div className="dashboard-mood-logger-error-banner">
                        ⚠️ Future dates or times cannot be logged. Please select a current or past time.
                    </div>
                )}

                {!futureError && isEditing && (
                    <div className="dashboard-mood-logger-info-banner">
                        ℹ️ Updating entry for {getHourSlotInfo(logDate, logTime).time.split(":")[0]}:00 - {getHourSlotInfo(logDate, logTime).time.split(":")[0]}:59 slot.
                    </div>
                )}

                {/* 2. Mood Options Grid */}
                <label className="dashboard-mood-logger-category-label">
                    SELECT MOOD CATEGORY
                </label>
                <div className="dashboard-mood-logger-grid">
                    {MOOD_OPTIONS.map((m) => {
                        const isSelected = selectedMood.key === m.key;
                        const Icon = m.Icon;
                        return (
                            <button
                                key={m.key}
                                type="button"
                                onClick={() => setSelectedMood(m)}
                                className="dashboard-mood-logger-mood-btn"
                                style={{
                                    border: isSelected ? `2px solid ${m.color}` : "1px solid rgba(255, 255, 255, 0.8)",
                                    background: isSelected ? m.bg : "rgba(255, 255, 255, 0.65)",
                                    boxShadow: isSelected ? `0 6px 18px ${m.color}30` : "0 2px 6px rgba(0,0,0,0.02)",
                                    transform: isSelected ? "translateY(-2px)" : "none",
                                }}
                            >
                                <div className="dashboard-mood-logger-icon-wrapper" style={{ background: m.bg }}>
                                    <Icon size={16} color={m.color} />
                                </div>
                                <span className="dashboard-mood-logger-mood-name" style={{ fontWeight: isSelected ? 800 : 600 }}>
                                    {m.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* 3. Reflection Note Input & Submit Button */}
                <div className="dashboard-mood-logger-note-row">
                    <input
                        type="text"
                        placeholder={`What's making you feel ${selectedMood.label.toLowerCase()} right now?`}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="dashboard-mood-logger-note-input"
                    />

                    <button
                        type="submit"
                        disabled={isFutureDateTime(logDate, logTime)}
                        className="dashboard-mood-logger-submit-btn"
                        style={{
                            background: isFutureDateTime(logDate, logTime)
                                ? "#94A3B8"
                                : logSuccess
                                    ? "#10B981"
                                    : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                            cursor: isFutureDateTime(logDate, logTime) ? "not-allowed" : "pointer",
                        }}
                    >
                        {logSuccess ? <CheckCircle2 size={16} /> : React.createElement(selectedMood.Icon, { size: 16 })}
                        {logSuccess ? "Mood Saved!" : isEditing ? "Update Mood Entry" : "Log Mood Entry"}
                    </button>
                </div>
            </form>
        </div>
    );
};
