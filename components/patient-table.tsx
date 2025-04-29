"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Download, FileSpreadsheet, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Patient = {
  id: string
  name: string
  branch: string
  testCategory: string
  scanCategory: string
  date: string
  status: "Pending" | "In Progress" | "Completed"
  physician: string
  invoiceStatus: "Paid" | "Pending"
}

const data: Patient[] = [
  {
    id: "P001",
    name: "John Smith",
    branch: "Main",
    testCategory: "Blood",
    scanCategory: "X-Ray",
    date: "2024-04-28",
    status: "Completed",
    physician: "Dr. Sarah Johnson",
    invoiceStatus: "Paid",
  },
  {
    id: "P002",
    name: "Emily Davis",
    branch: "North",
    testCategory: "Urine",
    scanCategory: "MRI",
    date: "2024-04-28",
    status: "In Progress",
    physician: "Dr. Michael Chen",
    invoiceStatus: "Pending",
  },
  {
    id: "P003",
    name: "Robert Wilson",
    branch: "South",
    testCategory: "Blood",
    scanCategory: "CT Scan",
    date: "2024-04-27",
    status: "Completed",
    physician: "Dr. Lisa Patel",
    invoiceStatus: "Paid",
  },
  {
    id: "P004",
    name: "Maria Garcia",
    branch: "Main",
    testCategory: "Swab",
    scanCategory: "Ultrasound",
    date: "2024-04-27",
    status: "Pending",
    physician: "Dr. James Wilson",
    invoiceStatus: "Pending",
  },
  {
    id: "P005",
    name: "David Lee",
    branch: "East",
    testCategory: "Stool",
    scanCategory: "X-Ray",
    date: "2024-04-26",
    status: "Completed",
    physician: "Dr. Emily Rodriguez",
    invoiceStatus: "Paid",
  },
  {
    id: "P006",
    name: "Sarah Johnson",
    branch: "West",
    testCategory: "Blood",
    scanCategory: "MRI",
    date: "2024-04-26",
    status: "In Progress",
    physician: "Dr. Robert Brown",
    invoiceStatus: "Pending",
  },
  {
    id: "P007",
    name: "Michael Brown",
    branch: "Central",
    testCategory: "Urine",
    scanCategory: "CT Scan",
    date: "2024-04-25",
    status: "Completed",
    physician: "Dr. Jennifer Kim",
    invoiceStatus: "Paid",
  },
  {
    id: "P008",
    name: "Jennifer Kim",
    branch: "Downtown",
    testCategory: "Swab",
    scanCategory: "Ultrasound",
    date: "2024-04-25",
    status: "Pending",
    physician: "Dr. David Martinez",
    invoiceStatus: "Pending",
  },
  {
    id: "P009",
    name: "Thomas Anderson",
    branch: "Uptown",
    testCategory: "Blood",
    scanCategory: "X-Ray",
    date: "2024-04-24",
    status: "Completed",
    physician: "Dr. Sarah Johnson",
    invoiceStatus: "Paid",
  },
  {
    id: "P010",
    name: "Lisa Martinez",
    branch: "Main",
    testCategory: "Stool",
    scanCategory: "MRI",
    date: "2024-04-24",
    status: "In Progress",
    physician: "Dr. Michael Chen",
    invoiceStatus: "Pending",
  },
]

export function PatientTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [showExportNotification, setShowExportNotification] = useState(false)

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Patient Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      cell: ({ row }) => <div>{row.getValue("branch")}</div>,
    },
    {
      accessorKey: "testCategory",
      header: "Test Category",
      cell: ({ row }) => <div>{row.getValue("testCategory")}</div>,
    },
    {
      accessorKey: "scanCategory",
      header: "Scan Category",
      cell: ({ row }) => <div>{row.getValue("scanCategory")}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "Completed" ? "success" : status === "In Progress" ? "warning" : "destructive"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "physician",
      header: "Physician",
      cell: ({ row }) => <div>{row.getValue("physician")}</div>,
    },
    {
      accessorKey: "invoiceStatus",
      header: "Invoice Status",
      cell: ({ row }) => {
        const status = row.getValue("invoiceStatus") as string
        return <Badge variant={status === "Paid" ? "success" : "outline"}>{status}</Badge>
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleExport = (type: string) => {
    // In a real application, this would trigger the actual export
    setShowExportNotification(true)
    setTimeout(() => setShowExportNotification(false), 3000)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Latest Patients</CardTitle>
          <CardDescription>Recent patient tests and scans</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
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
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Filter patients..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
            <Select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
              onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {data.length} patients
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </CardFooter>
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
    </Card>
  )
}
