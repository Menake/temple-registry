"use server"

import { z } from "zod"
import { registerSchema } from "@temple-registry/api/src/devotee/routes"
import { getApiClient } from "@/lib/api"


// Type for the form data
type RegisterFormData = z.infer<typeof registerSchema>

// Type for the form state
type FormState = {
  errors: Partial<Record<keyof RegisterFormData, string>>
  message: string
  success: boolean
  data: RegisterFormData | null
  lastSubmission: RegisterFormData | null
}

export async function registerUser(prevState: FormState, formData: FormData): Promise<FormState> {
  // Extract form data
  const rawFormData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    allowCommunications: formData.get("allowCommunications") === "on",
  }

  // Validate form data
  const validationResult = registerSchema.safeParse(rawFormData)

  // If validation fails, return errors
  if (!validationResult.success) {
    const errors: Partial<Record<keyof RegisterFormData, string>> = {}
    validationResult.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        errors[issue.path[0] as keyof RegisterFormData] = issue.message
      }
    })
    return {
      errors,
      message: "Please correct the errors in the form.",
      success: false,
      data: null,
      lastSubmission: rawFormData as RegisterFormData,
    }
  }

  const api = await getApiClient();
  const result = await api.devotee.$post({
    json: validationResult.data
  });

  if (result.ok) {
    return {
      errors: {},
      message: "Registration successful!",
      success: true,
      data: validationResult.data,
      lastSubmission: null,
    }
  }

  const serverError = await result.text();
 
  return {
    errors: {},
    message: serverError,
    success: false,
    data: null,
    lastSubmission: validationResult.data,
  }
}

