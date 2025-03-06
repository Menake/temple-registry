"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronDown, ChevronUp, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Header from "@/components/admin/header"
import { Api } from "@/lib/api"
import { InferResponseType } from "hono"
import {format} from "date-fns";

type RegisteredMember = InferResponseType<typeof Api.admin.members.$get>[number];

export default function MembersGrid({members}: {members: RegisteredMember[]}) {
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
      member.phone?.includes(searchTerm)
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
                    <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">{format(member.createdAt, "dd MMM yyyy")}</td>
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

