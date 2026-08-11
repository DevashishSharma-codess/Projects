import React from "react";
import { TrendingUp, Heart, Flame, Sun, Sparkles, Award, BarChart2, Calendar, Clock, Smile } from "lucide-react";
import { MOOD_OPTIONS, getMoodOption, type MoodOption } from "./moodTrackerData";
import type { MoodLog } from "../../types/journal";

interface MoodReportsWidgetProps {
    logs: Record<string, MoodLog>;
    logsArray: MoodLog[];
    totalLogs: number;
    avgScore: string;
    positivityRate: number;
    streak: number;
    dominantMood: MoodOption;
    dominantMoodKey: string;
    moodCounts: Record<string, number>;
    positiveCount: number;
}

export const MoodReportsWidget: React.FC<MoodReportsWidgetProps> = ({
    logsArray,
    totalLogs,
    avgScore,
    positivityRate,
    streak,
    dominantMood,
    dominantMoodKey,
    moodCounts,
    positiveCount,
}) => {
    // Sort moods by frequency for ranking
    const sortedMoods = [...MOOD_OPTIONS].sort(
        (a, b) => (moodCounts[b.key] || 0) - (moodCounts[a.key] || 0)
    );

    // Time-of-day distribution
    const timeOfDayCounts = logsArray.reduce(
        (acc, l) => {
            const hour = parseInt((l.time || "12:00").split(":")[0], 10);
            if (hour >= 5 && hour < 12) acc.morning++;
            else if (hour >= 12 && hour < 17) acc.afternoon++;
            else if (hour >= 17 && hour < 22) acc.evening++;
            else acc.night++;
            return acc;
        },
        { morning: 0, afternoon: 0, evening: 0, night: 0 }
    );

    const peakTimeOfDay = Object.entries(timeOfDayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "morning";
    const peakTimeLabel = peakTimeOfDay === "morning" ? "Morning (5 AM - 12 PM)" : peakTimeOfDay === "afternoon" ? "Afternoon (12 PM - 5 PM)" : peakTimeOfDay === "evening" ? "Evening (5 PM - 10 PM)" : "Night (10 PM - 5 AM)";

    return (
        <div
            style={{
                background: "rgba(255, 255, 255, 0.45)",
                backdropFilter: "blur(24px)",
                borderRadius: 28,
                border: "1px solid rgba(255, 255, 255, 0.65)",
                padding: "30px 34px",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)" }}>
                        <TrendingUp size={20} color="#FFFFFF" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                            Wellness & Most Logged Moods Report
                        </h3>
                        <span style={{ fontSize: 11.5, color: "#475569", fontWeight: 600 }}>
                            Analytical summary of your dominant emotions, logging frequency, and emotional index
                        </span>
                    </div>
                </div>

                <div style={{ background: "rgba(255, 255, 255, 0.7)", border: "1px solid rgba(255, 255, 255, 0.8)", padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700, color: "#0F172A" }}>
                    Total Logs: {totalLogs}
                </div>
            </div>

            {/* 1. MOST LOGGED MOOD HIGHLIGHT HERO CARD */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${dominantMood.lightBg} 0%, #FFFFFF 100%)`,
                    borderRadius: 24,
                    border: `1.5px solid ${dominantMood.color}40`,
                    padding: "24px 28px",
                    boxShadow: `0 10px 30px ${dominantMood.color}15`,
                    marginBottom: 24,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 20,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 260, flex: 1 }}>
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: 20,
                            background: dominantMood.gradient,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 8px 24px ${dominantMood.color}40`,
                            flexShrink: 0,
                        }}
                    >
                        {React.createElement(dominantMood.Icon, { size: 32, color: "#FFFFFF" })}
                    </div>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ background: dominantMood.color, color: "#FFFFFF", fontSize: 10.5, fontWeight: 800, padding: "2px 8px", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                #1 MOST LOGGED MOOD
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>
                                Score: {dominantMood.score.toFixed(1)} / 5.0
                            </span>
                        </div>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 900, color: "#0F172A", margin: "0 0 4px 0" }}>
                            {dominantMood.label}
                        </h2>
                        <p style={{ fontSize: 13, color: "#334155", fontWeight: 500, margin: 0, lineHeight: 1.4 }}>
                            You have logged <strong>{dominantMood.label}</strong> {moodCounts[dominantMoodKey] || 0} times, accounting for <strong>{totalLogs ? Math.round(((moodCounts[dominantMoodKey] || 0) / totalLogs) * 100) : 0}%</strong> of all your mood entries.
                        </p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ background: "rgba(255,255,255,0.8)", padding: "12px 18px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.9)", textAlign: "center", minWidth: 100 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B", display: "block", textTransform: "uppercase" }}>FREQUENCY</span>
                        <span style={{ fontSize: 22, fontWeight: 800, color: dominantMood.color }}>{moodCounts[dominantMoodKey] || 0}</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.8)", padding: "12px 18px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.9)", textAlign: "center", minWidth: 100 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B", display: "block", textTransform: "uppercase" }}>SHARE</span>
                        <span style={{ fontSize: 22, fontWeight: 800, color: "#0F172A" }}>{totalLogs ? Math.round(((moodCounts[dominantMoodKey] || 0) / totalLogs) * 100) : 0}%</span>
                    </div>
                </div>
            </div>

            {/* 2. TOP MOODS RANKING & DISTRIBUTION */}
            <h4 style={{ fontSize: 13, fontWeight: 800, color: "#475569", margin: "0 0 14px 0", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                MOST FREQUENT MOOD RANKING
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 24 }}>
                {sortedMoods.map((m, idx) => {
                    const count = moodCounts[m.key] || 0;
                    const pct = totalLogs ? Math.round((count / totalLogs) * 100) : 0;
                    const Icon = m.Icon;
                    return (
                        <div
                            key={m.key}
                            style={{
                                background: "rgba(255, 255, 255, 0.75)",
                                borderRadius: 18,
                                padding: "16px",
                                border: `1px solid ${m.color}30`,
                                boxShadow: "0 4px 14px rgba(15,23,42,0.03)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 10, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Icon size={16} color={m.color} />
                                </div>
                                <span style={{ fontSize: 10.5, fontWeight: 800, color: idx === 0 ? "#F59E0B" : "#64748B", background: "rgba(15,23,42,0.06)", padding: "2px 7px", borderRadius: 999 }}>
                                    #{idx + 1}
                                </span>
                            </div>

                            <span style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", display: "block" }}>{m.label}</span>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "4px 0 8px 0" }}>
                                <span style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{count}</span>
                                <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>entries ({pct}%)</span>
                            </div>

                            {/* Progress bar */}
                            <div style={{ width: "100%", height: 5, borderRadius: 999, background: "rgba(15,23,42,0.08)", overflow: "hidden" }}>
                                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: m.color, transition: "width 0.4s ease" }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. KEY METRICS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
                {/* Wellbeing Score */}
                <div style={{ background: "rgba(255, 255, 255, 0.75)", borderRadius: 18, padding: "18px 20px", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Heart size={18} color="#10B981" />
                        </div>
                        <div>
                            <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>WELLBEING INDEX</span>
                            <span style={{ fontSize: 18, fontWeight: 800, color: "#10B981", display: "block" }}>{avgScore} / 5.0</span>
                        </div>
                    </div>
                    <p style={{ fontSize: 11.5, color: "#475569", margin: 0, fontWeight: 500 }}>
                        {Number(avgScore) >= 3.8 ? "Positive emotional state across all entries!" : "Room to boost restorative activities."}
                    </p>
                </div>

                {/* Positivity Rate */}
                <div style={{ background: "rgba(255, 255, 255, 0.75)", borderRadius: 18, padding: "18px 20px", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(59, 130, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Sun size={18} color="#2563EB" />
                        </div>
                        <div>
                            <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>POSITIVITY RATE</span>
                            <span style={{ fontSize: 18, fontWeight: 800, color: "#2563EB", display: "block" }}>{positivityRate}%</span>
                        </div>
                    </div>
                    <p style={{ fontSize: 11.5, color: "#475569", margin: 0, fontWeight: 500 }}>
                        {positiveCount} of {totalLogs} logs scored 3.5 or higher.
                    </p>
                </div>

                {/* Logging Streak */}
                <div style={{ background: "rgba(255, 255, 255, 0.75)", borderRadius: 18, padding: "18px 20px", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Flame size={18} color="#D97706" />
                        </div>
                        <div>
                            <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>LOGGING STREAK</span>
                            <span style={{ fontSize: 18, fontWeight: 800, color: "#D97706", display: "block" }}>{streak} Days</span>
                        </div>
                    </div>
                    <p style={{ fontSize: 11.5, color: "#475569", margin: 0, fontWeight: 500 }}>
                        Consecutive days with mood reflections.
                    </p>
                </div>

                {/* Peak Logging Time */}
                <div style={{ background: "rgba(255, 255, 255, 0.75)", borderRadius: 18, padding: "18px 20px", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(168, 85, 247, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Clock size={18} color="#A855F7" />
                        </div>
                        <div>
                            <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>PEAK LOGGING TIME</span>
                            <span style={{ fontSize: 15, fontWeight: 800, color: "#A855F7", display: "block" }}>{peakTimeOfDay.toUpperCase()}</span>
                        </div>
                    </div>
                    <p style={{ fontSize: 11.5, color: "#475569", margin: 0, fontWeight: 500 }}>
                        {peakTimeLabel}
                    </p>
                </div>
            </div>

            {/* 4. OVERALL MOOD DISTRIBUTION BAR */}
            <div style={{ background: "rgba(255, 255, 255, 0.75)", borderRadius: 20, padding: "20px 24px", border: "1px solid rgba(255, 255, 255, 0.9)" }}>
                <h4 style={{ fontSize: 12.5, fontWeight: 800, color: "#475569", margin: "0 0 12px 0", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    TOTAL EMOTIONAL SPECTRUM BREAKDOWN
                </h4>
                <div style={{ display: "flex", width: "100%", height: 12, borderRadius: 999, overflow: "hidden", background: "rgba(15,23,42,0.08)", marginBottom: 14 }}>
                    {MOOD_OPTIONS.map((m) => {
                        const pct = totalLogs ? ((moodCounts[m.key] || 0) / totalLogs) * 100 : 0;
                        return pct > 0 ? <div key={m.key} style={{ width: `${pct}%`, height: "100%", background: m.color, transition: "width 0.4s ease" }} /> : null;
                    })}
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {MOOD_OPTIONS.map((m) => {
                        const count = moodCounts[m.key] || 0;
                        const pct = totalLogs ? Math.round((count / totalLogs) * 100) : 0;
                        return (
                            <div key={m.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 3, background: m.color }} />
                                <span style={{ fontSize: 12, color: "#334155", fontWeight: 700 }}>
                                    {m.label}: <strong>{count}</strong> ({pct}%)
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
