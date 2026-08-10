import React, { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import {
    TrendingUp,
    Flame,
    Sun,
    Smile,
    Target,
    Zap,
    Activity,
    CloudRain,
    BarChart3,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    ChevronLeft,
    ChevronRight,
    Plus,
    X,
    Calendar as CalendarIcon,
    LineChart,
    Sparkles,
    Heart,
    Compass,
    Moon,
    User,
    Check,
    Sliders,
    Circle,
    Music,
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Rewind,
    FastForward,
    Volume2,
    Headphones,
    Radio,
    ExternalLink,
} from "lucide-react";
import { DoodleBadge } from "./DoodleIllustrations";
import type { MoodLog } from "../types/journal";
export type { MoodLog };

// Native macOS system font stack
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif";

interface MoodOption {
    key: string;
    label: string;
    Icon: React.ElementType;
    iconName: string;
    score: number;
    color: string;
    bg: string;
    lightBg: string;
    gradient: string;
}

const MOOD_OPTIONS: MoodOption[] = [
    { key: "radiant",   label: "Radiant",    Icon: Sparkles,   iconName: "Sparkles",  score: 5.0, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.25)", lightBg: "#FFFBEB", gradient: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)" },
    { key: "peaceful",  label: "Peaceful",   Icon: Heart,      iconName: "Heart",     score: 4.5, color: "#3B82F6", bg: "rgba(59, 130, 246, 0.25)", lightBg: "#EFF6FF", gradient: "linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)" },
    { key: "focused",   label: "Focused",    Icon: Compass,    iconName: "Compass",   score: 4.0, color: "#A855F7", bg: "rgba(168, 85, 247, 0.25)", lightBg: "#F5F3FF", gradient: "linear-gradient(135deg, #C4B5FD 0%, #A855F7 100%)" },
    { key: "energetic", label: "Energetic",  Icon: Zap,        iconName: "Zap",       score: 4.2, color: "#10B981", bg: "rgba(16, 185, 129, 0.25)", lightBg: "#ECFDF5", gradient: "linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)" },
    { key: "stressed",  label: "Stressed",   Icon: Activity,   iconName: "Activity",  score: 2.0, color: "#EF4444", bg: "rgba(239, 68, 68, 0.25)", lightBg: "#FEF2F2", gradient: "linear-gradient(135deg, #FCA5A5 0%, #EF4444 100%)" },
    { key: "low",       label: "Low Energy", Icon: Moon,       iconName: "Moon",      score: 1.5, color: "#94A3B8", bg: "rgba(148, 163, 184, 0.25)", lightBg: "#F8FAFC", gradient: "linear-gradient(135deg, #CBD5E1 0%, #64748B 100%)" },
];

const getMoodOption = (key: string): MoodOption => MOOD_OPTIONS.find((m) => m.key === key) ?? MOOD_OPTIONS[1];

interface MoodSong {
    title: string;
    artist: string;
    genre: string;
    duration: string;
    coverUrl: string;
    coverGradient: string;
    spotifyUrl: string;
    youtubeUrl: string;
}

const MOOD_SONGS: Record<string, MoodSong[]> = {
    radiant: [
        {
            title: "Golden Hour",
            artist: "JVKE",
            genre: "Upbeat Orchestral Pop",
            duration: "3:29",
            coverUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)",
            spotifyUrl: "https://open.spotify.com/search/Golden%20Hour%20JVKE",
            youtubeUrl: "https://music.youtube.com/search?q=Golden+Hour+JVKE",
        },
        {
            title: "Walking On Sunshine",
            artist: "Katrina & The Waves",
            genre: "Feel-Good Classic Pop",
            duration: "3:58",
            coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #FEF08A 0%, #EAB308 100%)",
            spotifyUrl: "https://open.spotify.com/search/Walking%20on%20Sunshine",
            youtubeUrl: "https://music.youtube.com/search?q=Walking+on+Sunshine",
        },
        {
            title: "Sunroof",
            artist: "Nicky Youre & dazy",
            genre: "Sunny Summer Pop",
            duration: "2:43",
            coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #FCA5A5 0%, #F59E0B 100%)",
            spotifyUrl: "https://open.spotify.com/search/Sunroof%20Nicky%20Youre",
            youtubeUrl: "https://music.youtube.com/search?q=Sunroof+Nicky+Youre",
        },
    ],
    peaceful: [
        {
            title: "Weightless",
            artist: "Marconi Union",
            genre: "Calm Ambient Soundscape",
            duration: "8:00",
            coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)",
            spotifyUrl: "https://open.spotify.com/search/Weightless%20Marconi%20Union",
            youtubeUrl: "https://music.youtube.com/search?q=Weightless+Marconi+Union",
        },
        {
            title: "River Flows In You",
            artist: "Yiruma",
            genre: "Contemporary Solo Piano",
            duration: "3:08",
            coverUrl: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #BFDBFE 0%, #60A5FA 100%)",
            spotifyUrl: "https://open.spotify.com/search/River%20Flows%20in%20You%20Yiruma",
            youtubeUrl: "https://music.youtube.com/search?q=River+Flows+in+You+Yiruma",
        },
        {
            title: "Gymnopédie No. 1",
            artist: "Erik Satie",
            genre: "Classical Minimalist Piano",
            duration: "3:30",
            coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #A5F3FC 0%, #38BDF8 100%)",
            spotifyUrl: "https://open.spotify.com/search/Erik%20Satie%20Gymnopedie%201",
            youtubeUrl: "https://music.youtube.com/search?q=Erik+Satie+Gymnopedie+1",
        },
    ],
    focused: [
        {
            title: "Cornfield Chase",
            artist: "Hans Zimmer (Interstellar)",
            genre: "Cinematic Organ & Piano",
            duration: "2:06",
            coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #C4B5FD 0%, #A855F7 100%)",
            spotifyUrl: "https://open.spotify.com/search/Interstellar%20Hans%20Zimmer",
            youtubeUrl: "https://music.youtube.com/search?q=Interstellar+Hans+Zimmer",
        },
        {
            title: "Experience",
            artist: "Ludovico Einaudi",
            genre: "Modern Neoclassical Strings",
            duration: "5:15",
            coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #DDD6FE 0%, #8B5CF6 100%)",
            spotifyUrl: "https://open.spotify.com/search/Ludovico%20Einaudi%20Experience",
            youtubeUrl: "https://music.youtube.com/search?q=Ludovico+Einaudi+Experience",
        },
        {
            title: "Lofi Hip Hop Study Beats",
            artist: "Lofi Girl",
            genre: "Chill Lofi Instrumental",
            duration: "3:40",
            coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #E9D5FF 0%, #7C3AED 100%)",
            spotifyUrl: "https://open.spotify.com/search/Lofi%20Girl%20Study%20Beats",
            youtubeUrl: "https://music.youtube.com/search?q=Lofi+Girl+Study+Beats",
        },
    ],
    energetic: [
        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            genre: "Synth-Pop Workout Drive",
            duration: "3:20",
            coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)",
            spotifyUrl: "https://open.spotify.com/search/Blinding%20Lights%20The%20Weeknd",
            youtubeUrl: "https://music.youtube.com/search?q=Blinding+Lights+The+Weeknd",
        },
        {
            title: "Eye of the Tiger",
            artist: "Survivor",
            genre: "Classic High-Energy Rock",
            duration: "4:04",
            coverUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #A7F3D0 0%, #059669 100%)",
            spotifyUrl: "https://open.spotify.com/search/Eye%20of%20the%20Tiger",
            youtubeUrl: "https://music.youtube.com/search?q=Eye+of+the+Tiger",
        },
        {
            title: "Can't Hold Us",
            artist: "Macklemore & Ryan Lewis",
            genre: "Upbeat Hip-Hop Anthem",
            duration: "4:18",
            coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #34D399 0%, #047857 100%)",
            spotifyUrl: "https://open.spotify.com/search/Cant%20Hold%20Us%20Macklemore",
            youtubeUrl: "https://music.youtube.com/search?q=Cant+Hold+Us+Macklemore",
        },
    ],
    stressed: [
        {
            title: "Clair de Lune",
            artist: "Claude Debussy",
            genre: "Calming Classical Piano",
            duration: "5:03",
            coverUrl: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #FCA5A5 0%, #EF4444 100%)",
            spotifyUrl: "https://open.spotify.com/search/Clair%20de%20Lune%20Debussy",
            youtubeUrl: "https://music.youtube.com/search?q=Clair+de+Lune+Debussy",
        },
        {
            title: "Sunset Lover",
            artist: "Petit Biscuit",
            genre: "Chilled Tropical Melodic",
            duration: "3:57",
            coverUrl: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #FECACA 0%, #F87171 100%)",
            spotifyUrl: "https://open.spotify.com/search/Sunset%20Lover%20Petit%20Biscuit",
            youtubeUrl: "https://music.youtube.com/search?q=Sunset+Lover+Petit+Biscuit",
        },
        {
            title: "Acoustic Breeze",
            artist: "Jonathan Roy",
            genre: "Soothing Acoustic Guitar",
            duration: "3:12",
            coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #FFE4E6 0%, #FB7185 100%)",
            spotifyUrl: "https://open.spotify.com/search/Acoustic%20Breeze",
            youtubeUrl: "https://music.youtube.com/search?q=Acoustic+Breeze",
        },
    ],
    low: [
        {
            title: "Banana Pancakes",
            artist: "Jack Johnson",
            genre: "Cozy Acoustic Folk",
            duration: "3:12",
            coverUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #CBD5E1 0%, #64748B 100%)",
            spotifyUrl: "https://open.spotify.com/search/Banana%20Pancakes%20Jack%20Johnson",
            youtubeUrl: "https://music.youtube.com/search?q=Banana+Pancakes+Jack+Johnson",
        },
        {
            title: "Sparks",
            artist: "Coldplay",
            genre: "Mellow Indie Acoustic",
            duration: "3:47",
            coverUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #E2E8F0 0%, #475569 100%)",
            spotifyUrl: "https://open.spotify.com/search/Sparks%20Coldplay",
            youtubeUrl: "https://music.youtube.com/search?q=Sparks+Coldplay",
        },
        {
            title: "Don't Know Why",
            artist: "Norah Jones",
            genre: "Warm Soft Vocal Jazz",
            duration: "3:06",
            coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80",
            coverGradient: "linear-gradient(135deg, #94A3B8 0%, #334155 100%)",
            spotifyUrl: "https://open.spotify.com/search/Dont%20Know%20Why%20Norah%20Jones",
            youtubeUrl: "https://music.youtube.com/search?q=Dont+Know+Why+Norah+Jones",
        },
    ],
};

