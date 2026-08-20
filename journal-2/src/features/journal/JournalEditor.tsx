// Rich Text Journal Editor component using ReactQuill.

import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { TagSelector } from './TagSelector';
import { getTodayDateString } from '../../utils/dateUtils';
import type { JournalEntry } from '../../types';
import './JournalEditor.css';

interface JournalEditorProps {
  onSaveEntry: (entry: JournalEntry) => void;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({ onSaveEntry }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tag, setTag] = useState<string>('Grateful');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both the title and entry content!');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: getTodayDateString(),
      title: title.trim(),
      content: content,
      tag: tag,
      createdAt: new Date().toISOString()
    };

    onSaveEntry(newEntry);

    setTitle('');
    setContent('');
    setTag('Grateful');
  };

  return (
    <Card className="journal-editor-card">
      <Input
        type="text"
        placeholder="Entry Title (e.g. A Peaceful Morning Walk)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="editor-title-input"
      />

      <div className="quill-wrapper">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="How was your day? Write your thoughts here..."
        />
      </div>

      <div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
          Category Tag:
        </label>
        <TagSelector selectedTag={tag} onSelectTag={setTag} />
      </div>

      <div className="editor-footer">
        <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
          Date: {getTodayDateString()}
        </span>
        <Button onClick={handleSave} variant="default">
          Save Entry
        </Button>
      </div>
    </Card>
  );
};
