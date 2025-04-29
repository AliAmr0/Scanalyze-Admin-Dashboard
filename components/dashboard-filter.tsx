"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Download, FileSpreadsheet, FileText, ImageIcon } from "lucide-react"

export function DashboardFilter() {
  const [selectedFilter, setSelectedFilter] = useState("This Week")
  const [showExportNotification, setShowExportNotification] = useState(false)

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  const handleExport = (type: string) => {
    // In a real application, this would trigger the actual export
    setShowExportNotification(true)
    setTimeout(() => setShowExportNotification(false), 3000)
  }

  return (
    <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg bg-white p-4 shadow sm:flex-row sm:items-center">
      <div className="flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-teal-600" />
        <span className="font-medium">Filter by time period:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {["Today", "This Week", "Month", "Quarter", "Year"].map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            className={selectedFilter === filter ? "bg-teal-600 hover:bg-teal-700" : ""}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport("csv")}>
              <FileText className="mr-2 h-4 w-4" />
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("excel")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export as Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("pdf")}>
              <FileText className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport("image")}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Export Charts as Images
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {showExportNotification && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-teal-600 p-4 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <span>Export completed successfully!</span>
            <Button variant="outline" size="sm" className="text-white hover:bg-teal-700">
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
