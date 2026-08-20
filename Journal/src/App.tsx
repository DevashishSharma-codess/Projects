/**
 * Root Application Component
 * Wraps the main Landing view inside the global JournalProvider state container.
 */

import React from 'react';
import Landing from './components/landing';
import { JournalProvider } from './context/JournalContext';
import './App.css';

const App: React.FC = () => {
  return (
    <JournalProvider>
      <Landing />
    </JournalProvider>
  );
};

export default App;