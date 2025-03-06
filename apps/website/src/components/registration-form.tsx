"use client"

import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { registerUser } from "@/app/actions/register-member"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const initialState = {
  errors: {},
  message: "",
  success: false,
  data: null,
  lastSubmission: null,
}

export default function RegistrationForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(registerUser, initialState)

  useEffect(() => {
    if (state.success && state.data) {
      router.push(
        `/success?firstName=${encodeURIComponent(state.data.firstName)}&lastName=${encodeURIComponent(state.data.lastName)}`,
      )
    }
  }, [state, router])  

  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardHeader className="border-b border-gray-50 pb-6">
        <CardTitle className="text-xl text-center text-gray-800">Register with our Temple</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {state.message && !state.success && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700">
                First Name <span className="text-amber-600">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                required
                aria-invalid={!!state.errors.firstName}
                defaultValue={state.lastSubmission?.firstName || ""}
                className="focus-visible:ring-amber-500"
              />
              {state.errors.firstName && <p className="text-sm text-red-500">{state.errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700">
                Last Name <span className="text-amber-600">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                required
                aria-invalid={!!state.errors.lastName}
                defaultValue={state.lastSubmission?.lastName || ""}
                className="focus-visible:ring-amber-500"
              />
              {state.errors.lastName && <p className="text-sm text-red-500">{state.errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email <span className="text-amber-600">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
              aria-invalid={!!state.errors.email}
              defaultValue={state.lastSubmission?.email || ""}
              className="focus-visible:ring-amber-500"
            />
            {state.errors.email && <p className="text-sm text-red-500">{state.errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number (optional)"
              aria-invalid={!!state.errors.phone}
              defaultValue={state.lastSubmission?.phone || ""}
              className="focus-visible:ring-amber-500"
            />
            {state.errors.phone && <p className="text-sm text-red-500">{state.errors.phone}</p>}
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="allowCommunications"
              name="allowCommunications"
              defaultChecked={state.lastSubmission?.allowCommunications || false}
              className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="allowCommunications" className="text-sm font-normal leading-snug text-gray-600">
                I would like to receive communications from Sri Lankaramaya Temple
              </Label>
            </div>
          </div>

          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-colors">
              Register
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

