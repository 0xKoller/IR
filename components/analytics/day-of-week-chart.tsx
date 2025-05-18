"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Generate sample data based on the selected time range
const generateData = (timeRange: string) => {
  // For day of week, we'll just generate random data with a pattern
  // Weekends typically have higher spending
  return [
    { name: "Monday", amount: 350 + Math.random() * 100, previousAmount: 320 + Math.random() * 100 },
    { name: "Tuesday", amount: 300 + Math.random() * 100, previousAmount: 280 + Math.random() * 100 },
    { name: "Wednesday", amount: 400 + Math.random() * 100, previousAmount: 370 + Math.random() * 100 },
    { name: "Thursday", amount: 450 + Math.random() * 100, previousAmount: 420 + Math.random() * 100 },
    { name: "Friday", amount: 600 + Math.random() * 150, previousAmount: 550 + Math.random() * 150 },
    { name: "Saturday", amount: 750 + Math.random() * 200, previousAmount: 700 + Math.random() * 200 },
    { name: "Sunday", amount: 550 + Math.random() * 150, previousAmount: 500 + Math.random() * 150 },
  ]
}

interface DayOfWeekChartProps {
  timeRange: string
}

export function DayOfWeekChart({ timeRange }: DayOfWeekChartProps) {
  const [data, setData] = useState([])
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    setIsAnimating(true)
    const newData = generateData(timeRange)
    setData(newData)

    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [timeRange])

  return (
    <div className={`h-full w-full transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
          <XAxis
            dataKey="name"
            stroke="#000000"
            fontSize={12}
            tickLine={{ stroke: "#000000" }}
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
          />
          <YAxis
            stroke="#000000"
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
          <Bar
            dataKey="amount"
            name="Current Period"
            fill="#10b981"
            stroke="#000000"
            strokeWidth={1}
            radius={0}
            animationDuration={1500}
          />
          <Bar
            dataKey="previousAmount"
            name="Previous Period"
            fill="#d1d5db"
            stroke="#000000"
            strokeWidth={1}
            radius={0}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
