/**
 * Mood Calendar Grid Widget Component
 * Displays a full monthly grid showing logged mood entries, color indicators, and date details.
 */
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Edit2, Trash2 } from "lucide-react";
import { MOOD_OPTIONS, MONTH_NAMES, dateKey, getMoodOption } from "./moodTrackerData";
import type { MoodLog } from "../../types/journal";

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
        <div style={{ position: "relative", background: "rgba(255, 255, 255, 0.35)", backdropFilter: "blur(24px)", borderRadius: 26, border: "1px solid rgba(255, 255, 255, 0.55)", padding: "28px", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 12, background: "rgba(15, 23, 42, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CalendarIcon size={18} color="#0F172A" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>{MONTH_NAMES[calMonth]} {calYear}</h3>
                        <span style={{ fontSize: 11.5, color: "#475569", fontWeight: 600 }}>Multiple moods per day supported. Click any date to view or add hourly entries.</span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={prevMonth} style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255, 255, 255, 0.6)", border: "1px solid rgba(255, 255, 255, 0.7)", color: "#0F172A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}><ChevronLeft size={18} /></button>
                    <button onClick={nextMonth} style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255, 255, 255, 0.6)", border: "1px solid rgba(255, 255, 255, 0.7)", color: "#0F172A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s ease" }}><ChevronRight size={18} /></button>
                </div>
            </div>

            {/* Days Header */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center", marginBottom: 12 }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
                    <span key={i} style={{ fontSize: 12, fontWeight: 700, color: "#475569", padding: "8px 0" }}>{d}</span>
                ))}
            </div>

            {/* Calendar Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                {calCells.map((day, idx) => {
                    if (!day) return <div key={idx} style={{ height: 72 }} />;
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
                            style={{
                                height: 72,
                                borderRadius: 14,
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
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 3,
                                padding: "4px",
                                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                boxShadow: isToday ? "0 4px 12px rgba(15, 23, 42, 0.25)" : "0 2px 6px rgba(15, 23, 42, 0.03)",
                            }}
                            onMouseEnter={(e) => { if (!isFuture) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                        >
                            <span style={{ fontSize: 13, fontWeight: 800 }}>{day}</span>

                            {/* Single Log View */}
                            {singleMood && SingleIcon && (
                                <>
                                    <SingleIcon size={14} color={isToday ? "#FFFFFF" : singleMood.color} />
                                    {singleLog?.time && (
                                        <span style={{ fontSize: 9.5, color: isToday ? "rgba(255,255,255,0.8)" : "#64748B", fontWeight: 600 }}>
                                            {singleLog.time}
                                        </span>
                                    )}
                                </>
                            )}

                            {/* Multiple Logs View */}
                            {hasMultiple && (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                                        {dayLogs.slice(0, 3).map((l) => {
                                            const m = getMoodOption(l.moodKey);
                                            const MIcon = m.Icon;
                                            return <MIcon key={l.id} size={12} color={isToday ? "#FFFFFF" : m.color} />;
                                        })}
                                    </div>
                                    <span
                                        style={{
                                            fontSize: 9,
                                            fontWeight: 800,
                                            background: isToday ? "rgba(255,255,255,0.25)" : "#3B82F6",
                                            color: "#FFFFFF",
                                            padding: "1px 6px",
                                            borderRadius: 999,
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
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(15, 23, 42, 0.5)",
                        backdropFilter: "blur(12px)",
                        zIndex: 99999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 20,
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "rgba(255, 255, 255, 0.95)",
                            borderRadius: 24,
                            maxWidth: 480,
                            width: "100%",
                            padding: "24px 28px",
                            boxShadow: "0 30px 80px rgba(15, 23, 42, 0.3)",
                            border: "1px solid rgba(255, 255, 255, 0.9)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, borderBottom: "1px solid rgba(15, 23, 42, 0.1)", paddingBottom: 12 }}>
                            <div>
                                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                                    Logs for {new Date(selectedDayDrawer + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </h3>
                                <span style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>{dayDrawerLogs.length} distinct hourly entries</span>
                            </div>
                            <button
                                onClick={() => setSelectedDayDrawer(null)}
                                style={{ width: 30, height: 30, borderRadius: "50%", border: "none", background: "rgba(15, 23, 42, 0.08)", color: "#0F172A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto", marginBottom: 18 }}>
                            {dayDrawerLogs.map((l) => {
                                const m = getMoodOption(l.moodKey);
                                const MIcon = m.Icon;
                                return (
                                    <div
                                        key={l.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "10px 14px",
                                            borderRadius: 14,
                                            background: "rgba(255, 255, 255, 0.8)",
                                            border: `1px solid ${m.color}35`,
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 10, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <MIcon size={16} color={m.color} />
                                            </div>
                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span style={{ fontSize: 13, fontWeight: 800, color: m.color }}>{m.label}</span>
                                                    <span style={{ fontSize: 11, fontWeight: 700, color: "#475569", background: "rgba(15,23,42,0.06)", padding: "2px 6px", borderRadius: 4 }}>
                                                        {l.time}
                                                    </span>
                                                </div>
                                                <span style={{ fontSize: 11.5, color: "#334155", fontWeight: 500 }}>"{l.note}"</span>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <button
                                                onClick={() => {
                                                    setSelectedDayDrawer(null);
                                                    openModal(l.day, l.time);
                                                }}
                                                style={{ border: "none", background: "#3B82F6", color: "#FFFFFF", padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
                                            >
                                                <Edit2 size={11} /> Edit
                                            </button>
                                            {deleteModalLog && (
                                                <button
                                                    onClick={() => deleteModalLog(l.hourSlot)}
                                                    style={{ border: "none", background: "#FEE2E2", color: "#DC2626", width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
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
                            style={{
                                width: "100%",
                                border: "none",
                                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                                color: "#FFFFFF",
                                padding: "12px",
                                borderRadius: 14,
                                fontWeight: 700,
                                fontSize: 13,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 6,
                                boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
                            }}
                        >
                            <Plus size={16} /> Log Entry for Another Hour
                        </button>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255, 255, 255, 0.5)", flexWrap: "wrap" }}>
                {MOOD_OPTIONS.map((m) => (
                    <div key={m.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: m.color }} />
                        <span style={{ fontSize: 11.5, color: "#334155", fontWeight: 600 }}>{m.label} ({moodCounts[m.key] || 0})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
