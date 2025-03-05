import type { AppType} from "../../../api/src/index";
import { hc } from "hono/client";

import { env } from "@/env"; // On server

export const Api = hc<AppType>(env.API_URL);

