// Journal Page component: Rich Text Editor + past entry log history.

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { JournalEditor } from '../features/journal/JournalEditor';
import { EntryList } from '../features/journal/EntryList';
import './Journal.css';

export const Journal: React.FC = () => {
  const { entries, addEntry } = useContext(AppContext);

  return (
    <div className="journal-page">
      <div className="journal-page-header">
        <h1 className="journal-page-title">Daily Journal</h1>
        <p className="journal-page-subtitle">Write your thoughts, feelings, and experiences.</p>
      </div>

      <JournalEditor onSaveEntry={addEntry} />

      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem' }}>Past Entries</h3>
        <EntryList entries={entries} />
      </div>
    </div>
  );
};
