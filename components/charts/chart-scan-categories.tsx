"use client"
import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { category: "X-Ray", value: 2800, fill: "var(--color-xray)" },
  { category: "MRI", value: 1500, fill: "var(--color-mri)" },
  { category: "CT Scan", value: 1200, fill: "var(--color-ct)" },
  { category: "Ultrasound", value: 2100, fill: "var(--color-ultrasound)" },
  { category: "Other", value: 750, fill: "var(--color-other)" },
]

const chartConfig = {
  xray: {
    label: "X-Ray",
    color: "hsl(var(--chart-1))",
  },
  mri: {
    label: "MRI",
    color: "hsl(var(--chart-2))",
  },
  ct: {
    label: "CT Scan",
    color: "hsl(var(--chart-3))",
  },
  ultrasound: {
    label: "Ultrasound",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ChartScanCategories() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scan Categories Distribution</CardTitle>
          <CardDescription>Distribution of scan types</CardDescription>
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
        <CardTitle>Scan Categories Distribution</CardTitle>
        <CardDescription>Distribution of scan types</CardDescription>
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
