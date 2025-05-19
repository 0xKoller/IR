"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Generate sample data based on the selected time range
const generateData = (timeRange: string, stacked = false) => {
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

  if (stacked) {
    const currentDate = new Date();
    const data = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - i);

      const monthName = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();

      // Generate random spending data with some trend
      const baseSpending = 1000 + Math.random() * 500;

      data.push({
        name: `${monthName} ${year}`,
        Groceries: baseSpending * (0.3 + Math.random() * 0.1),
        Dining: baseSpending * (0.2 + Math.random() * 0.1),
        Shopping: baseSpending * (0.15 + Math.random() * 0.1),
        Entertainment: baseSpending * (0.1 + Math.random() * 0.05),
        Transportation: baseSpending * (0.1 + Math.random() * 0.05),
        Other: baseSpending * (0.15 + Math.random() * 0.1),
      });
    }

    return data;
  } else {
    // For the pie chart, just return category totals
    return [
      { name: "Groceries", value: 1275.25, color: "#10b981" },
      { name: "Dining", value: 875.5, color: "#8b5cf6" },
      { name: "Shopping", value: 625.75, color: "#3b82f6" },
      { name: "Entertainment", value: 425.3, color: "#f59e0b" },
      { name: "Transportation", value: 375.45, color: "#ef4444" },
      { name: "Other", value: 673.5, color: "#6b7280" },
    ];
  }
};

interface CategoryBreakdownChartProps {
  timeRange: string;
  stacked?: boolean;
}

export function CategoryBreakdownChart({
  timeRange,
  stacked = false,
}: CategoryBreakdownChartProps) {
  const [data, setData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const newData = generateData(timeRange, stacked);
    setData(newData as any);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [timeRange, stacked]);

  if (stacked) {
    return (
      <div
        className={`h-full w-full transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
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
            <Area
              type='monotone'
              dataKey='Groceries'
              stackId='1'
              stroke='#000000'
              strokeWidth={1}
              fill='#10b981'
              animationDuration={1500}
            />
            <Area
              type='monotone'
              dataKey='Dining'
              stackId='1'
              stroke='#000000'
              strokeWidth={1}
              fill='#8b5cf6'
              animationDuration={1500}
            />
            <Area
              type='monotone'
              dataKey='Shopping'
              stackId='1'
              stroke='#000000'
              strokeWidth={1}
              fill='#3b82f6'
              animationDuration={1500}
            />
            <Area
              type='monotone'
              dataKey='Entertainment'
              stackId='1'
              stroke='#000000'
              strokeWidth={1}
              fill='#f59e0b'
              animationDuration={1500}
            />
            <Area
              type='monotone'
              dataKey='Transportation'
              stackId='1'
              stroke='#000000'
              strokeWidth={1}
              fill='#ef4444'
              animationDuration={1500}
            />
            <Area
              type='monotone'
              dataKey='Other'
              stackId='1'
              stroke='#000000'
              strokeWidth={1}
              fill='#6b7280'
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div
      className={`h-full w-full transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          layout='vertical'
          margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#000000' />
          <XAxis
            type='number'
            stroke='#000000'
            fontSize={12}
            tickLine={{ stroke: "#000000" }}
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            type='category'
            dataKey='name'
            stroke='#000000'
            fontSize={12}
            tickLine={{ stroke: "#000000" }}
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
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
          <Bar
            dataKey='value'
            fill='#10b981'
            stroke='#000000'
            strokeWidth={1}
            animationDuration={1500}
            label={{
              position: "right",
              formatter: (value: number) => `$${value.toFixed(0)}`,
              fontSize: 12,
              fontWeight: "bold",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
