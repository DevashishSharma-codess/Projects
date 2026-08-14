import React, { useState } from 'react';
import { X, Headphones, Mic2, Lock, User, Mail, Radio, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = () => {
  const { isAuthOpen, closeAuth, authMode, setAuthMode, login, register } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' (listener) or 'artist'
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (authMode === 'login') {
      const res = await login(username, password);
      if (!res.success) {
        setError(res.message);
      }
    } else {
      if (!email) {
        setError("Email is required for registration.");
        setSubmitting(false);
        return;
      }
      const res = await register(username, email, password, role);
      if (!res.success) {
        setError(res.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuth}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close */}
        <button className="modal-close-btn" onClick={closeAuth}>
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-modal-header">
          <div className="spotify-modal-icon">
            <Radio size={32} />
          </div>
          <h2>{authMode === 'login' ? 'Log in to Spotify' : 'Sign up for free'}</h2>
          <p className="auth-modal-sub">
            {authMode === 'login'
              ? 'Enter your account credentials to access music.'
              : 'Choose your role and start listening or uploading music!'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="auth-tabs">
          <button
            className={`tab-btn ${authMode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setAuthMode('login');
              setError('');
            }}
          >
            Log In
          </button>
          <button
            className={`tab-btn ${authMode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setAuthMode('register');
              setError('');
            }}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="auth-error-box">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="modal-input"
                required
              />
            </div>
          </div>

          {authMode === 'register' && (
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modal-input"
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="modal-input"
                required
              />
            </div>
          </div>

          {/* Role Selection Cards for Registration */}
          {authMode === 'register' && (
            <div className="form-group">
              <label className="form-label">Select Account Type</label>
              <div className="role-cards-grid">
                <div
                  className={`role-option-card ${role === 'user' ? 'selected' : ''}`}
                  onClick={() => setRole('user')}
                >
                  <Headphones size={24} className="role-icon" />
                  <div className="role-card-text">
                    <span className="role-title">Listener</span>
                    <span className="role-desc">Listen to music streams</span>
                  </div>
                </div>

                <div
                  className={`role-option-card ${role === 'artist' ? 'selected' : ''}`}
                  onClick={() => setRole('artist')}
                >
                  <Mic2 size={24} className="role-icon" />
                  <div className="role-card-text">
                    <span className="role-title">Artist</span>
                    <span className="role-desc">Upload & listen to music</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="auth-submit-btn"
          >
            {submitting ? 'Please wait...' : authMode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};
