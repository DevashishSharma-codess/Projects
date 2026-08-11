import React, { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {
    TrendingUp,
    Flame,
    Sun,
    Zap,
    Activity,
    BarChart3,
    CheckCircle2,
    Plus,
    X,
    Calendar as CalendarIcon,
    LineChart,
    Sparkles,
    Heart,
    Moon,
    User,
} from "lucide-react";
import type { MoodLog } from "../types/journal";
import { useJournal, getHourSlotInfo } from "../context/JournalContext";
import {
    MOOD_OPTIONS,
    getMoodOption,
    buildCalendarDays,
    todayStr,
    buildSparkPath,
    type GraphPoint,
} from "./mood/moodTrackerData";
import { MoodLogModal, BreathingModal } from "./mood/MoodTrackerModals";
import { MoodMusicWidget } from "./mood/MoodMusicWidget";
import { MoodCalendarWidget } from "./mood/MoodCalendarWidget";
import { DashboardMoodLogger } from "./mood/DashboardMoodLogger";
import { MoodReportsWidget } from "./mood/MoodReportsWidget";

export type { MoodLog };

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif";

const isFutureDateTime = (dateStr: string, timeStr: string): boolean => {
    if (!dateStr) return false;
    const now = new Date();
    const todayDateStr = now.toISOString().slice(0, 10);
    if (dateStr > todayDateStr) return true;
    if (dateStr === todayDateStr) {
        const parts = (timeStr || "00:00").split(":");
        const h = parseInt(parts[0] || "0", 10);
        const m = parseInt(parts[1] || "0", 10);
        const currentH = now.getHours();
        const currentM = now.getMinutes();
        if (h > currentH || (h === currentH && m > currentM)) {
            return true;
        }
    }
    return false;
};

export default function MoodTracker() {
    const todayKey = todayStr();

    const {
        moodLogs: logs,
        calYear,
        setCalYear,
        calMonth,
        setCalMonth,
        moodActiveNavTab: activeNavTab,
        setMoodActiveNavTab: setActiveNavTab,
        categoryFilter,
        setCategoryFilter,
        timeframe,
        setTimeframe,
        selectedMoodOption: ctxSelectedMoodOption,
        setSelectedMoodOption: setCtxSelectedMoodOption,
        noteInput,
        setNoteInput,
        selectedDate,
        setSelectedDate,
        showMoodModal: showModal,
        setShowMoodModal: setShowModal,
        modalMood: ctxModalMood,
        setModalMood: setCtxModalMood,
        modalNote,
        setModalNote,
        logSuccess,
        setLogSuccess,
        isBreathing,
        setIsBreathing,
        addMoodLog,
        deleteMoodLog,
    } = useJournal();

    const selectedMoodOption = ctxSelectedMoodOption || MOOD_OPTIONS[0];

    const modalMood = ctxModalMood || MOOD_OPTIONS[0];
    const setModalMood = setCtxModalMood;

    const [futureDateToast, setFutureDateToast] = useState(false);

    const [selectedLogDate] = useState(() => todayStr());
    const [selectedLogTime] = useState(() => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    });

    const [modalDate, setModalDate] = useState(() => todayStr());
    const [modalTime, setModalTime] = useState(() => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    });

    const [songMood, setSongMood] = useState<string>("radiant");
    const [songIndex, setSongIndex] = useState<number>(0);
    const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

    const calCells = useMemo(() => buildCalendarDays(calYear, calMonth), [calYear, calMonth]);

    const logsArray = useMemo(
        () => Object.values(logs).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0)),
        [logs]
    );

    const graphTimeframePoints = useMemo(() => {
        let filtered = categoryFilter === "all"
            ? logsArray
            : logsArray.filter(l => l.moodKey === categoryFilter);

        const now = new Date();
        const cutoffDate = new Date();

        if (timeframe === "weekly") {
            cutoffDate.setDate(now.getDate() - 7);
        } else if (timeframe === "monthly") {
            cutoffDate.setDate(now.getDate() - 30);
        } else if (timeframe === "3months") {
            cutoffDate.setDate(now.getDate() - 90);
        }

        const cutoffTs = cutoffDate.getTime();
        let timeframeLogs = filtered.filter(l => (l.timestamp || new Date(l.day).getTime()) >= cutoffTs);

        if (timeframeLogs.length === 0) {
            timeframeLogs = filtered;
        }

        const list: GraphPoint[] = timeframeLogs.map(l => ({
            id: l.hourSlot || l.id,
            day: l.day,
            time: l.time || "12:00",
            hourSlot: l.hourSlot || `${l.day}-12`,
            timestamp: l.timestamp || new Date(`${l.day}T12:00:00`).getTime(),
            score: l.score,
            moodLabel: l.moodLabel,
            moodKey: l.moodKey,
            color: l.color,
            note: l.note,
            isLogged: true,
        }));

        return list;
    }, [logsArray, timeframe, categoryFilter]);

    const totalLogs = logsArray.length;
    const avgScore = totalLogs
        ? (logsArray.reduce((s, l) => s + l.score, 0) / totalLogs).toFixed(1)
        : "0.0";
    const positiveCount = logsArray.filter((l) => l.score >= 3.5).length;
    const positivityRate = totalLogs ? Math.round((positiveCount / totalLogs) * 100) : 0;

    const moodCounts = useMemo(() => {
        const counts: Record<string, number> = { radiant: 0, peaceful: 0, focused: 0, energetic: 0, stressed: 0, low: 0 };
        logsArray.forEach((l) => { counts[l.moodKey] = (counts[l.moodKey] || 0) + 1; });
        return counts;
    }, [logsArray]);

    const dominantMoodKey = useMemo(() => {
        return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "peaceful";
    }, [moodCounts]);
    const dominantMood = getMoodOption(dominantMoodKey);

    const streak = useMemo(() => {
        const loggedDates = new Set(Object.values(logs).map(l => l.day));
        let s = 0;
        const d = new Date();
        while (true) {
            const k = d.toISOString().slice(0, 10);
            if (!loggedDates.has(k)) break;
            s++;
            d.setDate(d.getDate() - 1);
        }
        return s;
    }, [logs]);

    const openModal = (dateStr: string, timeStr?: string) => {
        const now = new Date();
        const defaultTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        const targetTime = timeStr || defaultTime;

        if (isFutureDateTime(dateStr, targetTime)) {
            setFutureDateToast(true);
            setTimeout(() => setFutureDateToast(false), 3000);
            return;
        }

        const { hourSlot } = getHourSlotInfo(dateStr, targetTime);
        const existing = logs[hourSlot];

        setSelectedDate(dateStr);
        setModalDate(dateStr);
        setModalTime(existing?.time || targetTime);
        setModalMood(existing ? getMoodOption(existing.moodKey) : MOOD_OPTIONS[0]);
        setModalNote(existing?.note ?? "");
        setShowModal(true);
        setLogSuccess(false);
    };

    const saveModalLog = () => {
        if (!modalDate) return;
        if (isFutureDateTime(modalDate, modalTime)) {
            setFutureDateToast(true);
            setTimeout(() => setFutureDateToast(false), 3000);
            return;
        }
        addMoodLog(
            modalDate,
            modalMood.key,
            modalMood.label,
            modalMood.iconName,
            modalMood.score,
            modalMood.color,
            modalNote.trim() || `Feeling ${modalMood.label}`,
            modalTime
        );
        setLogSuccess(true);
        setTimeout(() => { setShowModal(false); setLogSuccess(false); }, 1200);
    };

    const deleteModalLog = (key: string) => {
        deleteMoodLog(key);
        setShowModal(false);
    };

    const prevMonth = () => {
        setCalMonth((m) => {
            if (m === 0) { setCalYear((y) => y - 1); return 11; }
            return m - 1;
        });
    };
    const nextMonth = () => {
        setCalMonth((m) => {
            if (m === 11) { setCalYear((y) => y + 1); return 0; }
            return m + 1;
        });
    };

    return (
        <section
            id="mood-tracker"
            style={{
                position: "relative",
                maxWidth: 1280,
                margin: "60px auto",
                padding: "0 24px",
            }}
        >
            {futureDateToast && (
                <div
                    style={{
                        position: "fixed",
                        bottom: 32,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#0F172A",
                        border: "1px solid #EF4444",
                        color: "#FFFFFF",
                        padding: "12px 24px",
                        borderRadius: 9999,
                        fontSize: 13.5,
                        fontWeight: 700,
                        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.4), 0 0 15px rgba(239, 68, 68, 0.3)",
                        zIndex: 99999,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <span style={{ color: "#EF4444", fontSize: 16 }}>⚠️</span>
                    <span>Future dates cannot be logged! Please select today or a past date.</span>
                </div>
            )}

            <div style={{ textAlign: "center", marginBottom: 36 }}>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 46px)", color: "#FFFFFF", marginTop: 0, marginBottom: 0 }}>
                    Mood & Wellness <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#FFFFFF" }}>Analytics</span>
                </h2>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255, 255, 255, 0.95)", fontSize: "16px", maxWidth: 620, margin: "10px auto 0 auto" }}>
                    Track your emotional wellness over time. Log daily moods, visualize trends, and gain insights into your mental well-being.
                </p>
            </div>

            <div className="mood-tracker-wrapper" style={{ position: "relative", zIndex: 2, width: "100%", margin: "0 auto", display: "flex", gap: 20 }}>
                {/* Floating Left Vertical Navigation Bar */}
                <div
                    className="mood-left-dock"
                    style={{
                        width: 58,
                        background: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(30px) saturate(180%)",
                        WebkitBackdropFilter: "blur(30px) saturate(180%)",
                        borderRadius: 26,
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        padding: "20px 0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
                        alignSelf: "flex-start",
                        minHeight: 400,
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
                        {[
                            { tab: "Dashboard", Icon: Activity },
                            { tab: "Calendar", Icon: CalendarIcon },
                            { tab: "Mood Logs", Icon: LineChart },
                            { tab: "Analytics", Icon: BarChart3 },
                            { tab: "Reports", Icon: TrendingUp },
                        ].map(({ tab, Icon }) => {
                            const isActive = activeNavTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveNavTab(tab)}
                                    title={tab}
                                    style={{
                                        border: isActive ? "1px solid rgba(255, 255, 255, 0.9)" : "1px solid rgba(255, 255, 255, 0.6)",
                                        width: 38,
                                        height: 38,
                                        borderRadius: 12,
                                        background: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                                        color: isActive ? "#2563EB" : "#334155",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: isActive ? "0 4px 14px rgba(37, 99, 235, 0.18)" : "none",
                                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                    }}
                                >
                                    <Icon size={18} color={isActive ? "#2563EB" : "#334155"} />
                                </button>
                            );
                        })}
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255, 255, 255, 0.6)", border: "1px solid rgba(255, 255, 255, 0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <User size={16} color="#334155" />
                    </div>
                </div>

                {/* MAIN MORPHED LIGHT GLASS WINDOW CONTAINER */}
                <div
                    className="mood-tracker-window"
                    style={{
                        flex: 1,
                        background: "rgba(255, 255, 255, 0.45)",
                        backdropFilter: "blur(40px) saturate(200%)",
                        WebkitBackdropFilter: "blur(40px) saturate(200%)",
                        borderRadius: 32,
                        border: "1px solid rgba(255, 255, 255, 0.6)",
                        boxShadow: "0 25px 70px rgba(15, 23, 42, 0.12), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.6)",
                        padding: "30px 34px",
                        color: "#0F172A",
                    }}
                >
                    <style>{`
                        @media (max-width: 860px) {
                            .mood-left-dock { display: none !important; }
                            .mood-tracker-wrapper { gap: 0 !important; }
                        }
                        @media (max-width: 640px) {
                            .mood-tracker-window { padding: 16px 12px !important; border-radius: 20px !important; }
                        }
                    `}</style>

                    {/* Top Header Window Bar */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 28 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ display: "flex", gap: 7 }}>
                                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(15, 23, 42, 0.18)", border: "1px solid rgba(255, 255, 255, 0.6)" }} />
                                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(15, 23, 42, 0.12)", border: "1px solid rgba(255, 255, 255, 0.6)" }} />
                                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(15, 23, 42, 0.12)", border: "1px solid rgba(255, 255, 255, 0.6)" }} />
                            </div>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, background: "rgba(255, 255, 255, 0.5)", padding: "4px 6px", borderRadius: 999, border: "1px solid rgba(255, 255, 255, 0.7)", maxWidth: "100%" }}>
                            {[
                                { name: "Dashboard", icon: Activity },
                                { name: "Calendar", icon: CalendarIcon },
                                { name: "Mood Logs", icon: LineChart },
                                { name: "Analytics", icon: BarChart3 },
                                { name: "Reports", icon: TrendingUp },
                            ].map((tab) => {
                                const TabIcon = tab.icon;
                                const isActive = activeNavTab === tab.name;
                                return (
                                    <button
                                        key={tab.name}
                                        onClick={() => setActiveNavTab(tab.name as any)}
                                        style={{
                                            border: "none",
                                            background: isActive ? "#FFFFFF" : "transparent",
                                            color: isActive ? "#0F172A" : "#334155",
                                            fontWeight: isActive ? 650 : 500,
                                            fontSize: 12,
                                            padding: "6px 14px",
                                            borderRadius: 999,
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                            boxShadow: isActive ? "0 4px 12px rgba(15, 23, 42, 0.08)" : "none",
                                        }}
                                    >
                                        <TabIcon size={13} color={isActive ? "#2563EB" : "#475569"} />
                                        <span>{tab.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255, 255, 255, 0.6)", padding: "4px 14px 4px 6px", borderRadius: 999, border: "1px solid rgba(255, 255, 255, 0.8)" }}>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: "#FFFFFF" }}>
                                JS
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <span style={{ fontSize: 12, fontWeight: 700, display: "block", color: "#0F172A" }}>Jon Snow</span>
                                <span style={{ fontSize: 10, color: "#475569", fontWeight: 500, display: "block" }}>Executive</span>
                            </div>
                        </div>
                    </div>

                    {/* Top Stat Row */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", marginBottom: 24, gap: 16 }}>
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{ position: "relative", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="3.5" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth="3.5" strokeDasharray={`${positivityRate}, 100`} style={{ transition: "stroke-dasharray 0.6s ease" }} />
                                    </svg>
                                    <span style={{ position: "absolute", fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{positivityRate}%</span>
                                </div>
                            </div>

                            <div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: "#475569", display: "block" }}>Positivity Rate</span>
                                <span style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", fontFamily: FONT_FAMILY }}>{positivityRate}%</span>
                            </div>

                            <div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: "#475569", display: "block" }}>Logged Entries</span>
                                <span style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", fontFamily: FONT_FAMILY }}>{totalLogs} Days</span>
                            </div>

                            <div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: "#475569", display: "block" }}>Active Streak</span>
                                <span style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", fontFamily: FONT_FAMILY }}>{streak} Days</span>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter Pills Row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                        <button
                            onClick={() => setCategoryFilter("all")}
                            style={{
                                border: categoryFilter === "all" ? "1px solid rgba(255, 255, 255, 0.9)" : "1px solid rgba(255, 255, 255, 0.7)",
                                background: categoryFilter === "all" ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                                color: categoryFilter === "all" ? "#0F172A" : "#334155",
                                fontWeight: categoryFilter === "all" ? 650 : 500,
                                fontSize: 12.5,
                                padding: "8px 20px",
                                borderRadius: 999,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: categoryFilter === "all" ? "0 4px 14px rgba(15, 23, 42, 0.08)" : "none",
                            }}
                        >
                            All Categories
                        </button>
                        {MOOD_OPTIONS.map((m) => {
                            const isSel = categoryFilter === m.key;
                            return (
                                <button
                                    key={m.key}
                                    onClick={() => setCategoryFilter(m.key)}
                                    style={{
                                        border: isSel ? "1px solid rgba(255, 255, 255, 0.9)" : "1px solid rgba(255, 255, 255, 0.7)",
                                        background: isSel ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                                        color: isSel ? "#0F172A" : "#334155",
                                        fontWeight: isSel ? 650 : 500,
                                        fontSize: 12.5,
                                        padding: "8px 18px",
                                        borderRadius: 999,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        boxShadow: isSel ? "0 4px 14px rgba(15, 23, 42, 0.08)" : "none",
                                    }}
                                >
                                    {m.label}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => openModal(todayKey)}
                            title="Log New Mood Entry"
                            style={{
                                border: "none",
                                width: 34,
                                height: 34,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                                color: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                marginLeft: 4,
                                boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                            }}
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    {/* ======= TAB CONTENT: DASHBOARD ======= */}
                    {activeNavTab === "Dashboard" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <DashboardMoodLogger
                                addMoodLog={addMoodLog}
                                logs={logs}
                                isFutureDateTime={isFutureDateTime}
                            />
                            <MoodMusicWidget
                                songMood={songMood}
                                setSongMood={setSongMood}
                                songIndex={songIndex}
                                setSongIndex={setSongIndex}
                                isPlayingMusic={isPlayingMusic}
                                setIsPlayingMusic={setIsPlayingMusic}
                            />
                        </div>
                    )}

                    {/* ======= TAB CONTENT: CALENDAR ======= */}
                    {activeNavTab === "Calendar" && (
                        <MoodCalendarWidget
                            calMonth={calMonth}
                            calYear={calYear}
                            prevMonth={prevMonth}
                            nextMonth={nextMonth}
                            calCells={calCells}
                            logs={logs}
                            todayKey={todayKey}
                            openModal={openModal}
                            moodCounts={moodCounts}
                            deleteModalLog={deleteModalLog}
                        />
                    )}

                    {/* ======= TAB CONTENT: MOOD LOGS ======= */}
                    {activeNavTab === "Mood Logs" && (
                        <div style={{ background: "rgba(255, 255, 255, 0.35)", backdropFilter: "blur(24px)", borderRadius: 26, border: "1px solid rgba(255, 255, 255, 0.55)", padding: "28px", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6)" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 34, height: 34, borderRadius: 12, background: "rgba(15, 23, 42, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <LineChart size={18} color="#0F172A" />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0 }}>All Mood Entries</h3>
                                        <span style={{ fontSize: 11.5, color: "#475569", fontWeight: 500 }}>{logsArray.length} entries logged</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => openModal(todayKey)}
                                    style={{ display: "flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)", color: "#FFFFFF", border: "none", padding: "8px 18px", borderRadius: 999, fontWeight: 600, fontSize: 12, cursor: "pointer", boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)" }}
                                >
                                    <Plus size={14} /> New Entry
                                </button>
                            </div>

                            <div className="mood-table-overflow">
                                <div style={{ minWidth: 540 }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 90px 70px 60px", gap: 12, padding: "10px 16px", borderRadius: 12, background: "rgba(255, 255, 255, 0.5)", marginBottom: 8, border: "1px solid rgba(255, 255, 255, 0.7)" }}>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>DATE</span>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>NOTE</span>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>MOOD</span>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>SCORE</span>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>ACTION</span>
                                    </div>

                                    <div style={{ maxHeight: 380, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
                                        {[...logsArray].reverse().map((log) => {
                                            const mood = getMoodOption(log.moodKey);
                                            const LogIcon = mood.Icon;
                                            return (
                                                <div
                                                    key={log.id}
                                                    style={{
                                                        display: "grid",
                                                        gridTemplateColumns: "130px 1fr 90px 70px 60px",
                                                        gap: 12,
                                                        padding: "12px 16px",
                                                        borderRadius: 14,
                                                        background: "rgba(255, 255, 255, 0.65)",
                                                        border: "1px solid rgba(255, 255, 255, 0.8)",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>
                                                            {new Date(log.day + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                        </span>
                                                        {log.time && (
                                                            <span style={{ fontSize: 10, color: "#64748B", fontWeight: 600 }}>
                                                                {log.time}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <span style={{ fontSize: 12, color: "#334155", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                        {log.note}
                                                    </span>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                                        <LogIcon size={13} color={mood.color} />
                                                        <span style={{ fontSize: 11.5, fontWeight: 600, color: mood.color }}>{mood.label}</span>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                        <div style={{ width: 28, height: 6, borderRadius: 999, background: "rgba(15, 23, 42, 0.1)", overflow: "hidden" }}>
                                                            <div style={{ width: `${(log.score / 5) * 100}%`, height: "100%", borderRadius: 999, background: mood.color, transition: "width 0.3s ease" }} />
                                                        </div>
                                                        <span style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>{log.score}</span>
                                                    </div>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); openModal(log.day); }}
                                                        style={{ background: "#FFFFFF", border: "1px solid rgba(255, 255, 255, 0.9)", color: "#0F172A", padding: "5px 10px", borderRadius: 8, fontSize: 10.5, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ======= TAB CONTENT: ANALYTICS ======= */}
                    {activeNavTab === "Analytics" && (
                        <div style={{ background: "rgba(255, 255, 255, 0.65)", backdropFilter: "blur(24px)", borderRadius: 28, border: "1px solid rgba(255, 255, 255, 0.8)", padding: "30px", boxShadow: "0 20px 50px -10px rgba(15, 23, 42, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.9)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                                <div style={{ width: 34, height: 34, borderRadius: 12, background: "rgba(15, 23, 42, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <BarChart3 size={18} color="#0F172A" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0 }}>Analytics & Trend Graphs</h3>
                                    <span style={{ fontSize: 11.5, color: "#475569", fontWeight: 500 }}>Interactive mood graph charts and analytical breakdown</span>
                                </div>
                            </div>

                            <div
                                style={{
                                    background: "#FFFFFF",
                                    borderRadius: 20,
                                    border: "1px solid #E2E8F0",
                                    padding: "24px 24px 20px 24px",
                                    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                                    marginBottom: 24,
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 16 }}>
                                    <div>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 4px 0", letterSpacing: "-0.01em" }}>
                                            Area Chart
                                        </h3>
                                        <span style={{ fontSize: 12, color: "#64748B", fontWeight: 400 }}>
                                            Showing mood trend for the {timeframe === "weekly" ? "last 7 days" : timeframe === "monthly" ? "last 30 days" : "last 3 months"}
                                        </span>
                                    </div>
                                    
                                    <select
                                        value={timeframe}
                                        onChange={(e) => setTimeframe(e.target.value as any)}
                                        style={{
                                            border: "1px solid #E2E8F0",
                                            background: "#FFFFFF",
                                            color: "#0F172A",
                                            fontSize: 12,
                                            fontWeight: 500,
                                            padding: "6px 14px",
                                            borderRadius: 8,
                                            outline: "none",
                                            cursor: "pointer",
                                            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                                            fontFamily: FONT_FAMILY,
                                        }}
                                    >
                                        <option value="3months">Last 3 months</option>
                                        <option value="monthly">Last 30 days</option>
                                        <option value="weekly">Last 7 days</option>
                                    </select>
                                </div>

                                <div style={{ width: "100%", height: 260 }}>
                                    <ResponsiveContainer width="100%" height={260} minHeight={260}>
                                        <AreaChart
                                            data={graphTimeframePoints.map((pt) => {
                                                const timeStr = pt.time || "12:00";
                                                const d = new Date(`${pt.day}T${timeStr}:00`);
                                                const dayNum = isNaN(d.getDate()) ? 15 : d.getDate();
                                                const baseWellness = Number((2.8 + Math.cos(dayNum * 0.45) * 0.85).toFixed(1));
                                                const timeLabel = pt.time ? ` (${pt.time})` : "";
                                                
                                                let level = 3;
                                                if (pt.score >= 4.8) level = 6;
                                                else if (pt.score >= 4.4) level = 5;
                                                else if (pt.score >= 4.1) level = 4;
                                                else if (pt.score >= 3.0) level = 3;
                                                else if (pt.score >= 1.8) level = 2;
                                                else level = 1;

                                                return {
                                                    date: pt.day,
                                                    time: pt.time,
                                                    dateLabel: `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}${timeLabel}`,
                                                    moodScore: pt.score,
                                                    moodLevel: level,
                                                    wellnessIndex: baseWellness,
                                                    moodLabel: pt.moodLabel,
                                                    color: pt.color,
                                                    note: pt.note,
                                                };
                                            })}
                                            margin={{ top: 15, right: 15, left: 15, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="shadcnAreaMood" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.45} />
                                                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.02} />
                                                </linearGradient>
                                                <linearGradient id="shadcnAreaWellness" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                                                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.05} />
                                                </linearGradient>
                                            </defs>

                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />

                                            <XAxis
                                                dataKey="dateLabel"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 10.5, fill: "#64748B", fontWeight: 500 }}
                                                dy={8}
                                                interval={timeframe === "weekly" ? 0 : timeframe === "monthly" ? 2 : 5}
                                            />

                                            <YAxis
                                                domain={[0.5, 6.5]}
                                                ticks={[1, 2, 3, 4, 5, 6]}
                                                tickFormatter={(val) => {
                                                    if (val === 6) return "5.0 Radiant";
                                                    if (val === 5) return "4.5 Peaceful";
                                                    if (val === 4) return "4.2 Energetic";
                                                    if (val === 3) return "4.0 Focused";
                                                    if (val === 2) return "2.0 Stressed";
                                                    if (val === 1) return "1.5 Low Energy";
                                                    return "";
                                                }}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 10, fill: "#475569", fontWeight: 600 }}
                                                width={105}
                                            />

                                            <Tooltip
                                                content={({ active, payload }) => {
                                                    if (active && payload && payload.length) {
                                                        const data = payload[0].payload;
                                                        return (
                                                            <div
                                                                style={{
                                                                    background: "#FFFFFF",
                                                                    borderRadius: 12,
                                                                    border: "1px solid #E2E8F0",
                                                                    padding: "10px 14px",
                                                                    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.12)",
                                                                    fontSize: 11.5,
                                                                    color: "#0F172A",
                                                                    fontFamily: FONT_FAMILY,
                                                                }}
                                                            >
                                                                <div style={{ fontSize: 10.5, color: "#64748B", fontWeight: 600, marginBottom: 4 }}>
                                                                    {new Date(data.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                                                                    {data.time ? ` • ${data.time}` : ""}
                                                                </div>
                                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, margin: "4px 0" }}>
                                                                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: data.color, fontWeight: 700 }}>
                                                                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: data.color }} />
                                                                        <span>{data.moodLabel}</span>
                                                                    </div>
                                                                    <span style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>
                                                                        Score: {data.moodScore.toFixed(1)} / 5.0
                                                                    </span>
                                                                </div>
                                                                {data.note && (
                                                                    <div style={{ fontSize: 10, color: "#475569", marginTop: 4, fontWeight: 400, fontStyle: "italic", maxWidth: 220 }}>
                                                                        "{data.note}"
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="moodLevel"
                                                name="Mood Trend"
                                                stroke="#3B82F6"
                                                strokeWidth={2.5}
                                                dot={{ r: 3.5, fill: "#3B82F6", strokeWidth: 1.5, stroke: "#FFFFFF" }}
                                                activeDot={{ r: 6, strokeWidth: 2, stroke: "#FFFFFF" }}
                                                fillOpacity={1}
                                                fill="url(#shadcnAreaMood)"
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="wellnessIndex"
                                                name="Wellness Index"
                                                stroke="#2563EB"
                                                strokeWidth={2}
                                                dot={false}
                                                activeDot={{ r: 4, strokeWidth: 0 }}
                                                fillOpacity={1}
                                                fill="url(#shadcnAreaWellness)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ======= TAB CONTENT: REPORTS ======= */}
                    {activeNavTab === "Reports" && (
                        <MoodReportsWidget
                            logs={logs}
                            logsArray={logsArray}
                            totalLogs={totalLogs}
                            avgScore={avgScore}
                            positivityRate={positivityRate}
                            streak={streak}
                            dominantMood={dominantMood}
                            dominantMoodKey={dominantMoodKey}
                            moodCounts={moodCounts}
                            positiveCount={positiveCount}
                        />
                    )}
                </div>
            </div>

            <MoodLogModal
                showModal={showModal}
                setShowModal={setShowModal}
                selectedDate={selectedDate}
                modalDate={modalDate}
                setModalDate={setModalDate}
                modalTime={modalTime}
                setModalTime={setModalTime}
                modalMood={modalMood}
                setModalMood={setModalMood}
                modalNote={modalNote}
                setModalNote={setModalNote}
                logs={logs}
                isFutureDateTime={isFutureDateTime}
                todayStr={todayStr}
                deleteModalLog={deleteModalLog}
                saveModalLog={saveModalLog}
                logSuccess={logSuccess}
            />

            <BreathingModal isBreathing={isBreathing} setIsBreathing={setIsBreathing} />
        </section>
    );
}
