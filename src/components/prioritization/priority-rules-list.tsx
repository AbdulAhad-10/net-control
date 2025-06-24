/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Edit, Trash2, Search, Network, Shield, Smartphone, ToggleLeft, ToggleRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

interface PriorityRule {
  id: string
  name: string
  type: "ip" | "protocol" | "application"
  target: string
  priority: "high" | "medium" | "low"
  description?: string
  isActive: boolean
  createdAt: string
  affectedConnections: number
}

const mockRules: PriorityRule[] = [
  {
    id: "1",
    name: "Executive Office Priority",
    type: "ip",
    target: "192.168.1.10-15",
    priority: "high",
    description: "High priority for executive team devices",
    isActive: true,
    createdAt: "2024-01-15",
    affectedConnections: 5,
  },
  {
    id: "2",
    name: "VoIP Traffic Priority",
    type: "protocol",
    target: "SIP",
    priority: "high",
    description: "Ensure voice calls get priority",
    isActive: true,
    createdAt: "2024-01-12",
    affectedConnections: 12,
  },
  {
    id: "3",
    name: "Video Conferencing Apps",
    type: "application",
    target: "Zoom, Teams",
    priority: "high",
    description: "Priority for business video calls",
    isActive: true,
    createdAt: "2024-01-10",
    affectedConnections: 8,
  },
  {
    id: "4",
    name: "Gaming Traffic Control",
    type: "application",
    target: "Steam, Discord",
    priority: "low",
    description: "Lower priority for gaming during work hours",
    isActive: false,
    createdAt: "2024-01-08",
    affectedConnections: 3,
  },
  {
    id: "5",
    name: "Guest Network",
    type: "ip",
    target: "192.168.2.0/24",
    priority: "low",
    description: "Background priority for guest devices",
    isActive: true,
    createdAt: "2024-01-05",
    affectedConnections: 15,
  },
]

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

const typeIcons = {
  ip: Network,
  protocol: Shield,
  application: Smartphone,
}

const typeLabels = {
  ip: "IP Address",
  protocol: "Protocol",
  application: "Application",
}

export function PriorityRulesList() {
  const [rules, setRules] = useState<PriorityRule[]>(mockRules)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "ip" | "protocol" | "application">("all")
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRule, setSelectedRule] = useState<PriorityRule | null>(null)

  const filteredRules = rules.filter((rule) => {
    const matchesSearch =
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || rule.type === filterType
    const matchesPriority = filterPriority === "all" || rule.priority === filterPriority
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && rule.isActive) ||
      (filterStatus === "inactive" && !rule.isActive)

    return matchesSearch && matchesType && matchesPriority && matchesStatus
  })

  const handleToggleRule = (ruleId: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule)))
  }

  const handleDeleteRule = () => {
    if (selectedRule) {
      setRules((prev) => prev.filter((rule) => rule.id !== selectedRule.id))
      setDeleteDialogOpen(false)
      setSelectedRule(null)
    }
  }

  const openDeleteDialog = (rule: PriorityRule) => {
    setSelectedRule(rule)
    setDeleteDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Priority Rules Management
          </CardTitle>
          <CardDescription>
            Manage custom priority rules for IP addresses, protocols, and applications ({rules.length} total rules)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 mb-6 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Search rules by name or target..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ip">IP Address</SelectItem>
                  <SelectItem value="protocol">Protocol</SelectItem>
                  <SelectItem value="application">Application</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">Critical</SelectItem>
                  <SelectItem value="medium">Normal</SelectItem>
                  <SelectItem value="low">Background</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Rules Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Connections</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRules.map((rule) => {
                  const IconComponent = typeIcons[rule.type]
                  return (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rule.name}</div>
                          {rule.description && <div className="text-sm text-muted-foreground">{rule.description}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-muted-foreground" />
                          <Badge variant="outline" className="text-xs">
                            {typeLabels[rule.type]}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 text-sm rounded bg-muted">{rule.target}</code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${priorityColors[rule.priority]} text-xs`}>
                          {rule.priority === "high" && "Critical"}
                          {rule.priority === "medium" && "Normal"}
                          {rule.priority === "low" && "Background"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{rule.affectedConnections} active</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleRule(rule.id)}
                          className="flex items-center gap-2"
                        >
                          {rule.isActive ? (
                            <>
                              <ToggleRight className="w-4 h-4 text-green-600" />
                              <span className="text-green-600">Active</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Inactive</span>
                            </>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(rule)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {filteredRules.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No priority rules found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Priority Rule</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{selectedRule?.name}&quot;? This action cannot be undone.
              {selectedRule?.isActive && (
                <div className="p-2 mt-2 text-yellow-800 border border-yellow-200 rounded bg-yellow-50">
                  ⚠️ This rule is currently active and affecting {selectedRule.affectedConnections} connections.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRule} className="bg-destructive text-destructive-foreground">
              Delete Rule
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
