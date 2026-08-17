import React, { useEffect, useState } from 'react';
import { Play, Pause, Music, Mic2, Disc, RefreshCw, Flame, AlertCircle, PlusCircle, Heart, Sparkles, Compass, Zap, Activity, Moon } from 'lucide-react';
import api from '../api';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';
import { MOOD_PLAYLISTS, ALL_PRESEEDED_TRACKS } from '../data/moodPlaylistsData';

const MOOD_ICONS = {
  radiant: Sparkles,
  peaceful: Heart,
  focused: Compass,
  energetic: Zap,
  stressed: Activity,
  low: Moon,
};

export const MusicFeed = ({ searchQuery, activeMood, setActiveMood, activePlaylist, onAddToPlaylist }) => {
  const [backendTracks, setBackendTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { currentTrack, isPlaying, playTrack } = usePlayer();
  const { user, openAuth } = useAuth();

  const fetchMusic = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/music');
      if (res.data && res.data.music) {
        setBackendTracks(res.data.music);
      }
    } catch (err) {
      console.log("Backend offline or unreachable, using mood soundscapes feed.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  // Combine backend tracks and pre-seeded mood tracks
  const combinedTracks = [...ALL_PRESEEDED_TRACKS, ...backendTracks];

  // Determine displayed tracks
  let displayedTracks = combinedTracks;

  if (activePlaylist) {
    displayedTracks = activePlaylist.tracks || [];
  } else {
    // Filter by mood if activeMood is set (and not 'all')
    if (activeMood && activeMood !== 'all') {
      displayedTracks = displayedTracks.filter((t) => t.mood === activeMood || t.genre?.toLowerCase().includes(activeMood));
    }

    // Filter by category pill
    if (activeCategory === 'my-tracks' && user) {
      displayedTracks = displayedTracks.filter((track) => {
        const artistId = typeof track.artist === 'object' ? track.artist?._id : track.artist;
        return artistId === user.id;
      });
    }

    // Search query filter
    if (searchQuery.trim()) {
      displayedTracks = displayedTracks.filter((track) => {
        const titleMatch = track.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const artistName = typeof track.artist === 'object' ? track.artist?.username : track.artist;
        const artistMatch = artistName?.toLowerCase().includes(searchQuery.toLowerCase());
        return titleMatch || artistMatch;
      });
    }
  }

  const moodDetails = activeMood && activeMood !== 'all' ? MOOD_PLAYLISTS[activeMood] : null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getRandomGradient = (index) => {
    const gradients = [
      'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
      'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
      'linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)',
      'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="music-feed-container">
      {/* Playlist / Mood Header Banner */}
      {activePlaylist ? (
        <div className="playlist-header-hero" style={{ background: activePlaylist.gradient || 'linear-gradient(135deg, #1DB954 0%, #191414 100%)' }}>
          <div className="hero-artwork">
            <Disc size={64} className="hero-disc" />
          </div>
          <div className="hero-details">
            <span className="hero-type">USER PLAYLIST</span>
            <h1 className="hero-title">{activePlaylist.title}</h1>
            <p className="hero-desc">{activePlaylist.description}</p>
            <div className="hero-actions">
              {displayedTracks.length > 0 && (
                <button className="play-all-hero-btn" onClick={() => playTrack(displayedTracks[0], displayedTracks, 0)}>
                  <Play size={18} fill="#000" /> Play Playlist
                </button>
              )}
            </div>
          </div>
        </div>
      ) : moodDetails ? (
        <div className="playlist-header-hero" style={{ background: moodDetails.gradient }}>
          <img src={moodDetails.coverUrl} alt={moodDetails.title} className="hero-cover-img" />
          <div className="hero-details">
            <span className="hero-type">JOURNAL MOOD PLAYLIST</span>
            <h1 className="hero-title">{moodDetails.title}</h1>
            <p className="hero-desc">{moodDetails.description}</p>
            <div className="hero-actions">
              {displayedTracks.length > 0 && (
                <button className="play-all-hero-btn" onClick={() => playTrack(displayedTracks[0], displayedTracks, 0)}>
                  <Play size={18} fill="#000" /> Play All Soundscapes
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Default Greeting Banner */
        <div className="hero-greeting-banner">
          <div className="greeting-text-box">
            <span className="greeting-time">{getGreeting()}</span>
            <h1 className="greeting-title">
              {user ? `Welcome back, ${user.username}!` : 'Listen to Mood Soundscapes & Music'}
            </h1>
            <p className="greeting-subtitle">
              Explore curated tunes for every mood or discover community tracks.
            </p>
          </div>

          {!user && (
            <div className="hero-cta">
              <button className="cta-register-btn" onClick={() => openAuth('register')}>
                Sign Up Free
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mood Quick Pills */}
      {!activePlaylist && (
        <div className="mood-chips-row">
          <button
            className={`mood-chip ${activeMood === 'all' ? 'active' : ''}`}
            onClick={() => setActiveMood('all')}
          >
            All Tunes
          </button>
          {Object.keys(MOOD_PLAYLISTS).map((key) => {
            const m = MOOD_PLAYLISTS[key];
            const IconComponent = MOOD_ICONS[key] || Music;
            const isSelected = activeMood === key;
            return (
              <button
                key={key}
                className={`mood-chip ${isSelected ? 'active' : ''}`}
                style={{
                  borderColor: m.color,
                  backgroundColor: isSelected ? m.color : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#FFFFFF' : m.color,
                }}
                onClick={() => setActiveMood(key)}
              >
                <IconComponent size={14} />
                <span>{m.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Music Grid */}
      <section className="feed-section">
        <div className="section-header">
          <h2 className="section-title">
            {activePlaylist
              ? `Tracks in ${activePlaylist.title}`
              : searchQuery
              ? `Search results for "${searchQuery}"`
              : moodDetails
              ? `${moodDetails.title} Soundscapes`
              : 'Featured Mood Tracks & Audio'}
          </h2>
          <span className="track-count">{displayedTracks.length} Tracks available</span>
        </div>

        {displayedTracks.length === 0 ? (
          <div className="empty-feed-box">
            <Music size={48} className="empty-icon" />
            <h3>No Tracks Found</h3>
            <p>
              {activePlaylist
                ? 'This playlist has no tracks yet. Add tracks using the "+ Playlist" button on any song!'
                : searchQuery
                ? 'Try searching for a different song or artist.'
                : 'Be the first artist to upload a track to Spotify!'}
            </p>
          </div>
        ) : (
          <div className="music-cards-grid">
            {displayedTracks.map((track, index) => {
              const isThisTrackPlaying = currentTrack?._id === track._id && isPlaying;
              const artistName = typeof track.artist === 'object' ? track.artist?.username : track.artist || 'Artist';

              return (
                <div
                  key={track._id}
                  className={`music-card ${currentTrack?._id === track._id ? 'now-playing' : ''}`}
                  onClick={() => playTrack(track, displayedTracks, index)}
                >
                  <div
                    className="card-artwork-box"
                    style={{ background: track.coverGradient || getRandomGradient(index) }}
                  >
                    {track.coverUrl ? (
                      <img src={track.coverUrl} alt={track.title} className="card-cover-img" />
                    ) : (
                      <Disc className={`card-disc-icon ${isThisTrackPlaying ? 'pulse' : ''}`} size={44} />
                    )}
                    <button className="card-play-overlay">
                      {isThisTrackPlaying ? (
                        <Pause size={24} className="play-icon-accent" />
                      ) : (
                        <Play size={24} className="play-icon-accent play-offset" />
                      )}
                    </button>
                  </div>

                  <div className="card-info">
                    <h3 className="card-song-title" title={track.title}>
                      {track.title}
                    </h3>
                    <p className="card-artist-name">
                      <Mic2 size={12} className="inline-icon" /> {artistName}
                    </p>
                  </div>

                  <div className="card-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="add-to-playlist-card-btn"
                      onClick={() => onAddToPlaylist(track)}
                      title="Add to Playlist"
                    >
                      <PlusCircle size={16} />
                      <span>+ Playlist</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Detailed Track List Table */}
      {displayedTracks.length > 0 && (
        <section className="feed-table-section">
          <div className="section-header">
            <h2 className="section-title">Track List View</h2>
          </div>

          <div className="track-table-wrapper">
            <table className="spotify-track-table">
              <thead>
                <tr>
                  <th className="th-num">#</th>
                  <th className="th-title">Title</th>
                  <th className="th-artist">Artist / Genre</th>
                  <th className="th-duration">Duration</th>
                  <th className="th-play">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedTracks.map((track, idx) => {
                  const isCurrent = currentTrack?._id === track._id;
                  const isThisPlaying = isCurrent && isPlaying;
                  const artistName = typeof track.artist === 'object' ? track.artist?.username : track.artist || 'Artist';

                  return (
                    <tr
                      key={track._id}
                      className={`table-row ${isCurrent ? 'active-row' : ''}`}
                      onClick={() => playTrack(track, displayedTracks, idx)}
                    >
                      <td className="td-num">
                        {isThisPlaying ? (
                          <div className="equalizer-bars">
                            <span></span><span></span><span></span>
                          </div>
                        ) : (
                          idx + 1
                        )}
                      </td>
                      <td className="td-title">
                        <div className="table-track-cell">
                          <div
                            className="table-mini-cover"
                            style={{ background: track.coverGradient || getRandomGradient(idx) }}
                          >
                            {track.coverUrl ? (
                              <img src={track.coverUrl} alt={track.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <Music size={16} />
                            )}
                          </div>
                          <span className={`table-track-name ${isCurrent ? 'green-text' : ''}`}>
                            {track.title}
                          </span>
                        </div>
                      </td>
                      <td className="td-artist">{artistName} • <span style={{ opacity: 0.7, fontSize: 12 }}>{track.genre}</span></td>
                      <td className="td-duration">{track.duration || '3:30'}</td>
                      <td className="td-play" onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button
                            className="table-play-btn"
                            onClick={() => playTrack(track, displayedTracks, idx)}
                          >
                            {isThisPlaying ? <Pause size={16} /> : <Play size={16} className="play-offset" />}
                          </button>

                          <button
                            className="table-add-playlist-btn"
                            onClick={() => onAddToPlaylist(track)}
                            title="Add to Playlist"
                          >
                            <PlusCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
