import "@/app/globals.css";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) return redirect("/sign-in");

  if (user.role !== "admin")
    return <div>No Access</div>

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
