
import {  Mail, Phone, Calendar, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Api, getApiClient } from "@/lib/api"
import { format } from "date-fns/format"
import { InferResponseType } from "hono"

type Member = InferResponseType<typeof Api.admin.members.$get>[number]

export default async function MemberDetailPage({params} : {params: { id: string}}) {
  const id = params.id as string

  const api = await getApiClient();
  // Find the member with the matching ID
  const response = await api.admin.members[":id"].$get({
    param: {
      id: id
    }
  });

  const member = (await response.json()) as Member;

  // If member not found, show error
  if (!member) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-medium text-gray-900">Member not found</h1>
        <p className="mt-2 text-gray-600">The member you are looking for does not exist.</p>
        {/* <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/members")}>
          <ArrowLeft size={16} className="mr-2" />
          Back to Members
        </Button> */}
      </div>
    )
  }

  console.log(member);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {/* <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button> */}
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
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Mail size={18} className="mt-0.5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
              </div>
              <p className="mt-1 text-gray-900">{member.email}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Phone size={18} className="mt-0.5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
              </div>
              <p className="mt-1 text-gray-900">{member.phone ?? "N/A"}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Calendar size={18} className="mt-0.5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
              </div>
              <p className="mt-1 text-gray-900">{format(member.createdAt, "dd MMM yyyy")}</p>
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
    </div>
  )
}

