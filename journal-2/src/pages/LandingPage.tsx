/**
 * LandingPage.tsx - Welcome & Product Landing Page Component
 * 
 * Features:
 * - Immersive full-bleed hero backdrop image.
 * - Concise, peaceful headline introducing MindfulJournal.
 * - Call-to-Action buttons to jump straight into journaling or view the dashboard.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './LandingPage.css';

/**
 * LandingPage Component
 * 
 * Public entrance view greeting visitors with a calming aesthetic.
 */
export const LandingPage: React.FC = () => {
  return (
    <div className="fullscreen-landing">
      {/* Fullscreen Hero Section with Backdrop Image */}
      <section className="hero-fullscreen-section">
        {/* Serene Nature Backdrop Image */}
        <img
          src="/hero-meadow.jpg"
          alt="Serene lush green rolling meadow hills under deep cobalt blue sky"
          className="hero-backdrop-image"
        />

        {/* Content & Action Buttons Overlaid on Backdrop */}
        <div className="hero-overlay-content">
          <div className="hero-header-block">
            {/* Main Headline */}
            <h1 className="hero-geist-title">
              Mindful journal that brings peace to your everyday thoughts
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="hero-geist-subtitle">
              A quiet, distraction-free space to record reflections, log moods (1 to 5), and observe emotional patterns with complete local privacy.
            </p>

            {/* Primary Action Buttons */}
            <div className="hero-actions-container">
              {/* Button to start writing */}
              <Link to="/journal" className="geist-btn-primary">
                <span>Start Journaling</span>
                <ArrowRight size={16} />
              </Link>

              {/* Button to inspect dashboard analytics */}
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
