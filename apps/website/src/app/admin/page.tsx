"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronDown, ChevronUp, Filter, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import Header from "@/components/admin/header"

// Mock data - in a real app, this would come from your database
const members = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    registeredAt: "2023-05-04T10:30:00Z",
    allowCommunications: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    registeredAt: "2023-05-03T14:20:00Z",
    allowCommunications: false,
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert@example.com",
    phone: "+1 (555) 456-7890",
    registeredAt: "2023-05-01T09:15:00Z",
    allowCommunications: true,
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily@example.com",
    phone: "+1 (555) 234-5678",
    registeredAt: "2023-04-28T16:45:00Z",
    allowCommunications: true,
  },
  {
    id: "5",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    phone: "+1 (555) 876-5432",
    registeredAt: "2023-04-25T11:10:00Z",
    allowCommunications: false,
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("registeredAt")
  const [sortDirection, setSortDirection] = useState("desc")

  // Filter members based on search term
  const filteredMembers = members.filter((member) => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase()
    const searchLower = searchTerm.toLowerCase()
    return (
      fullName.includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower) ||
      member.phone.includes(searchTerm)
    )
  })

  // Sort members based on sort field and direction
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a]
    const bValue = b[sortField as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    }

    return 0
  })

  // Handle sort toggle
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <Header>
        <h1 className="text-2xl font-serif font-medium text-gray-900">Dashboard</h1>
      </Header>  
      <div className="space-y-2 px-3 pt-3">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-serif font-medium text-gray-900">Members</h2>
        </div>

        <Card className="border border-gray-100 shadow-sm">
          <div className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search members..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-row gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-gray-600">
                      <Filter size={16} className="mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>All Members</DropdownMenuItem>
                    <DropdownMenuItem>Accepts Communications</DropdownMenuItem>
                    <DropdownMenuItem>No Communications</DropdownMenuItem>
                    <DropdownMenuItem>Recent Registrations</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-500">
                    <button className="flex items-center gap-1" onClick={() => handleSort("lastName")}>
                      Name
                      {sortField === "lastName" && (
                        <span>{sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                      )}
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-gray-500 md:table-cell">
                    <button className="flex items-center gap-1" onClick={() => handleSort("email")}>
                      Email
                      {sortField === "email" && (
                        <span>{sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                      )}
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-gray-500 lg:table-cell">Phone</th>
                  <th className="hidden px-4 py-3 font-medium text-gray-500 sm:table-cell">
                    <button className="flex items-center gap-1" onClick={() => handleSort("registeredAt")}>
                      Registered
                      {sortField === "registeredAt" && (
                        <span>{sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                      )}
                    </button>
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-gray-500 sm:table-cell">Communications</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedMembers.map((member) => (
                  <tr key={member.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <div>
                        {member.firstName} {member.lastName}
                      </div>
                      <div className="text-xs text-gray-500 md:hidden">{member.email}</div>
                    </td>
                    <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{member.email}</td>
                    <td className="hidden px-4 py-3 text-gray-600 lg:table-cell">{member.phone}</td>
                    <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">{formatDate(member.registeredAt)}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      {member.allowCommunications ? (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/members/${member.id}`}
                        className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 hover:bg-amber-100"
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{sortedMembers.length}</span> of{" "}
              <span className="font-medium">{members.length}</span> members
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="text-xs" disabled={true}>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="text-xs" disabled={true}>
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

