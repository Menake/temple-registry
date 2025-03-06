

"use server";

import { getApiClient } from "@/lib/api";
import { redirect } from "next/navigation";

export async function logoutAction(): Promise<ActionResult> {
    const api = await getApiClient();
    const response = await api.auth.logout.$post();

    if (!response.ok) {
        return {
            message: "Something went wrong, please try again later"
        }
    }

	return redirect("/sign-in");
}

interface ActionResult {
	message: string;
}