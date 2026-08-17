import React from 'react';
import { Music, Mic2, PlusCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const JournalArtistBanner = ({ onClose, onCreatePlaylist }) => {
  const { user, openAuth } = useAuth();

  return (
    <div className="journal-artist-banner">
      <div className="banner-left">
        <div className="banner-badge">
          <Music size={13} />
          <span>MOOD JOURNAL INTEGRATION</span>
        </div>
        <h2 className="banner-title">Welcome from your Mood Journal</h2>
        <p className="banner-desc">
          Enjoying your curated soundscapes? If you are a music creator or artist, sign up as an <strong>Artist</strong> on Spotify to upload tracks and reach journal listeners worldwide.
        </p>
      </div>

      <div className="banner-actions">
        {!user || user.role !== 'artist' ? (
          <button
            className="artist-signup-banner-btn"
            onClick={() => openAuth('register')}
          >
            <Mic2 size={15} />
            <span>Sign Up as Artist</span>
          </button>
        ) : null}

        <button
          className="create-playlist-banner-btn"
          onClick={onCreatePlaylist}
        >
          <PlusCircle size={15} />
          <span>Create Playlist</span>
        </button>

        <button
          className="banner-close-btn"
          onClick={onClose}
          title="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
