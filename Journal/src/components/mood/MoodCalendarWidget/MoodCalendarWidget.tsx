/**
 * Mood Calendar Grid Widget Component
 * Displays a full monthly grid showing logged mood entries, color indicators, and date details.
 */
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Edit2, Trash2 } from "lucide-react";
import { MOOD_OPTIONS, MONTH_NAMES, dateKey, getMoodOption } from "../data/moodTrackerData";
import type { MoodLog } from "../../../types/journal";
import "./MoodCalendarWidget.css";

interface MoodCalendarWidgetProps {
    calMonth: number;
    calYear: number;
    prevMonth: () => void;
    nextMonth: () => void;
    calCells: (number | null)[];
    logs: Record<string, MoodLog>;
    todayKey: string;
    openModal: (dateStr: string, timeStr?: string) => void;
    moodCounts: Record<string, number>;
    deleteModalLog?: (hourSlot: string) => void;
}

export const MoodCalendarWidget: React.FC<MoodCalendarWidgetProps> = ({
    calMonth,
    calYear,
    prevMonth,
    nextMonth,
    calCells,
    logs,
    todayKey,
    openModal,
    moodCounts,
    deleteModalLog,
}) => {
    // State for day drawer when multiple logs exist on a single day
    const [selectedDayDrawer, setSelectedDayDrawer] = useState<string | null>(null);

    const handleCellClick = (key: string, dayLogs: MoodLog[], isFuture: boolean) => {
        if (isFuture) return;
        if (dayLogs.length > 1) {
            setSelectedDayDrawer(key);
        } else if (dayLogs.length === 1) {
            openModal(key, dayLogs[0].time);
        } else {
            openModal(key);
        }
    };

    const dayDrawerLogs = selectedDayDrawer
        ? Object.values(logs).filter((l) => l.day === selectedDayDrawer).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
        : [];

    return (
        <div className="mood-calendar-container">
            <div className="mood-calendar-header">
                <div className="mood-calendar-title-group">
                    <div className="mood-calendar-icon-box">
                        <CalendarIcon size={18} color="#0F172A" />
                    </div>
                    <div>
                        <h3 className="mood-calendar-title">{MONTH_NAMES[calMonth]} {calYear}</h3>
                        <span className="mood-calendar-subhead">Multiple moods per day supported. Click any date to view or add hourly entries.</span>
                    </div>
                </div>
                <div className="mood-calendar-nav-buttons">
                    <button onClick={prevMonth} className="mood-calendar-nav-btn"><ChevronLeft size={18} /></button>
                    <button onClick={nextMonth} className="mood-calendar-nav-btn"><ChevronRight size={18} /></button>
                </div>
            </div>

            {/* Days Header */}
            <div className="mood-calendar-days-header">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                    <span key={i} className="mood-calendar-day-label">{d}</span>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="mood-calendar-grid">
                {calCells.map((day, idx) => {
                    if (!day) return <div key={idx} className="mood-calendar-empty-cell" />;
                    const key = dateKey(calYear, calMonth, day);
                    const dayLogs = Object.values(logs).filter(l => l.day === key).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
                    const isToday = key === todayKey;
                    const isFuture = key > todayKey;
                    const hasMultiple = dayLogs.length > 1;
                    const singleLog = dayLogs.length === 1 ? dayLogs[0] : null;
                    const singleMood = singleLog ? getMoodOption(singleLog.moodKey) : null;
                    const SingleIcon = singleMood?.Icon;

                    return (
                        <button
                            key={idx}
                            onClick={() => handleCellClick(key, dayLogs, isFuture)}
                            title={isFuture ? `Future date (${key}) - logging disabled` : `${key} (${dayLogs.length} logs)`}
                            className="mood-calendar-cell"
                            style={{
                                border: isToday ? "2px solid #0F172A" : "1px solid rgba(255, 255, 255, 0.7)",
                                background: isToday
                                    ? "#0F172A"
                                    : singleMood
                                        ? `${singleMood.color}25`
                                        : hasMultiple
                                            ? "rgba(59, 130, 246, 0.18)"
                                            : isFuture
                                                ? "rgba(226, 232, 240, 0.4)"
                                                : "rgba(255, 255, 255, 0.5)",
                                color: isToday ? "#FFFFFF" : isFuture ? "#94A3B8" : "#0F172A",
                                cursor: isFuture ? "not-allowed" : "pointer",
                                opacity: isFuture ? 0.4 : 1,
                                boxShadow: isToday ? "0 4px 12px rgba(15, 23, 42, 0.25)" : "0 2px 6px rgba(15, 23, 42, 0.03)",
                            }}
                            onMouseEnter={(e) => { if (!isFuture) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                        >
                            <span className="mood-calendar-day-num">{day}</span>

                            {/* Single Log View */}
                            {singleMood && SingleIcon && (
                                <>
                                    <SingleIcon size={14} color={isToday ? "#FFFFFF" : singleMood.color} />
                                    {singleLog?.time && (
                                        <span className="mood-calendar-single-time" style={{ color: isToday ? "rgba(255,255,255,0.8)" : "#64748B" }}>
                                            {singleLog.time}
                                        </span>
                                    )}
                                </>
                            )}

                            {/* Multiple Logs View */}
                            {hasMultiple && (
                                <div className="mood-calendar-multi-wrapper">
                                    <div className="mood-calendar-multi-icons">
                                        {dayLogs.slice(0, 3).map((l) => {
                                            const m = getMoodOption(l.moodKey);
                                            const MIcon = m.Icon;
                                            return <MIcon key={l.id} size={12} color={isToday ? "#FFFFFF" : m.color} />;
                                        })}
                                    </div>
                                    <span
                                        className="mood-calendar-multi-badge"
                                        style={{
                                            background: isToday ? "rgba(255,255,255,0.25)" : "#3B82F6",
                                        }}
                                    >
                                        {dayLogs.length} Moods
                                    </span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Multiple Logs Drawer Modal Overlay */}
            {selectedDayDrawer && (
                <div
                    onClick={() => setSelectedDayDrawer(null)}
                    className="mood-drawer-overlay"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="mood-drawer-card"
                    >
                        <div className="mood-drawer-header">
                            <div>
                                <h3 className="mood-drawer-title">
                                    Logs for {new Date(selectedDayDrawer + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </h3>
                                <span className="mood-drawer-subhead">{dayDrawerLogs.length} distinct hourly entries</span>
                            </div>
                            <button
                                onClick={() => setSelectedDayDrawer(null)}
                                className="mood-drawer-close-btn"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="mood-drawer-list">
                            {dayDrawerLogs.map((l) => {
                                const m = getMoodOption(l.moodKey);
                                const MIcon = m.Icon;
                                return (
                                    <div
                                        key={l.id}
                                        className="mood-drawer-item"
                                        style={{
                                            border: `1px solid ${m.color}35`,
                                        }}
                                    >
                                        <div className="mood-drawer-item-left">
                                            <div className="mood-drawer-item-icon" style={{ background: m.bg }}>
                                                <MIcon size={16} color={m.color} />
                                            </div>
                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span className="mood-drawer-item-label" style={{ color: m.color }}>{m.label}</span>
                                                    <span className="mood-drawer-item-time">
                                                        {l.time}
                                                    </span>
                                                </div>
                                                <span className="mood-drawer-item-note">"{l.note}"</span>
                                            </div>
                                        </div>

                                        <div className="mood-drawer-item-actions">
                                            <button
                                                onClick={() => {
                                                    setSelectedDayDrawer(null);
                                                    openModal(l.day, l.time);
                                                }}
                                                className="mood-drawer-edit-btn"
                                            >
                                                <Edit2 size={11} /> Edit
                                            </button>
                                            {deleteModalLog && (
                                                <button
                                                    onClick={() => deleteModalLog(l.hourSlot)}
                                                    className="mood-drawer-delete-btn"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => {
                                const dayStr = selectedDayDrawer;
                                setSelectedDayDrawer(null);
                                openModal(dayStr);
                            }}
                            className="mood-drawer-add-btn"
                        >
                            <Plus size={16} /> Log Entry for Another Hour
                        </button>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="mood-calendar-legend">
                {MOOD_OPTIONS.map((m) => (
                    <div key={m.key} className="mood-calendar-legend-item">
                        <div className="mood-calendar-legend-dot" style={{ background: m.color }} />
                        <span className="mood-calendar-legend-text">{m.label} ({moodCounts[m.key] || 0})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
