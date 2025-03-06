import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'
import { getApiClient } from "./api";

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();  
  
  return sessionClaims?.metadata.role === role;
}

export const getUser = async () => {
  const api = await getApiClient();
  const userResponse = await api.auth.me.$get();
  return await userResponse.json();
}