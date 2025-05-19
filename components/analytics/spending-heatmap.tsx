"use client";

import { useState, useEffect } from "react";
import { ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

// Define the heatmap data point type
type HeatmapDataPoint = {
  day: string;
  hour: number;
  value: number;
};

// Generate sample data for the heatmap
const generateHeatmapData = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const data: HeatmapDataPoint[] = [];

  for (const day of days) {
    for (const hour of hours) {
      // Generate a value between 0 and 100, with higher values during typical spending times
      let value = Math.random() * 30;

      // Increase likelihood of spending during certain hours
      if (hour >= 11 && hour <= 14) value += 30; // Lunch time
      if (hour >= 17 && hour <= 20) value += 40; // Dinner time
      if ((day === "Saturday" || day === "Sunday") && hour >= 10 && hour <= 18)
        value += 20; // Weekend shopping

      // Add some randomness
      value += Math.random() * 20;

      // Cap at 100
      value = Math.min(value, 100);

      data.push({
        day,
        hour,
        value: Math.round(value),
      });
    }
  }

  return data;
};

// Get color based on value
const getColor = (value: number) => {
  // Green gradient from light to dark
  if (value < 20) return "#e6f7ef"; // Very light green
  if (value < 40) return "#b3e6d0"; // Light green
  if (value < 60) return "#66cc99"; // Medium green
  if (value < 80) return "#33b377"; // Dark green
  return "#10b981"; // Very dark green
};

interface SpendingHeatmapProps {
  timeRange: string;
}

export function SpendingHeatmap({ timeRange }: SpendingHeatmapProps) {
  const [data, setData] = useState<HeatmapDataPoint[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const newData = generateHeatmapData();
    setData(newData as any);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [timeRange]);

  // Format hour for display
  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  return (
    <div
      className={`h-full w-full transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <div className='w-full h-full flex flex-col'>
          <div className='flex mb-2'>
            <div className='w-20'></div>
            <div className='flex-1 flex'>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className='flex-1 text-center text-xs font-bold'>
                  {i % 3 === 0 ? formatHour(i) : ""}
                </div>
              ))}
            </div>
          </div>

          <div className='flex-1 flex flex-col'>
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day, dayIndex) => (
              <div key={day} className='flex-1 flex items-center'>
                <div className='w-20 text-sm font-bold'>{day}</div>
                <div className='flex-1 flex h-full'>
                  {Array.from({ length: 24 }, (_, hour) => {
                    const cellData = data.find(
                      (d: any) => d.day === day && d.hour === hour
                    );
                    const value = cellData ? cellData.value : 0;

                    return (
                      <motion.div
                        key={hour}
                        className='flex-1 h-full border border-black'
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          backgroundColor: getColor(value),
                        }}
                        transition={{
                          duration: 0.5,
                          delay: (dayIndex * 24 + hour) * 0.001, // Staggered animation
                        }}
                        style={{
                          position: "relative",
                        }}
                        title={`${day} at ${formatHour(hour)}: ${value}% spending activity`}
                      >
                        {value > 60 && (
                          <div className='absolute inset-0 flex items-center justify-center text-xs font-bold text-black'>
                            {value}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className='mt-4 flex items-center justify-center'>
            <div className='flex items-center'>
              <span className='text-xs mr-2'>Low</span>
              <div className='flex h-4'>
                {["#e6f7ef", "#b3e6d0", "#66cc99", "#33b377", "#10b981"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className='w-8 h-full border border-black'
                      style={{ backgroundColor: color }}
                    ></div>
                  )
                )}
              </div>
              <span className='text-xs ml-2'>High</span>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
