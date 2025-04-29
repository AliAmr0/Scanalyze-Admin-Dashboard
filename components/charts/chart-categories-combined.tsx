"use client"

import * as React from "react"
import { Cell, Legend, Pie, PieChart } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const testData = [
  { category: "Blood", value: 3500, fill: "var(--color-blood)" },
  { category: "Urine", value: 2200, fill: "var(--color-urine)" },
  { category: "Stool", value: 1100, fill: "var(--color-stool)" },
  { category: "Swab", value: 1800, fill: "var(--color-swab)" },
  { category: "Other", value: 950, fill: "var(--color-other)" },
]

const scanData = [
  { category: "X-Ray", value: 2800, fill: "var(--color-xray)" },
  { category: "MRI", value: 1500, fill: "var(--color-mri)" },
  { category: "CT Scan", value: 1200, fill: "var(--color-ct)" },
  { category: "Ultrasound", value: 2100, fill: "var(--color-ultrasound)" },
  { category: "Other", value: 750, fill: "var(--color-other)" },
]

const testConfig = {
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

const scanConfig = {
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

// Custom legend formatter to include values
const renderLegend = (props: any, data: any[]) => {
  const { payload } = props

  return (
    <ul className="flex flex-col gap-2 text-xs mt-4">
      {payload.map((entry: any, index: number) => {
        const item = data.find((d) => d.category === entry.value)
        return (
          <li key={`item-${index}`} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 mr-2 rounded-sm" style={{ backgroundColor: entry.color }} />
              <span>{entry.value}</span>
            </div>
            <span className="font-medium">{item?.value.toLocaleString()}</span>
          </li>
        )
      })}
    </ul>
  )
}

export function ChartCategoriesCombined() {
  const [mounted, setMounted] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("test")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Categories Distribution</CardTitle>
          <CardDescription>Distribution of test and scan types</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[350px] flex items-center justify-center">
          <div className="animate-pulse">Loading chart data...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Categories Distribution</CardTitle>
        <CardDescription>Distribution of test and scan types</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="test">Test Categories</TabsTrigger>
            <TabsTrigger value="scan">Scan Categories</TabsTrigger>
          </TabsList>
          <TabsContent value="test" className="mt-0">
            <ChartContainer config={testConfig} className="mx-auto max-h-[350px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={testData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {testData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  content={(props) => renderLegend(props, testData)}
                />
              </PieChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="scan" className="mt-0">
            <ChartContainer config={scanConfig} className="mx-auto max-h-[350px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={scanData}
                  dataKey="value"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {scanData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  content={(props) => renderLegend(props, scanData)}
                />
              </PieChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
