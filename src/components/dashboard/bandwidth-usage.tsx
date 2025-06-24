"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Real-time bandwidth usage data (last 24 hours)
const usageData = [
  { time: "00:00", usage: 1.2 },
  { time: "02:00", usage: 0.8 },
  { time: "04:00", usage: 0.5 },
  { time: "06:00", usage: 1.8 },
  { time: "08:00", usage: 3.2 },
  { time: "10:00", usage: 2.8 },
  { time: "12:00", usage: 4.1 },
  { time: "14:00", usage: 3.7 },
  { time: "16:00", usage: 5.2 },
  { time: "18:00", usage: 6.8 },
  { time: "20:00", usage: 4.3 },
  { time: "22:00", usage: 2.5 },
]

export function BandwidthUsage() {
  const currentUsage = 2.5 // Current usage in Mbps
  const previousUsage = 2.1 // Previous hour usage for comparison
  const isIncreasing = currentUsage > previousUsage
  const changePercentage = Math.abs(((currentUsage - previousUsage) / previousUsage) * 100).toFixed(1)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-base font-medium">Current Bandwidth Usage</CardTitle>
          <CardDescription>Real-time internet data consumption</CardDescription>
        </div>
        <Activity className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4 space-x-2">
          <div className="text-2xl font-bold">{currentUsage} Mbps</div>
          <div className={`flex items-center text-xs ${isIncreasing ? "text-red-600" : "text-green-600"}`}>
            {isIncreasing ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {changePercentage}% from last hour
          </div>
        </div>

        <div className="h-[80px] w-full">
          <ChartContainer
            config={{
              usage: {
                label: "Usage (Mbps)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} labelFormatter={(value) => `Time: ${value}`} />
                <Line type="monotone" dataKey="usage" stroke="var(--color-usage)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">Peak usage: 6.8 Mbps at 6 PM • Daily average: 3.1 Mbps</div>
      </CardContent>
    </Card>
  )
}
