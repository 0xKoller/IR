"use client"

import { useState, useEffect } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Groceries", value: 35, color: "#10b981" },
  { name: "Shopping", value: 25, color: "#3b82f6" },
  { name: "Dining", value: 20, color: "#8b5cf6" },
  { name: "Transportation", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#6b7280" },
]

export function SpendingChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
            animationDuration={1500}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            strokeWidth={2}
            stroke="#000000"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="transition-opacity duration-300"
                style={{
                  filter: activeIndex === index ? "brightness(110%)" : "brightness(100%)",
                  transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                  transformOrigin: "center",
                  transition: "transform 0.3s ease",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "2px solid black",
              borderRadius: "0px",
              boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
              fontWeight: "bold",
            }}
            formatter={(value: number) => [`${value}%`, "Percentage"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
