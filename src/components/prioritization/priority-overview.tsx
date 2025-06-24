"use client"

import { TrendingUp, Users, Network, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const priorityStats = [
  {
    title: "Active Priority Rules",
    value: "8",
    change: "+2 this week",
    icon: Network,
  },
  {
    title: "Prioritized Connections",
    value: "43",
    change: "Currently active",
    icon: Users,
  },
  {
    title: "Traffic Optimization",
    value: "92%",
    change: "Efficiency score",
    icon: TrendingUp,
  },
  {
    title: "Response Time",
    value: "12ms",
    change: "Average latency",
    icon: Activity,
  },
]

const currentPriorities = [
  { name: "VoIP & Voice Calls", percentage: 95, color: "bg-red-500", priority: "Critical" },
  { name: "Video Conferencing", percentage: 88, color: "bg-red-400", priority: "Critical" },
  { name: "Web Browsing", percentage: 65, color: "bg-yellow-500", priority: "Normal" },
  { name: "Email & Messaging", percentage: 45, color: "bg-yellow-400", priority: "Normal" },
  { name: "File Transfer", percentage: 25, color: "bg-green-500", priority: "Background" },
  { name: "Gaming & Entertainment", percentage: 15, color: "bg-green-400", priority: "Background" },
]

export function PriorityOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {priorityStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Priority Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Priority Status</CardTitle>
          <CardDescription>Real-time view of traffic prioritization and bandwidth allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentPriorities.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="font-medium">{item.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        item.priority === "Critical"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : item.priority === "Normal"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-green-100 text-green-800 border-green-200"
                      }`}
                    >
                      {item.priority}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>

          <div className="p-4 mt-6 rounded-lg bg-muted/30">
            <h4 className="mb-2 font-medium">Priority System Status:</h4>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>System: Optimal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Rules: 8 Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Load: Balanced</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
