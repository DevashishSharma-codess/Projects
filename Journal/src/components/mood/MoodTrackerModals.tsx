import React from "react";
import { X, CheckCircle2, Wind } from "lucide-react";
import { MOOD_OPTIONS, getMoodOption, type MoodOption } from "./moodTrackerData";
import { getHourSlotInfo } from "../../context/JournalContext";
import type { MoodLog } from "../../types/journal";

interface MoodLogModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    selectedDate: string | null;
    modalDate: string;
    setModalDate: (date: string) => void;
    modalTime: string;
    setModalTime: (time: string) => void;
    modalMood: MoodOption;
    setModalMood: (mood: MoodOption) => void;
    modalNote: string;
    setModalNote: (note: string) => void;
    logs: Record<string, MoodLog>;
    isFutureDateTime: (date: string, time: string) => boolean;
    todayStr: () => string;
    deleteModalLog: (hourSlot: string) => void;
    saveModalLog: () => void;
    logSuccess: boolean;
}

export const MoodLogModal: React.FC<MoodLogModalProps> = ({
    showModal,
    setShowModal,
    selectedDate,
    modalDate,
    setModalDate,
    modalTime,
    setModalTime,
    modalMood,
    setModalMood,
    modalNote,
    setModalNote,
    logs,
    isFutureDateTime,
    todayStr,
    deleteModalLog,
    saveModalLog,
    logSuccess,
}) => {
    if (!showModal || !selectedDate) return null;

    const currentHourSlot = getHourSlotInfo(modalDate, modalTime).hourSlot;
    const isEditing = Boolean(logs[currentHourSlot]);

    return (
        <div
            onClick={() => setShowModal(false)}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15, 23, 42, 0.4)",
                backdropFilter: "blur(12px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "rgba(255, 255, 255, 0.92)",
                    backdropFilter: "blur(24px)",
                    color: "#0F172A",
                    borderRadius: 24,
                    width: "min(460px, 92vw)",
                    boxShadow: "0 30px 80px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                    overflow: "hidden",
                }}
            >
                {/* Modal Header */}
                <div
                    style={{
                        padding: "18px 24px",
                        borderBottom: "1px solid rgba(15, 23, 42, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(15, 23, 42, 0.03)",
                    }}
                >
                    <div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                            {isEditing ? "Edit Mood Entry" : "Log Hourly Mood"}
                        </h3>
                        <p style={{ fontSize: 12, color: "#475569", margin: "2px 0 0 0", fontWeight: 500 }}>
                            {new Date(modalDate + "T" + (modalTime || "12:00") + ":00").toLocaleString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(false)}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            border: "none",
                            background: "rgba(15, 23, 42, 0.08)",
                            color: "#0F172A",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: "20px 24px" }}>
                    {/* Date & Time Selectors */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
                                SELECT DATE
                            </label>
                            <input
                                type="date"
                                max={todayStr()}
                                value={modalDate}
                                onChange={(e) => setModalDate(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(15, 23, 42, 0.2)",
                                    background: "#FFFFFF",
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
                                SELECT TIME
                            </label>
                            <input
                                type="time"
                                value={modalTime}
                                onChange={(e) => setModalTime(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    borderRadius: 10,
                                    border: "1px solid rgba(15, 23, 42, 0.2)",
                                    background: "#FFFFFF",
                                    fontSize: 12.5,
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                        </div>
                    </div>

                    {/* Quick Hour Shortcuts */}
                    <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#64748B", marginRight: 2 }}>QUICK HOUR:</span>
                        {["09:00", "12:00", "15:00", "18:00", "21:00"].map((t) => {
                            const isCurrentHour = modalTime.startsWith(t.slice(0, 2));
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setModalTime(t)}
                                    style={{
                                        border: isCurrentHour ? "1.5px solid #3B82F6" : "1px solid rgba(15, 23, 42, 0.15)",
                                        background: isCurrentHour ? "#EFF6FF" : "#FFFFFF",
                                        color: isCurrentHour ? "#2563EB" : "#334155",
                                        fontSize: 10.5,
                                        fontWeight: 700,
                                        padding: "3px 8px",
                                        borderRadius: 6,
                                        cursor: "pointer",
                                    }}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>

                    {/* Validation / Info Banners */}
                    {isFutureDateTime(modalDate, modalTime) && (
                        <div style={{ fontSize: 11.5, fontWeight: 650, color: "#DC2626", background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "8px 12px", borderRadius: 10, marginBottom: 14 }}>
                            ⚠️ Future dates or times cannot be logged. Please select a current or past time.
                        </div>
                    )}

                    {!isFutureDateTime(modalDate, modalTime) && isEditing && (
                        <div style={{ fontSize: 11.5, fontWeight: 650, color: "#2563EB", background: "rgba(37, 99, 235, 0.1)", border: "1px solid rgba(37, 99, 235, 0.25)", padding: "8px 12px", borderRadius: 10, marginBottom: 14 }}>
                            ℹ️ Updating existing log for {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:00 - {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:59 slot.
                        </div>
                    )}

                    {!isFutureDateTime(modalDate, modalTime) && !isEditing && (
                        <div style={{ fontSize: 11.5, fontWeight: 650, color: "#059669", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "8px 12px", borderRadius: 10, marginBottom: 14 }}>
                            ✨ Creating new mood entry for {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:00 - {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:59 slot.
                        </div>
                    )}

                    <label style={{ display: "block", fontSize: 11, fontWeight: 650, color: "#475569", marginBottom: 10, letterSpacing: "0.04em" }}>
                        SELECT MOOD CATEGORY
                    </label>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 18 }}>
                        {MOOD_OPTIONS.map((m) => {
                            const isSel = modalMood.key === m.key;
                            const OptionIcon = m.Icon;
                            return (
                                <button
                                    key={m.key}
                                    onClick={() => setModalMood(m)}
                                    style={{
                                        border: isSel ? "1px solid rgba(255, 255, 255, 0.9)" : "1px solid rgba(15, 23, 42, 0.12)",
                                        background: isSel ? "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" : "rgba(255, 255, 255, 0.8)",
                                        color: isSel ? "#FFFFFF" : "#0F172A",
                                        borderRadius: 14,
                                        padding: "12px 8px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 6,
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                        boxShadow: isSel ? "0 4px 14px rgba(37,99,235,0.3)" : "none",
                                    }}
                                >
                                    <div style={{ width: 28, height: 28, borderRadius: 8, background: isSel ? "rgba(255,255,255,0.2)" : m.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <OptionIcon size={15} color={isSel ? "#FFFFFF" : m.color} />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: isSel ? 650 : 500 }}>
                                        {m.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Evaluated Score Row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, background: "rgba(15, 23, 42, 0.04)", padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(15, 23, 42, 0.08)" }}>
                        <div>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em" }}>EVALUATED SCORE</span>
                            <span style={{ fontSize: 15, fontWeight: 800, color: modalMood.color, display: "block", marginTop: 2 }}>
                                {modalMood.score.toFixed(1)} / 5.0
                            </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: 2 }}>HOUR SLOT</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", display: "block" }}>
                                {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:00
                            </span>
                        </div>
                    </div>

                    <label style={{ display: "block", fontSize: 11, fontWeight: 650, color: "#475569", marginBottom: 6, letterSpacing: "0.04em" }}>
                        REFLECTION NOTE
                    </label>
                    <input
                        type="text"
                        placeholder="What contributed to this mood?"
                        value={modalNote}
                        onChange={(e) => setModalNote(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px 14px",
                            borderRadius: 12,
                            border: "1px solid rgba(15, 23, 42, 0.2)",
                            background: "#FFFFFF",
                            outline: "none",
                            fontSize: 13,
                            color: "#0F172A",
                            boxSizing: "border-box",
                            fontWeight: 500,
                        }}
                    />
                </div>

                {/* Modal Footer */}
                <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(15, 23, 42, 0.1)", display: "flex", gap: 10, background: "rgba(15, 23, 42, 0.02)" }}>
                    {isEditing && (
                        <button
                            onClick={() => deleteModalLog(currentHourSlot)}
                            style={{ padding: "10px 16px", borderRadius: 12, border: "none", background: "rgba(239, 68, 68, 0.15)", color: "#DC2626", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                        >
                            Remove
                        </button>
                    )}
                    <button
                        onClick={saveModalLog}
                        disabled={isFutureDateTime(modalDate, modalTime)}
                        style={{
                            flex: 1,
                            background: isFutureDateTime(modalDate, modalTime)
                                ? "#94A3B8"
                                : logSuccess ? "#10B981" : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                            color: "#FFFFFF",
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: 12,
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: isFutureDateTime(modalDate, modalTime) ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            boxShadow: isFutureDateTime(modalDate, modalTime) ? "none" : "0 4px 14px rgba(37, 99, 235, 0.35)",
                        }}
                    >
                        {logSuccess ? <CheckCircle2 size={16} /> : React.createElement(modalMood.Icon, { size: 16 })} Save Entry
                    </button>
                </div>
            </div>
        </div>
    );
};

interface BreathingModalProps {
    isBreathing: boolean;
    setIsBreathing: (val: boolean) => void;
}

export const BreathingModal: React.FC<BreathingModalProps> = ({ isBreathing, setIsBreathing }) => {
    if (!isBreathing) return null;

    return (
        <div
            onClick={() => setIsBreathing(false)}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(20px)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    borderRadius: 28,
                    padding: "36px 44px",
                    textAlign: "center",
                    maxWidth: 420,
                    width: "90%",
                    boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
                    border: "2px solid rgba(255,255,255,0.8)",
                }}
            >
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
                        margin: "0 auto 20px auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
                    }}
                >
                    <Wind size={36} color="#FFFFFF" />
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 8px 0" }}>
                    4-7-8 Breathing Rest
                </h3>
                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 24 }}>
                    Inhale gently through your nose for 4s, hold your breath for 7s, then exhale slowly for 8s. Repeat 3 times to restore focus.
                </p>
                <button
                    onClick={() => setIsBreathing(false)}
                    style={{
                        border: "none",
                        background: "#0F172A",
                        color: "#FFFFFF",
                        padding: "12px 32px",
                        borderRadius: 9999,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        boxShadow: "0 8px 20px rgba(15,23,42,0.25)",
                    }}
                >
                    Done Breathing
                </button>
            </div>
        </div>
    );
};
