import * as React from "react"
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
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import CreateNewChat from "@/components/chat/CreateNewChat"
import NewGroupChatModal from "@/components/chat/NewGroupChatModal"
import GroupChatList from "@/components/chat/GroupChatList"
import DirectMessageList from "@/components/chat/DirectMessageList"
import AddFriendModal from "@/components/chat/AddFriendModal"
import { useThemeStore } from "@/stores/useThemeStore"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDarkMode, setDarkMode } = useThemeStore()

  return (
    <Sidebar variant="inset" {...props} collapsible="offcanvas">
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
                <div className="flex w-full items-center px-2 justify-between">
                  {/* image logo */}

                  <h1 className="text-xl bg-fancy-gradient bg-clip-text font-bold text-transparent">
                    Moji
                  </h1>
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white/80" />
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={() => setDarkMode(!isDarkMode)}
                      className="data-[state=checked]:bg-background/80"
                    ></Switch>
                    <Moon className="size-4 text-white/80" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* main content */}
      <SidebarContent>
        {/* new chat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* group chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">Nhóm Chat</SidebarGroupLabel>
          <SidebarGroupAction title="Tạo nhóm mới" className="cursor-pointer">
            <NewGroupChatModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* direct messages */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">Bạn bè</SidebarGroupLabel>
          <SidebarGroupAction title="Kết bạn" className="cursor-pointer">
            <AddFriendModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <DirectMessageList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  )
}
