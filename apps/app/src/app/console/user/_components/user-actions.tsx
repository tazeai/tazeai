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
} from 'lucide-react';
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
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(user)}>
          <UserCog className="h-4 w-4 mr-2" />
          编辑
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleStatus(user)}>
          {user.status === '已禁用' ? (
            <>
              <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
              <span className="text-green-500">启用用户</span>
            </>
          ) : (
            <>
              <ShieldAlert className="h-4 w-4 mr-2 text-amber-500" />
              <span className="text-amber-500">禁用用户</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => onDelete(user.id)}
        >
          <Trash className="h-4 w-4 mr-2" />
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
