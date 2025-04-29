"use client"

import * as React from "react"
import { Cell, Legend, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { gender: "Male", value: 120, fill: "var(--color-male)" },
  { gender: "Female", value: 125, fill: "var(--color-female)" },
]

const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

// Custom legend formatter to include values
const renderLegend = (props: any) => {
  const { payload } = props

  return (
    <ul className="flex flex-col gap-2 text-xs mt-4">
      {payload.map((entry: any, index: number) => {
        const item = chartData.find((d) => d.gender === entry.value)
        return (
          <li key={`item-${index}`} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: entry.color }} />
              <span>{entry.value}</span>
            </div>
            <span className="font-medium">{item?.value} staff</span>
          </li>
        )
      })}
    </ul>
  )
}

export function ChartGenderDistribution() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const totalStaff = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Staff Gender Distribution</CardTitle>
          <CardDescription>Distribution by gender</CardDescription>
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
        <CardTitle>Staff Gender Distribution</CardTitle>
        <CardDescription>Distribution by gender</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="gender"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Legend layout="vertical" verticalAlign="bottom" align="center" content={renderLegend} />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan x="50%" y="50%" className="fill-foreground text-3xl font-bold">
                {totalStaff}
              </tspan>
              <tspan x="50%" y="50%" dy="1.5em" className="fill-muted-foreground text-sm">
                Total Staff
              </tspan>
            </text>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
