/**
 * MoodChart.tsx - Weekly Mood Activity Bar Chart Component
 * 
 * Renders a responsive Recharts BarChart visualizing the user's mood scores (1-5)
 * over the last 7 calendar days.
 * 
 * Key Features:
 * - Gradient glass-effect bar styling (`#greyGlassBar`).
 * - Custom styled tooltips displaying score and mood label.
 * - Dynamic data preparation to ensure every day in the range is displayed.
 */

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { Card } from '../../components/ui/card';
import type { MoodLog } from '../../types';
import { prepareMoodChartData } from '../../utils/moodCalculations';
import './MoodChart.css';

/**
 * Props for MoodChart
 */
interface MoodChartProps {
  /** Array of recorded MoodLog objects */
  moodLogs: MoodLog[];
}

/**
 * MoodChart Component
 * 
 * @param moodLogs - Array of user mood records
 */
export const MoodChart: React.FC<MoodChartProps> = ({ moodLogs }) => {
  // Format data for the past 14 days and slice to the last 7 days for weekly overview
  const chartData = prepareMoodChartData(moodLogs).slice(-7);

  return (
    <Card className="mood-chart-card">
      {/* Subtle radial ambient glow */}
      <div className="mood-chart-glow" />

      <div className="mood-chart-content">
        {/* Chart Header */}
        <div className="mood-chart-header">
          <h3 className="mood-chart-title">Weekly Mood Activity</h3>
          <span className="mood-chart-badge">Last 7 Days</span>
        </div>

        {/* Recharts Container */}
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={270}>
            <BarChart
              data={chartData}
              margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
              barCategoryGap="20%"
            >
              <defs>
                {/* Custom Glass Gradient for Bar Fills */}
                <linearGradient id="greyGlassBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="35%" stopColor="rgba(215, 222, 232, 0.45)" />
                  <stop offset="100%" stopColor="rgba(150, 165, 185, 0.15)" />
                </linearGradient>
              </defs>

              {/* X-Axis: Short Date Strings (e.g. "Aug 21") */}
              <XAxis
                dataKey="date"
                stroke="rgba(255, 255, 255, 0.85)"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.25)' }}
              />

              {/* Y-Axis: Fixed scale from 0 to 5 */}
              <YAxis
                domain={[0, 5]}
                ticks={[1, 2, 3, 4, 5]}
                stroke="rgba(255, 255, 255, 0.85)"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.25)' }}
              />

              {/* Interactive Tooltip showing score & label on hover */}
              <Tooltip
                cursor={{ fill: 'rgba(255, 255, 255, 0.08)', radius: 8 }}
                contentStyle={{
                  backgroundColor: 'rgba(15, 20, 28, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(16px)'
                }}
                formatter={(value: any) => [`Score: ${value ?? 'No Log'} / 5`, 'Mood']}
              />

              {/* Rounded Glass Bar */}
              <Bar
                dataKey="score"
                fill="url(#greyGlassBar)"
                stroke="rgba(255, 255, 255, 0.65)"
                strokeWidth={1.5}
                radius={[12, 12, 12, 12]}
                barSize={32}
                minPointSize={6}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
