"use server"

import { db } from "@/lib/db"
import { userInsertSchema, users } from "@temple-registry/db/schema"
import { z } from "zod"

const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  allowCommunication: z.boolean(),
})

type RegisterFormData = z.infer<typeof registerSchema>

type FormState = {
  errors: Partial<Record<keyof RegisterFormData, string>>
  message: string
  success: boolean
  inputs?: RegisterFormData
}

export async function registerUser(prevState: FormState, formData: FormData): Promise<FormState> {
   const rawFormData = {
    firstName: formData.get("firstName")?.toString() ?? "",
    lastName: formData.get("lastName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() || undefined,
    allowCommunication: formData.get("allowCommunication") === "on",
  }

  const validationResult = registerSchema.safeParse(rawFormData);

  // If validation fails, return errors
  if (!validationResult.success) {
    const errors: Partial<Record<keyof RegisterFormData, string>> = {}
    validationResult.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        errors[issue.path[0] as keyof RegisterFormData] = issue.message
      }
    });

    return {
      errors,
      message: "Please correct the errors in the form.",
      success: false,
      inputs: rawFormData,
    }
  }

  const existingUser = await db.query.users.findFirst({
    where: (user, {eq}) => eq(user.email, validationResult.data.email)
  });

  if (existingUser) {
    return {
      errors: {
        email: "Email already registered"
      },
      message: "A user with this email already exists in the registry",
      success: false,
      inputs: rawFormData
    }
  }

  await db.insert(users).values(userInsertSchema.parse(validationResult.data));

  // Return success
  return {
    errors: {},
    message: "Registration successful!",
    success: true,
    inputs: validationResult.data
  }
}

