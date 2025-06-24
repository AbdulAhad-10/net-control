"use client"

import { Shield, Clock, Users, Gamepad2, Briefcase, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const activePolicies = [
  {
    id: 1,
    name: "Gaming Bandwidth Limit",
    description: "Gaming limited to 2 Mbps",
    type: "limit",
    icon: Gamepad2,
    status: "active",
    priority: "medium",
    devices: 3,
    schedule: "24/7",
  },
  {
    id: 2,
    name: "Work Apps Priority",
    description: "Work apps prioritized during business hours",
    type: "priority",
    icon: Briefcase,
    status: "active",
    priority: "high",
    devices: 5,
    schedule: "9 AM - 6 PM",
  },
  {
    id: 3,
    name: "Streaming Quality Control",
    description: "Video streaming limited to 720p",
    type: "limit",
    icon: Video,
    status: "active",
    priority: "low",
    devices: 8,
    schedule: "Peak hours",
  },
  {
    id: 4,
    name: "Family Time Restrictions",
    description: "Social media blocked during dinner",
    type: "block",
    icon: Users,
    status: "scheduled",
    priority: "medium",
    devices: 4,
    schedule: "6 PM - 8 PM",
  },
]

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-200",
  scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function CurrentPolicies() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle className="text-base font-medium">Current Policies</CardTitle>
          <CardDescription>Active bandwidth rules and restrictions</CardDescription>
        </div>
        <Shield className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {activePolicies.map((policy) => (
          <div key={policy.id} className="flex items-start p-3 space-x-3 border rounded-lg bg-card">
            <div className="flex-shrink-0">
              <policy.icon className="h-5 w-5 text-muted-foreground mt-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium truncate">{policy.name}</h4>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${priorityColors[policy.priority as keyof typeof priorityColors]}`}
                  >
                    {policy.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${statusColors[policy.status as keyof typeof statusColors]}`}
                  >
                    {policy.status}
                  </Badge>
                </div>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{policy.description}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{policy.devices} devices</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{policy.schedule}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <Shield className="w-4 h-4 mr-2" />
            View All Policies ({activePolicies.length + 3} total)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
