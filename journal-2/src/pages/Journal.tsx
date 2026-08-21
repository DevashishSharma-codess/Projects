import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { JournalEditor } from "../features/journal/JournalEditor";
import { EntryList } from "../features/journal/EntryList";
import "./Journal.css";

export function Journal() {

  // Get journal entries and the function to add a new entry
  const { entries, addEntry } = useContext(AppContext);

  return (
    <div className="journal-page">

      {/* Page Header */}
      <div className="journal-page-header">
        <h1 className="journal-page-title">Daily Journal</h1>
        <p className="journal-page-subtitle">
          Write your thoughts, feelings, and experiences.
        </p>
      </div>

      {/* Grid container: Journal editor on left, Past folders on right */}
      <div className="journal-grid">

        <div className="journal-editor-column">
          <JournalEditor onSaveEntry={addEntry} />
        </div>

        <div className="journal-entries-column">
          <h2 className="journal-folder-header">
            <span>Past Reflections</span>
            <span className="folder-count">{entries.length}</span>
          </h2>

          <EntryList entries={entries} />
        </div>

      </div>

    </div>
  );
}