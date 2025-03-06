import type { AppType} from "../../../api/src/index";
import { hc } from "hono/client";

import { env } from "@/env"; // On server
import { cookies } from "next/headers";

export const Api = hc<AppType>(env.API_URL);
export const getApiClient = async () => {
    const cookieStore = await cookies();
	  const token = cookieStore.get("session")?.value ?? null;

    if (token === null) return Api;

    return hc<AppType>(env.API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        fetch: async (
          input: RequestInfo | URL,
          requestInit?: RequestInit | undefined
        ) => {
          // We can add logs here to check requests and responses that the mobile app
          // sends to the backend
          return await fetch(input, requestInit);
        },
      });
}


