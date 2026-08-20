// Single tag selection component for journal entries.

import React from 'react';
import { PRESET_TAGS } from '../../utils/constants';
import './TagSelector.css';

interface TagSelectorProps {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({ selectedTag, onSelectTag }) => {
  return (
    <div className="tag-selector">
      {PRESET_TAGS.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`tag-option-btn ${selectedTag === tag ? 'selected' : ''}`}
          onClick={() => onSelectTag(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};
