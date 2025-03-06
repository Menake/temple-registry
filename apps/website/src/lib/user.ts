import { getApiClient } from "./api";

export const getUser = async () => {
  const api = await getApiClient();
  const userResponse = await api.auth.me.$get();
  return await userResponse.json();
}