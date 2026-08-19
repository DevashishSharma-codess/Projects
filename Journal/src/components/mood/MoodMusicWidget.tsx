/**
 * Mood Music Recommendation Widget Component
 * Suggests curated playlists and tracks tailored to the user's current mood.
 */

import React from "react";
import { Headphones, Volume2, SkipBack, Play, Pause, SkipForward, Music, Radio, ExternalLink, Mic2, PlusCircle } from "lucide-react";
import { MOOD_OPTIONS, MOOD_SONGS, getSpotifyAppUrl } from "./moodTrackerData";

interface MoodMusicWidgetProps {
    songMood: string;
    setSongMood: (mood: string) => void;
    songIndex: number;
    setSongIndex: React.Dispatch<React.SetStateAction<number>>;
    isPlayingMusic: boolean;
    setIsPlayingMusic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MoodMusicWidget: React.FC<MoodMusicWidgetProps> = ({
    songMood,
    setSongMood,
    songIndex,
    setSongIndex,
    isPlayingMusic,
    setIsPlayingMusic,
}) => {
    const songList = MOOD_SONGS[songMood] || MOOD_SONGS.radiant;
    const currentSong = songList[songIndex % songList.length];

    const prevSong = () => setSongIndex((prev) => (prev - 1 + songList.length) % songList.length);
    const nextSong = () => setSongIndex((prev) => (prev + 1) % songList.length);
    const togglePlay = () => setIsPlayingMusic((prev) => !prev);

    const spotifyAppMoodUrl = getSpotifyAppUrl(songMood, currentSong.title);

    return (
        <div style={{ background: "rgba(255, 255, 255, 0.35)", backdropFilter: "blur(24px)", borderRadius: 26, border: "1px solid rgba(255, 255, 255, 0.55)", padding: "28px", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(59, 130, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Headphones size={18} color="#2563EB" />
                    </div>
                    <div>
                        <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                            Mood Music & Soundscapes
                        </h3>
                        <span style={{ fontSize: 11.5, color: "#475569", fontWeight: 600 }}>
                            Curated tunes tailored to your current emotional state
                        </span>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.7)", padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.8)" }}>
                    <Volume2 size={13} color="#2563EB" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>
                        {currentSong.genre}
                    </span>
                </div>
            </div>

            {/* Mood selector chips */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                {MOOD_OPTIONS.map((m) => {
                    const isSelected = songMood === m.key;
                    const Icon = m.Icon;
                    return (
                        <button
                            key={m.key}
                            onClick={() => {
                                setSongMood(m.key);
                                setSongIndex(0);
                            }}
                            style={{
                                border: isSelected ? `2px solid ${m.color}` : "1px solid rgba(255,255,255,0.8)",
                                background: isSelected ? m.bg : "rgba(255, 255, 255, 0.6)",
                                color: isSelected ? m.color : "#475569",
                                padding: "6px 14px",
                                borderRadius: 9999,
                                fontWeight: 700,
                                fontSize: 12,
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                transition: "all 0.2s ease",
                            }}
                        >
                            <Icon size={12} color={m.color} />
                            {m.label}
                        </button>
                    );
                })}
            </div>

            {/* Player Card */}
            <div style={{ background: "rgba(255, 255, 255, 0.75)", backdropFilter: "blur(16px)", borderRadius: 20, border: "1.5px solid rgba(255, 255, 255, 0.9)", padding: "18px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <img
                        src={currentSong.coverUrl}
                        alt={currentSong.title}
                        style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover", boxShadow: "0 4px 12px rgba(15,23,42,0.15)" }}
                    />
                    <div>
                        <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 800, color: "#0F172A", margin: "0 0 2px 0" }}>
                            {currentSong.title}
                        </h4>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: "#475569", display: "block" }}>
                            {currentSong.artist} • {currentSong.duration}
                        </span>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button onClick={prevSong} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#0F172A" }}>
                        <SkipBack size={18} />
                    </button>
                    <button
                        onClick={togglePlay}
                        style={{ width: 42, height: 42, borderRadius: "50%", border: "none", background: "#0F172A", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(15,23,42,0.2)" }}
                    >
                        {isPlayingMusic ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
                    </button>
                    <button onClick={nextSong} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#0F172A" }}>
                        <SkipForward size={18} />
                    </button>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <a
                        href={spotifyAppMoodUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: "#1DB954",
                            color: "#FFFFFF",
                            textDecoration: "none",
                            fontSize: 12,
                            fontWeight: 800,
                            padding: "7px 14px",
                            borderRadius: 9999,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            boxShadow: "0 4px 12px rgba(29, 185, 84, 0.3)",
                            transition: "all 0.2s ease",
                        }}
                    >
                        <Music size={13} /> Listen on Our Spotify <ExternalLink size={12} />
                    </a>
                    <a
                        href={currentSong.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: "rgba(255, 255, 255, 0.8)",
                            color: "#EF4444",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            textDecoration: "none",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "6px 12px",
                            borderRadius: 9999,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <Radio size={11} /> YouTube
                    </a>
                </div>
            </div>

            {/* Redirection & Feature Highlights Card */}
            <div
                style={{
                    marginTop: 16,
                    padding: "14px 18px",
                    borderRadius: 16,
                    background: "linear-gradient(135deg, rgba(29, 185, 84, 0.12) 0%, rgba(15, 23, 42, 0.05) 100%)",
                    border: "1px solid rgba(29, 185, 84, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ background: "#1DB954", color: "#FFFFFF", borderRadius: "50%", padding: 6, display: "flex" }}>
                        <Mic2 size={16} />
                    </div>
                    <div>
                        <span style={{ fontSize: 12, fontWeight: 800, color: "#0F172A", display: "block" }}>
                            Want to create playlists or upload your own songs?
                        </span>
                        <span style={{ fontSize: 11, color: "#475569", fontWeight: 600 }}>
                            Redirect to <strong>Our Spotify App</strong> to build playlists or sign up as an Artist!
                        </span>
                    </div>
                </div>

                <a
                    href={spotifyAppMoodUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        background: "#0F172A",
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontSize: 11.5,
                        fontWeight: 700,
                        padding: "6px 14px",
                        borderRadius: 9999,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                    }}
                >
                    <PlusCircle size={13} color="#1DB954" /> Open Spotify App
                </a>
            </div>
        </div>
    );
};
