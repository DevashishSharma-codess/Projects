import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  return (
    <div className="fullscreen-landing">
      {/* Fullscreen Hero Section with Image, Small Grid, and Glassmorphism Bento Grid */}
      <section className="hero-fullscreen-section">
        <img
          src="/hero-meadow.jpg"
          alt="Serene lush green rolling meadow hills under deep cobalt blue sky"
          className="hero-backdrop-image"
        />

        {/* Content & Bento Cards Overlaid Directly on Hero Image */}
        <div className="hero-overlay-content">
          <div className="hero-header-block">
            <h1 className="hero-geist-title">
              Mindful journal that brings peace to your everyday thoughts
            </h1>

            <p className="hero-geist-subtitle">
              A quiet, distraction-free space to record reflections, log moods (1 to 5), and observe emotional patterns with complete local privacy.
            </p>

            <div className="hero-actions-container">
              <Link to="/journal" className="geist-btn-primary">
                <span>Start Journaling</span>
                <ArrowRight size={16} />
              </Link>

              <Link to="/dashboard" className="geist-btn-glass">
                <span>Open Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
