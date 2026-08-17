import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MusicFeed } from './components/MusicFeed';
import { ArtistStudio } from './components/ArtistStudio';
import { Player } from './components/Player';
import { AuthModal } from './components/AuthModal';
import { JournalArtistBanner } from './components/JournalArtistBanner';
import { PlaylistModal } from './components/PlaylistModal';
import { ALL_PRESEEDED_TRACKS } from './data/moodPlaylistsData';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMood, setActiveMood] = useState('all');
  const [showArtistBanner, setShowArtistBanner] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [activePlaylistId, setActivePlaylistId] = useState(null);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Load custom user playlists from localStorage on mount
  useEffect(() => {
    try {
      const savedPlaylists = localStorage.getItem('spotify_user_playlists');
      if (savedPlaylists) {
        setUserPlaylists(JSON.parse(savedPlaylists));
      }
    } catch (err) {
      console.error("Failed to parse user playlists", err);
    }
  }, []);

  // Save custom user playlists to localStorage whenever updated
  const savePlaylists = (playlists) => {
    setUserPlaylists(playlists);
    try {
      localStorage.setItem('spotify_user_playlists', JSON.stringify(playlists));
    } catch (err) {
      console.error("Failed to save user playlists", err);
    }
  };

  // Check URL query parameters for mood redirection and artist banner triggers
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const moodParam = params.get('mood');
    const fromParam = params.get('from');
    const noticeParam = params.get('notice');

    if (fromParam === 'journal' || noticeParam === 'artist' || moodParam) {
      setShowArtistBanner(true);
    }

    if (moodParam) {
      setActiveMood(moodParam.toLowerCase());
    }
  }, []);

  const handleCreatePlaylist = (newPlaylist) => {
    const updated = [...userPlaylists, newPlaylist];
    savePlaylists(updated);
    setActivePlaylistId(newPlaylist.id);
  };

  const handleAddTrackToPlaylist = (track) => {
    if (userPlaylists.length === 0) {
      // Open modal to create first playlist
      setIsPlaylistModalOpen(true);
      return;
    }

    // Add to the first playlist by default or prompt
    const targetPlaylist = userPlaylists[0];
    const exists = targetPlaylist.tracks.some((t) => t._id === track._id);
    if (!exists) {
      const updatedPlaylists = userPlaylists.map((pl, idx) => {
        if (idx === 0) {
          return { ...pl, tracks: [...pl.tracks, track] };
        }
        return pl;
      });
      savePlaylists(updatedPlaylists);
      alert(`Added "${track.title}" to playlist "${targetPlaylist.title}"!`);
    } else {
      alert(`"${track.title}" is already in playlist "${targetPlaylist.title}".`);
    }
  };

  const currentActivePlaylist = userPlaylists.find((p) => p.id === activePlaylistId) || null;

  return (
    <div className="spotify-app-layout">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeMood={activeMood}
        setActiveMood={setActiveMood}
        userPlaylists={userPlaylists}
        activePlaylistId={activePlaylistId}
        setActivePlaylistId={setActivePlaylistId}
        onOpenCreatePlaylistModal={() => setIsPlaylistModalOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobileSidebar={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Pane */}
      <main className="main-content-area">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenCreatePlaylistModal={() => setIsPlaylistModalOpen(true)}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Journal Artist Upload Banner */}
        {showArtistBanner && (
          <JournalArtistBanner
            onClose={() => setShowArtistBanner(false)}
            onCreatePlaylist={() => setIsPlaylistModalOpen(true)}
          />
        )}

        <div className="scrollable-body">
          {activeTab === 'studio' ? (
            <ArtistStudio />
          ) : (
            <MusicFeed
              searchQuery={searchQuery}
              activeMood={activeMood}
              setActiveMood={setActiveMood}
              activePlaylist={currentActivePlaylist}
              onAddToPlaylist={handleAddTrackToPlaylist}
            />
          )}
        </div>
      </main>

      {/* Auth Modal for Login / Register */}
      <AuthModal />

      {/* Playlist Creation Modal for Normal Users */}
      <PlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        onCreate={handleCreatePlaylist}
        availableTracks={ALL_PRESEEDED_TRACKS}
      />

      {/* Persistent Bottom Player */}
      <Player />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <AppContent />
      </PlayerProvider>
    </AuthProvider>
  );
}
