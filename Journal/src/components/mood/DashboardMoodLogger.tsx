/**
 * Dashboard Mood Logger Component
 * Interactive widget allowing users to select current mood, add notes, pick time slots, and log mood ratings.
 */

import React, { useState } from "react";
import { Sparkles, Heart, Compass, Zap, Activity, Moon, CheckCircle2, Clock, Calendar as CalendarIcon, Plus } from "lucide-react";
import { MOOD_OPTIONS, getMoodOption, todayStr, type MoodOption } from "./moodTrackerData";
import { getHourSlotInfo } from "../../context/JournalContext";
import type { MoodLog } from "../../types/journal";

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
        <div
            style={{
                background: "rgba(255, 255, 255, 0.45)",
                backdropFilter: "blur(24px)",
                borderRadius: 26,
                border: "1px solid rgba(255, 255, 255, 0.65)",
                padding: "26px 30px",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
                marginBottom: 20,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)" }}>
                        <Plus size={20} color="#FFFFFF" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                            Log Your Mood & Reflection
                        </h3>
                        <span style={{ fontSize: 11.5, color: "#475569", fontWeight: 600 }}>
                            Record how you are feeling right now directly into your daily wellness tracker
                        </span>
                    </div>
                </div>

                <div style={{ background: selectedMood.bg, color: selectedMood.color, padding: "4px 14px", borderRadius: 999, fontSize: 12, fontWeight: 750, border: `1px solid ${selectedMood.color}40`, display: "flex", alignItems: "center", gap: 6 }}>
                    {React.createElement(selectedMood.Icon, { size: 14, color: selectedMood.color })}
                    <span>Score: {selectedMood.score.toFixed(1)} / 5.0</span>
                </div>
            </div>

            <form onSubmit={handleLogSubmit}>
                {/* 1. Date & Time Selection Row */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 18, background: "rgba(255, 255, 255, 0.5)", padding: "12px 18px", borderRadius: 16, border: "1px solid rgba(255, 255, 255, 0.7)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 200 }}>
                        <CalendarIcon size={15} color="#475569" />
                        <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em" }}>Date:</label>
                        <input
                            type="date"
                            max={todayStr()}
                            value={logDate}
                            onChange={(e) => setLogDate(e.target.value)}
                            style={{
                                border: "1px solid rgba(15, 23, 42, 0.15)",
                                background: "#FFFFFF",
                                color: "#0F172A",
                                padding: "6px 10px",
                                borderRadius: 8,
                                fontSize: 12.5,
                                fontWeight: 700,
                                outline: "none",
                            }}
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 220 }}>
                        <Clock size={15} color="#475569" />
                        <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em" }}>Time:</label>
                        <input
                            type="time"
                            value={logTime}
                            onChange={(e) => setLogTime(e.target.value)}
                            style={{
                                border: "1px solid rgba(15, 23, 42, 0.15)",
                                background: "#FFFFFF",
                                color: "#0F172A",
                                padding: "6px 10px",
                                borderRadius: 8,
                                fontSize: 12.5,
                                fontWeight: 700,
                                outline: "none",
                            }}
                        />
                    </div>

                    {/* Quick Time Pills */}
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        {["09:00", "12:00", "15:00", "18:00", "Now"].map((t) => {
                            const active = t === "Now" ? false : logTime.startsWith(t.slice(0, 2));
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => handleQuickTime(t)}
                                    style={{
                                        border: active ? "1.5px solid #3B82F6" : "1px solid rgba(15, 23, 42, 0.12)",
                                        background: active ? "#EFF6FF" : "#FFFFFF",
                                        color: active ? "#2563EB" : "#475569",
                                        fontSize: 10.5,
                                        fontWeight: 700,
                                        padding: "4px 8px",
                                        borderRadius: 6,
                                        cursor: "pointer",
                                    }}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Info Banners */}
                {futureError && (
                    <div style={{ fontSize: 12, fontWeight: 650, color: "#DC2626", background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "8px 14px", borderRadius: 10, marginBottom: 16 }}>
                        ⚠️ Future dates or times cannot be logged. Please select a current or past time.
                    </div>
                )}

                {!futureError && isEditing && (
                    <div style={{ fontSize: 11.5, fontWeight: 650, color: "#2563EB", background: "rgba(37, 99, 235, 0.1)", border: "1px solid rgba(37, 99, 235, 0.25)", padding: "8px 14px", borderRadius: 10, marginBottom: 16 }}>
                        ℹ️ Updating entry for {getHourSlotInfo(logDate, logTime).time.split(":")[0]}:00 - {getHourSlotInfo(logDate, logTime).time.split(":")[0]}:59 slot.
                    </div>
                )}

                {/* 2. Mood Options Grid */}
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: "0.04em", marginBottom: 8, textTransform: "uppercase" }}>
                    SELECT MOOD CATEGORY
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 18 }}>
                    {MOOD_OPTIONS.map((m) => {
                        const isSelected = selectedMood.key === m.key;
                        const Icon = m.Icon;
                        return (
                            <button
                                key={m.key}
                                type="button"
                                onClick={() => setSelectedMood(m)}
                                style={{
                                    border: isSelected ? `2px solid ${m.color}` : "1px solid rgba(255, 255, 255, 0.8)",
                                    background: isSelected ? m.bg : "rgba(255, 255, 255, 0.65)",
                                    color: "#0F172A",
                                    borderRadius: 16,
                                    padding: "14px 10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 6,
                                    cursor: "pointer",
                                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                    boxShadow: isSelected ? `0 6px 18px ${m.color}30` : "0 2px 6px rgba(0,0,0,0.02)",
                                    transform: isSelected ? "translateY(-2px)" : "none",
                                }}
                            >
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon size={16} color={m.color} />
                                </div>
                                <span style={{ fontSize: 12.5, fontWeight: isSelected ? 800 : 600 }}>
                                    {m.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* 3. Reflection Note Input & Submit Button */}
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <input
                        type="text"
                        placeholder={`What's making you feel ${selectedMood.label.toLowerCase()} right now?`}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        style={{
                            flex: 1,
                            minWidth: 260,
                            padding: "12px 16px",
                            borderRadius: 14,
                            border: "1px solid rgba(15, 23, 42, 0.18)",
                            background: "#FFFFFF",
                            fontSize: 13,
                            color: "#0F172A",
                            outline: "none",
                            fontWeight: 500,
                        }}
                    />

                    <button
                        type="submit"
                        disabled={isFutureDateTime(logDate, logTime)}
                        style={{
                            background: isFutureDateTime(logDate, logTime)
                                ? "#94A3B8"
                                : logSuccess
                                    ? "#10B981"
                                    : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                            color: "#FFFFFF",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: 14,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: isFutureDateTime(logDate, logTime) ? "not-allowed" : "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            boxShadow: "0 6px 18px rgba(37, 99, 235, 0.35)",
                            transition: "all 0.2s ease",
                            whiteSpace: "nowrap",
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
