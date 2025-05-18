"use client"

import { useState, useEffect } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", amount: 45.2 },
  { name: "Feb", amount: 52.75 },
  { name: "Mar", amount: 61.3 },
  { name: "Apr", amount: 58.9 },
  { name: "May", amount: 65.4 },
  { name: "Jun", amount: 78.25 },
  { name: "Jul", amount: 89.6 },
  { name: "Aug", amount: 102.3 },
  { name: "Sep", amount: 110.75 },
  { name: "Oct", amount: 118.2 },
  { name: "Nov", amount: 125.4 },
  { name: "Dec", amount: 0 }, // Future month
]

export function CashbackChart() {
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
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
          <XAxis
            dataKey="name"
            stroke="#000000"
            fontSize={10}
            tickLine={{ stroke: "#000000" }}
            axisLine={{ stroke: "#000000", strokeWidth: 2 }}
          />
          <YAxis
            stroke="#000000"
            fontSize={10}
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
            formatter={(value: number) => [`$${value.toFixed(2)}`, "Cashback"]}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#000000"
            strokeWidth={2}
            fill="#10b981"
            fillOpacity={0.8}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
