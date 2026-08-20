/**
 * Mood Music Recommendation Widget Component
 * Suggests curated playlists and tracks tailored to the user's current mood.
 */

import React from "react";
import { Headphones, Volume2, SkipBack, Play, Pause, SkipForward, Music, Radio, ExternalLink, Mic2, PlusCircle } from "lucide-react";
import { MOOD_OPTIONS, MOOD_SONGS, getSpotifyAppUrl } from "../data/moodTrackerData";
import "./MoodMusicWidget.css";

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
        <div className="mood-music-container">
            <div className="mood-music-header">
                <div className="mood-music-title-group">
                    <div className="mood-music-icon-box">
                        <Headphones size={18} color="#2563EB" />
                    </div>
                    <div>
                        <h3 className="mood-music-title">
                            Mood Music & Soundscapes
                        </h3>
                        <span className="mood-music-subhead">
                            Curated tunes tailored to your current emotional state
                        </span>
                    </div>
                </div>

                <div className="mood-music-genre-badge">
                    <Volume2 size={13} color="#2563EB" />
                    <span className="mood-music-genre-text">
                        {currentSong.genre}
                    </span>
                </div>
            </div>

            {/* Mood selector chips */}
            <div className="mood-music-chips-row">
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
                            className="mood-music-chip-btn"
                            style={{
                                border: isSelected ? `2px solid ${m.color}` : "1px solid rgba(255,255,255,0.8)",
                                background: isSelected ? m.bg : "rgba(255, 255, 255, 0.6)",
                                color: isSelected ? m.color : "#475569",
                            }}
                        >
                            <Icon size={12} color={m.color} />
                            {m.label}
                        </button>
                    );
                })}
            </div>

            {/* Player Card */}
            <div className="mood-music-player-card">
                <div className="mood-music-song-info">
                    <img
                        src={currentSong.coverUrl}
                        alt={currentSong.title}
                        className="mood-music-cover-img"
                    />
                    <div>
                        <h4 className="mood-music-song-title">
                            {currentSong.title}
                        </h4>
                        <span className="mood-music-song-artist">
                            {currentSong.artist} • {currentSong.duration}
                        </span>
                    </div>
                </div>

                <div className="mood-music-controls">
                    <button onClick={prevSong} className="mood-music-control-btn">
                        <SkipBack size={18} />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="mood-music-play-btn"
                    >
                        {isPlayingMusic ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
                    </button>
                    <button onClick={nextSong} className="mood-music-control-btn">
                        <SkipForward size={18} />
                    </button>
                </div>

                <div className="mood-music-external-links">
                    <a
                        href={spotifyAppMoodUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mood-music-spotify-btn"
                    >
                        <Music size={13} /> Listen on Our Spotify <ExternalLink size={12} />
                    </a>
                    <a
                        href={currentSong.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mood-music-youtube-btn"
                    >
                        <Radio size={11} /> YouTube
                    </a>
                </div>
            </div>

            {/* Redirection & Feature Highlights Card */}
            <div className="mood-music-banner">
                <div className="mood-music-banner-left">
                    <div className="mood-music-banner-icon">
                        <Mic2 size={16} />
                    </div>
                    <div>
                        <span className="mood-music-banner-heading">
                            Want to create playlists or upload your own songs?
                        </span>
                        <span className="mood-music-banner-sub">
                            Redirect to <strong>Our Spotify App</strong> to build playlists or sign up as an Artist!
                        </span>
                    </div>
                </div>

                <a
                    href={spotifyAppMoodUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mood-music-banner-link"
                >
                    <PlusCircle size={13} color="#1DB954" /> Open Spotify App
                </a>
            </div>
        </div>
    );
};
