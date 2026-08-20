/**
 * ============================================================================
 * JOURNAL CONTEXT HELPERS & SEED DATA
 * ============================================================================
 * Contains utility date/time formatting logic and default seed data for
 * initial application renders when no existing localStorage data is present.
 */

import type { MoodLog } from "../types/journal";

/**
 * Calculates unique hour slot identifier and timestamp from day string and time input.
 * 
 * Used to group mood logs uniquely per hour slot (e.g. "YYYY-MM-DD-HH").
 * Ensures multiple mood logs logged on the same date at different hours maintain
 * distinct keys and accurate chronological ordering.
 * 
 * @param day Date string in YYYY-MM-DD format
 * @param timeStr Time string in 24-hour (HH:MM) or 12-hour (HH:MM AM/PM) format
 * @returns Object containing `hourSlot`, formatted `time` (HH:MM), and numeric `timestamp`
 */
export const getHourSlotInfo = (day: string, timeStr: string) => {
    let hour = 12;
    let minute = 0;

    if (!timeStr) {
        const now = new Date();
        hour = now.getHours();
        minute = now.getMinutes();
    } else {
        const match24 = timeStr.match(/^(\d{1,2}):(\d{2})/);
        if (match24) {
            hour = parseInt(match24[1], 10);
            minute = parseInt(match24[2], 10);
        } else {
            const match12 = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
            if (match12) {
                hour = parseInt(match12[1], 10);
                minute = parseInt(match12[2], 10);
                const period = match12[3]?.toUpperCase();
                if (period === "PM" && hour < 12) hour += 12;
                if (period === "AM" && hour === 12) hour = 0;
            }
        }
    }

    const hh = String(hour).padStart(2, "0");
    const mm = String(minute).padStart(2, "0");
    const hourSlot = `${day}-${hh}`;
    const time = `${hh}:${mm}`;

    const dateObj = new Date(`${day}T${time}:00`);
    const timestamp = isNaN(dateObj.getTime()) ? Date.now() : dateObj.getTime();

    return { hourSlot, time, timestamp };
};

/**
 * Default seed mood logs dictionary.
 * Populates the Mood Analytics trend graphs with realistic sample data upon first run,
 * enabling immediate visualization of weekly, monthly, and 3-month trend curves.
 */
export const SEED_MOOD_LOGS: Record<string, MoodLog> = {
    "2026-07-01-09": { id: "s1", day: "2026-07-01", time: "09:00", hourSlot: "2026-07-01-09", timestamp: new Date("2026-07-01T09:00:00").getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "Great morning coffee." },
    "2026-07-05-14": { id: "s2", day: "2026-07-05", time: "14:00", hourSlot: "2026-07-05-14", timestamp: new Date("2026-07-05T14:00:00").getTime(), moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.2, color: "#10B981", note: "Completed sprint goal!" },
    "2026-07-09-18": { id: "s3", day: "2026-07-09", time: "18:00", hourSlot: "2026-07-09-18", timestamp: new Date("2026-07-09T18:00:00").getTime(), moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Family weekend getaway." },
    "2026-07-13-10": { id: "s4", day: "2026-07-13", time: "10:00", hourSlot: "2026-07-13-10", timestamp: new Date("2026-07-13T10:00:00").getTime(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.0, color: "#A855F7", note: "Deep work session." },
    "2026-07-16-16": { id: "s5", day: "2026-07-16", time: "16:00", hourSlot: "2026-07-16-16", timestamp: new Date("2026-07-16T16:00:00").getTime(), moodKey: "stressed", moodLabel: "Stressed", icon: "Activity", score: 2.0, color: "#EF4444", note: "Tight deadline." },
    "2026-07-20-11": { id: "s6", day: "2026-07-20", time: "11:00", hourSlot: "2026-07-20-11", timestamp: new Date("2026-07-20T11:00:00").getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "Relaxing Sunday walk." },
    "2026-07-24-15": { id: "s7", day: "2026-07-24", time: "15:00", hourSlot: "2026-07-24-15", timestamp: new Date("2026-07-24T15:00:00").getTime(), moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Key project milestone!" },
    "2026-07-27-09": { id: "s8", day: "2026-07-27", time: "09:00", hourSlot: "2026-07-27-09", timestamp: new Date("2026-07-27T09:00:00").getTime(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.0, color: "#A855F7", note: "Strategic roadmap planning." },
    "2026-07-30-17": { id: "s9", day: "2026-07-30", time: "17:00", hourSlot: "2026-07-30-17", timestamp: new Date("2026-07-30T17:00:00").getTime(), moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.2, color: "#10B981", note: "High energy team workout." },
    "2026-08-01-08": { id: "s10", day: "2026-08-01", time: "08:00", hourSlot: "2026-08-01-08", timestamp: new Date("2026-08-01T08:00:00").getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "New month fresh start." },
    "2026-08-03-12": { id: "s11", day: "2026-08-03", time: "12:00", hourSlot: "2026-08-03-12", timestamp: new Date("2026-08-03T12:00:00").getTime(), moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Product launch success!" },
    "2026-08-05-14": { id: "s12", day: "2026-08-05", time: "14:00", hourSlot: "2026-08-05-14", timestamp: new Date("2026-08-05T14:00:00").getTime(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.0, color: "#A855F7", note: "Dark glassmorphic dashboard." },
    "2026-08-07-10": { id: "s13", day: "2026-08-07", time: "10:00", hourSlot: "2026-08-07-10", timestamp: new Date("2026-08-07T10:00:00").getTime(), moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.2, color: "#10B981", note: "Morning run." },
    "2026-08-08-16": { id: "s14", day: "2026-08-08", time: "16:00", hourSlot: "2026-08-08-16", timestamp: new Date("2026-08-08T16:00:00").getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "Weekend reading." },
    "2026-08-09-11": { id: "s15", day: "2026-08-09", time: "11:00", hourSlot: "2026-08-09-11", timestamp: new Date("2026-08-09T11:00:00").getTime(), moodKey: "radiant", moodLabel: "Radiant", icon: "Sparkles", score: 5.0, color: "#F59E0B", note: "Sunny afternoon." },
    "2026-08-10-09": { id: "s16", day: "2026-08-10", time: "09:00", hourSlot: "2026-08-10-09", timestamp: new Date("2026-08-10T09:00:00").getTime(), moodKey: "focused", moodLabel: "Focused", icon: "Compass", score: 4.0, color: "#A855F7", note: "Morning planning." },
    [`${new Date().toISOString().slice(0, 10)}-09`]: { id: "s-today-1", day: new Date().toISOString().slice(0, 10), time: "09:33", hourSlot: `${new Date().toISOString().slice(0, 10)}-09`, timestamp: new Date(`${new Date().toISOString().slice(0, 10)}T09:33:00`).getTime(), moodKey: "peaceful", moodLabel: "Peaceful", icon: "Heart", score: 4.5, color: "#3B82F6", note: "Morning peaceful reflection." },
    [`${new Date().toISOString().slice(0, 10)}-10`]: { id: "s-today-2", day: new Date().toISOString().slice(0, 10), time: "10:45", hourSlot: `${new Date().toISOString().slice(0, 10)}-10`, timestamp: new Date(`${new Date().toISOString().slice(0, 10)}T10:45:00`).getTime(), moodKey: "energetic", moodLabel: "Energetic", icon: "Zap", score: 4.2, color: "#10B981", note: "Mid-morning boost!" },
};
