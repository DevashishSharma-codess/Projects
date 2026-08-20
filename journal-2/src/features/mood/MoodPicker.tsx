// Daily Mood Picker selector component with dynamic mindful prompt.

import React from 'react';
import { Laugh, Smile, Meh, AlertCircle, Frown, Sparkles } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { MOOD_OPTIONS } from '../../utils/constants';
import type { MoodOption, MoodLog } from '../../types';
import { getTodayDateString } from '../../utils/dateUtils';
import './MoodPicker.css';

interface MoodPickerProps {
  currentMoodLog?: MoodLog;
  onSaveMood: (moodLog: MoodLog) => void;
}

const MOOD_MESSAGES: Record<string, { title: string; desc: string }> = {
  great: {
    title: 'Radiant Energy',
    desc: 'You are feeling energized and joyful. What sparked gratitude in your day today?'
  },
  good: {
    title: 'Positive & Steady',
    desc: 'A calm, optimistic state of mind. Keep this gentle momentum going forward.'
  },
  okay: {
    title: 'Centered & Balanced',
    desc: 'Ground yourself in the present moment. Take a slow, peaceful breath.'
  },
  anxious: {
    title: 'Mindful Ease',
    desc: 'Inhale peace, exhale tension. Acknowledge your thoughts with kindness and patience.'
  },
  sad: {
    title: 'Gentle Care',
    desc: 'It is okay to feel down. Be gentle with yourself and take things one step at a time.'
  }
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ currentMoodLog, onSaveMood }) => {
  const selectedMoodId = currentMoodLog ? currentMoodLog.moodId : '';

  const getMoodIcon = (moodId: string) => {
    switch (moodId) {
      case 'great':
        return <Laugh size={24} color="#10b981" />;
      case 'good':
        return <Smile size={24} color="#0284c7" />;
      case 'okay':
        return <Meh size={24} color="#f59e0b" />;
      case 'anxious':
        return <AlertCircle size={24} color="#8b5cf6" />;
      case 'sad':
        return <Frown size={24} color="#ef4444" />;
      default:
        return <Smile size={24} />;
    }
  };

  const currentMessage = selectedMoodId && MOOD_MESSAGES[selectedMoodId]
    ? MOOD_MESSAGES[selectedMoodId]
    : {
        title: 'Mindful Check-in',
        desc: 'Tap an icon below to record how you feel and track your daily emotional balance.'
      };

  const handleSelectMood = (option: MoodOption) => {
    const newLog: MoodLog = {
      id: Date.now().toString(),
      date: getTodayDateString(),
      moodId: option.id,
      label: option.label,
      score: option.score
    };

    onSaveMood(newLog);
  };

  return (
    <Card className="mood-picker-card">
      <div className="mood-picker-header">
        <h3 className="mood-picker-title">How are you feeling today?</h3>
        <span className="mood-picker-status-badge">
          <Sparkles size={13} />
          {selectedMoodId ? `${currentMoodLog?.label} Logged` : 'Check-in'}
        </span>
      </div>

      {/* Dynamic Mindful Insight in the center */}
      <div className="mood-insight-box">
        <h4 className="mood-insight-title">{currentMessage.title}</h4>
        <p className="mood-insight-desc">{currentMessage.desc}</p>
      </div>

      <div className="mood-grid">
        {MOOD_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`mood-option-btn ${selectedMoodId === option.id ? 'selected' : ''}`}
            onClick={() => handleSelectMood(option)}
          >
            <span className="mood-icon-wrapper">{getMoodIcon(option.id)}</span>
            <span className="mood-label">{option.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};
