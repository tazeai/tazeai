'use client';

import { Button } from '@tazeai/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tazeai/ui/components/dropdown-menu';
import {
  MoreHorizontal,
  ShieldAlert,
  ShieldCheck,
  Trash,
  UserCog,
} from '@tazeai/ui/components/icons';
import type { User } from './types';

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onToggleStatus: (user: User) => void;
}

export function UserActions({
  user,
  onEdit,
  onDelete,
  onToggleStatus,
}: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(user)}>
          <UserCog className="mr-2 h-4 w-4" />
          编辑
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleStatus(user)}>
          {user.status === '已禁用' ? (
            <>
              <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-green-500">启用用户</span>
            </>
          ) : (
            <>
              <ShieldAlert className="mr-2 h-4 w-4 text-amber-500" />
              <span className="text-amber-500">禁用用户</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => onDelete(user.id)}
        >
          <Trash className="mr-2 h-4 w-4" />
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
