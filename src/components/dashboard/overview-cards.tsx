import { BarChart3, Bell, FileText, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewCard {
  title: string
  value: string | number
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const overviewData: OverviewCard[] = [
  {
    title: "Active Policies",
    value: 12,
    description: "+2 from last month",
    icon: Shield,
  },
  {
    title: "Network Usage",
    value: "2.4 TB",
    description: "+12% from last month",
    icon: BarChart3,
  },
  {
    title: "Active Alerts",
    value: 3,
    description: "2 high priority",
    icon: Bell,
  },
  {
    title: "Reports Generated",
    value: 24,
    description: "This month",
    icon: FileText,
  },
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}