import React from 'react';
import { Home, Search, Library, PlusCircle, Radio, Music, Mic2, Disc, Compass } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, isArtist, openAuth } = useAuth();

  const handleStudioClick = () => {
    if (!user) {
      openAuth('login');
    } else {
      setActiveTab('studio');
    }
  };

  return (
    <aside className="spotify-sidebar">
      {/* Spotify Brand Header */}
      <div className="brand-logo" onClick={() => setActiveTab('home')}>
        <div className="spotify-icon-wrapper">
          <Radio className="spotify-icon" size={28} />
        </div>
        <span className="brand-name">Spotify</span>
      </div>

      {/* Primary Navigation */}
      <nav className="nav-group">
        <button
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
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

      {/* Playlist Quick Links */}
      <div className="sidebar-divider"></div>

      <div className="playlist-scroll-area">
        <div className="playlist-header">
          <span>PLAYLISTS</span>
        </div>
        <div className="playlist-item active-playlist">
          <Disc size={16} />
          <span>Top Hits 2026</span>
        </div>
        <div className="playlist-item">
          <Music size={16} />
          <span>Artist Spotlight</span>
        </div>
        <div className="playlist-item">
          <Compass size={16} />
          <span>Fresh Discoveries</span>
        </div>
        <div className="playlist-item">
          <Radio size={16} />
          <span>Lofi Study Beats</span>
        </div>
      </div>
    </aside>
  );
};
