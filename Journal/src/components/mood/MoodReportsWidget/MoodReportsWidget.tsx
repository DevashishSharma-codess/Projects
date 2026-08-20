/**
 * Mood Analytics & Reports Widget Component
 * Visualizes mood score trends over time using Recharts interactive charts.
 */

import React from "react";
import { TrendingUp, Heart, Flame, Sun, Sparkles, Award, BarChart2, Calendar, Clock, Smile } from "lucide-react";
import { MOOD_OPTIONS, getMoodOption, type MoodOption } from "../data/moodTrackerData";
import type { MoodLog } from "../../../types/journal";
import "./MoodReportsWidget.css";

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
        <div className="mood-reports-container">
            {/* Header */}
            <div className="mood-reports-header">
                <div className="mood-reports-title-group">
                    <div className="mood-reports-icon-box">
                        <TrendingUp size={20} color="#FFFFFF" />
                    </div>
                    <div>
                        <h3 className="mood-reports-title">
                            Wellness & Most Logged Moods Report
                        </h3>
                        <span className="mood-reports-subhead">
                            Analytical summary of your dominant emotions, logging frequency, and emotional index
                        </span>
                    </div>
                </div>

                <div className="mood-reports-total-badge">
                    Total Logs: {totalLogs}
                </div>
            </div>

            {/* 1. MOST LOGGED MOOD HIGHLIGHT HERO CARD */}
            <div
                className="mood-reports-hero-card"
                style={{
                    background: `linear-gradient(135deg, ${dominantMood.lightBg} 0%, #FFFFFF 100%)`,
                    border: `1.5px solid ${dominantMood.color}40`,
                    boxShadow: `0 10px 30px ${dominantMood.color}15`,
                }}
            >
                <div className="mood-reports-hero-left">
                    <div
                        className="mood-reports-hero-icon-box"
                        style={{
                            background: dominantMood.gradient,
                            boxShadow: `0 8px 24px ${dominantMood.color}40`,
                        }}
                    >
                        {React.createElement(dominantMood.Icon, { size: 32, color: "#FFFFFF" })}
                    </div>
                    <div>
                        <div className="mood-reports-hero-tag-row">
                            <span className="mood-reports-hero-tag" style={{ background: dominantMood.color }}>
                                #1 MOST LOGGED MOOD
                            </span>
                            <span className="mood-reports-hero-score">
                                Score: {dominantMood.score.toFixed(1)} / 5.0
                            </span>
                        </div>
                        <h2 className="mood-reports-hero-title">
                            {dominantMood.label}
                        </h2>
                        <p className="mood-reports-hero-desc">
                            You have logged <strong>{dominantMood.label}</strong> {moodCounts[dominantMoodKey] || 0} times, accounting for <strong>{totalLogs ? Math.round(((moodCounts[dominantMoodKey] || 0) / totalLogs) * 100) : 0}%</strong> of all your mood entries.
                        </p>
                    </div>
                </div>

                <div className="mood-reports-hero-stats">
                    <div className="mood-reports-hero-stat-box">
                        <span className="mood-reports-stat-label">FREQUENCY</span>
                        <span className="mood-reports-stat-val-bold" style={{ color: dominantMood.color }}>{moodCounts[dominantMoodKey] || 0}</span>
                    </div>
                    <div className="mood-reports-hero-stat-box">
                        <span className="mood-reports-stat-label">SHARE</span>
                        <span className="mood-reports-stat-val-bold" style={{ color: "#0F172A" }}>{totalLogs ? Math.round(((moodCounts[dominantMoodKey] || 0) / totalLogs) * 100) : 0}%</span>
                    </div>
                </div>
            </div>

            {/* 2. TOP MOODS RANKING & DISTRIBUTION */}
            <h4 className="mood-reports-section-title">
                MOST FREQUENT MOOD RANKING
            </h4>
            <div className="mood-reports-ranking-grid">
                {sortedMoods.map((m, idx) => {
                    const count = moodCounts[m.key] || 0;
                    const pct = totalLogs ? Math.round((count / totalLogs) * 100) : 0;
                    const Icon = m.Icon;
                    return (
                        <div
                            key={m.key}
                            className="mood-reports-ranking-card"
                            style={{
                                border: `1px solid ${m.color}30`,
                            }}
                        >
                            <div className="mood-reports-ranking-top">
                                <div className="mood-reports-ranking-icon-box" style={{ background: m.bg }}>
                                    <Icon size={16} color={m.color} />
                                </div>
                                <span className="mood-reports-ranking-badge" style={{ color: idx === 0 ? "#F59E0B" : "#64748B" }}>
                                    #{idx + 1}
                                </span>
                            </div>

                            <span className="mood-reports-ranking-label">{m.label}</span>
                            <div className="mood-reports-ranking-count-row">
                                <span className="mood-reports-ranking-count" style={{ color: m.color }}>{count}</span>
                                <span className="mood-reports-ranking-pct">entries ({pct}%)</span>
                            </div>

                            {/* Progress bar */}
                            <div className="mood-reports-progress-bg">
                                <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: m.color, transition: "width 0.4s ease" }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 3. KEY METRICS GRID */}
            <div className="mood-reports-metrics-grid">
                {/* Wellbeing Score */}
                <div className="mood-reports-metric-card" style={{ border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                    <div className="mood-reports-metric-row">
                        <div className="mood-reports-metric-icon-box" style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                            <Heart size={18} color="#10B981" />
                        </div>
                        <div>
                            <span className="mood-reports-metric-title">WELLBEING INDEX</span>
                            <span className="mood-reports-metric-val" style={{ color: "#10B981" }}>{avgScore} / 5.0</span>
                        </div>
                    </div>
                    <p className="mood-reports-metric-desc">
                        {Number(avgScore) >= 3.8 ? "Positive emotional state across all entries!" : "Room to boost restorative activities."}
                    </p>
                </div>

                {/* Positivity Rate */}
                <div className="mood-reports-metric-card" style={{ border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                    <div className="mood-reports-metric-row">
                        <div className="mood-reports-metric-icon-box" style={{ background: "rgba(59, 130, 246, 0.15)" }}>
                            <Sun size={18} color="#2563EB" />
                        </div>
                        <div>
                            <span className="mood-reports-metric-title">POSITIVITY RATE</span>
                            <span className="mood-reports-metric-val" style={{ color: "#2563EB" }}>{positivityRate}%</span>
                        </div>
                    </div>
                    <p className="mood-reports-metric-desc">
                        {positiveCount} of {totalLogs} logs scored 3.5 or higher.
                    </p>
                </div>

                {/* Logging Streak */}
                <div className="mood-reports-metric-card" style={{ border: "1px solid rgba(245, 158, 11, 0.3)" }}>
                    <div className="mood-reports-metric-row">
                        <div className="mood-reports-metric-icon-box" style={{ background: "rgba(245, 158, 11, 0.15)" }}>
                            <Flame size={18} color="#D97706" />
                        </div>
                        <div>
                            <span className="mood-reports-metric-title">LOGGING STREAK</span>
                            <span className="mood-reports-metric-val" style={{ color: "#D97706" }}>{streak} Days</span>
                        </div>
                    </div>
                    <p className="mood-reports-metric-desc">
                        Consecutive days with mood reflections.
                    </p>
                </div>

                {/* Peak Logging Time */}
                <div className="mood-reports-metric-card" style={{ border: "1px solid rgba(168, 85, 247, 0.3)" }}>
                    <div className="mood-reports-metric-row">
                        <div className="mood-reports-metric-icon-box" style={{ background: "rgba(168, 85, 247, 0.15)" }}>
                            <Clock size={18} color="#A855F7" />
                        </div>
                        <div>
                            <span className="mood-reports-metric-title">PEAK LOGGING TIME</span>
                            <span className="mood-reports-metric-val" style={{ color: "#A855F7", fontSize: 15 }}>{peakTimeOfDay.toUpperCase()}</span>
                        </div>
                    </div>
                    <p className="mood-reports-metric-desc">
                        {peakTimeLabel}
                    </p>
                </div>
            </div>

            {/* 4. OVERALL MOOD DISTRIBUTION BAR */}
            <div className="mood-reports-spectrum-card">
                <h4 className="mood-reports-section-title" style={{ margin: "0 0 12px 0" }}>
                    TOTAL EMOTIONAL SPECTRUM BREAKDOWN
                </h4>
                <div className="mood-reports-spectrum-bar-bg">
                    {MOOD_OPTIONS.map((m) => {
                        const pct = totalLogs ? ((moodCounts[m.key] || 0) / totalLogs) * 100 : 0;
                        return pct > 0 ? <div key={m.key} style={{ width: `${pct}%`, height: "100%", background: m.color, transition: "width 0.4s ease" }} /> : null;
                    })}
                </div>
                <div className="mood-reports-spectrum-legend">
                    {MOOD_OPTIONS.map((m) => {
                        const count = moodCounts[m.key] || 0;
                        const pct = totalLogs ? Math.round((count / totalLogs) * 100) : 0;
                        return (
                            <div key={m.key} className="mood-reports-spectrum-item">
                                <div className="mood-reports-spectrum-dot" style={{ background: m.color }} />
                                <span className="mood-reports-spectrum-text">
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
