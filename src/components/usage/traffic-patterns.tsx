/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Pie, PieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Monitor, Smartphone, Tv, Gamepad2, Laptop, Router } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Device usage data
const deviceUsage = [
  {
    device: "Living Room TV",
    type: "streaming",
    usage: 3.2,
    percentage: 35.6,
    icon: Tv,
    apps: ["Netflix: 2.1 Mbps", "YouTube: 1.1 Mbps"],
    status: "active",
  },
  {
    device: "Work Laptop",
    type: "computer",
    usage: 2.1,
    percentage: 23.3,
    icon: Laptop,
    apps: ["Zoom: 1.2 Mbps", "Chrome: 0.9 Mbps"],
    status: "active",
  },
  {
    device: "Gaming Console",
    type: "gaming",
    usage: 1.8,
    percentage: 20.0,
    icon: Gamepad2,
    apps: ["Steam: 1.5 Mbps", "Discord: 0.3 Mbps"],
    status: "active",
  },
  {
    device: "iPhone 15",
    type: "mobile",
    usage: 0.9,
    percentage: 10.0,
    icon: Smartphone,
    apps: ["Instagram: 0.5 Mbps", "Safari: 0.4 Mbps"],
    status: "active",
  },
  {
    device: "Desktop PC",
    type: "computer",
    usage: 0.7,
    percentage: 7.8,
    icon: Monitor,
    apps: ["Slack: 0.4 Mbps", "Spotify: 0.3 Mbps"],
    status: "idle",
  },
  {
    device: "Smart Router",
    type: "network",
    usage: 0.3,
    percentage: 3.3,
    icon: Router,
    apps: ["System: 0.3 Mbps"],
    status: "active",
  },
]

// Application usage data
const appUsage = [
  { name: "Netflix", usage: 2.1, category: "Streaming", color: "#E50914" },
  { name: "Zoom", usage: 1.2, category: "Video Conferencing", color: "#2D8CFF" },
  { name: "Steam", usage: 1.5, category: "Gaming", color: "#1B2838" },
  { name: "YouTube", usage: 1.1, category: "Streaming", color: "#FF0000" },
  { name: "Chrome", usage: 0.9, category: "Web Browsing", color: "#4285F4" },
  { name: "Instagram", usage: 0.5, category: "Social Media", color: "#E4405F" },
  { name: "Slack", usage: 0.4, category: "Communication", color: "#4A154B" },
  { name: "Safari", usage: 0.4, category: "Web Browsing", color: "#006CFF" },
  { name: "Discord", usage: 0.3, category: "Gaming", color: "#5865F2" },
  { name: "Spotify", usage: 0.3, category: "Music", color: "#1DB954" },
]

// Category breakdown for pie chart
const categoryData = [
  { name: "Streaming", value: 35.6, fill: "#E50914" },
  { name: "Video Conferencing", value: 23.3, fill: "#2D8CFF" },
  { name: "Gaming", value: 20.0, fill: "#1B2838" },
  { name: "Web Browsing", value: 10.0, fill: "#4285F4" },
  { name: "Social Media", value: 7.8, fill: "#E4405F" },
  { name: "Other", value: 3.3, fill: "#6B7280" },
]

const getDeviceStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "idle":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "offline":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function TrafficPatterns() {
  const [selectedView, setSelectedView] = useState<"devices" | "apps" | "categories">("devices")

  const totalUsage = deviceUsage.reduce((sum, device) => sum + device.usage, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Traffic Breakdown</CardTitle>
          <CardDescription>Real-time analysis of bandwidth usage by devices, applications, and categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedView} onValueChange={(value: any) => setSelectedView(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="devices">By Device</TabsTrigger>
              <TabsTrigger value="apps">By Application</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
            </TabsList>

            <TabsContent value="devices" className="space-y-4">
              <div className="grid gap-4">
                {deviceUsage.map((device) => (
                  <div key={device.device} className="flex items-center p-4 space-x-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <device.icon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{device.device}</h4>
                          <Badge variant="outline" className={`text-xs ${getDeviceStatusColor(device.status)}`}>
                            {device.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{device.usage.toFixed(1)} Mbps</span>
                          <span className="ml-2 text-sm text-muted-foreground">({device.percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                      <Progress value={device.percentage} className="h-2 mb-2" />
                      <div className="text-sm text-muted-foreground">
                        {device.apps.join(" • ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="apps" className="space-y-4">
              <div className="grid gap-2">
                {appUsage.map((app, index) => (
                  <div key={app.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded"
                           style={{ backgroundColor: app.color }}>
                        {index + 1}
                      </div>
                      <div>
                        <span className="font-medium">{app.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {app.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{app.usage.toFixed(1)} Mbps</span>
                      <div className="text-xs text-muted-foreground">
                        {((app.usage / totalUsage) * 100).toFixed(1)}% of total
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 font-medium">Usage Distribution</h4>
                  <ChartContainer
                    config={{
                      value: {
                        label: "Usage %",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div>
                  <h4 className="mb-4 font-medium">Category Breakdown</h4>
                  <div className="space-y-3">
                    {categoryData.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: category.fill }}
                          ></div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-sm">{category.value.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Top Applications Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Top Applications</CardTitle>
          <CardDescription>Current bandwidth consumption by application</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              usage: {
                label: "Usage (Mbps)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appUsage.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="usage" fill="hsl(var(--chart-1))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
