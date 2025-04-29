"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { branch: "Main", patients: 3250 },
  { branch: "North", patients: 2180 },
  { branch: "South", patients: 1850 },
  { branch: "East", patients: 1540 },
  { branch: "West", patients: 1320 },
  { branch: "Central", patients: 2450 },
  { branch: "Downtown", patients: 1980 },
  { branch: "Uptown", patients: 1420 },
]

const chartConfig = {
  patients: {
    label: "Patients",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function ChartPatientsByBranch() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patients by Branch</CardTitle>
          <CardDescription>Total patients served at each branch</CardDescription>
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
        <CardTitle>Patients by Branch</CardTitle>
        <CardDescription>Total patients served at each branch</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 80,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="branch" type="category" tickLine={false} axisLine={false} width={70} />
            <Tooltip
              formatter={(value) => [`${value.toLocaleString()} patients`, "Total"]}
              labelFormatter={(label) => `Branch: ${label}`}
            />
            <Legend formatter={(value) => `Patient Count`} />
            <Bar dataKey="patients" fill="var(--color-patients)" radius={[0, 4, 4, 0]} barSize={20} name="Patients" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
