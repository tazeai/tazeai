'use client';

import { useSession, signOut } from '@tazeai/auth/client';
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tazeai/ui/components/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@tazeai/ui/components/avatar';
import { Button } from '@tazeai/ui/components/button';

export function UserButton() {
  const { data } = useSession();
  if (!data?.user) {
    return null;
  }

  // Get initials from name for avatar fallback
  const initials = data.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full h-auto p-1 pr-4"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={data.user.image || '/images/logo.png'}
              alt={data.user.name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{data.user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{data.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {data.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="flex w-full cursor-pointer items-center"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex w-full cursor-pointer items-center"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/settings"
              className="flex w-full cursor-pointer items-center"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/help"
              className="flex w-full cursor-pointer items-center"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500 focus:bg-red-50"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
