import { getApiClient } from "@/lib/api"
import MembersGrid from "@/components/admin/members-grid"

export default async function MembersPage() {
  const api = await getApiClient();

  const members = await (await api.admin.members.$get()).json();

  return <MembersGrid members={members} />
}

