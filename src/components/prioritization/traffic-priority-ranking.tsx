/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { GripVertical, ArrowUp, ArrowDown, Phone, Video, Globe, GamepadIcon, Mail, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TrafficType {
  id: string
  name: string
  description: string
  icon: any
  priority: "high" | "medium" | "low"
  rank: number
  examples: string[]
  bandwidth: string
}

const initialTrafficTypes: TrafficType[] = [
  {
    id: "voip",
    name: "VoIP & Voice Calls",
    description: "Voice over IP communications",
    icon: Phone,
    priority: "high",
    rank: 1,
    examples: ["Skype", "WhatsApp Calls", "Teams Voice"],
    bandwidth: "64-128 Kbps",
  },
  {
    id: "video-conferencing",
    name: "Video Conferencing",
    description: "Business video calls and meetings",
    icon: Video,
    priority: "high",
    rank: 2,
    examples: ["Zoom", "Teams", "Google Meet"],
    bandwidth: "1-3 Mbps",
  },
  {
    id: "web-browsing",
    name: "Web Browsing",
    description: "General internet browsing",
    icon: Globe,
    priority: "medium",
    rank: 3,
    examples: ["Chrome", "Firefox", "Safari"],
    bandwidth: "1-5 Mbps",
  },
  {
    id: "email",
    name: "Email & Messaging",
    description: "Email clients and instant messaging",
    icon: Mail,
    priority: "medium",
    rank: 4,
    examples: ["Outlook", "Gmail", "Slack"],
    bandwidth: "100-500 Kbps",
  },
  {
    id: "file-transfer",
    name: "File Transfer",
    description: "File uploads and downloads",
    icon: FileText,
    priority: "low",
    rank: 5,
    examples: ["FTP", "Cloud Sync", "Downloads"],
    bandwidth: "Variable",
  },
  {
    id: "gaming",
    name: "Online Gaming",
    description: "Gaming traffic and updates",
    icon: GamepadIcon,
    priority: "low",
    rank: 6,
    examples: ["Steam", "Xbox Live", "PlayStation"],
    bandwidth: "1-10 Mbps",
  },
]

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

const priorityLabels = {
  high: "Critical",
  medium: "Normal",
  low: "Background",
}

export function TrafficPriorityRanking() {
  const [trafficTypes, setTrafficTypes] = useState<TrafficType[]>(initialTrafficTypes)
  const [hasChanges, setHasChanges] = useState(false)

  const moveTrafficType = (id: string, direction: "up" | "down") => {
    const currentIndex = trafficTypes.findIndex((type) => type.id === id)
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === trafficTypes.length - 1)
    ) {
      return
    }

    const newTrafficTypes = [...trafficTypes]
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    // Swap positions
    ;[newTrafficTypes[currentIndex], newTrafficTypes[targetIndex]] = [
      newTrafficTypes[targetIndex],
      newTrafficTypes[currentIndex],
    ]

    // Update ranks
    newTrafficTypes.forEach((type, index) => {
      type.rank = index + 1
    })

    setTrafficTypes(newTrafficTypes)
    setHasChanges(true)
  }

  const updatePriority = (id: string, priority: "high" | "medium" | "low") => {
    setTrafficTypes((prev) => prev.map((type) => (type.id === id ? { ...type, priority } : type)))
    setHasChanges(true)
  }

  const saveChanges = () => {
    // Simulate API call
    console.log("Saving traffic priority changes:", trafficTypes)
    setHasChanges(false)
  }

  const resetChanges = () => {
    setTrafficTypes(initialTrafficTypes)
    setHasChanges(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Traffic Priority Ranking</span>
          {hasChanges && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetChanges}>
                Reset
              </Button>
              <Button size="sm" onClick={saveChanges}>
                Save Changes
              </Button>
            </div>
          )}
        </CardTitle>
        <CardDescription>
          Rank network traffic types by importance. Higher ranked traffic gets priority during network congestion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trafficTypes.map((trafficType, index) => (
            <div
              key={trafficType.id}
              className="flex items-center gap-4 p-4 transition-colors border rounded-lg bg-card hover:bg-muted/30"
            >
              {/* Rank Number */}
              <div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full bg-primary text-primary-foreground">
                {trafficType.rank}
              </div>

              {/* Traffic Type Info */}
              <div className="flex items-center flex-1 gap-3">
                <trafficType.icon className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{trafficType.name}</h4>
                    <Badge variant="outline" className={`text-xs ${priorityColors[trafficType.priority]}`}>
                      {priorityLabels[trafficType.priority]}
                    </Badge>
                  </div>
                  <p className="mb-1 text-sm text-muted-foreground">{trafficType.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Examples: {trafficType.examples.join(", ")}</span>
                    <span>Typical: {trafficType.bandwidth}</span>
                  </div>
                </div>
              </div>

              {/* Priority Level Selector */}
              <div className="w-32">
                <Select
                  value={trafficType.priority}
                  onValueChange={(value: "high" | "medium" | "low") => updatePriority(trafficType.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>Critical</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Normal</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Background</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Move Controls */}
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveTrafficType(trafficType.id, "up")}
                  disabled={index === 0}
                  className="w-6 h-6 p-0"
                >
                  <ArrowUp className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveTrafficType(trafficType.id, "down")}
                  disabled={index === trafficTypes.length - 1}
                  className="w-6 h-6 p-0"
                >
                  <ArrowDown className="w-3 h-3" />
                </Button>
              </div>

              {/* Drag Handle */}
              <div className="cursor-move text-muted-foreground">
                <GripVertical className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 mt-6 rounded-lg bg-muted/30">
          <h4 className="mb-2 font-medium">Priority Levels Explained:</h4>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <span className="font-medium">Critical:</span> Always gets bandwidth first
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <span className="font-medium">Normal:</span> Standard priority traffic
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <span className="font-medium">Background:</span> Uses remaining bandwidth
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
