/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { CalendarDays, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for different time periods
const hourlyData = [
  { time: "00:00", usage: 0.8, download: 0.5, upload: 0.3 },
  { time: "01:00", usage: 0.6, download: 0.4, upload: 0.2 },
  { time: "02:00", usage: 0.4, download: 0.3, upload: 0.1 },
  { time: "03:00", usage: 0.3, download: 0.2, upload: 0.1 },
  { time: "04:00", usage: 0.5, download: 0.3, upload: 0.2 },
  { time: "05:00", usage: 0.7, download: 0.4, upload: 0.3 },
  { time: "06:00", usage: 1.2, download: 0.8, upload: 0.4 },
  { time: "07:00", usage: 2.1, download: 1.4, upload: 0.7 },
  { time: "08:00", usage: 3.2, download: 2.1, upload: 1.1 },
  { time: "09:00", usage: 4.1, download: 2.8, upload: 1.3 },
  { time: "10:00", usage: 3.8, download: 2.5, upload: 1.3 },
  { time: "11:00", usage: 4.5, download: 3.1, upload: 1.4 },
  { time: "12:00", usage: 5.2, download: 3.6, upload: 1.6 },
  { time: "13:00", usage: 4.8, download: 3.3, upload: 1.5 },
  { time: "14:00", usage: 4.2, download: 2.9, upload: 1.3 },
  { time: "15:00", usage: 3.9, download: 2.7, upload: 1.2 },
  { time: "16:00", usage: 4.6, download: 3.2, upload: 1.4 },
  { time: "17:00", usage: 5.8, download: 4.1, upload: 1.7 },
  { time: "18:00", usage: 6.2, download: 4.4, upload: 1.8 },
  { time: "19:00", usage: 5.5, download: 3.9, upload: 1.6 },
  { time: "20:00", usage: 4.8, download: 3.4, upload: 1.4 },
  { time: "21:00", usage: 3.2, download: 2.3, upload: 0.9 },
  { time: "22:00", usage: 2.1, download: 1.5, upload: 0.6 },
  { time: "23:00", usage: 1.4, download: 1.0, upload: 0.4 },
]

const dailyData = [
  { day: "Mon", usage: 45.2, peak: 6.2 },
  { day: "Tue", usage: 52.1, peak: 7.1 },
  { day: "Wed", usage: 48.7, peak: 6.8 },
  { day: "Thu", usage: 61.3, peak: 8.2 },
  { day: "Fri", usage: 58.9, peak: 7.9 },
  { day: "Sat", usage: 72.4, peak: 9.1 },
  { day: "Sun", usage: 68.7, peak: 8.7 },
]

const weeklyData = [
  { week: "Week 1", usage: 324.5, average: 6.2 },
  { week: "Week 2", usage: 298.7, average: 5.7 },
  { week: "Week 3", usage: 356.2, average: 6.8 },
  { week: "Week 4", usage: 387.1, average: 7.4 },
]

export function UsageCharts() {
  const [timeRange, setTimeRange] = useState<"hourly" | "daily" | "weekly">("hourly")
  const [chartType, setChartType] = useState<"line" | "area" | "bar">("area")

  const getCurrentData = () => {
    switch (timeRange) {
      case "hourly":
        return hourlyData
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      default:
        return hourlyData
    }
  }

  const getDataKey = () => {
    switch (timeRange) {
      case "hourly":
        return "usage"
      case "daily":
        return "usage"
      case "weekly":
        return "usage"
      default:
        return "usage"
    }
  }

  const getXAxisKey = () => {
    switch (timeRange) {
      case "hourly":
        return "time"
      case "daily":
        return "day"
      case "weekly":
        return "week"
      default:
        return "time"
    }
  }

  const getYAxisLabel = () => {
    switch (timeRange) {
      case "hourly":
        return "Mbps"
      case "daily":
        return "GB/day"
      case "weekly":
        return "GB/week"
      default:
        return "Mbps"
    }
  }

  const renderChart = () => {
    const data = getCurrentData()
    const dataKey = getDataKey()
    const xAxisKey = getXAxisKey()

    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    }

    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-1))" }}
            />
            {timeRange === "hourly" && (
              <>
                <Line
                  type="monotone"
                  dataKey="download"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="upload"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
              </>
            )}
          </LineChart>
        )
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="hsl(var(--chart-1))"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.3}
            />
          </AreaChart>
        )
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={dataKey} fill="hsl(var(--chart-1))" radius={4} />
          </BarChart>
        )
      default:
        return <></>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Usage Over Time
            </CardTitle>
            <CardDescription>Visual representation of bandwidth usage patterns</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Hourly</span>
                  </div>
                </SelectItem>
                <SelectItem value="daily">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>Daily</span>
                  </div>
                </SelectItem>
                <SelectItem value="weekly">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>Weekly</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="rounded-r-none"
              >
                Line
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("area")}
                className="rounded-none"
              >
                Area
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="rounded-l-none"
              >
                Bar
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            usage: {
              label: `Usage (${getYAxisLabel()})`,
              color: "hsl(var(--chart-1))",
            },
            download: {
              label: "Download",
              color: "hsl(var(--chart-2))",
            },
            upload: {
              label: "Upload",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>

        {/* Chart Legend */}
        {timeRange === "hourly" && (
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-chart-1"></div>
              <span>Total Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-chart-2"></div>
              <span>Download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-chart-3"></div>
              <span>Upload</span>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 mt-6 border-t md:grid-cols-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Peak Usage</p>
            <p className="font-medium">
              {timeRange === "hourly" ? "6.2 Mbps" : timeRange === "daily" ? "72.4 GB" : "387.1 GB"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Average</p>
            <p className="font-medium">
              {timeRange === "hourly" ? "3.1 Mbps" : timeRange === "daily" ? "58.2 GB" : "341.6 GB"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="font-medium">
              {timeRange === "hourly" ? "74.4 GB" : timeRange === "daily" ? "407.3 GB" : "1366.5 GB"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Efficiency</p>
            <p className="font-medium text-green-600">94%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
