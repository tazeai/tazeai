'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tazeai/ui/components/select';

interface UserFiltersProps {
  roleFilter: string;
  statusFilter: string;
  onRoleFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

export function UserFilters({
  roleFilter,
  statusFilter,
  onRoleFilterChange,
  onStatusFilterChange,
}: UserFiltersProps) {
  return (
    <>
      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="角色" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="全部">全部角色</SelectItem>
          <SelectItem value="管理员">管理员</SelectItem>
          <SelectItem value="编辑">编辑</SelectItem>
          <SelectItem value="用户">用户</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="全部">全部状态</SelectItem>
          <SelectItem value="活跃">活跃</SelectItem>
          <SelectItem value="未激活">未激活</SelectItem>
          <SelectItem value="已禁用">已禁用</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
