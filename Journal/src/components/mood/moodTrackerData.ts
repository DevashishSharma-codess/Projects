import React from "react";
import { Sparkles, Heart, Compass, Zap, Activity, Moon } from "lucide-react";
import type { MoodLog } from "../../types/journal";

export interface MoodOption {
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

export const MOOD_OPTIONS: MoodOption[] = [
    { key: "radiant",   label: "Radiant",    Icon: Sparkles,   iconName: "Sparkles",  score: 5.0, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.25)", lightBg: "#FFFBEB", gradient: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)" },
    { key: "peaceful",  label: "Peaceful",   Icon: Heart,      iconName: "Heart",     score: 4.5, color: "#3B82F6", bg: "rgba(59, 130, 246, 0.25)", lightBg: "#EFF6FF", gradient: "linear-gradient(135deg, #93C5FD 0%, #3B82F6 100%)" },
    { key: "focused",   label: "Focused",    Icon: Compass,    iconName: "Compass",   score: 4.0, color: "#A855F7", bg: "rgba(168, 85, 247, 0.25)", lightBg: "#F5F3FF", gradient: "linear-gradient(135deg, #C4B5FD 0%, #A855F7 100%)" },
    { key: "energetic", label: "Energetic",  Icon: Zap,        iconName: "Zap",       score: 4.2, color: "#10B981", bg: "rgba(16, 185, 129, 0.25)", lightBg: "#ECFDF5", gradient: "linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)" },
    { key: "stressed",  label: "Stressed",   Icon: Activity,   iconName: "Activity",  score: 2.0, color: "#EF4444", bg: "rgba(239, 68, 68, 0.25)", lightBg: "#FEF2F2", gradient: "linear-gradient(135deg, #FCA5A5 0%, #EF4444 100%)" },
    { key: "low",       label: "Low Energy", Icon: Moon,       iconName: "Moon",      score: 1.5, color: "#94A3B8", bg: "rgba(148, 163, 184, 0.25)", lightBg: "#F8FAFC", gradient: "linear-gradient(135deg, #CBD5E1 0%, #64748B 100%)" },
];

export const getMoodOption = (key: string): MoodOption => MOOD_OPTIONS.find((m) => m.key === key) ?? MOOD_OPTIONS[1];

export interface MoodSong {
    title: string;
    artist: string;
    genre: string;
    duration: string;
    coverUrl: string;
    coverGradient: string;
    spotifyUrl: string;
    youtubeUrl: string;
}

export const MOOD_SONGS: Record<string, MoodSong[]> = {
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

export function todayStr(): string {
    return new Date().toISOString().slice(0, 10);
}

export const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];
export const MONTH_NAMES = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

export function buildCalendarDays(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

export function dateKey(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export interface GraphPoint {
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

export function buildSparkPath(pts: { x: number; y: number }[]): string {
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
