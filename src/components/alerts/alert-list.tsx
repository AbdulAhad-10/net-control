/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { AlertTriangle, Shield, Activity, Clock, CheckCircle, X, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Alert {
  id: string
  type: "bandwidth" | "policy" | "critical"
  severity: "critical" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  source: string
  action?: string
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "bandwidth",
    severity: "critical",
    title: "Bandwidth Usage Critical",
    message: "Network usage has exceeded 95% of available bandwidth (47.5/50 Mbps)",
    timestamp: "2 minutes ago",
    isRead: false,
    source: "Network Monitor",
    action: "View Usage Details",
  },
  {
    id: "2",
    type: "policy",
    severity: "warning",
    title: "Gaming Policy Violation",
    message: "Gaming Console exceeded 2 Mbps limit - currently using 3.2 Mbps",
    timestamp: "15 minutes ago",
    isRead: false,
    source: "Policy Engine",
    action: "Adjust Policy",
  },
  {
    id: "3",
    type: "critical",
    severity: "critical",
    title: "Network Overload Detected",
    message: "Multiple devices experiencing high latency (>100ms). Network congestion detected.",
    timestamp: "32 minutes ago",
    isRead: false,
    source: "System Monitor",
    action: "Emergency Controls",
  },
  {
    id: "4",
    type: "bandwidth",
    severity: "warning",
    title: "High Usage Warning",
    message: "Bandwidth usage reached 80% threshold (40/50 Mbps)",
    timestamp: "1 hour ago",
    isRead: true,
    source: "Network Monitor",
  },
  {
    id: "5",
    type: "policy",
    severity: "info",
    title: "Work Hours Policy Activated",
    message: "Business applications now have priority during work hours (9 AM - 6 PM)",
    timestamp: "2 hours ago",
    isRead: true,
    source: "Policy Engine",
  },
  {
    id: "6",
    type: "critical",
    severity: "warning",
    title: "Device Connection Issues",
    message: "Living Room TV experiencing intermittent connectivity issues",
    timestamp: "3 hours ago",
    isRead: true,
    source: "Device Monitor",
    action: "Troubleshoot",
  },
]

const alertIcons = {
  bandwidth: Activity,
  policy: Shield,
  critical: AlertTriangle,
}

const severityColors = {
  critical: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
}

const typeLabels = {
  bandwidth: "Bandwidth",
  policy: "Policy",
  critical: "Critical",
}

export function AlertList() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [filterType, setFilterType] = useState<"all" | "bandwidth" | "policy" | "critical">("all")
  const [filterSeverity, setFilterSeverity] = useState<"all" | "critical" | "warning" | "info">("all")
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">("all")
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [dismissDialogOpen, setDismissDialogOpen] = useState(false)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesType = filterType === "all" || alert.type === filterType
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesRead =
      filterRead === "all" || (filterRead === "unread" && !alert.isRead) || (filterRead === "read" && alert.isRead)

    return matchesType && matchesSeverity && matchesRead
  })

  const markAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, isRead: true } : alert)))
  }

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })))
  }

  const dismissAlert = () => {
    if (selectedAlert) {
      setAlerts((prev) => prev.filter((alert) => alert.id !== selectedAlert.id))
      setDismissDialogOpen(false)
      setSelectedAlert(null)
    }
  }

  const openDismissDialog = (alert: Alert) => {
    setSelectedAlert(alert)
    setDismissDialogOpen(true)
  }

  const unreadCount = alerts.filter((alert) => !alert.isRead).length

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alert Center
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {unreadCount} unread
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Monitor bandwidth limits, policy violations, and critical network events
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 p-4 mb-6 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bandwidth">Bandwidth</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSeverity} onValueChange={(value: any) => setFilterSeverity(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRead} onValueChange={(value: any) => setFilterRead(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Alert List */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const IconComponent = alertIcons[alert.type]
              return (
                <div
                  key={alert.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    !alert.isRead ? "bg-muted/30 border-l-4 border-l-blue-500" : "bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1 space-x-3">
                      <div className={`p-2 rounded-full ${severityColors[alert.severity]}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`font-medium ${!alert.isRead ? "font-semibold" : ""}`}>{alert.title}</h4>
                          <Badge variant="outline" className={`text-xs ${severityColors[alert.severity]}`}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[alert.type]}
                          </Badge>
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{alert.timestamp}</span>
                            </div>
                            <span>Source: {alert.source}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center ml-4 space-x-2">
                      {alert.action && (
                        <Button variant="outline" size="sm">
                          {alert.action}
                        </Button>
                      )}
                      {!alert.isRead && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)}>
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDismissDialog(alert)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No alerts found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dismiss Alert Dialog */}
      <AlertDialog open={dismissDialogOpen} onOpenChange={setDismissDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dismiss Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to dismiss &quote;{selectedAlert?.title}&quote;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={dismissAlert} className="bg-destructive text-destructive-foreground">
              Dismiss Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
