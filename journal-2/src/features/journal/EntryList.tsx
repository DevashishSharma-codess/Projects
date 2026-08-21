// Shows all journal entries using the EntryCard component.

import { EntryCard } from "./EntryCard";
import "./EntryList.css";
export function EntryList({ entries }) {

  // If there are no entries, show this message
  if (entries.length === 0) {
    return (
      <div className="empty-entries-message">
        <p>No journal entries yet. Write your first reflection above.</p>
      </div>
    );
  }

  // Show one EntryCard for each entry
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}