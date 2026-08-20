// Single journal entry preview card component.

import React from 'react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { formatReadableDate } from '../../utils/dateUtils';
import type { JournalEntry } from '../../types';
import './EntryCard.css';

interface EntryCardProps {
  entry: JournalEntry;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const cleanPreviewText = entry.content
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
  const knownTags = ['Grateful', 'Calm', 'Anxious', 'Stressful'];
  const tagClass = knownTags.includes(entry.tag) ? `tag-${entry.tag}` : 'tag-default';

  return (
    <Card className="entry-card">
      <div className="entry-card-header">
        <h4 className="entry-card-title">{entry.title}</h4>
        <span className="entry-card-date">{formatReadableDate(entry.date)}</span>
      </div>

      <p className="entry-card-preview">{cleanPreviewText}</p>

      <div>
        <Badge className={tagClass}>#{entry.tag}</Badge>
      </div>
    </Card>
  );
};
