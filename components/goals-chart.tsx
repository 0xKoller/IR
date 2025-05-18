"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Vacation", current: 2500, target: 5000 },
  { name: "Laptop", current: 800, target: 1200 },
  { name: "Emergency", current: 3200, target: 10000 },
]

export function GoalsChart() {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`h-full w-full transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
          <XAxis
            type="number"
            stroke="#000000"
            fontSize={12}
            tickLine={{ stroke: "#000000" }}
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
          />
          <YAxis
            dataKey="name"
            type="category"
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
          <Bar
            dataKey="current"
            name="Current"
            fill="#10b981"
            radius={0}
            animationDuration={1000}
            stroke="#000000"
            strokeWidth={1}
          />
          <Bar
            dataKey="target"
            name="Target"
            fill="#000000"
            radius={0}
            animationDuration={1500}
            stroke="#000000"
            strokeWidth={1}
            opacity={0.3}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
