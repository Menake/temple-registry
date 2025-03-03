"use client"

import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { registerUser } from "@/app/actions/register"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Form from "next/form";

const initialState = {
  errors: {},
  message: "",
  success: false,
  inputs: undefined,
}

export default function RegistrationForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(registerUser, initialState)

  // Navigate only after a successful form submission
  useEffect(() => {
    if (state.success && state.inputs) {
        router.push(`/success?firstName=${encodeURIComponent(state.inputs.firstName)}`);
    }
  }, [state.success, state.inputs, router]);

  return (
    <Card className="bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-center text-amber-800">Temple Registration</CardTitle>
      </CardHeader>
      <CardContent>
        {state.message && !state.success && (
          <Alert variant="destructive" className="mb-4 flex flex-row items-center">
            <AlertCircle className="h-8 aspect-square" />
            <AlertDescription className="">{state.message}</AlertDescription>
          </Alert>
        )}

        <Form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                defaultValue={state.inputs?.firstName}
                placeholder="Enter your first name"
                required
                aria-invalid={!!state.errors.firstName}
              />
              {state.errors.firstName && <p className="text-sm text-red-500">{state.errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                defaultValue={state.inputs?.lastName}
                placeholder="Enter your last name"
                required
                aria-invalid={!!state.errors.lastName}
              />
              {state.errors.lastName && <p className="text-sm text-red-500">{state.errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={state.inputs?.email}
              placeholder="Enter your email address"
              required
              aria-invalid={!!state.errors.email}
            />
            {state.errors.email && <p className="text-sm text-red-500">{state.errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={state.inputs?.phone}
              placeholder="Enter your phone number (optional)"
              aria-invalid={!!state.errors.phone}
            />
            {state.errors.phone && <p className="text-sm text-red-500">{state.errors.phone}</p>}
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="allowCommunication" 
              name="allowCommunication" 
              defaultChecked={state.inputs?.allowCommunication} 
              />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="allowCommunication" className="text-sm font-normal leading-snug text-gray-600">
                I would like to receive communications from Sri Lankaramaya Temple
              </Label>
            </div>
          </div>

          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={isPending}>
              {isPending ? 'Registering...' : 'Register'}
            </Button>
          </CardFooter>
        </Form>
      </CardContent>
    </Card>
  )
}

