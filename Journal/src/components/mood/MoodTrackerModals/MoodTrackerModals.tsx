import React from "react";
import { X, CheckCircle2, Wind } from "lucide-react";
import { MOOD_OPTIONS, getMoodOption, type MoodOption } from "../data/moodTrackerData";
import { getHourSlotInfo } from "../../../context/JournalContext";
import type { MoodLog } from "../../../types/journal";
import "./MoodTrackerModals.css";

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
            className="mood-log-modal-overlay"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="mood-log-modal-card"
            >
                {/* Modal Header */}
                <div className="mood-log-modal-header">
                    <div>
                        <h3 className="mood-log-modal-title">
                            {isEditing ? "Edit Mood Entry" : "Log Hourly Mood"}
                        </h3>
                        <p className="mood-log-modal-date-sub">
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
                        className="mood-log-modal-close-btn"
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="mood-log-modal-body">
                    {/* Date & Time Selectors */}
                    <div className="mood-log-modal-field-row">
                        <div className="mood-log-modal-col">
                            <label className="mood-log-modal-field-label">
                                SELECT DATE
                            </label>
                            <input
                                type="date"
                                max={todayStr()}
                                value={modalDate}
                                onChange={(e) => setModalDate(e.target.value)}
                                className="mood-log-modal-input"
                            />
                        </div>
                        <div className="mood-log-modal-col">
                            <label className="mood-log-modal-field-label">
                                SELECT TIME
                            </label>
                            <input
                                type="time"
                                value={modalTime}
                                onChange={(e) => setModalTime(e.target.value)}
                                className="mood-log-modal-input"
                            />
                        </div>
                    </div>

                    {/* Quick Hour Shortcuts */}
                    <div className="mood-log-modal-quick-hours">
                        <span className="mood-log-modal-quick-label">QUICK HOUR:</span>
                        {["09:00", "12:00", "15:00", "18:00", "21:00"].map((t) => {
                            const isCurrentHour = modalTime.startsWith(t.slice(0, 2));
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setModalTime(t)}
                                    className={`mood-log-modal-quick-btn ${isCurrentHour ? "active" : "inactive"}`}
                                >
                                    {t}
                                </button>
                            );
                        })}
                    </div>

                    {/* Validation / Info Banners */}
                    {isFutureDateTime(modalDate, modalTime) && (
                        <div className="mood-log-modal-banner-error">
                            ⚠️ Future dates or times cannot be logged. Please select a current or past time.
                        </div>
                    )}

                    {!isFutureDateTime(modalDate, modalTime) && isEditing && (
                        <div className="mood-log-modal-banner-info">
                            ℹ️ Updating existing log for {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:00 - {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:59 slot.
                        </div>
                    )}

                    {!isFutureDateTime(modalDate, modalTime) && !isEditing && (
                        <div className="mood-log-modal-banner-success">
                            ✨ Creating new mood entry for {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:00 - {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:59 slot.
                        </div>
                    )}

                    <label className="mood-log-modal-field-label" style={{ marginBottom: 10 }}>
                        SELECT MOOD CATEGORY
                    </label>
                    
                    <div className="mood-log-modal-grid">
                        {MOOD_OPTIONS.map((m) => {
                            const isSel = modalMood.key === m.key;
                            const OptionIcon = m.Icon;
                            return (
                                <button
                                    key={m.key}
                                    onClick={() => setModalMood(m)}
                                    className="mood-log-modal-mood-btn"
                                    style={{
                                        border: isSel ? "1px solid rgba(255, 255, 255, 0.9)" : "1px solid rgba(15, 23, 42, 0.12)",
                                        background: isSel ? "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" : "rgba(255, 255, 255, 0.8)",
                                        color: isSel ? "#FFFFFF" : "#0F172A",
                                        boxShadow: isSel ? "0 4px 14px rgba(37,99,235,0.3)" : "none",
                                    }}
                                >
                                    <div className="mood-log-modal-mood-icon-wrapper" style={{ background: isSel ? "rgba(255,255,255,0.2)" : m.bg }}>
                                        <OptionIcon size={15} color={isSel ? "#FFFFFF" : m.color} />
                                    </div>
                                    <span className="mood-log-modal-mood-text" style={{ fontWeight: isSel ? 650 : 500 }}>
                                        {m.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Evaluated Score Row */}
                    <div className="mood-log-modal-eval-box">
                        <div>
                            <span className="mood-log-modal-eval-title">EVALUATED SCORE</span>
                            <span className="mood-log-modal-eval-val" style={{ color: modalMood.color }}>
                                {modalMood.score.toFixed(1)} / 5.0
                            </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <span className="mood-log-modal-slot-title">HOUR SLOT</span>
                            <span className="mood-log-modal-slot-val">
                                {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:00
                            </span>
                        </div>
                    </div>

                    <label className="mood-log-modal-field-label" style={{ marginBottom: 6 }}>
                        REFLECTION NOTE
                    </label>
                    <input
                        type="text"
                        placeholder="What contributed to this mood?"
                        value={modalNote}
                        onChange={(e) => setModalNote(e.target.value)}
                        className="mood-log-modal-note-input"
                    />
                </div>

                {/* Modal Footer */}
                <div className="mood-log-modal-footer">
                    {isEditing && (
                        <button
                            onClick={() => deleteModalLog(currentHourSlot)}
                            className="mood-log-modal-remove-btn"
                        >
                            Remove
                        </button>
                    )}
                    <button
                        onClick={saveModalLog}
                        disabled={isFutureDateTime(modalDate, modalTime)}
                        className="mood-log-modal-save-btn"
                        style={{
                            background: isFutureDateTime(modalDate, modalTime)
                                ? "#94A3B8"
                                : logSuccess ? "#10B981" : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                            cursor: isFutureDateTime(modalDate, modalTime) ? "not-allowed" : "pointer",
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
            className="breathing-modal-overlay"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="breathing-modal-card"
            >
                <div className="breathing-icon-circle">
                    <Wind size={36} color="#FFFFFF" />
                </div>
                <h3 className="breathing-title">
                    4-7-8 Breathing Rest
                </h3>
                <p className="breathing-desc">
                    Inhale gently through your nose for 4s, hold your breath for 7s, then exhale slowly for 8s. Repeat 3 times to restore focus.
                </p>
                <button
                    onClick={() => setIsBreathing(false)}
                    className="breathing-done-btn"
                >
                    Done Breathing
                </button>
            </div>
        </div>
    );
};
