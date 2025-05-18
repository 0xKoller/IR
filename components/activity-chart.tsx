"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface DataPoint {
  name: string
  spending: number
  cashback: number
}

// Generate sample data based on the selected period
const generateData = (period: string): DataPoint[] => {
  const data: DataPoint[] = []
  let days: number
  let interval: number

  switch (period) {
    case "7days":
      days = 7
      interval = 1
      break
    case "90days":
      days = 90
      interval = 15
      break
    case "30days":
    default:
      days = 30
      interval = 5
      break
  }

  // Create data points based on the period
  for (let i = 0; i < days; i += interval) {
    const day = i + 1
    const spending = Math.floor(Math.random() * 300) + 100
    const cashback = spending * 0.02 // 2% cashback

    data.push({
      name: `Day ${day}`,
      spending,
      cashback,
    })
  }

  return data
}

interface ActivityChartProps {
  period: string
}

export function ActivityChart({ period }: ActivityChartProps) {
  const [data, setData] = useState<DataPoint[]>([])
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    setIsAnimating(true)
    const newData = generateData(period)
    setData(newData)

    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [period])

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
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "0px",
              boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
              fontWeight: "bold",
            }}
          />
          <Legend
            wrapperStyle={{
              fontWeight: "bold",
              fontSize: "14px",
            }}
          />
          <Bar
            dataKey="spending"
            name="Spending"
            fill="#000000"
            radius={0}
            animationDuration={1000}
            stroke="#000000"
            strokeWidth={1}
          />
          <Bar
            dataKey="cashback"
            name="Cashback"
            fill="#10b981"
            radius={0}
            animationDuration={1500}
            stroke="#000000"
            strokeWidth={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
