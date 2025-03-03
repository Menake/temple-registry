"use client"

import type React from "react"

import { useActionState } from "react"
import { ActionResponse, registerUser } from "@/actions/register-user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SuccessMessage from "./success-message"
import { AlertCircle } from "lucide-react"

const initialState: ActionResponse = {
  success: false,
  message: ""
}

export default function RegistrationForm() {
  const [state, action, isPending] = useActionState(registerUser, initialState)

  if (state?.success) {
    return <SuccessMessage />
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-4">
        <CardTitle className="text-lg font-bold text-center">Temple Registry</CardTitle>
        <CardDescription>
          Use this form to register to join our temple community
          <div className="text-sm text-muted-foreground">
            Fields marked with <span className="text-red-500">*</span> are required
          </div>
        </CardDescription>
      
        
      </CardHeader>
      <CardContent>
        <form action={action} autoComplete="on" className="space-y-4 py-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                aria-required="true"
                aria-invalid={!!state?.errors?.firstName}
              />
              {state?.errors?.firstName && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {state?.errors?.firstName}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                aria-required="true"
                aria-invalid={!!state?.errors?.lastName}
              />
              {state?.errors?.lastName && (
                <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  {state.errors.lastName}
                </div>
              )}
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
              placeholder="john.doe@example.com"
              aria-required="true"
              aria-invalid={!!state?.errors?.email}
            />
            {state?.errors?.email && (
              <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {state.errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" />
            <span className="text-xs text-muted-foreground">Format: (123) 456-7890 or 123-456-7890</span>
            {state?.errors?.phone && (
              <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" />
                {state.errors.phone}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 py-4">
            <Checkbox id="agreeToReceiveCommunications" name="agreeToReceiveCommunications" />
            <Label htmlFor="agreeToReceiveCommunications" className="text-xs text-muted-foreground">
              I agree to receive communications from Sri Lankaramaya Temple
            </Label>
          </div>

          {state?.message && !state.success && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {state.message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Submitting..." : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

