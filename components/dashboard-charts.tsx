"use client"
import { ChartRushHours } from "@/components/charts/chart-rush-hours"
import { ChartRushDays } from "@/components/charts/chart-rush-days"
import { ChartStaffDistribution } from "@/components/charts/chart-staff-distribution"
import { ChartGenderDistribution } from "@/components/charts/chart-gender-distribution"
import { ChartPatientsByBranch } from "@/components/charts/chart-patients-by-branch"
import { ChartCategoriesCombined } from "@/components/charts/chart-categories-combined"

export function DashboardCharts() {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ChartRushHours />
      <ChartRushDays />
      <ChartStaffDistribution />
      <ChartGenderDistribution />
      <ChartPatientsByBranch />
      <ChartCategoriesCombined />
    </div>
  )
}
