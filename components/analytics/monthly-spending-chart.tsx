"use client";

import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Define the data point type
type MonthlySpendingDataPoint = {
  name: string;
  total: number;
  groceries: number;
  dining: number;
  shopping: number;
  entertainment: number;
  transportation: number;
  other: number;
  previousPeriod?: number;
};

// Generate sample data based on the selected time range
const generateData = (timeRange: string, showComparison = false) => {
  let months: number;

  switch (timeRange) {
    case "1month":
      months = 1;
      break;
    case "6months":
      months = 6;
      break;
    case "1year":
      months = 12;
      break;
    case "all":
      months = 24;
      break;
    case "3months":
    default:
      months = 3;
      break;
  }

  const currentDate = new Date();
  const data: MonthlySpendingDataPoint[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() - i);

    const monthName = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    // Generate random spending data with some trend
    const baseSpending = 1000 + Math.random() * 500;
    const groceries = baseSpending * (0.3 + Math.random() * 0.1);
    const dining = baseSpending * (0.2 + Math.random() * 0.1);
    const shopping = baseSpending * (0.15 + Math.random() * 0.1);
    const entertainment = baseSpending * (0.1 + Math.random() * 0.05);
    const transportation = baseSpending * (0.1 + Math.random() * 0.05);
    const other = baseSpending * (0.15 + Math.random() * 0.1);

    const total =
      groceries + dining + shopping + entertainment + transportation + other;

    // Generate previous period data (slightly lower on average)
    const prevPeriodFactor = 0.85 + Math.random() * 0.3; // Between 0.85 and 1.15
    const prevTotal = total * prevPeriodFactor;

    const dataPoint: MonthlySpendingDataPoint = {
      name: `${monthName} ${year}`,
      total,
      groceries,
      dining,
      shopping,
      entertainment,
      transportation,
      other,
    };

    if (showComparison) {
      dataPoint["previousPeriod"] = prevTotal;
    }

    data.push(dataPoint);
  }

  return data;
};

interface MonthlySpendingChartProps {
  timeRange: string;
  showComparison?: boolean;
}

export function MonthlySpendingChart({
  timeRange,
  showComparison = false,
}: MonthlySpendingChartProps) {
  const [data, setData] = useState<MonthlySpendingDataPoint[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const newData = generateData(timeRange, showComparison);
    setData(newData as any);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [timeRange, showComparison]);

  return (
    <div
      className={`h-full w-full transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#000000' />
          <XAxis
            dataKey='name'
            stroke='#000000'
            fontSize={12}
            tickLine={{ stroke: "#000000" }}
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
          />
          <YAxis
            stroke='#000000'
            fontSize={12}
            tickLine={{ stroke: "#000000" }}
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "0px",
              boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
              fontWeight: "bold",
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
            animationDuration={300}
          />
          <Legend
            wrapperStyle={{
              fontWeight: "bold",
              fontSize: "14px",
            }}
          />
          <Line
            type='monotone'
            dataKey='total'
            name='Current Period'
            stroke='#10b981'
            strokeWidth={3}
            dot={{ stroke: "#10b981", strokeWidth: 2, r: 4 }}
            activeDot={{ stroke: "#10b981", strokeWidth: 2, r: 6 }}
            animationDuration={1500}
          />
          {showComparison && (
            <Line
              type='monotone'
              dataKey='previousPeriod'
              name='Previous Period'
              stroke='#000000'
              strokeWidth={2}
              strokeDasharray='5 5'
              dot={{ stroke: "#000000", strokeWidth: 2, r: 3 }}
              activeDot={{ stroke: "#000000", strokeWidth: 2, r: 5 }}
              animationDuration={1500}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
