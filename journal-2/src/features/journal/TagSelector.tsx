/**
 * TagSelector.tsx - Category Tag Selector Buttons
 * 
 * Provides interactive chip buttons for choosing a journal entry tag
 * from the preset list (Grateful, Calm, Anxious, Stressful).
 */

import React from 'react';
import { PRESET_TAGS } from '../../utils/constants';
import './TagSelector.css';

/**
 * Props for TagSelector
 */
interface TagSelectorProps {
  /** Currently selected tag string */
  selectedTag: string;
  /** Callback fired when a tag button is clicked */
  onSelectTag: (tag: string) => void;
}

/**
 * TagSelector Component
 * 
 * @param selectedTag - Active tag string
 * @param onSelectTag - Tag selection handler
 */
export const TagSelector: React.FC<TagSelectorProps> = ({ selectedTag, onSelectTag }) => {
  return (
    <div className="tag-selector" role="group" aria-label="Select Entry Tag">
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
