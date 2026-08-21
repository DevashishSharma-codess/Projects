// This component lets the user write and save a journal entry.

import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { TagSelector } from "./TagSelector";

import { getTodayDateString } from "../../utils/dateUtils";

import "./JournalEditor.css";


export function JournalEditor({ onSaveEntry }) {

  // Store what the user types
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Store the selected tag
  const [tag, setTag] = useState("Grateful");


  // Runs when the user clicks Save
  function handleSave() {

    // Don't save if title or content is empty
    if (!title.trim() || !content.trim()) {
      alert("Please fill in the title and entry!");
      return;
    }

    // Create a new journal entry
    const entry = {
      id: Date.now().toString(),
      date: getTodayDateString(),
      title: title.trim(),
      content: content,
      tag: tag,
      createdAt: new Date().toISOString()
    };

    // Send the new entry to the parent component
    onSaveEntry(entry);

    // Clear the form after saving
    setTitle("");
    setContent("");
    setTag("Grateful");
  }


  return (
    <Card className="journal-editor-card">

      {/* Title */}
      <Input
        type="text"
        placeholder="Entry Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="editor-title-input"
      />


      {/* Journal text */}
      <div className="quill-wrapper">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="How was your day? Write your thoughts here..."
        />
      </div>


      {/* Tag */}
      <div>
        <label>Category Tag:</label>

        <TagSelector
          selectedTag={tag}
          onSelectTag={setTag}
        />
      </div>


      {/* Date and Save button */}
      <div className="editor-footer">

        <span>
          Date: {getTodayDateString()}
        </span>

        <Button onClick={handleSave}>
          Save Entry
        </Button>

      </div>

    </Card>
  );
}