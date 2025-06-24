"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from '@/components/ui/sidebar'

interface DashboardHeaderProps {
  title: string
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="flex items-center h-16 gap-2 px-4 border-b shrink-0">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4 mr-2" />
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm">
          <User className="mr-2 size-4" />
          Account
        </Button>
      </div>
    </header>
  )
}