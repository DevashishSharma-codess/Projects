import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

const BACKEND_URL = 'http://localhost:3000';

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playlist, currentIndex]);

  const getFullAudioUrl = (track) => {
    if (!track) return '';
    if (track.audioUrl) {
      return track.audioUrl.startsWith('http') ? track.audioUrl : `${BACKEND_URL}${track.audioUrl}`;
    }
    if (track.uri) {
      const cleanPath = track.uri.replace(/\\/g, '/');
      const urlPath = cleanPath.startsWith('uploads/') ? `/${cleanPath}` : `/uploads/${cleanPath}`;
      return `${BACKEND_URL}${urlPath}`;
    }
    return '';
  };

  const playTrack = (track, trackList = [], index = 0) => {
    if (!track) return;
    const url = getFullAudioUrl(track);
    const audio = audioRef.current;

    if (currentTrack && currentTrack._id === track._id && url === audio.src) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(err => console.error("Playback error:", err));
        setIsPlaying(true);
      }
      return;
    }

    setCurrentTrack(track);
    if (trackList.length > 0) {
      setPlaylist(trackList);
      setCurrentIndex(index);
    }

    audio.src = url;
    audio.currentTime = 0;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.error("Playback failed:", err);
      setIsPlaying(false);
    });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!currentTrack || !audio.src) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.error(err));
    }
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    const nextIdx = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIdx);
    playTrack(playlist[nextIdx], playlist, nextIdx);
  };

  const playPrev = () => {
    if (playlist.length === 0) return;
    const prevIdx = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIdx);
    playTrack(playlist[prevIdx], playlist, prevIdx);
  };

  const seek = (time) => {
    const audio = audioRef.current;
    if (audio.src) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (newVol) => {
    const val = parseFloat(newVol);
    setVolume(val);
    audioRef.current.volume = val;
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        duration,
        currentTime,
        volume,
        isMuted,
        playlist,
        currentIndex,
        playTrack,
        togglePlay,
        playNext,
        playPrev,
        seek,
        changeVolume,
        toggleMute,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
