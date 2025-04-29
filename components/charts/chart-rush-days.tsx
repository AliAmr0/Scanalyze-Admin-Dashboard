"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { day: "Monday", patients: 180 },
  { day: "Tuesday", patients: 165 },
  { day: "Wednesday", patients: 190 },
  { day: "Thursday", patients: 210 },
  { day: "Friday", patients: 230 },
  { day: "Saturday", patients: 120 },
  { day: "Sunday", patients: 80 },
]

const chartConfig = {
  patients: {
    label: "Patients",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartRushDays() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rush Days</CardTitle>
          <CardDescription>Patient volume by day of week</CardDescription>
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
        <CardTitle>Rush Days</CardTitle>
        <CardDescription>Patient volume by day of week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
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
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.substring(0, 3)}
            />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} patients`, "Volume"]}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Legend formatter={(value) => `Patient Volume`} />
            <Bar dataKey="patients" fill="var(--color-patients)" radius={[4, 4, 0, 0]} barSize={30} name="Patients" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Busiest day: Friday <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
