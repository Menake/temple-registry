"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Mail, Phone, Calendar, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

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

export default function MemberDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Find the member with the matching ID
  const member = members.find((m) => m.id === id)

  // If member not found, show error
  if (!member) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-medium text-gray-900">Member not found</h1>
        <p className="mt-2 text-gray-600">The member you are looking for does not exist.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/members")}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Members
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-serif font-medium text-gray-900">Member Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1 text-gray-900">
                {member.firstName} {member.lastName}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={18} className="mt-0.5 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-gray-900">{member.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={18} className="mt-0.5 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-gray-900">{member.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar size={18} className="mt-0.5 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
                <p className="mt-1 text-gray-900">{formatDate(member.registeredAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              {member.allowCommunications ? (
                <Check size={18} className="mt-0.5 text-green-500" />
              ) : (
                <X size={18} className="mt-0.5 text-red-500" />
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Communications</h3>
                <p className="mt-1 text-gray-900">
                  {member.allowCommunications
                    ? "Has opted in to receive communications"
                    : "Has opted out of communications"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="text-gray-600">
          Edit Member
        </Button>
        <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
          Delete Member
        </Button>
      </div>
    </div>
  )
}

