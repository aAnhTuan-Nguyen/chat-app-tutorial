import { Bell, ChevronsUpDown, LogOut, UserIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/useAuthStore"
import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar()
  const { signOut } = useAuthStore()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await signOut()
    navigate("/signin")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                <AvatarFallback className="rounded-lg">
                  {user.displayName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.displayName}</span>
                <span className="truncate text-xs">{user.username}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback className="rounded-lg">
                    {user.displayName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.displayName}
                  </span>
                  <span className="truncate text-xs">{user.username}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {/* information */}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon className="text-muted-foreground dark:group-focus:text-accent-foreground!" />
                Tài khoản
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="text-muted-foreground dark:group-focus:text-accent-foreground!" />
                Thông báo
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {/* logout */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="text-muted-foreground dark:group-focus:text-accent-foreground!" />
              <Button
                onClick={handleLogout}
                className="w-full cursor-pointer text-left justify-start p-0"
                variant="link"
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
