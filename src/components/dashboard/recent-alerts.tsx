"use client"

import { Bell, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const recentAlerts = [
  {
    id: 1,
    title: "High Usage Warning",
    message: "Bandwidth usage exceeded 80% threshold",
    type: "warning",
    time: "5:00 PM",
    date: "Today",
    isRead: false,
    device: "Living Room TV",
  },
  {
    id: 2,
    title: "Policy Activated",
    message: "Gaming bandwidth limit automatically applied",
    type: "info",
    time: "3:30 PM",
    date: "Today",
    isRead: true,
    device: "Gaming Console",
  },
  {
    id: 3,
    title: "Connection Restored",
    message: "Internet connection back to normal speed",
    type: "success",
    time: "2:15 PM",
    date: "Today",
    isRead: true,
    device: "Network",
  },
  {
    id: 4,
    title: "Scheduled Maintenance",
    message: "Network maintenance completed successfully",
    type: "info",
    time: "11:45 AM",
    date: "Yesterday",
    isRead: true,
    device: "System",
  },
  {
    id: 5,
    title: "Data Limit Approaching",
    message: "Monthly data usage at 75% of limit",
    type: "warning",
    time: "9:20 AM",
    date: "Yesterday",
    isRead: false,
    device: "Account",
  },
]

const alertIcons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
  error: AlertTriangle,
}

const alertColors = {
  warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
  info: "text-blue-600 bg-blue-50 border-blue-200",
  success: "text-green-600 bg-green-50 border-green-200",
  error: "text-red-600 bg-red-50 border-red-200",
}

export function RecentAlerts() {
  const unreadCount = recentAlerts.filter((alert) => !alert.isRead).length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            Recent Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
          <CardDescription>Latest notifications and system events</CardDescription>
        </div>
        <Bell className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        {recentAlerts.slice(0, 4).map((alert) => {
          const IconComponent = alertIcons[alert.type as keyof typeof alertIcons]
          return (
            <div
              key={alert.id}
              className={`flex items-start space-x-3 p-3 rounded-lg border ${
                !alert.isRead ? "bg-muted/30" : "bg-card"
              }`}
            >
              <div className={`flex-shrink-0 p-1 rounded-full ${alertColors[alert.type as keyof typeof alertColors]}`}>
                <IconComponent className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${!alert.isRead ? "font-semibold" : ""}`}>{alert.title}</h4>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{alert.device}</span>
                  <span className="text-xs text-muted-foreground">{alert.date}</span>
                </div>
              </div>
              {!alert.isRead && <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-600 rounded-full"></div>}
            </div>
          )
        })}

        <div className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            View All Alerts ({recentAlerts.length} total)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
