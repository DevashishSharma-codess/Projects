import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('spotify_token') || null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    const fetchMe = async () => {
      const storedToken = localStorage.getItem('spotify_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data && res.data.user) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.error("Session fetch failed", err);
          localStorage.removeItem('spotify_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchMe();
  }, []);

  const login = async (usernameOrEmail, password) => {
    try {
      const res = await api.post('/auth/login', {
        username: usernameOrEmail,
        password,
      });

      const { user: userData, token: userToken } = res.data;
      if (userToken) {
        localStorage.setItem('spotify_token', userToken);
        setToken(userToken);
      }
      setUser(userData);
      setIsAuthOpen(false);
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      return { success: false, message: errorMsg };
    }
  };

  const register = async (username, email, password, role = 'user') => {
    try {
      const res = await api.post('/auth/register', {
        username,
        email,
        password,
        role,
      });

      const { user: userData, token: userToken } = res.data;
      if (userToken) {
        localStorage.setItem('spotify_token', userToken);
        setToken(userToken);
      }
      setUser(userData);
      setIsAuthOpen(false);
      return { success: true, message: res.data.message };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      return { success: false, message: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('spotify_token');
      setToken(null);
      setUser(null);
    }
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthOpen,
        authMode,
        setAuthMode,
        openAuth,
        closeAuth,
        login,
        register,
        logout,
        isArtist: user?.role === 'artist',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
