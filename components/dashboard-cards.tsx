"use client"

import { Users, Building, User, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardCards() {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,548</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+16%</span> from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
          <User className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+5%</span> from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
          <Building className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+1</span> from last quarter
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <DollarSign className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,245,890</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-500">+12%</span> from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
