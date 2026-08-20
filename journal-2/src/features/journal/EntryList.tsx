// Render list of past journal entries.

import React from 'react';
import { EntryCard } from './EntryCard';
import type { JournalEntry } from '../../types';
import './EntryList.css';

interface EntryListProps {
  entries: JournalEntry[];
}

export const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="empty-entries-message">
        <p>No journal entries yet. Write your first reflection above.</p>
      </div>
    );
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};
