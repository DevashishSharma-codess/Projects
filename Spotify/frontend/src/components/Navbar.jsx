import React, { useState } from 'react';
import { Search, User, LogOut, Upload, PlusCircle, Headphones, Mic2, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onOpenCreatePlaylistModal,
  onToggleSidebar,
}) => {
  const { user, isArtist, openAuth, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="spotify-navbar">
      <div className="navbar-left-group">
        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          className="mobile-sidebar-toggle-btn"
          onClick={onToggleSidebar}
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* Search Input Container */}
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* User Actions Right Section */}
      <div className="navbar-actions">
        {/* Top Nav Create Playlist Button */}
        <button
          className="nav-create-playlist-btn"
          onClick={onOpenCreatePlaylistModal}
          title="Create New Playlist"
        >
          <PlusCircle size={16} className="create-playlist-icon" />
          <span className="btn-label-text">Create Playlist</span>
        </button>

        {user ? (
          <>
            {isArtist && (
              <button
                className="quick-upload-btn"
                onClick={() => setActiveTab('studio')}
              >
                <Upload size={15} />
                <span className="btn-label-text">Upload Music</span>
              </button>
            )}

            <div className="user-profile-wrapper">
              <button
                className="profile-pill-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="avatar-circle">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="user-info-text">
                  <span className="user-name">{user.username}</span>
                  <span className={`role-badge ${isArtist ? 'artist' : 'listener'}`}>
                    {isArtist ? <Mic2 size={11} /> : <Headphones size={11} />}
                    {isArtist ? 'Artist' : 'Listener'}
                  </span>
                </div>
              </button>

              {showDropdown && (
                <div className="profile-dropdown-menu">
                  <div className="dropdown-user-header">
                    <p className="dropdown-username">{user.username}</p>
                    <p className="dropdown-email">{user.email}</p>
                    <span className="dropdown-role-label">
                      Account Type: <strong>{user.role}</strong>
                    </span>
                  </div>
                  <div className="dropdown-divider"></div>
                  {isArtist && (
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setActiveTab('studio');
                        setShowDropdown(false);
                      }}
                    >
                      <Mic2 size={16} />
                      <span>Artist Studio</span>
                    </button>
                  )}
                  <button
                    className="dropdown-item logout-item"
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="auth-buttons-group">
            <button
              className="signup-nav-btn"
              onClick={() => openAuth('register')}
            >
              Sign Up
            </button>
            <button
              className="login-nav-btn"
              onClick={() => openAuth('login')}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
