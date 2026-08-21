/**
 * Loader.tsx - Loading Spinner Component
 * 
 * Renders an animated circular CSS spinner centered within its container.
 * Used during asynchronous operations such as fetching daily quotes.
 */

import React from 'react';
import './Loader.css';

/**
 * Loader Component
 * 
 * Provides visual feedback during data fetching or page transitions.
 */
export const Loader: React.FC = () => {
  return (
    <div className="loader-container" role="status" aria-label="Loading...">
      <div className="spinner" />
    </div>
  );
};
