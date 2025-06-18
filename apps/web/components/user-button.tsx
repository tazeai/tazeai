'use client';

import { signOut, useSession } from '@tazeai/auth/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@tazeai/ui/components/avatar';
import { Button } from '@tazeai/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tazeai/ui/components/dropdown-menu';
import {
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from '@tazeai/ui/components/icons';
import Link from 'next/link';

export function UserButton() {
  const { data } = useSession();
  if (!data?.user) {
    return null;
  }

  // Get initials from name for avatar fallback
  const initials = data.user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-auto items-center gap-2 rounded-full p-1 pr-4"
          variant="ghost"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              alt={data.user.name}
              src={data.user.image || '/images/logo.png'}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">{data.user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{data.user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {data.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              className="flex w-full cursor-pointer items-center"
              href="/dashboard"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex w-full cursor-pointer items-center"
              href="/profile"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex w-full cursor-pointer items-center"
              href="/settings"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex w-full cursor-pointer items-center"
              href="/help"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:bg-red-50 focus:text-red-500"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
