import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import { MoodPicker } from "../features/mood/MoodPicker";
import { MoodChart } from "../features/mood/MoodChart";
import { Card } from "../components/ui/card";

import {
  calculateAverageMood,
  calculateWeeklyTopScore
} from "../utils/moodCalculations";

import { getTodayDateString } from "../utils/dateUtils";

import "./MoodTrends.css";


export function MoodTrends() {

  // Get mood data and the function to add a new mood
  const { moodLogs, addMoodLog } = useContext(AppContext);


  // Get today's date
  const todayDate = getTodayDateString();


  // Find today's mood
  const todayMood = moodLogs.find((mood) => {
    return mood.date === todayDate;
  });


  // Calculate mood statistics
  const averageMood = calculateAverageMood(moodLogs);
  const weeklyTop = calculateWeeklyTopScore(moodLogs);


  return (
    <div className="mood-trends-page">

      <div className="mood-trends-header">
        <h1 className="mood-trends-title">
          Mood Analytics
        </h1>

        <p className="mood-trends-subtitle">
          Track your emotional well-being over time.
        </p>
      </div>


      {/* Mood selection */}
      <MoodPicker
        currentMoodLog={todayMood}
        onSaveMood={addMoodLog}
      />


      {/* Statistics */}
      <div className="stat-grid">

        <Card>
          <span className="stat-card-title">
            Average Mood Score
          </span>

          <div className="stat-card-value">
            {averageMood} / 5
          </div>
        </Card>


        <Card>
          <span className="stat-card-title">
            Weekly Top Score
          </span>

          <div className="stat-card-value">
            {weeklyTop.topScore} / 5

            {weeklyTop.topScore > 0 && (
              <span className="top-mood">
                ({weeklyTop.topMood})
              </span>
            )}
          </div>
        </Card>


        <Card>
          <span className="stat-card-title">
            Total Days Logged
          </span>

          <div className="stat-card-value">
            {moodLogs.length} days
          </div>
        </Card>

      </div>


      {/* Mood chart */}
      <MoodChart moodLogs={moodLogs} />

    </div>
  );
}