type LogMap = Record<string, MoodLog>;

function todayStr(): string {
    return new Date().toISOString().slice(0, 10);
}

const SEED_LOGS: LogMap = {
    "2026-07-01": { id:"s1", day:"2026-07-01", time:"12:00", hourSlot:"2026-07-01-12", timestamp:new Date("2026-07-01T12:00:00").getTime(), moodKey:"peaceful", moodLabel:"Peaceful", icon:"Heart", score:4.2, color:"#3B82F6", note:"Great morning coffee." },
    "2026-07-05": { id:"s2", day:"2026-07-05", time:"12:00", hourSlot:"2026-07-05-12", timestamp:new Date("2026-07-05T12:00:00").getTime(), moodKey:"energetic", moodLabel:"Energetic", icon:"Zap", score:4.5, color:"#10B981", note:"Completed sprint goal!" },
    "2026-07-09": { id:"s3", day:"2026-07-09", time:"12:00", hourSlot:"2026-07-09-12", timestamp:new Date("2026-07-09T12:00:00").getTime(), moodKey:"radiant", moodLabel:"Radiant", icon:"Sparkles", score:4.9, color:"#F59E0B", note:"Family weekend getaway." },
    "2026-07-13": { id:"s4", day:"2026-07-13", time:"12:00", hourSlot:"2026-07-13-12", timestamp:new Date("2026-07-13T12:00:00").getTime(), moodKey:"focused", moodLabel:"Focused", icon:"Compass", score:3.9, color:"#A855F7", note:"Deep work session." },
    "2026-07-16": { id:"s5", day:"2026-07-16", time:"12:00", hourSlot:"2026-07-16-12", timestamp:new Date("2026-07-16T12:00:00").getTime(), moodKey:"stressed", moodLabel:"Stressed", icon:"Activity", score:2.4, color:"#EF4444", note:"Tight deadline." },
    "2026-07-20": { id:"s6", day:"2026-07-20", time:"12:00", hourSlot:"2026-07-20-12", timestamp:new Date("2026-07-20T12:00:00").getTime(), moodKey:"peaceful", moodLabel:"Peaceful", icon:"Heart", score:4.6, color:"#3B82F6", note:"Relaxing Sunday walk." },
    "2026-07-24": { id:"s7", day:"2026-07-24", time:"12:00", hourSlot:"2026-07-24-12", timestamp:new Date("2026-07-24T12:00:00").getTime(), moodKey:"radiant", moodLabel:"Radiant", icon:"Sparkles", score:5.0, color:"#F59E0B", note:"Key project milestone!" },
    "2026-07-27": { id:"s8", day:"2026-07-27", time:"12:00", hourSlot:"2026-07-27-12", timestamp:new Date("2026-07-27T12:00:00").getTime(), moodKey:"focused", moodLabel:"Focused", icon:"Compass", score:4.3, color:"#A855F7", note:"Strategic roadmap planning." },
    "2026-07-30": { id:"s9", day:"2026-07-30", time:"12:00", hourSlot:"2026-07-30-12", timestamp:new Date("2026-07-30T12:00:00").getTime(), moodKey:"energetic", moodLabel:"Energetic", icon:"Zap", score:4.7, color:"#10B981", note:"High energy team workout." },
    "2026-08-01": { id:"s10", day:"2026-08-01", time:"12:00", hourSlot:"2026-08-01-12", timestamp:new Date("2026-08-01T12:00:00").getTime(), moodKey:"peaceful", moodLabel:"Peaceful", icon:"Heart", score:4.1, color:"#3B82F6", note:"New month fresh start." },
    "2026-08-03": { id:"s11", day:"2026-08-03", time:"12:00", hourSlot:"2026-08-03-12", timestamp:new Date("2026-08-03T12:00:00").getTime(), moodKey:"radiant", moodLabel:"Radiant", icon:"Sparkles", score:4.8, color:"#F59E0B", note:"Product launch success!" },
    "2026-08-05": { id:"s12", day:todayStr(), time:"12:00", hourSlot:`${todayStr()}-12`, timestamp:new Date(`${todayStr()}T12:00:00`).getTime(), moodKey:"focused", moodLabel:"Focused", icon:"Compass", score:4.2, color:"#A855F7", note:"Dark glassmorphic dashboard." },
};

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

