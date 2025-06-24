/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Calendar, Download, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface HistoricalRecord {
  period: string
  totalUsage: number
  peakUsage: number
  averageUsage: number
  topDevice: string
  topApp: string
  trend: "up" | "down" | "stable"
  trendPercentage: number
}

const dailyHistory: HistoricalRecord[] = [
  {
    period: "Today",
    totalUsage: 45.2,
    peakUsage: 6.2,
    averageUsage: 3.1,
    topDevice: "Living Room TV",
    topApp: "Netflix",
    trend: "up",
    trendPercentage: 12.5,
  },
  {
    period: "Yesterday",
    totalUsage: 40.3,
    peakUsage: 5.8,
    averageUsage: 2.8,
    topDevice: "Work Laptop",
    topApp: "Zoom",
    trend: "down",
    trendPercentage: 8.2,
  },
  {
    period: "2 days ago",
    totalUsage: 43.8,
    peakUsage: 6.1,
    averageUsage: 3.0,
    topDevice: "Gaming Console",
    topApp: "Steam",
    trend: "up",
    trendPercentage: 15.3,
  },
  {
    period: "3 days ago",
    totalUsage: 38.1,
    peakUsage: 5.2,
    averageUsage: 2.6,
    topDevice: "Living Room TV",
    topApp: "YouTube",
    trend: "stable",
    trendPercentage: 2.1,
  },
  {
    period: "4 days ago",
    totalUsage: 37.4,
    peakUsage: 5.0,
    averageUsage: 2.5,
    topDevice: "Work Laptop",
    topApp: "Chrome",
    trend: "down",
    trendPercentage: 5.7,
  },
]

const weeklyHistory: HistoricalRecord[] = [
  {
    period: "This Week",
    totalUsage: 298.7,
    peakUsage: 8.2,
    averageUsage: 5.1,
    topDevice: "Living Room TV",
    topApp: "Netflix",
    trend: "up",
    trendPercentage: 18.3,
  },
  {
    period: "Last Week",
    totalUsage: 252.4,
    peakUsage: 7.1,
    averageUsage: 4.3,
    topDevice: "Gaming Console",
    topApp: "Steam",
    trend: "up",
    trendPercentage: 9.8,
  },
  {
    period: "2 weeks ago",
    totalUsage: 229.8,
    peakUsage: 6.8,
    averageUsage: 3.9,
    topDevice: "Work Laptop",
    topApp: "Zoom",
    trend: "down",
    trendPercentage: 12.1,
  },
  {
    period: "3 weeks ago",
    totalUsage: 261.2,
    peakUsage: 7.5,
    averageUsage: 4.5,
    topDevice: "Living Room TV",
    topApp: "YouTube",
    trend: "stable",
    trendPercentage: 3.2,
  },
]

const monthlyHistory: HistoricalRecord[] = [
  {
    period: "This Month",
    totalUsage: 1247.3,
    peakUsage: 9.1,
    averageUsage: 5.8,
    topDevice: "Living Room TV",
    topApp: "Netflix",
    trend: "up",
    trendPercentage: 22.7,
  },
  {
    period: "Last Month",
    totalUsage: 1016.8,
    peakUsage: 7.9,
    averageUsage: 4.7,
    topDevice: "Gaming Console",
    topApp: "Steam",
    trend: "up",
    trendPercentage: 14.2,
  },
  {
    period: "2 months ago",
    totalUsage: 890.4,
    peakUsage: 7.2,
    averageUsage: 4.1,
    topDevice: "Work Laptop",
    topApp: "Zoom",
    trend: "down",
    trendPercentage: 8.9,
  },
  {
    period: "3 months ago",
    totalUsage: 976.1,
    peakUsage: 8.1,
    averageUsage: 4.5,
    topDevice: "Living Room TV",
    topApp: "YouTube",
    trend: "stable",
    trendPercentage: 1.8,
  },
]

export function HistoricalData() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily")

  const getCurrentData = () => {
    switch (period) {
      case "daily":
        return dailyHistory
      case "weekly":
        return weeklyHistory
      case "monthly":
        return monthlyHistory
      default:
        return dailyHistory
    }
  }

  const getUsageUnit = () => {
    switch (period) {
      case "daily":
        return "GB/day"
      case "weekly":
        return "GB/week"
      case "monthly":
        return "GB/month"
      default:
        return "GB"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      case "stable":
        return <Minus className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-600"
      case "down":
        return "text-green-600"
      case "stable":
        return "text-blue-600"
      default:
        return "text-muted-foreground"
    }
  }

  const exportData = () => {
    const data = getCurrentData()
    const csvContent = [
      ["Period", "Total Usage", "Peak Usage", "Average Usage", "Top Device", "Top App", "Trend", "Change %"].join(","),
      ...data.map((record) =>
        [
          record.period,
          record.totalUsage,
          record.peakUsage,
          record.averageUsage,
          record.topDevice,
          record.topApp,
          record.trend,
          record.trendPercentage,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `usage-history-${period}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const data = getCurrentData()
  const currentRecord = data[0]
  const previousRecord = data[1]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Current Period</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentRecord.totalUsage.toFixed(1)} GB</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {getTrendIcon(currentRecord.trend)}
              <span className={getTrendColor(currentRecord.trend)}>
                {currentRecord.trendPercentage.toFixed(1)}% vs previous
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Peak Usage</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentRecord.peakUsage.toFixed(1)} Mbps</div>
            <p className="text-xs text-muted-foreground">Highest recorded speed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Usage</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentRecord.averageUsage.toFixed(1)} Mbps</div>
            <p className="text-xs text-muted-foreground">Typical consumption rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            {getTrendIcon(currentRecord.trend)}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getTrendColor(currentRecord.trend)}`}>
              {currentRecord.trend === "stable" ? "±" : currentRecord.trend === "up" ? "+" : "-"}
              {currentRecord.trendPercentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Compared to previous period</p>
          </CardContent>
        </Card>
      </div>

      {/* Historical Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Historical Usage Data
              </CardTitle>
              <CardDescription>Detailed breakdown of bandwidth usage over time</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={exportData}>
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Total Usage</TableHead>
                  <TableHead>Peak Usage</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Top Device</TableHead>
                  <TableHead>Top App</TableHead>
                  <TableHead>Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((record, index) => (
                  <TableRow key={record.period}>
                    <TableCell className="font-medium">
                      {record.period}
                      {index === 0 && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Current
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{record.totalUsage.toFixed(1)} GB</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{record.peakUsage.toFixed(1)} Mbps</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{record.averageUsage.toFixed(1)} Mbps</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {record.topDevice}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {record.topApp}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(record.trend)}
                        <span className={`text-sm ${getTrendColor(record.trend)}`}>
                          {record.trend === "stable" ? "±" : record.trend === "up" ? "+" : "-"}
                          {record.trendPercentage.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary Statistics */}
          <div className="p-4 mt-6 rounded-lg bg-muted/30">
            <h4 className="mb-3 font-medium">Period Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <p className="text-muted-foreground">Total Periods</p>
                <p className="font-medium">{data.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Highest Usage</p>
                <p className="font-medium">{Math.max(...data.map((d) => d.totalUsage)).toFixed(1)} GB</p>
              </div>
              <div>
                <p className="text-muted-foreground">Lowest Usage</p>
                <p className="font-medium">{Math.min(...data.map((d) => d.totalUsage)).toFixed(1)} GB</p>
              </div>
              <div>
                <p className="text-muted-foreground">Average Growth</p>
                <p className="font-medium">
                  {(data.reduce((sum, d) => sum + d.trendPercentage, 0) / data.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
