import * as React from "react"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/useAuthStore"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import CreateNewChat from "@/components/chat/CreateNewChat"
import NewGroupChatModal from "@/components/chat/NewGroupChatModal"
import GroupChatList from "@/components/chat/GroupChatList"
import DirectMessageList from "@/components/chat/DirectMessageList"
import AddFriendModal from "@/components/chat/AddFriendModal"
import { userThemeStore } from "@/stores/useThemeStore"
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore()
  const { isDark, toggleTheme } = userThemeStore()
  const data = {
    user: {
      name: user?.displayName || "Guest User",
      email: user?.email || "guest@example.com",
      avatar: user?.avatarUrl || "https://placehold.co/40x40",
    },
  }
  return (
    <Sidebar variant="inset" {...props}>
      {/* header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="bg-gradient-primary"
            >
              <a href="#">
                <div className="flex items-center w-full px-2 justify-between">
                  <h1 className="text-lg font-semibold text-white">Moji</h1>
                  {/* toggle theme */}
                  <div className="flex items-center p-2 gap-2 bg-white/10 rounded-lg">
                    <Sun className="size-5 text-white/80" />
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                      className="data-[state=checked]:bg-background/70"
                    />
                    <Moon className="size-5 text-white/80" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* content */}
      <SidebarContent>
        {/* new chat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>
        {/* group chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Group Chats
          </SidebarGroupLabel>
          <SidebarGroupAction title="Tạo nhóm" className="cursor-pointer">
            <NewGroupChatModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* direct messages */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            Direct Messages
          </SidebarGroupLabel>
          <SidebarGroupAction title="Kết bạn" className="cursor-pointer">
            <AddFriendModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <DirectMessageList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* footer */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
