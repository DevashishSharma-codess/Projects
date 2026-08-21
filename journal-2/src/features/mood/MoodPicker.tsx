import { Laugh, Smile, Meh, AlertCircle, Frown, Sparkles } from "lucide-react";
import { Card } from "../../components/ui/card";
import { MOOD_OPTIONS } from "../../utils/constants";
import { getTodayDateString } from "../../utils/dateUtils";
import "./MoodPicker.css";


// Message shown for each mood
const MOOD_MESSAGES = {
  great: {
    title: "Radiant Energy",
    desc: "You are feeling energized and joyful. What sparked gratitude in your day today?"
  },

  good: {
    title: "Positive & Steady",
    desc: "A calm, optimistic state of mind. Keep this gentle momentum going forward."
  },

  okay: {
    title: "Centered & Balanced",
    desc: "Ground yourself in the present moment. Take a slow, peaceful breath."
  },

  anxious: {
    title: "Mindful Ease",
    desc: "Inhale peace, exhale tension. Acknowledge your thoughts with kindness and patience."
  },

  sad: {
    title: "Gentle Care",
    desc: "It is okay to feel down. Be gentle with yourself and take things one step at a time."
  }
};


export function MoodPicker({ currentMoodLog, onSaveMood }) {

  // Get the mood that is already selected today
  const selectedMood = currentMoodLog?.moodId || "";


  // Save the mood when the user clicks a mood
  function selectMood(option) {

    const mood = {
      id: Date.now().toString(),
      date: getTodayDateString(),
      moodId: option.id,
      label: option.label,
      score: option.score
    };

    onSaveMood(mood);
  }


  // Get the message for the selected mood
  let message = {
    title: "Mindful Check-in",
    desc: "Tap an icon below to record how you feel and track your daily emotional balance."
  };

  if (selectedMood && MOOD_MESSAGES[selectedMood]) {
    message = MOOD_MESSAGES[selectedMood];
  }


  return (
    <Card className="mood-picker-card">

      {/* Header */}
      <div className="mood-picker-header">

        <h3 className="mood-picker-title">
          How are you feeling today?
        </h3>

        <span className="mood-picker-status-badge">
          <Sparkles size={13} />

          {selectedMood
            ? `${currentMoodLog.label} Logged`
            : "Check-in"
          }
        </span>

      </div>


      {/* Message */}
      <div className="mood-insight-box">

        <h4 className="mood-insight-title">
          {message.title}
        </h4>

        <p className="mood-insight-desc">
          {message.desc}
        </p>

      </div>


      {/* Mood buttons */}
      <div className="mood-grid">

        {MOOD_OPTIONS.map((option) => (

          <button
            key={option.id}
            className={`mood-option-btn ${selectedMood === option.id ? "selected" : ""
              }`}
            onClick={() => selectMood(option)}
          >

            <span className="mood-icon-wrapper">

              {option.id === "great" && <Laugh size={24} color="#10b981" />}
              {option.id === "good" && <Smile size={24} color="#0284c7" />}
              {option.id === "okay" && <Meh size={24} color="#f59e0b" />}
              {option.id === "anxious" && <AlertCircle size={24} color="#8b5cf6" />}
              {option.id === "sad" && <Frown size={24} color="#ef4444" />}

            </span>

            <span className="mood-label">
              {option.label}
            </span>

          </button>

        ))}

      </div>

    </Card>
  );
}