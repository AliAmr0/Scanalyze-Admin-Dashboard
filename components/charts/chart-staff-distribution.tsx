"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { branch: "Main", doctors: 25, technicians: 35, nurses: 40, admin: 15 },
  { branch: "North", doctors: 15, technicians: 25, nurses: 30, admin: 10 },
  { branch: "South", doctors: 12, technicians: 18, nurses: 22, admin: 8 },
  { branch: "East", doctors: 10, technicians: 15, nurses: 18, admin: 7 },
  { branch: "West", doctors: 8, technicians: 12, nurses: 15, admin: 5 },
  { branch: "Central", doctors: 18, technicians: 22, nurses: 25, admin: 10 },
  { branch: "Downtown", doctors: 14, technicians: 20, nurses: 24, admin: 9 },
  { branch: "Uptown", doctors: 10, technicians: 15, nurses: 18, admin: 6 },
]

const chartConfig = {
  doctors: {
    label: "Doctors",
    color: "hsl(var(--chart-1))",
  },
  technicians: {
    label: "Technicians",
    color: "hsl(var(--chart-2))",
  },
  nurses: {
    label: "Nurses",
    color: "hsl(var(--chart-3))",
  },
  admin: {
    label: "Admin",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function ChartStaffDistribution() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Staff Distribution</CardTitle>
          <CardDescription>Staff by branch and role</CardDescription>
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
        <CardTitle>Staff Distribution</CardTitle>
        <CardDescription>Staff by branch and role</CardDescription>
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
            <XAxis dataKey="branch" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`${value} staff`, name]}
              labelFormatter={(label) => `Branch: ${label}`}
            />
            <Legend />
            <Bar dataKey="doctors" stackId="a" fill="var(--color-doctors)" name="Doctors" />
            <Bar dataKey="technicians" stackId="a" fill="var(--color-technicians)" name="Technicians" />
            <Bar dataKey="nurses" stackId="a" fill="var(--color-nurses)" name="Nurses" />
            <Bar dataKey="admin" stackId="a" fill="var(--color-admin)" name="Admin" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
