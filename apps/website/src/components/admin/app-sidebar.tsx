import { Calendar, Home, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { NavUser } from "./nav-user"
import { getUser } from "@/lib/roles"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Events",
    url: "/admin/events",
    icon: Calendar,
  },    
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export async function AppSidebar() {
    const user = await getUser();
    

  return (
    <Sidebar>
        <SidebarHeader className="flex flex-row items-center justify-between pr-8">
            <Image src="/logo.png" alt="Sri Lankaramaya logo" height={50} width={50} />
            <div className="text-center text-lg font-medium">Sri Lankaramaya</div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
      <SidebarFooter>
        {user && (
            <NavUser user={{
                name: user.username ?? "",
                email: user.email,
                avatar: ""
            }} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
