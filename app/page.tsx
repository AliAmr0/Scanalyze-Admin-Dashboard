import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardFilter } from "@/components/dashboard-filter"
import { DashboardCharts } from "@/components/dashboard-charts"
import { PatientTable } from "@/components/patient-table"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <DashboardFilter />
        <DashboardCards />
        <DashboardCharts />
        <PatientTable />
      </main>
    </div>
  )
}
