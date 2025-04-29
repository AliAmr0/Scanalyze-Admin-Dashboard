"use client"
import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { category: "Blood", value: 3500, fill: "var(--color-blood)" },
  { category: "Urine", value: 2200, fill: "var(--color-urine)" },
  { category: "Stool", value: 1100, fill: "var(--color-stool)" },
  { category: "Swab", value: 1800, fill: "var(--color-swab)" },
  { category: "Other", value: 950, fill: "var(--color-other)" },
]

const chartConfig = {
  blood: {
    label: "Blood",
    color: "hsl(var(--chart-1))",
  },
  urine: {
    label: "Urine",
    color: "hsl(var(--chart-2))",
  },
  stool: {
    label: "Stool",
    color: "hsl(var(--chart-3))",
  },
  swab: {
    label: "Swab",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ChartTestCategories() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Categories Distribution</CardTitle>
          <CardDescription>Distribution of test types</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[250px] flex items-center justify-center">
          <div className="animate-pulse">Loading chart data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Categories Distribution</CardTitle>
        <CardDescription>Distribution of test types</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
