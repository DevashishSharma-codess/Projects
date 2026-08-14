import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Disc, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export const Player = () => {
  const {
    currentTrack,
    isPlaying,
    duration,
    currentTime,
    volume,
    isMuted,
    togglePlay,
    playNext,
    playPrev,
    seek,
    changeVolume,
    toggleMute,
  } = usePlayer();

  const formatTime = (timeInSeconds) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`spotify-player-bar ${!currentTrack ? 'empty' : ''}`}>
      {/* Left Track Metadata */}
      <div className="player-track-info">
        {currentTrack ? (
          <>
            <div className="track-cover-art">
              <Disc className={`spinning-disc ${isPlaying ? 'active' : ''}`} size={28} />
            </div>
            <div className="track-text-details">
              <h4 className="track-title">{currentTrack.title}</h4>
              <p className="track-artist">
                {typeof currentTrack.artist === 'object' ? currentTrack.artist?.username : currentTrack.artist || 'Unknown Artist'}
              </p>
            </div>
            <button className="like-track-btn" title="Save to Your Library">
              <Heart size={18} />
            </button>
          </>
        ) : (
          <div className="no-track-placeholder">
            <Music size={20} />
            <span>Select a track to start listening</span>
          </div>
        )}
      </div>

      {/* Middle Controls & Scrubber */}
      <div className="player-controls-center">
        <div className="playback-buttons">
          <button
            className="control-btn"
            onClick={playPrev}
            disabled={!currentTrack}
            title="Previous Track"
          >
            <SkipBack size={20} />
          </button>

          <button
            className="play-pause-circle"
            onClick={togglePlay}
            disabled={!currentTrack}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} className="play-offset" />}
          </button>

          <button
            className="control-btn"
            onClick={playNext}
            disabled={!currentTrack}
            title="Next Track"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="time-scrubber-row">
          <span className="time-label">{formatTime(currentTime)}</span>
          <div className="progress-bar-wrapper">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime || 0}
              onChange={(e) => seek(parseFloat(e.target.value))}
              disabled={!currentTrack}
              className="seek-slider"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${progressPercent}%, #4d4d4d ${progressPercent}%, #4d4d4d 100%)`
              }}
            />
          </div>
          <span className="time-label">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Controls: Volume */}
      <div className="player-volume-right">
        <button className="volume-btn" onClick={toggleMute}>
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => changeVolume(e.target.value)}
          className="volume-slider"
          style={{
            background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${(isMuted ? 0 : volume) * 100}%, #4d4d4d ${(isMuted ? 0 : volume) * 100}%, #4d4d4d 100%)`
          }}
        />
      </div>
    </div>
  );
};
