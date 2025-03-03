import { z } from "zod";

export const registrationSchema = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    agreeToReceiveCommunications: z.boolean()
  });
  
  export type RegistrationData = z.infer<typeof registrationSchema>;
  