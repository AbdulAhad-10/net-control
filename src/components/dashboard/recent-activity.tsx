import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityItem {
  id: string
  title: string
  time: string
  status: 'success' | 'warning' | 'info'
}

const activityData: ActivityItem[] = [
  {
    id: "1",
    title: 'Policy "Web Filter" updated',
    time: "2 hours ago",
    status: "success",
  },
  {
    id: "2",
    title: "High bandwidth usage detected",
    time: "4 hours ago",
    status: "warning",
  },
  {
    id: "3",
    title: "Monthly report generated",
    time: "1 day ago",
    status: "info",
  },
]

const statusColors = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest network events and policy changes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activityData.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <div className={`w-2 h-2 rounded-full ${statusColors[item.status]}`}></div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
