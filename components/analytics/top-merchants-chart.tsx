"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Generate sample data based on the selected time range
const generateData = (timeRange: string) => {
  // For top merchants, we'll generate data with current and previous periods
  return [
    { name: "Whole Foods", amount: 425.75, previousAmount: 380.5 },
    { name: "Amazon", amount: 387.42, previousAmount: 410.25 },
    { name: "Target", amount: 312.18, previousAmount: 290.75 },
    { name: "Starbucks", amount: 187.25, previousAmount: 165.3 },
    { name: "Netflix", amount: 45.97, previousAmount: 45.97 },
    { name: "Uber", amount: 132.5, previousAmount: 148.6 },
    { name: "Apple", amount: 299.99, previousAmount: 225.0 },
    { name: "Gym", amount: 135.0, previousAmount: 135.0 },
  ].sort((a, b) => b.amount - a.amount)
}

interface TopMerchantsChartProps {
  timeRange: string
}

export function TopMerchantsChart({ timeRange }: TopMerchantsChartProps) {
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
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
          <XAxis
            type="number"
            stroke="#000000"
            fontSize={12}
            tickLine={{ stroke: "#000000" }}
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#000000"
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
