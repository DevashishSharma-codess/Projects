import React from 'react';
import { Home, Search, Library, PlusCircle, Radio, Music, Mic2, Disc, Sparkles, Heart, Compass, Zap, Activity, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MOOD_ICONS = {
  radiant: Sparkles,
  peaceful: Heart,
  focused: Compass,
  energetic: Zap,
  stressed: Activity,
  low: Moon,
};

export const Sidebar = ({
  activeTab,
  setActiveTab,
  activeMood,
  setActiveMood,
  userPlaylists = [],
  activePlaylistId,
  setActivePlaylistId,
  onOpenCreatePlaylistModal,
}) => {
  const { user, isArtist, openAuth } = useAuth();

  const moodList = [
    { key: 'all', label: 'All Moods', color: '#1DB954' },
    { key: 'radiant', label: 'Radiant', color: '#F59E0B' },
    { key: 'peaceful', label: 'Peaceful', color: '#3B82F6' },
    { key: 'focused', label: 'Focused', color: '#A855F7' },
    { key: 'energetic', label: 'Energetic', color: '#10B981' },
    { key: 'stressed', label: 'Stressed Relief', color: '#EF4444' },
    { key: 'low', label: 'Low Energy', color: '#64748B' },
  ];

  const handleSelectMood = (moodKey) => {
    setActiveMood(moodKey);
    setActivePlaylistId(null);
    setActiveTab('home');
  };

  const handleSelectPlaylist = (playlistId) => {
    setActivePlaylistId(playlistId);
    setActiveMood('all');
    setActiveTab('home');
  };

  return (
    <aside className="spotify-sidebar">
      {/* Spotify Brand Header */}
      <div className="brand-logo" onClick={() => { setActiveTab('home'); setActiveMood('all'); setActivePlaylistId(null); }}>
        <div className="spotify-icon-wrapper">
          <Radio className="spotify-icon" size={28} />
        </div>
        <span className="brand-name">Spotify</span>
      </div>

      {/* Primary Navigation */}
      <nav className="nav-group">
        <button
          className={`nav-item ${activeTab === 'home' && !activePlaylistId ? 'active' : ''}`}
          onClick={() => { setActiveTab('home'); setActivePlaylistId(null); }}
        >
          <Home size={22} />
          <span>Home</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <Search size={22} />
          <span>Search</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Library size={22} />
          <span>Your Library</span>
        </button>
      </nav>

      {/* Artist Dedicated Section */}
      <div className="sidebar-divider"></div>

      <div className="artist-section-box">
        <div className="artist-box-header">
          <Mic2 size={18} className="artist-accent-icon" />
          <span>ARTIST CREATOR</span>
        </div>

        {isArtist ? (
          <button
            className={`artist-studio-btn ${activeTab === 'studio' ? 'active' : ''}`}
            onClick={() => setActiveTab('studio')}
          >
            <PlusCircle size={20} />
            <span>Upload Music</span>
          </button>
        ) : (
          <div className="artist-promo">
            <p className="promo-text">Are you a music creator?</p>
            <button
              className="become-artist-btn"
              onClick={() => openAuth('register')}
            >
              Join as Artist
            </button>
          </div>
        )}
      </div>

      {/* Mood Playlists Quick Links */}
      <div className="sidebar-divider"></div>

      <div className="playlist-scroll-area">
        <div className="playlist-header">
          <span>JOURNAL MOODS</span>
        </div>
        {moodList.map((m) => {
          const IconComp = MOOD_ICONS[m.key] || Music;
          const isSelected = activeMood === m.key && !activePlaylistId;
          return (
            <div
              key={m.key}
              className={`playlist-item ${isSelected ? 'active-playlist' : ''}`}
              onClick={() => handleSelectMood(m.key)}
            >
              <IconComp size={16} color={m.color} />
              <span>{m.label}</span>
            </div>
          );
        })}

        {/* User Playlists Section */}
        <div className="sidebar-divider" style={{ margin: '14px 0 10px 0' }}></div>

        <div className="playlist-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>YOUR PLAYLISTS</span>
          <button
            className="create-playlist-icon-btn"
            onClick={onOpenCreatePlaylistModal}
            title="Create Playlist"
          >
            <PlusCircle size={16} />
          </button>
        </div>

        <button className="create-playlist-sidebar-link" onClick={onOpenCreatePlaylistModal}>
          <PlusCircle size={16} />
          <span>+ Create Playlist</span>
        </button>

        {userPlaylists.length === 0 ? (
          <p className="empty-playlists-hint">No custom playlists yet. Click above to create one!</p>
        ) : (
          userPlaylists.map((pl) => (
            <div
              key={pl.id}
              className={`playlist-item ${activePlaylistId === pl.id ? 'active-playlist' : ''}`}
              onClick={() => handleSelectPlaylist(pl.id)}
            >
              <Disc size={16} color={pl.color || '#1DB954'} />
              <span>{pl.title}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
