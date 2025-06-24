"use client"

import { useState, useEffect } from "react"
import { Activity, Download, Upload, Wifi, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RealTimeData {
  currentUsage: number
  downloadSpeed: number
  uploadSpeed: number
  totalConnections: number
  peakUsage: number
  averageUsage: number
  trend: "up" | "down" | "stable"
  trendPercentage: number
}

export function RealTimeStats() {
  const [data, setData] = useState<RealTimeData>({
    currentUsage: 2.5,
    downloadSpeed: 1.8,
    uploadSpeed: 0.7,
    totalConnections: 12,
    peakUsage: 4.2,
    averageUsage: 2.1,
    trend: "up",
    trendPercentage: 15.3,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        currentUsage: Math.max(0.1, prev.currentUsage + (Math.random() - 0.5) * 0.5),
        downloadSpeed: Math.max(0.1, prev.downloadSpeed + (Math.random() - 0.5) * 0.3),
        uploadSpeed: Math.max(0.1, prev.uploadSpeed + (Math.random() - 0.5) * 0.2),
        totalConnections: Math.max(1, prev.totalConnections + Math.floor((Math.random() - 0.5) * 3)),
        trend: Math.random() > 0.5 ? "up" : Math.random() > 0.3 ? "down" : "stable",
        trendPercentage: Math.random() * 30,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (usage: number) => {
    if (usage < 1) return "text-green-600"
    if (usage < 3) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (usage: number) => {
    if (usage < 1) return { label: "Low", color: "bg-green-100 text-green-800 border-green-200" }
    if (usage < 3) return { label: "Normal", color: "bg-yellow-100 text-yellow-800 border-yellow-200" }
    return { label: "High", color: "bg-red-100 text-red-800 border-red-200" }
  }

  const status = getStatusBadge(data.currentUsage)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Current Usage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Current Usage</CardTitle>
          <Activity className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className={`text-2xl font-bold ${getStatusColor(data.currentUsage)}`}>
              {data.currentUsage.toFixed(1)} Mbps
            </div>
            <Badge variant="outline" className={`text-xs ${status.color}`}>
              {status.label}
            </Badge>
          </div>
          <div className="flex items-center mt-1 space-x-1 text-xs text-muted-foreground">
            {data.trend === "up" && <TrendingUp className="w-3 h-3 text-red-500" />}
            {data.trend === "down" && <TrendingDown className="w-3 h-3 text-green-500" />}
            {data.trend === "stable" && <Activity className="w-3 h-3 text-blue-500" />}
            <span>
              {data.trend === "stable" ? "Stable" : `${data.trendPercentage.toFixed(1)}% ${data.trend}`} from last hour
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Download Speed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Download</CardTitle>
          <Download className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{data.downloadSpeed.toFixed(1)} Mbps</div>
          <p className="text-xs text-muted-foreground">
            {((data.downloadSpeed / data.currentUsage) * 100).toFixed(0)}% of total usage
          </p>
        </CardContent>
      </Card>

      {/* Upload Speed */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Upload</CardTitle>
          <Upload className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{data.uploadSpeed.toFixed(1)} Mbps</div>
          <p className="text-xs text-muted-foreground">
            {((data.uploadSpeed / data.currentUsage) * 100).toFixed(0)}% of total usage
          </p>
        </CardContent>
      </Card>

      {/* Active Connections */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
          <Wifi className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalConnections}</div>
          <p className="text-xs text-muted-foreground">Devices currently online</p>
        </CardContent>
      </Card>

      {/* Usage Summary */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-base">Usage Summary</CardTitle>
          <CardDescription>Current session statistics and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-muted-foreground">Peak Usage Today</p>
              <p className="font-medium">{data.peakUsage.toFixed(1)} Mbps</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Average Usage</p>
              <p className="font-medium">{data.averageUsage.toFixed(1)} Mbps</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Data Transferred</p>
              <p className="font-medium">
                {((data.currentUsage * 3600) / 8 / 1024).toFixed(2)} GB/hour
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Network Efficiency</p>
              <p className="font-medium text-green-600">94%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
