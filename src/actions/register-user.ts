"use server"

import { RegistrationData, registrationSchema } from "@/lib/schema"

export interface ActionResponse {
    success: boolean
    message: string
    errors?: {
        [K in keyof RegistrationData]?: string[]
    }
}

export async function registerUser(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
  const rawFormData = Object.fromEntries(formData.entries())

  const validatedData = registrationSchema.safeParse({
    ...rawFormData,
    agreeToReceiveCommunications: formData.get("agreeToReceiveCommunications") === "on",
  });

  if (!validatedData.success) {
      return {
          success: false,
          message: 'Please fix the errors in the form',
          errors: validatedData.error.flatten().fieldErrors
        }
  }

  // Simulate server processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real application, you would save this data to a database
  console.log("Registration data:", validatedData)

  // Return success response
  return {
    success: true,
    message: "Registration successful",
  }
}
