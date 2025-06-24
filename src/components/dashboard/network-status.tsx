import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NetworkMetric {
  label: string
  value: string | number
  percentage: number
  color: string
}

const networkMetrics: NetworkMetric[] = [
  {
    label: "Bandwidth Usage",
    value: "68%",
    percentage: 68,
    color: "bg-primary",
  },
  {
    label: "Active Connections",
    value: 142,
    percentage: 85,
    color: "bg-green-500",
  },
  {
    label: "System Health",
    value: "Excellent",
    percentage: 95,
    color: "bg-green-500",
  },
]

export function NetworkStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Status</CardTitle>
        <CardDescription>Real-time network monitoring overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {networkMetrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.label}</span>
                <span className="text-sm text-muted-foreground">{metric.value}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-secondary">
                <div
                  className={`h-2 rounded-full ${metric.color}`}
                  style={{ width: `${metric.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
