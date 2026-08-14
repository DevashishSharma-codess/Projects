import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MusicFeed } from './components/MusicFeed';
import { ArtistStudio } from './components/ArtistStudio';
import { Player } from './components/Player';
import { AuthModal } from './components/AuthModal';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="spotify-app-layout">
      {/* Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Pane */}
      <main className="main-content-area">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="scrollable-body">
          {activeTab === 'studio' ? (
            <ArtistStudio />
          ) : (
            <MusicFeed searchQuery={searchQuery} />
          )}
        </div>
      </main>

      {/* Auth Modal for Login / Register */}
      <AuthModal />

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