function buildCalendarDays(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

function dateKey(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

interface GraphPoint {
    id: string;
    day: string;
    score: number;
    moodLabel: string;
    moodKey: string;
    color: string;
    note?: string;
    time?: string;
    isLogged: boolean;
}

function buildSparkPath(pts: { x: number; y: number }[]): string {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(i - 1, 0)];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[Math.min(i + 2, pts.length - 1)];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
}

import { useJournal, getHourSlotInfo } from "../context/JournalContext";

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
    const today = new Date();
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
        logStatusActive,
        setLogStatusActive,
        autoSyncActive,
        setAutoSyncActive,
        isBreathing,
        setIsBreathing,
        addMoodLog,
        deleteMoodLog,
    } = useJournal();

    const selectedMoodOption = ctxSelectedMoodOption || MOOD_OPTIONS[0];
    const setSelectedMoodOption = setCtxSelectedMoodOption;
    const modalMood = ctxModalMood || MOOD_OPTIONS[0];
    const setModalMood = setCtxModalMood;

    // Graph hover state
    const [hoverIdx, setHoverIdx] = useState<number | null>(null);

    // Toast state for future date validation error
    const [futureDateToast, setFutureDateToast] = useState(false);

    // Quick Log date & time inputs
    const [selectedLogDate, setSelectedLogDate] = useState(() => todayStr());
    const [selectedLogTime, setSelectedLogTime] = useState(() => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    });

    // Modal date & time inputs
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

    const filteredLogsArray = useMemo(() => {
        if (categoryFilter === "all") return logsArray;
        return logsArray.filter(l => l.moodKey === categoryFilter);
    }, [logsArray, categoryFilter]);

    // Generate continuous date & time data for graph
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

    const W = 420;
    const H = 120;

    const chartPoints = useMemo(() => {
        if (graphTimeframePoints.length === 0) return [];
        const padX = 18;
        const availW = W - padX * 2;
        if (graphTimeframePoints.length === 1) {
            const pt = graphTimeframePoints[0];
            const y = H - 15 - ((pt.score - 1.0) / (5.0 - 1.0)) * (H - 30);
            return [
                { x: padX, y, pt },
                { x: W - padX, y, pt },
            ];
        }
        return graphTimeframePoints.map((pt, i) => {
            const x = padX + (i / (graphTimeframePoints.length - 1)) * availW;
            // Scale score (1.0 to 5.0) onto canvas height H with 15% padding top and bottom
            const y = H - 15 - ((pt.score - 1.0) / (5.0 - 1.0)) * (H - 30);
            return { x, y, pt };
        });
    }, [graphTimeframePoints]);

    const sparkPath = useMemo(() => buildSparkPath(chartPoints), [chartPoints]);
    const areaPath = useMemo(() => {
        if (!sparkPath || chartPoints.length === 0) return "";
        const firstX = chartPoints[0].x;
        const lastX = chartPoints[chartPoints.length - 1].x;
        return `${sparkPath} L ${lastX} ${H} L ${firstX} ${H} Z`;
    }, [sparkPath, chartPoints]);

    const handleLogTodayMood = () => {
        if (isFutureDateTime(selectedLogDate, selectedLogTime)) {
            setFutureDateToast(true);
            setTimeout(() => setFutureDateToast(false), 3000);
            return;
        }
        addMoodLog(
            selectedLogDate,
            selectedMoodOption.key,
            selectedMoodOption.label,
            selectedMoodOption.iconName,
            selectedMoodOption.score,
            selectedMoodOption.color,
            noteInput.trim() || `Feeling ${selectedMoodOption.label}`,
            selectedLogTime
        );
        setNoteInput("");
        setLogSuccess(true);
        setTimeout(() => setLogSuccess(false), 2500);
    };

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




    // Calendar month navigation with year wrapping
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
            {/* Future Date Error Toast Notification */}
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

            {/* Section Header — matching other sections */}

            <div style={{ textAlign: "center", marginBottom: 36 }}>
                <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 46px)", color: "#FFFFFF", marginTop: 0, marginBottom: 0 }}>
                    Mood & Wellness <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: "#FFFFFF" }}>Analytics</span>
                </h2>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "rgba(255, 255, 255, 0.95)", fontSize: "16px", maxWidth: 620, margin: "10px auto 0 auto" }}>
                    Track your emotional wellness over time. Log daily moods, visualize trends, and gain insights into your mental well-being.
                </p>
            </div>

            <div className="mood-tracker-wrapper" style={{ position: "relative", zIndex: 2, width: "100%", margin: "0 auto", display: "flex", gap: 20 }}>
                
                {/* Floating Left Vertical Navigation Bar (Translucent Morphed Dock) */}
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
                            .mood-left-dock {
                                display: none !important;
                            }
                            .mood-tracker-wrapper {
                                gap: 0 !important;
                            }
                        }
                        @media (max-width: 640px) {
                            .mood-tracker-window {
                                padding: 16px 12px !important;
                                border-radius: 20px !important;
                            }
                        }
                    `}</style>

                    {/* Top Header Window Bar with Monochrome Window Controls & Nav Tabs */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 28 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {/* Sleek Monochromatic Glass Window Control Dots */}
                            <div style={{ display: "flex", gap: 7 }}>
                                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(15, 23, 42, 0.18)", border: "1px solid rgba(255, 255, 255, 0.6)" }} />
                                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(15, 23, 42, 0.12)", border: "1px solid rgba(255, 255, 255, 0.6)" }} />
                                <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgba(15, 23, 42, 0.12)", border: "1px solid rgba(255, 255, 255, 0.6)" }} />
                            </div>
                        </div>

                        {/* Top Navigation Bar Pills (White Active Pill with Relevant Icons) */}
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

                        {/* User Profile Badge */}
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

                        {/* Ring Metric & Top Stats Columns */}
                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
                            {/* Positivity Rate Donut Progress Indicator */}
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{ position: "relative", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="3.5" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#2563EB" strokeWidth="3.5" strokeDasharray={`${positivityRate}, 100`} style={{ transition: "stroke-dasharray 0.6s ease" }} />
                                    </svg>
                                    <span style={{ position: "absolute", fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{positivityRate}%</span>
                                </div>
                            </div>

                            {/* Stat Columns */}
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

                    {/* Category Filter Pills Row (White Active Pill & Soft Light Pills) */}
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

                    <style>{`
                        .mood-dash-grid {
                            display: grid;
                            grid-template-columns: minmax(0, 1fr) 330px;
                            gap: 20px;
                        }
                        .mood-dash-inner-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 18px;
                            margin-bottom: 18px;
                        }
                        .mood-stat-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                            gap: 12px;
                        }
                        .mood-table-overflow {
                            width: 100%;
                            overflow-x: auto;
                            -webkit-overflow-scrolling: touch;
                        }
                        @media (max-width: 1120px) {
                            .mood-dash-grid {
                                grid-template-columns: 1fr !important;
                            }
                        }
                        @media (max-width: 880px) {
                            .mood-dash-inner-grid {
                                grid-template-columns: 1fr !important;
                            }
                        }
                        @media (max-width: 768px) {
                            .mood-tracker-wrapper {
                                flex-direction: column !important;
                                gap: 14px !important;
                            }
                            .mood-left-dock {
                                width: 100% !important;
                                min-height: auto !important;
                                height: auto !important;
                                flex-direction: row !important;
                                padding: 10px 16px !important;
                                justify-content: space-between !important;
                                border-radius: 20px !important;
                            }
                            .mood-left-dock > div {
                                flex-direction: row !important;
                                justify-content: space-around !important;
                                width: 100% !important;
                            }
                            .mood-tracker-window {
                                padding: 16px 14px !important;
                                border-radius: 22px !important;
                            }
                        }
                    `}</style>

                    {/* ======= TAB CONTENT: DASHBOARD ======= */}
                    {activeNavTab === "Dashboard" && (
                    <div className="mood-dash-grid">
                        
                        {/* INNER SOFT GLASS CARD */}
                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.45)",
                                backdropFilter: "blur(24px)",
                                borderRadius: 26,
                                border: "1px solid rgba(255, 255, 255, 0.65)",
                                padding: "24px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.7)",
                            }}
                        >
                            {/* Inner Header Row */}
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: 10, background: "rgba(255, 255, 255, 0.7)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.9)" }}>
                                        <LineChart size={16} color="#2563EB" />
                                    </div>
                                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>
                                        {MONTH_NAMES[calMonth]} {calYear} Overview Graph
                                    </span>
                                </div>

                                {/* Graph Timeframe Segmented Switcher (White Active Switch) */}
                                <div style={{ display: "flex", background: "rgba(255, 255, 255, 0.5)", padding: 4, borderRadius: 999, border: "1px solid rgba(255, 255, 255, 0.7)" }}>
                                    <button
                                        onClick={() => setTimeframe("weekly")}
                                        style={{ border: "none", background: timeframe === "weekly" ? "#FFFFFF" : "transparent", color: timeframe === "weekly" ? "#0F172A" : "#334155", fontWeight: timeframe === "weekly" ? 650 : 500, fontSize: 11, padding: "4px 14px", borderRadius: 999, cursor: "pointer", transition: "all 0.2s ease", boxShadow: timeframe === "weekly" ? "0 2px 8px rgba(15, 23, 42, 0.08)" : "none" }}
                                    >
                                        Weekly
                                    </button>
                                    <button
                                        onClick={() => setTimeframe("monthly")}
                                        style={{ border: "none", background: timeframe === "monthly" ? "#FFFFFF" : "transparent", color: timeframe === "monthly" ? "#0F172A" : "#334155", fontWeight: timeframe === "monthly" ? 650 : 500, fontSize: 11, padding: "4px 14px", borderRadius: 999, cursor: "pointer", transition: "all 0.2s ease", boxShadow: timeframe === "monthly" ? "0 2px 8px rgba(15, 23, 42, 0.08)" : "none" }}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => setTimeframe("3months")}
                                        style={{ border: "none", background: timeframe === "3months" ? "#FFFFFF" : "transparent", color: timeframe === "3months" ? "#0F172A" : "#334155", fontWeight: timeframe === "3months" ? 650 : 500, fontSize: 11, padding: "4px 14px", borderRadius: 999, cursor: "pointer", transition: "all 0.2s ease", boxShadow: timeframe === "3months" ? "0 2px 8px rgba(15, 23, 42, 0.08)" : "none" }}
                                    >
                                        3 Months
                                    </button>
                                </div>
                            </div>

                            {/* Inner Content Grid: Calendar Sub-Widget + Category Sub-Widget */}
                            <div className="mood-dash-inner-grid">
                                
                                {/* Calendar Sub-Widget */}
                                <div style={{ background: "rgba(255, 255, 255, 0.55)", borderRadius: 20, padding: "18px", border: "1px solid rgba(255, 255, 255, 0.8)", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>
                                            Calendar ({MONTH_NAMES[calMonth]} {calYear})
                                        </span>
                                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                                            <button onClick={prevMonth} title="Previous Month" style={{ background: "#FFFFFF", border: "1px solid rgba(255, 255, 255, 0.9)", borderRadius: 6, color: "#0F172A", cursor: "pointer", padding: "2px 8px", display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 600, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                                                <ChevronLeft size={13} /> {calMonth === 0 ? "Dec" : MONTH_NAMES[calMonth - 1].slice(0, 3)}
                                            </button>
                                            <button onClick={nextMonth} title="Next Month" style={{ background: "#FFFFFF", border: "1px solid rgba(255, 255, 255, 0.9)", borderRadius: 6, color: "#0F172A", cursor: "pointer", padding: "2px 8px", display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 600, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
                                                {calMonth === 11 ? "Jan" : MONTH_NAMES[calMonth + 1].slice(0, 3)} <ChevronRight size={13} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Days Header */}
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center", marginBottom: 8 }}>
                                        {DAYS_OF_WEEK.map((d, i) => (
                                            <span key={i} style={{ fontSize: 11, fontWeight: 600, color: "#475569" }}>{d}</span>
                                        ))}
                                    </div>

                                    {/* Calendar Days Grid */}
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                                        {calCells.map((day, idx) => {
                                            if (!day) return <div key={idx} style={{ height: 28 }} />;
                                            const key = dateKey(calYear, calMonth, day);
                                            const dayLogs = Object.values(logs).filter(l => l.day === key);
                                            const log = dayLogs.length > 0 ? dayLogs[dayLogs.length - 1] : null;
                                            const mood = log ? getMoodOption(log.moodKey) : null;
                                            const isToday = key === todayKey;
                                            const isFuture = key > todayKey;

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => !isFuture && openModal(key)}
                                                    title={isFuture ? `Future date (${key}) - logging disabled` : `${key}${log ? " - " + log.moodLabel : ""}`}
                                                    style={{
                                                        height: 28,
                                                        borderRadius: 999,
                                                        border: isToday ? "2px solid #2563EB" : "1px solid rgba(255, 255, 255, 0.8)",
                                                        background: isToday ? "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" : mood ? mood.color : isFuture ? "rgba(226, 232, 240, 0.5)" : "#FFFFFF",
                                                        color: isToday ? "#FFFFFF" : mood ? "#FFFFFF" : isFuture ? "#94A3B8" : "#1E293B",
                                                        fontSize: 11.5,
                                                        fontWeight: 600,
                                                        cursor: isFuture ? "not-allowed" : "pointer",
                                                        opacity: isFuture ? 0.45 : 1,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                                        boxShadow: isToday ? "0 4px 12px rgba(37, 99, 235, 0.35)" : mood ? `0 3px 8px ${mood.color}40` : "0 2px 6px rgba(0,0,0,0.04)",
                                                    }}
                                                    onMouseEnter={(e) => { if (!isFuture) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.15)"; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Mood Category Selection Sub-Widget */}
                                <div style={{ background: "rgba(255, 255, 255, 0.55)", borderRadius: 20, padding: "18px", border: "1px solid rgba(255, 255, 255, 0.8)", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>
                                            Quick Log Mood
                                        </span>
                                        <span style={{ fontSize: 11, fontWeight: 750, color: selectedMoodOption.color }}>
                                            Score: {selectedMoodOption.score.toFixed(1)}
                                        </span>
                                    </div>

                                    {/* Date & Time Selectors */}
                                    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                                        <input
                                            type="date"
                                            max={todayStr()}
                                            value={selectedLogDate}
                                            onChange={(e) => setSelectedLogDate(e.target.value)}
                                            style={{
                                                flex: 1,
                                                padding: "4px 8px",
                                                borderRadius: 8,
                                                border: "1px solid rgba(15, 23, 42, 0.15)",
                                                background: "#FFFFFF",
                                                fontSize: 11,
                                                fontWeight: 600,
                                                color: "#0F172A",
                                                outline: "none",
                                            }}
                                        />
                                        <input
                                            type="time"
                                            value={selectedLogTime}
                                            onChange={(e) => setSelectedLogTime(e.target.value)}
                                            style={{
                                                width: 85,
                                                padding: "4px 8px",
                                                borderRadius: 8,
                                                border: "1px solid rgba(15, 23, 42, 0.15)",
                                                background: "#FFFFFF",
                                                fontSize: 11,
                                                fontWeight: 600,
                                                color: "#0F172A",
                                                outline: "none",
                                            }}
                                        />
                                    </div>

                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, marginBottom: 10 }}>
                                        {MOOD_OPTIONS.map((m) => {
                                            const isSel = selectedMoodOption.key === m.key;
                                            return (
                                                <button
                                                    key={m.key}
                                                    onClick={() => setSelectedMoodOption(m)}
                                                    style={{
                                                        border: isSel ? "1px solid rgba(255, 255, 255, 0.9)" : "1px solid rgba(255, 255, 255, 0.7)",
                                                        background: isSel ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                                                        color: isSel ? m.color : "#334155",
                                                        borderRadius: 8,
                                                        padding: "5px 4px",
                                                        fontSize: 10.5,
                                                        fontWeight: isSel ? 750 : 500,
                                                        cursor: "pointer",
                                                        textAlign: "center",
                                                        transition: "all 0.15s ease",
                                                        boxShadow: isSel ? "0 2px 8px rgba(15, 23, 42, 0.08)" : "none",
                                                    }}
                                                >
                                                    {m.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={handleLogTodayMood}
                                        disabled={isFutureDateTime(selectedLogDate, selectedLogTime)}
                                        style={{
                                            width: "100%",
                                            border: "none",
                                            background: isFutureDateTime(selectedLogDate, selectedLogTime)
                                                ? "#94A3B8"
                                                : logSuccess ? "#10B981" : "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                                            color: "#FFFFFF",
                                            fontSize: 11.5,
                                            fontWeight: 700,
                                            padding: "7px 0",
                                            borderRadius: 10,
                                            cursor: isFutureDateTime(selectedLogDate, selectedLogTime) ? "not-allowed" : "pointer",
                                            boxShadow: isFutureDateTime(selectedLogDate, selectedLogTime) ? "none" : "0 3px 10px rgba(37, 99, 235, 0.3)",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        {isFutureDateTime(selectedLogDate, selectedLogTime)
                                            ? "⚠️ Cannot Log Future"
                                            : logSuccess ? "✓ Logged!" : "+ Log Mood Entry"}
                                    </button>
                                </div>
                            </div>




                            {/* Bottom Stat Row */}
                            <div className="mood-stat-grid" style={{ paddingTop: 16, borderTop: "1px solid rgba(255, 255, 255, 0.7)" }}>
                                <div>
                                    <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, display: "block" }}>Logged Days</span>
                                    <span style={{ fontSize: 19, fontWeight: 700, color: "#0F172A" }}>{totalLogs} <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>/ month</span></span>
                                </div>
                                <div>
                                    <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, display: "block" }}>Current Streak</span>
                                    <span style={{ fontSize: 19, fontWeight: 700, color: "#0F172A" }}>{streak}</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, display: "block" }}>Positivity Score</span>
                                    <span style={{ fontSize: 19, fontWeight: 700, color: "#0F172A" }}>{positivityRate}%</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, display: "block" }}>Dominant Mood</span>
                                    <span style={{ fontSize: 17, fontWeight: 700, color: dominantMood.color, display: "flex", alignItems: "center", gap: 4 }}>
                                        {dominantMood.label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE FUNCTIONAL WIDGET CARDS */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            
                            {/* WIDGET 1: Weekly Goal & Daily Streak Progress */}
                            <div
                                style={{
                                    background: "rgba(255, 255, 255, 0.55)",
                                    backdropFilter: "blur(20px)",
                                    borderRadius: 24,
                                    border: "1px solid rgba(255, 255, 255, 0.8)",
                                    padding: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    minHeight: 200,
                                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.7)",
                                    transition: "all 0.25s ease",
                                }}
                            >
                                {/* Header */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div style={{ width: 30, height: 30, borderRadius: 10, background: "rgba(37, 99, 235, 0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <Target size={16} color="#2563EB" />
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>Weekly Goal</span>
                                    </div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", background: "#FFFFFF", padding: "4px 10px", borderRadius: 999, border: "1px solid rgba(37, 99, 235, 0.2)", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                                        {logsArray.length > 5 ? "5 / 7 Days" : `${logsArray.length} / 7 Days`}
                                    </span>
                                </div>

                                {/* Interactive Weekly Day Pills */}
                                <div style={{ marginBottom: 14 }}>
                                    <span style={{ fontSize: 10.5, color: "#475569", fontWeight: 600, display: "block", marginBottom: 8 }}>
                                        This Week's Activity (Click to log)
                                    </span>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                                        {["M", "T", "W", "T", "F", "S", "S"].map((dayName, idx) => {
                                            const dayOffset = idx - (today.getDay() === 0 ? 6 : today.getDay() - 1);
                                            const d = new Date();
                                            d.setDate(today.getDate() + dayOffset);
                                            const key = d.toISOString().slice(0, 10);
                                            const dayLogs = Object.values(logs).filter(l => l.day === key);
                                            const log = dayLogs.length > 0 ? dayLogs[dayLogs.length - 1] : null;
                                            const mood = log ? getMoodOption(log.moodKey) : null;
                                            const isToday = key === todayKey;
                                            const isFuture = key > todayKey;

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => openModal(key)}
                                                    title={isFuture ? `Future date (${key}) - logging disabled` : `${dayName} - ${key}`}
                                                    style={{
                                                        border: isToday ? "2px solid #2563EB" : "1px solid rgba(255, 255, 255, 0.8)",
                                                        background: isToday ? "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)" : mood ? mood.bg : isFuture ? "rgba(226, 232, 240, 0.5)" : "#FFFFFF",
                                                        color: isToday ? "#FFFFFF" : isFuture ? "#94A3B8" : "#0F172A",
                                                        borderRadius: 10,
                                                        padding: "6px 0",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        gap: 3,
                                                        cursor: isFuture ? "not-allowed" : "pointer",
                                                        opacity: isFuture ? 0.45 : 1,
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        transition: "all 0.15s ease",
                                                        boxShadow: isToday ? "0 4px 10px rgba(37,99,235,0.3)" : "none",
                                                    }}
                                                >
                                                    <span>{dayName}</span>
                                                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: isToday ? "#FFFFFF" : mood ? mood.color : isFuture ? "#94A3B8" : "#CBD5E1" }} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>


                                {/* Footer Action Row */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid rgba(255, 255, 255, 0.6)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <Flame size={14} color="#D97706" />
                                        <span style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>{streak} Day Streak</span>
                                    </div>
                                    <button
                                        onClick={() => openModal(todayKey)}
                                        style={{
                                            border: "none",
                                            background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                                            color: "#FFFFFF",
                                            fontSize: 11,
                                            fontWeight: 650,
                                            padding: "5px 12px",
                                            borderRadius: 999,
                                            cursor: "pointer",
                                            boxShadow: "0 3px 10px rgba(37, 99, 235, 0.3)",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        + Log Today
                                    </button>
                                </div>
                            </div>

                            {/* WIDGET 2: Liquid Glass Music Player Widget (Exact Replica of User Reference Photo) */}
                            <div
                                style={{
                                    position: "relative",
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 100%)",
                                    backdropFilter: "blur(35px) saturate(190%)",
                                    WebkitBackdropFilter: "blur(35px) saturate(190%)",
                                    borderRadius: 24,
                                    border: "1.5px solid rgba(255, 255, 255, 0.7)",
                                    padding: "14px 16px",
                                    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.12), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.8)",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                    color: "#0F172A",
                                }}
                            >
                                {/* Mood Switcher Header */}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                                    <span style={{ fontSize: 11, fontWeight: 750, color: "#0F172A", display: "flex", alignItems: "center", gap: 5 }}>
                                        <Music size={12} color={getMoodOption(songMood).color} />
                                        Mood Music
                                    </span>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3, background: "rgba(15, 23, 42, 0.06)", padding: "3px 4px", borderRadius: 16, maxWidth: "100%" }}>
                                        {MOOD_OPTIONS.map((m) => {
                                            const isSel = songMood === m.key;
                                            return (
                                                <button
                                                    key={m.key}
                                                    onClick={() => {
                                                        setSongMood(m.key);
                                                        setSongIndex(0);
                                                        setIsPlayingMusic(true);
                                                    }}
                                                    style={{
                                                        border: "none",
                                                        background: isSel ? "#FFFFFF" : "transparent",
                                                        color: isSel ? m.color : "#475569",
                                                        fontSize: 9.5,
                                                        fontWeight: isSel ? 750 : 500,
                                                        padding: "3px 8px",
                                                        borderRadius: 12,
                                                        cursor: "pointer",
                                                        whiteSpace: "nowrap",
                                                        transition: "all 0.15s ease",
                                                        boxShadow: isSel ? "0 2px 6px rgba(0, 0, 0, 0.08)" : "none",
                                                    }}
                                                >
                                                    {m.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Exact Replica of User Image Player Layout */}
                                {(() => {
                                    const songList = MOOD_SONGS[songMood] || MOOD_SONGS["radiant"];
                                    const currentSong = songList[songIndex % songList.length];
                                    const moodOpt = getMoodOption(songMood);

                                    return (
                                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                            {/* Main Player Frame (Album Art + Translucent Glass Visualizer Box + Vertical Volume Slider) */}
                                            <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                                                
                                                {/* Left: Square Cover Artwork Image */}
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        width: 105,
                                                        height: 105,
                                                        borderRadius: 14,
                                                        overflow: "hidden",
                                                        flexShrink: 0,
                                                        boxShadow: "0 8px 22px rgba(15, 23, 42, 0.2)",
                                                        background: currentSong.coverGradient,
                                                        border: "1px solid rgba(255, 255, 255, 0.6)",
                                                    }}
                                                >
                                                    <img
                                                        src={currentSong.coverUrl}
                                                        alt={currentSong.title}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                            transform: isPlayingMusic ? "scale(1.05)" : "scale(1)",
                                                            transition: "transform 0.4s ease",
                                                        }}
                                                        onError={(e) => {
                                                            (e.currentTarget as HTMLImageElement).style.opacity = "0";
                                                        }}
                                                    />
                                                </div>

                                                {/* Middle: Inner Translucent Blue-Glass Visualizer & Control Box */}
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        background: "rgba(30, 58, 138, 0.25)",
                                                        backdropFilter: "blur(25px)",
                                                        WebkitBackdropFilter: "blur(25px)",
                                                        borderRadius: 14,
                                                        border: "1px solid rgba(255, 255, 255, 0.45)",
                                                        padding: "8px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "space-between",
                                                        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                                                        minWidth: 0,
                                                    }}
                                                >
                                                    {/* White Dot Matrix Spectrum Bars */}
                                                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 46, padding: "2px 2px" }}>
                                                        {[14, 22, 10, 28, 18, 24, 12, 30, 20, 16, 26, 14, 22, 18].map((barHeight, idx) => (
                                                            <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                                                                {Array.from({ length: 6 }).map((_, dotIdx) => {
                                                                    const threshold = (6 - dotIdx) * 5;
                                                                    const active = isPlayingMusic && barHeight >= threshold;
                                                                    return (
                                                                        <span
                                                                            key={dotIdx}
                                                                            style={{
                                                                                width: 2.5,
                                                                                height: 2.5,
                                                                                borderRadius: 1,
                                                                                background: active ? "#FFFFFF" : "rgba(255, 255, 255, 0.35)",
                                                                                transition: "background 0.2s ease",
                                                                                boxShadow: active ? "0 0 5px #FFFFFF" : "none",
                                                                            }}
                                                                        />
                                                                    );
                                                                })}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Scrubber Progress Bar */}
                                                    <div style={{ width: "100%", height: 2.5, background: "rgba(255, 255, 255, 0.3)", borderRadius: 99, position: "relative", overflow: "hidden", margin: "2px 0" }}>
                                                        <div
                                                            style={{
                                                                width: isPlayingMusic ? "60%" : "0%",
                                                                height: "100%",
                                                                background: "#FFFFFF",
                                                                borderRadius: 99,
                                                                transition: "width 0.4s ease",
                                                                boxShadow: "0 0 4px #FFFFFF",
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Exact 5 White Audio Control Icons: <<, |<, (||), >|, >> */}
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                                        <button
                                                            onClick={() => setSongIndex((prev) => Math.max(0, prev - 1))}
                                                            style={{ border: "none", background: "transparent", color: "rgba(255,255,255,0.85)", cursor: "pointer", padding: 1, display: "flex" }}
                                                            title="Rewind"
                                                        >
                                                            <Rewind size={11} />
                                                        </button>
                                                        <button
                                                            onClick={() => setSongIndex((prev) => Math.max(0, prev - 1))}
                                                            style={{ border: "none", background: "transparent", color: "#FFFFFF", cursor: "pointer", padding: 1, display: "flex" }}
                                                            title="Previous"
                                                        >
                                                            <SkipBack size={11} />
                                                        </button>
                                                        <button
                                                            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                                                            style={{
                                                                border: "1px solid rgba(255,255,255,0.8)",
                                                                background: "rgba(255, 255, 255, 0.35)",
                                                                color: "#FFFFFF",
                                                                width: 22,
                                                                height: 22,
                                                                borderRadius: "50%",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                cursor: "pointer",
                                                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                                                                transition: "all 0.15s ease",
                                                            }}
                                                            title={isPlayingMusic ? "Pause" : "Play"}
                                                        >
                                                            {isPlayingMusic ? <Pause size={10} /> : <Play size={10} style={{ marginLeft: 1 }} />}
                                                        </button>
                                                        <button
                                                            onClick={() => setSongIndex((prev) => prev + 1)}
                                                            style={{ border: "none", background: "transparent", color: "#FFFFFF", cursor: "pointer", padding: 1, display: "flex" }}
                                                            title="Next"
                                                        >
                                                            <SkipForward size={11} />
                                                        </button>
                                                        <button
                                                            onClick={() => setSongIndex((prev) => prev + 1)}
                                                            style={{ border: "none", background: "transparent", color: "rgba(255,255,255,0.85)", cursor: "pointer", padding: 1, display: "flex" }}
                                                            title="Fast Forward"
                                                        >
                                                            <FastForward size={11} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Far Right: Vertical Volume Bar Slider (Exact match of reference image) */}
                                                <div
                                                    style={{
                                                        width: 22,
                                                        background: "rgba(255, 255, 255, 0.22)",
                                                        backdropFilter: "blur(20px)",
                                                        borderRadius: 14,
                                                        border: "1px solid rgba(255, 255, 255, 0.45)",
                                                        padding: "6px 0",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                                                    }}
                                                >
                                                    {/* Vertical White Volume Track */}
                                                    <div style={{ width: 3, flex: 1, background: "rgba(255, 255, 255, 0.3)", borderRadius: 99, position: "relative", overflow: "hidden", margin: "2px 0" }}>
                                                        <div style={{ position: "absolute", bottom: 0, width: "100%", height: "75%", background: "#FFFFFF", borderRadius: 99, boxShadow: "0 0 4px #FFFFFF" }} />
                                                    </div>

                                                    {/* Speaker Icon at Bottom */}
                                                    <Volume2 size={11} color="#FFFFFF" style={{ marginTop: 2 }} />
                                                </div>
                                            </div>

                                            {/* Bottom Song Title & Streaming Badges Bar */}
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(20px)", padding: "7px 10px", borderRadius: 12, border: "1px solid rgba(255, 255, 255, 0.6)" }}>
                                                <div style={{ flex: 1, minWidth: 0, paddingRight: 6 }}>
                                                    <span style={{ fontSize: 11.5, fontWeight: 750, color: "#0F172A", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
                                                        {currentSong.title} — {currentSong.artist}
                                                    </span>
                                                </div>

                                                {/* Spotify & YouTube Listen Links */}
                                                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                                                    <a
                                                        href={currentSong.spotifyUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            background: "#1DB954",
                                                            color: "#FFFFFF",
                                                            textDecoration: "none",
                                                            fontSize: 9,
                                                            fontWeight: 750,
                                                            padding: "3px 7px",
                                                            borderRadius: 999,
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: 3,
                                                            boxShadow: "0 2px 6px rgba(29, 185, 84, 0.25)",
                                                        }}
                                                        title="Listen on Spotify"
                                                    >
                                                        <Music size={9} />
                                                        <span>Spotify</span>
                                                    </a>
                                                    <a
                                                        href={currentSong.youtubeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            background: "#FF0000",
                                                            color: "#FFFFFF",
                                                            textDecoration: "none",
                                                            fontSize: 9,
                                                            fontWeight: 750,
                                                            padding: "3px 7px",
                                                            borderRadius: 999,
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: 3,
                                                            boxShadow: "0 2px 6px rgba(255, 0, 0, 0.25)",
                                                        }}
                                                        title="Listen on YouTube Music"
                                                    >
                                                        <Radio size={9} />
                                                        <span>YouTube</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                        </div>
                    </div>
                    )}

                    {/* ======= TAB CONTENT: CALENDAR ======= */}
                    {activeNavTab === "Calendar" && (
                    <div style={{ background: "rgba(255, 255, 255, 0.35)", backdropFilter: "blur(24px)", borderRadius: 26, border: "1px solid rgba(255, 255, 255, 0.55)", padding: "28px", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 34, height: 34, borderRadius: 12, background: "rgba(15, 23, 42, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <CalendarIcon size={18} color="#0F172A" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>{MONTH_NAMES[calMonth]} {calYear}</h3>
                                    <span style={{ fontSize: 11.5, color: "#475569", fontWeight: 600 }}>Click any date to log or edit a mood entry</span>
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

                        {/* Calendar Grid — Full Size */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                            {calCells.map((day, idx) => {
                                if (!day) return <div key={idx} style={{ height: 64 }} />;
                                const key = dateKey(calYear, calMonth, day);
                                const dayLogs = Object.values(logs).filter(l => l.day === key);
                                const log = dayLogs.length > 0 ? dayLogs[dayLogs.length - 1] : null;
                                const mood = log ? getMoodOption(log.moodKey) : null;
                                const isToday = key === todayKey;
                                const isFuture = key > todayKey;
                                const MoodIcon = mood?.Icon;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => openModal(key)}
                                        title={isFuture ? `Future date (${key}) - logging disabled` : `${key}${log ? " - " + log.moodLabel : ""}`}
                                        style={{
                                            height: 64,
                                            borderRadius: 14,
                                            border: isToday ? "2px solid #0F172A" : "1px solid rgba(255, 255, 255, 0.7)",
                                            background: isToday ? "#0F172A" : mood ? `${mood.color}25` : isFuture ? "rgba(226, 232, 240, 0.4)" : "rgba(255, 255, 255, 0.5)",
                                            color: isToday ? "#FFFFFF" : isFuture ? "#94A3B8" : "#0F172A",
                                            cursor: isFuture ? "not-allowed" : "pointer",
                                            opacity: isFuture ? 0.4 : 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 4,
                                            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                                            boxShadow: isToday ? "0 4px 12px rgba(15, 23, 42, 0.25)" : "0 2px 6px rgba(15, 23, 42, 0.03)",
                                        }}
                                        onMouseEnter={(e) => { if (!isFuture) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
                                    >
                                        <span style={{ fontSize: 13, fontWeight: 800 }}>{day}</span>
                                        {mood && MoodIcon && <MoodIcon size={14} color={isToday ? "#FFFFFF" : mood.color} />}
                                        {log?.time && (
                                            <span style={{ fontSize: 9.5, color: isToday ? "rgba(255,255,255,0.8)" : "#64748B", fontWeight: 600 }}>
                                                {log.time}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>


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

                        {/* Log Table Container with Horizontal Scroll */}
                        <div className="mood-table-overflow">
                            <div style={{ minWidth: 540 }}>
                                {/* Log Table Header */}
                                <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 90px 70px 60px", gap: 12, padding: "10px 16px", borderRadius: 12, background: "rgba(255, 255, 255, 0.5)", marginBottom: 8, border: "1px solid rgba(255, 255, 255, 0.7)" }}>
                                    <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>DATE</span>
                                    <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>NOTE</span>
                                    <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>MOOD</span>
                                    <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>SCORE</span>
                                    <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", letterSpacing: "0.04em" }}>ACTION</span>
                                </div>

                                {/* Log Rows */}
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

                        {/* EXACT SHADCN AREA CHART - INTERACTIVE CARD */}
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
                            {/* Card Top Header & Select Box (Clean minimal style) */}
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 16 }}>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 4px 0", letterSpacing: "-0.01em" }}>
                                        Area Chart
                                    </h3>
                                    <span style={{ fontSize: 12, color: "#64748B", fontWeight: 400 }}>
                                        Showing mood trend for the {timeframe === "weekly" ? "last 7 days" : timeframe === "monthly" ? "last 30 days" : "last 3 months"}
                                    </span>
                                </div>
                                
                                {/* Dropdown Select Box */}
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

                            {/* Clean Dual Layered Area Chart */}
                            <div style={{ width: "100%", height: 250 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={graphTimeframePoints.map((pt) => {
                                            const d = new Date(pt.day + "T12:00:00");
                                            const dayNum = d.getDate();
                                            const baseWellness = Number((2.8 + Math.cos(dayNum * 0.45) * 0.85).toFixed(1));
                                            const timeLabel = pt.time ? ` (${pt.time})` : "";
                                            
                                            // Map score to ordinal levels 1..6 for clean equal Y-axis spacing
                                            let level = 3;
                                            if (pt.score >= 4.8) level = 6;      // 5.0 Radiant
                                            else if (pt.score >= 4.4) level = 5; // 4.5 Peaceful
                                            else if (pt.score >= 4.1) level = 4; // 4.2 Energetic
                                            else if (pt.score >= 3.0) level = 3; // 4.0 Focused
                                            else if (pt.score >= 1.8) level = 2; // 2.0 Stressed
                                            else level = 1;                      // 1.5 Low Energy

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
                                            {/* Layer 1: Light Sky Blue Gradient Fill */}
                                            <linearGradient id="shadcnAreaMood" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.45} />
                                                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.02} />
                                            </linearGradient>
                                            {/* Layer 2: Royal Blue Gradient Fill */}
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

                                        {/* Rich Tooltip with Time & Mood Score details */}
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

                            {/* Bottom Legend Row */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, marginTop: 16, paddingTop: 14, borderTop: "1px solid #F1F5F9" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: 3, background: "#60A5FA" }} />
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>Mood Score</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: 3, background: "#2563EB" }} />
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>Wellness Index</span>
                                </div>
                            </div>
                        </div>

                        {/* Mood Distribution Cards */}
                        <h4 style={{ fontSize: 12.5, fontWeight: 700, color: "#475569", margin: "0 0 14px 0", letterSpacing: "0.04em" }}>MOOD DISTRIBUTION</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                            {MOOD_OPTIONS.map((m) => {
                                const count = moodCounts[m.key] || 0;
                                const pct = totalLogs ? Math.round((count / totalLogs) * 100) : 0;
                                const MIcon = m.Icon;
                                return (
                                    <div key={m.key} style={{ background: "rgba(255,255,255,0.65)", borderRadius: 16, padding: "16px", border: "1px solid rgba(255,255,255,0.85)", transition: "all 0.15s ease", boxShadow: "0 2px 8px rgba(15,23,42,0.03)" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                            <div style={{ width: 28, height: 28, borderRadius: 8, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <MIcon size={14} color={m.color} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#0F172A" }}>{m.label}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                                            <span style={{ fontSize: 24, fontWeight: 700, color: "#0F172A" }}>{count}</span>
                                            <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>entries</span>
                                        </div>
                                        {/* Progress bar */}
                                        <div style={{ width: "100%", height: 5, borderRadius: 999, background: "rgba(15,23,42,0.08)", overflow: "hidden" }}>
                                            <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: m.color, transition: "width 0.4s ease" }} />
                                        </div>
                                        <span style={{ fontSize: 10, color: "#475569", fontWeight: 600, marginTop: 4, display: "block" }}>{pct}% of all entries</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom Summary Stats */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.7)" }}>
                            <div>
                                <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, display: "block" }}>Total Entries</span>
                                <span style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{totalLogs}</span>
                            </div>
                            <div>
                                <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, display: "block" }}>Avg Score</span>
                                <span style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{avgScore}</span>
                            </div>
                            <div>
                                <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, display: "block" }}>Positivity</span>
                                <span style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{positivityRate}%</span>
                            </div>
                            <div>
                                <span style={{ fontSize: 11, color: "#475569", fontWeight: 600, display: "block" }}>Streak</span>
                                <span style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>{streak} days</span>
                            </div>
                        </div>
                    </div>
                    )}

                    {/* ======= TAB CONTENT: REPORTS ======= */}
                    {activeNavTab === "Reports" && (
                    <div style={{ background: "rgba(255, 255, 255, 0.35)", backdropFilter: "blur(24px)", borderRadius: 26, border: "1px solid rgba(255, 255, 255, 0.55)", padding: "28px", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                            <div style={{ width: 34, height: 34, borderRadius: 12, background: "rgba(15, 23, 42, 0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <TrendingUp size={18} color="#0F172A" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: 0 }}>Wellness Report</h3>
                                <span style={{ fontSize: 11.5, color: "#475569", fontWeight: 500 }}>Your mood wellness summary at a glance</span>
                            </div>
                        </div>

                        {/* Report Cards Grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
                            {/* Dominant Mood Card */}
                            <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "24px", border: `1px solid ${dominantMood.color}40`, boxShadow: "0 4px 15px rgba(15,23,42,0.04)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: dominantMood.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <dominantMood.Icon size={20} color={dominantMood.color} />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", display: "block", letterSpacing: "0.04em" }}>DOMINANT MOOD</span>
                                        <span style={{ fontSize: 20, fontWeight: 700, color: dominantMood.color }}>{dominantMood.label}</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12.5, color: "#334155", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                                    Your most frequently logged mood is <strong style={{ color: dominantMood.color, fontWeight: 700 }}>{dominantMood.label}</strong>, appearing {moodCounts[dominantMoodKey]} times ({totalLogs ? Math.round((moodCounts[dominantMoodKey] / totalLogs) * 100) : 0}% of all entries).
                                </p>
                            </div>

                            {/* Wellbeing Score Card */}
                            <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "24px", border: "1px solid rgba(16, 185, 129, 0.3)", boxShadow: "0 4px 15px rgba(15,23,42,0.04)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Heart size={20} color="#10B981" />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", display: "block", letterSpacing: "0.04em" }}>WELLBEING INDEX</span>
                                        <span style={{ fontSize: 20, fontWeight: 700, color: "#10B981" }}>{avgScore} / 5.0</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12.5, color: "#334155", fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                                    Your average wellness score across {totalLogs} entries. {Number(avgScore) >= 3.5 ? "You're trending positively — keep it up!" : "Consider activities that uplift your mood."}
                                </p>
                            </div>

                            {/* Streak Card */}
                            <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "24px", border: "1px solid rgba(245, 158, 11, 0.3)", boxShadow: "0 4px 15px rgba(15,23,42,0.04)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Flame size={20} color="#D97706" />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", display: "block", letterSpacing: "0.04em" }}>LOGGING STREAK</span>
                                        <span style={{ fontSize: 20, fontWeight: 700, color: "#D97706" }}>{streak} Days</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12.5, color: "#334155", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                                    {streak > 0 ? `You've been logging consistently for ${streak} consecutive days. Consistency is key to self-awareness!` : "Start logging daily to build your streak!"}
                                </p>
                            </div>

                            {/* Positivity Rate Card */}
                            <div style={{ background: "rgba(255,255,255,0.75)", borderRadius: 20, padding: "24px", border: "1px solid rgba(59, 130, 246, 0.3)", boxShadow: "0 4px 15px rgba(15,23,42,0.04)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Sun size={20} color="#2563EB" />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 10.5, fontWeight: 650, color: "#475569", display: "block", letterSpacing: "0.04em" }}>POSITIVITY RATE</span>
                                        <span style={{ fontSize: 20, fontWeight: 700, color: "#2563EB" }}>{positivityRate}%</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12.5, color: "#334155", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
                                    {positiveCount} out of {totalLogs} logged moods scored 3.5 or higher. {positivityRate >= 70 ? "Excellent emotional balance!" : "Keep exploring what lifts your spirits."}
                                </p>
                            </div>
                        </div>

                        {/* Mood Breakdown Bar */}
                        <h4 style={{ fontSize: 12.5, fontWeight: 700, color: "#475569", margin: "0 0 12px 0", letterSpacing: "0.04em" }}>MOOD BREAKDOWN</h4>
                        <div style={{ display: "flex", width: "100%", height: 10, borderRadius: 999, overflow: "hidden", background: "rgba(15,23,42,0.08)" }}>
                            {MOOD_OPTIONS.map((m) => {
                                const pct = totalLogs ? (moodCounts[m.key] / totalLogs) * 100 : 0;
                                return pct > 0 ? <div key={m.key} style={{ width: `${pct}%`, height: "100%", background: m.color, transition: "width 0.4s ease" }} /> : null;
                            })}
                        </div>
                        <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
                            {MOOD_OPTIONS.map((m) => {
                                const pct = totalLogs ? Math.round((moodCounts[m.key] / totalLogs) * 100) : 0;
                                return (
                                    <div key={m.key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: 2, background: m.color }} />
                                        <span style={{ fontSize: 11, color: "#334155", fontWeight: 600 }}>{m.label} {pct}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    )}

                </div>
            </div>

            {/* Modal for Date-based Mood Logging */}
            {showModal && selectedDate && (
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
                                    {logs[getHourSlotInfo(modalDate, modalTime).hourSlot] ? "Edit Mood Entry" : "Log Hourly Mood"}
                                </h3>
                                <p style={{ fontSize: 12, color: "#475569", margin: "2px 0 0 0", fontWeight: 500 }}>
                                    {new Date(modalDate + "T" + (modalTime || "12:00") + ":00").toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{ width: 30, height: 30, borderRadius: "50%", border: "none", background: "rgba(15, 23, 42, 0.08)", color: "#0F172A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
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

                            {/* Validation / Info Banners */}
                            {isFutureDateTime(modalDate, modalTime) && (
                                <div style={{ fontSize: 11.5, fontWeight: 650, color: "#DC2626", background: "rgba(239, 68, 68, 0.12)", border: "1px solid rgba(239, 68, 68, 0.3)", padding: "8px 12px", borderRadius: 10, marginBottom: 14 }}>
                                    ⚠️ Future dates or times cannot be logged. Please select a current or past time.
                                </div>
                            )}

                            {!isFutureDateTime(modalDate, modalTime) && logs[getHourSlotInfo(modalDate, modalTime).hourSlot] && (
                                <div style={{ fontSize: 11.5, fontWeight: 650, color: "#2563EB", background: "rgba(37, 99, 235, 0.1)", border: "1px solid rgba(37, 99, 235, 0.25)", padding: "8px 12px", borderRadius: 10, marginBottom: 14 }}>
                                    ℹ️ An entry for this hour slot ({getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:00 - {getHourSlotInfo(modalDate, modalTime).time.split(":")[0]}:59) exists. Saving will update this hour's mood.
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
                            {logs[getHourSlotInfo(modalDate, modalTime).hourSlot] && (
                                <button
                                    onClick={() => deleteModalLog(getHourSlotInfo(modalDate, modalTime).hourSlot)}
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
                                {logSuccess ? <CheckCircle2 size={16} /> : <modalMood.Icon size={16} />} Save Entry
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
