import React, { useState } from 'react';
import { X, Disc, Plus, Check } from 'lucide-react';
import { MOOD_PLAYLISTS } from '../data/moodPlaylistsData';

export const PlaylistModal = ({ isOpen, onClose, onCreate, availableTracks = [] }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMood, setSelectedMood] = useState('general');
  const [selectedTrackIds, setSelectedTrackIds] = useState([]);

  if (!isOpen) return null;

  const toggleTrackSelect = (id) => {
    if (selectedTrackIds.includes(id)) {
      setSelectedTrackIds(selectedTrackIds.filter((tId) => tId !== id));
    } else {
      setSelectedTrackIds([...selectedTrackIds, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlaylist = {
      id: `user-playlist-${Date.now()}`,
      title: name.trim(),
      description: description.trim() || 'Custom user created playlist.',
      mood: selectedMood,
      isUserCreated: true,
      color: selectedMood !== 'general' && MOOD_PLAYLISTS[selectedMood] ? MOOD_PLAYLISTS[selectedMood].color : '#1DB954',
      gradient: selectedMood !== 'general' && MOOD_PLAYLISTS[selectedMood] ? MOOD_PLAYLISTS[selectedMood].gradient : 'linear-gradient(135deg, rgba(29, 185, 84, 0.25) 0%, rgba(18, 18, 18, 0.95) 100%)',
      tracks: availableTracks.filter((track) => selectedTrackIds.includes(track._id)),
    };

    onCreate(newPlaylist);
    setName('');
    setDescription('');
    setSelectedMood('general');
    setSelectedTrackIds([]);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="playlist-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <Disc className="modal-icon" size={22} />
            <h3>Create New Playlist</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="playlist-form">
          <div className="form-group">
            <label className="form-label">Playlist Name *</label>
            <input
              type="text"
              placeholder="e.g. Chill Soundscapes, Focus Session"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="playlist-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea
              placeholder="Add a brief description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="playlist-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Associated Journal Mood</label>
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="playlist-select"
            >
              <option value="general">General / Mixed Moods</option>
              <option value="radiant">Radiant & Upbeat</option>
              <option value="peaceful">Peaceful & Calm</option>
              <option value="focused">Focused & Study</option>
              <option value="energetic">Energetic & Workout</option>
              <option value="stressed">Stress Relief</option>
              <option value="low">Low Energy & Cozy</option>
            </select>
          </div>

          {availableTracks.length > 0 && (
            <div className="form-group">
              <label className="form-label">Select Tracks to Include ({selectedTrackIds.length} selected)</label>
              <div className="track-selection-list">
                {availableTracks.map((track) => {
                  const isSelected = selectedTrackIds.includes(track._id);
                  return (
                    <div
                      key={track._id}
                      className={`track-select-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleTrackSelect(track._id)}
                    >
                      <div>
                        <div className="track-select-title">{track.title}</div>
                        <div className="track-select-artist">{track.artist}</div>
                      </div>
                      <div className="checkbox-indicator">
                        {isSelected ? <Check size={13} /> : <Plus size={13} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="modal-footer-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save-playlist" disabled={!name.trim()}>
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
