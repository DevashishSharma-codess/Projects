import React, { useEffect, useState } from 'react';
import { Play, Pause, Music, Mic2, Disc, Clock, RefreshCw, Flame, Sparkles, AlertCircle } from 'lucide-react';
import api from '../api';
import { usePlayer } from '../context/PlayerContext';
import { useAuth } from '../context/AuthContext';

export const MusicFeed = ({ searchQuery }) => {
  const [musicList, setMusicList] = useState([]);
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
        setMusicList(res.data.music);
      }
    } catch (err) {
      console.error("Failed to load music", err);
      setError("Unable to connect to backend music server. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  const filteredMusic = musicList.filter((track) => {
    const titleMatch = track.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const artistName = typeof track.artist === 'object' ? track.artist?.username : track.artist;
    const artistMatch = artistName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'my-tracks' && user) {
      const isMyTrack = (typeof track.artist === 'object' ? track.artist?._id : track.artist) === user.id;
      return (titleMatch || artistMatch) && isMyTrack;
    }
    
    return titleMatch || artistMatch;
  });

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
      {/* Dynamic Header Banner */}
      <div className="hero-greeting-banner">
        <div className="greeting-text-box">
          <span className="greeting-time">{getGreeting()}</span>
          <h1 className="greeting-title">
            {user ? `Welcome back, ${user.username}!` : 'Listen without limits'}
          </h1>
          <p className="greeting-subtitle">
            Explore fresh audio tracks uploaded by top community artists.
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

      {/* Category Pills & Controls */}
      <div className="feed-filter-bar">
        <div className="pills-group">
          <button
            className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Tracks
          </button>
          <button
            className={`category-pill ${activeCategory === 'trending' ? 'active' : ''}`}
            onClick={() => setActiveCategory('trending')}
          >
            <Flame size={14} /> Trending
          </button>
          {user?.role === 'artist' && (
            <button
              className={`category-pill ${activeCategory === 'my-tracks' ? 'active' : ''}`}
              onClick={() => setActiveCategory('my-tracks')}
            >
              <Mic2 size={14} /> My Uploads
            </button>
          )}
        </div>

        <button className="refresh-feed-btn" onClick={fetchMusic} title="Refresh Feed">
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Main Music Grid */}
      <section className="feed-section">
        <div className="section-header">
          <h2 className="section-title">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Featured Music Feed'}
          </h2>
          <span className="track-count">{filteredMusic.length} Tracks available</span>
        </div>

        {error && (
          <div className="error-banner">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="music-card-skeleton">
                <div className="skeleton-cover"></div>
                <div className="skeleton-line title"></div>
                <div className="skeleton-line artist"></div>
              </div>
            ))}
          </div>
        ) : filteredMusic.length === 0 ? (
          <div className="empty-feed-box">
            <Music size={48} className="empty-icon" />
            <h3>No Music Found</h3>
            <p>
              {searchQuery
                ? 'Try searching for a different song or artist.'
                : 'Be the first artist to upload a track to Spotify!'}
            </p>
          </div>
        ) : (
          <div className="music-cards-grid">
            {filteredMusic.map((track, index) => {
              const isThisTrackPlaying = currentTrack?._id === track._id && isPlaying;
              const artistName = typeof track.artist === 'object' ? track.artist?.username : track.artist || 'Unknown Artist';

              return (
                <div
                  key={track._id}
                  className={`music-card ${currentTrack?._id === track._id ? 'now-playing' : ''}`}
                  onClick={() => playTrack(track, filteredMusic, index)}
                >
                  <div
                    className="card-artwork-box"
                    style={{ background: getRandomGradient(index) }}
                  >
                    <Disc className={`card-disc-icon ${isThisTrackPlaying ? 'pulse' : ''}`} size={44} />
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
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Detailed Track List Table */}
      {!loading && filteredMusic.length > 0 && (
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
                  <th className="th-artist">Artist</th>
                  <th className="th-play">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMusic.map((track, idx) => {
                  const isCurrent = currentTrack?._id === track._id;
                  const isThisPlaying = isCurrent && isPlaying;
                  const artistName = typeof track.artist === 'object' ? track.artist?.username : track.artist || 'Artist';

                  return (
                    <tr
                      key={track._id}
                      className={`table-row ${isCurrent ? 'active-row' : ''}`}
                      onClick={() => playTrack(track, filteredMusic, idx)}
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
                            style={{ background: getRandomGradient(idx) }}
                          >
                            <Music size={16} />
                          </div>
                          <span className={`table-track-name ${isCurrent ? 'green-text' : ''}`}>
                            {track.title}
                          </span>
                        </div>
                      </td>
                      <td className="td-artist">{artistName}</td>
                      <td className="td-play">
                        <button className="table-play-btn">
                          {isThisPlaying ? <Pause size={16} /> : <Play size={16} className="play-offset" />}
                        </button>
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
