"use client"

import React from "react"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { hour: "6 AM", patients: 10 },
  { hour: "7 AM", patients: 15 },
  { hour: "8 AM", patients: 35 },
  { hour: "9 AM", patients: 65 },
  { hour: "10 AM", patients: 85 },
  { hour: "11 AM", patients: 75 },
  { hour: "12 PM", patients: 60 },
  { hour: "1 PM", patients: 45 },
  { hour: "2 PM", patients: 55 },
  { hour: "3 PM", patients: 70 },
  { hour: "4 PM", patients: 80 },
  { hour: "5 PM", patients: 60 },
  { hour: "6 PM", patients: 40 },
  { hour: "7 PM", patients: 25 },
  { hour: "8 PM", patients: 15 },
]

const chartConfig = {
  patients: {
    label: "Patients",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartRushHours() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rush Hours</CardTitle>
          <CardDescription>Patient volume by hour of day</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <div className="animate-pulse">Loading chart data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rush Hours</CardTitle>
        <CardDescription>Patient volume by hour of day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value} />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} patients`, "Volume"]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Legend formatter={(value) => `Patient Volume`} />
            <Line
              dataKey="patients"
              type="monotone"
              stroke="var(--color-patients)"
              strokeWidth={2}
              dot={{ fill: "var(--color-patients)", r: 4 }}
              activeDot={{ r: 6, fill: "var(--color-patients)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Peak hours: 10 AM and 4 PM <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
