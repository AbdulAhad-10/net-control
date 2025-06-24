import { Bell, FileText, Settings, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickAction {
  title: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
}

const quickActions: QuickAction[] = [
  {
    title: "Create New Policy",
    icon: Shield,
    href: "/dashboard/policies/new",
  },
  {
    title: "Generate Usage Report",
    icon: FileText,
    href: "/dashboard/reports/new",
  },
  {
    title: "Configure Alerts",
    icon: Bell,
    href: "/dashboard/alerts/settings",
  },
  {
    title: "System Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => (
          <Button
            key={action.title}
            className="justify-start w-full"
            variant="outline"
            asChild={!!action.href}
          >
            {action.href ? (
              <a href={action.href}>
                <action.icon className="w-4 h-4 mr-2" />
                {action.title}
              </a>
            ) : (
              <>
                <action.icon className="w-4 h-4 mr-2" />
                {action.title}
              </>
            )}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
