import React, { useState, useEffect } from 'react';
import { Upload, Music, Mic2, CheckCircle2, AlertCircle, Play, Pause, FileAudio, Sparkles, RefreshCw } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';

export const ArtistStudio = () => {
  const { user, isArtist, openAuth } = useAuth();
  const { currentTrack, isPlaying, playTrack } = usePlayer();

  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [myMusic, setMyMusic] = useState([]);
  const [loadingMyMusic, setLoadingMyMusic] = useState(false);

  const fetchMyMusic = async () => {
    if (!isArtist) return;
    setLoadingMyMusic(true);
    try {
      const res = await api.get('/music/my-music');
      if (res.data && res.data.music) {
        setMyMusic(res.data.music);
      }
    } catch (err) {
      console.error("Failed to load artist tracks", err);
    } finally {
      setLoadingMyMusic(false);
    }
  };

  useEffect(() => {
    if (isArtist) {
      fetchMyMusic();
    }
  }, [isArtist]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (!title) {
        // Auto fill title from filename minus extension
        const cleanName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        setTitle(cleanName);
      }
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage("Please select an audio file to upload.");
      return;
    }

    setUploading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('title', title || selectedFile.name);
    formData.append('music', selectedFile);

    try {
      const res = await api.post('/music/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage("Song uploaded successfully to Spotify!");
      setTitle('');
      setSelectedFile(null);
      fetchMyMusic();
    } catch (err) {
      console.error("Upload error", err);
      const msg = err.response?.data?.message || "Failed to upload music track.";
      setErrorMessage(msg);
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="artist-studio-restricted">
        <Mic2 size={64} className="restricted-icon" />
        <h2>Log In as an Artist</h2>
        <p>You need to be logged in with an Artist account to upload music.</p>
        <button className="auth-action-btn" onClick={() => openAuth('login')}>
          Log In / Sign Up
        </button>
      </div>
    );
  }

  if (!isArtist) {
    return (
      <div className="artist-studio-restricted">
        <AlertCircle size={64} className="restricted-icon warning" />
        <h2>Listener Account Detected</h2>
        <p>Your current account role is <strong>Listener</strong>. Only <strong>Artist</strong> accounts can upload music tracks.</p>
        <p className="sub-hint">Sign out and create a new account selecting the "Artist" role to publish your songs.</p>
        <button className="auth-action-btn" onClick={() => openAuth('register')}>
          Register as Artist
        </button>
      </div>
    );
  }

  return (
    <div className="artist-studio-container">
      {/* Header Banner */}
      <div className="studio-header">
        <div className="studio-badge-row">
          <span className="studio-pill">
            <Sparkles size={14} /> Artist Creator Studio
          </span>
        </div>
        <h1 className="studio-title">Upload & Manage Your Songs</h1>
        <p className="studio-subtitle">
          Share your music with listeners worldwide. Upload audio tracks (.mp3, .wav) to Spotify.
        </p>
      </div>

      {/* Upload Form Card */}
      <div className="upload-card">
        <h2 className="card-heading">
          <Upload size={20} /> Upload New Track
        </h2>

        {successMessage && (
          <div className="alert-box success">
            <CheckCircle2 size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="alert-box error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleUploadSubmit} className="upload-form">
          <div className="form-group">
            <label className="form-label">Song Title</label>
            <input
              type="text"
              placeholder="e.g. Midnight Reverie"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Audio File (.mp3, .wav)</label>
            <div className="file-dropzone">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                id="music-file-input"
                className="file-input-hidden"
              />
              <label htmlFor="music-file-input" className="file-label-btn">
                <FileAudio size={32} className="dropzone-icon" />
                <span className="dropzone-title">
                  {selectedFile ? selectedFile.name : 'Click to select audio file'}
                </span>
                <span className="dropzone-sub">
                  {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : 'MP3, WAV, M4A up to 50MB'}
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading || !selectedFile}
            className="submit-upload-btn"
          >
            {uploading ? (
              <>
                <RefreshCw size={18} className="spinning" />
                <span>Uploading Track...</span>
              </>
            ) : (
              <>
                <Upload size={18} />
                <span>Publish Song</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* My Uploads List */}
      <div className="my-tracks-section">
        <div className="section-header">
          <h2 className="section-title">Your Uploaded Songs</h2>
          <button className="refresh-sm-btn" onClick={fetchMyMusic}>
            <RefreshCw size={14} className={loadingMyMusic ? 'spinning' : ''} />
          </button>
        </div>

        {loadingMyMusic ? (
          <div className="loading-state">Loading your catalog...</div>
        ) : myMusic.length === 0 ? (
          <div className="no-tracks-box">
            <Music size={36} />
            <p>You haven't uploaded any music tracks yet.</p>
          </div>
        ) : (
          <div className="my-tracks-grid">
            {myMusic.map((track, idx) => {
              const isThisPlaying = currentTrack?._id === track._id && isPlaying;
              return (
                <div key={track._id} className="artist-track-card">
                  <div className="track-left">
                    <button
                      className="studio-play-btn"
                      onClick={() => playTrack(track, myMusic, idx)}
                    >
                      {isThisPlaying ? <Pause size={18} /> : <Play size={18} className="play-offset" />}
                    </button>
                    <div className="track-meta">
                      <h4 className="track-name">{track.title}</h4>
                      <span className="track-url-path">{track.audioUrl}</span>
                    </div>
                  </div>
                  <div className="track-right">
                    <span className="status-badge live">Live on Spotify</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
