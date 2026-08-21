/**
 * main.tsx - Application Entry Point
 * 
 * This file bootstraps the React application and mounts it onto the DOM root element.
 * It provides:
 * 1. StrictMode for detecting potential side-effects and deprecated APIs during development.
 * 2. BrowserRouter from 'react-router-dom' to enable client-side routing across all pages.
 * 3. Global CSS imports for theming and foundational styles.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import App from './App.tsx';

// Find the HTML root container element from index.html and initialize the React root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter wraps the entire app to enable declarative routing via URL paths */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
