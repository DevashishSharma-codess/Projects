/**
 * Root Application Component
 * Wraps the main Landing view inside the global JournalProvider state container.
 */

import React from 'react';
import Landing from './components/Landing';
import { JournalProvider } from './context/JournalContext';

const App: React.FC = () => {
  return (
    <JournalProvider>
      <Landing />
    </JournalProvider>
  );
};

export default App;