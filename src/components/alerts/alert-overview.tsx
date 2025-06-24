"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Shield, Activity, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AlertStats {
  total: number
  critical: number
  warning: number
  info: number
  unread: number
}

export function AlertOverview() {
  const [stats, setStats] = useState<AlertStats>({
    total: 12,
    critical: 3,
    warning: 5,
    info: 4,
    unread: 7,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 2),
        unread: Math.max(0, prev.unread + Math.floor(Math.random() * 2 - 1)),
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const alertTypes = [
    {
      title: "Total Alerts",
      value: stats.total,
      icon: Bell,
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
    },
    {
      title: "Critical",
      value: stats.critical,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 border-red-200",
    },
    {
      title: "Warnings",
      value: stats.warning,
      icon: Shield,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 border-yellow-200",
    },
    {
      title: "Network Events",
      value: stats.info,
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {alertTypes.map((type) => (
        <Card key={type.title} className={`border ${type.bgColor}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{type.title}</CardTitle>
            <type.icon className={`h-4 w-4 ${type.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${type.color}`}>{type.value}</div>
            {type.title === "Total Alerts" && stats.unread > 0 && (
              <Badge variant="destructive" className="mt-1 text-xs">
                {stats.unread} unread
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
