"use client";

import { Input } from "@tazeai/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@tazeai/ui/components/select";
import type { UserFormData } from "./types";

interface UserFormProps {
  data: UserFormData;
  onChange: (data: UserFormData) => void;
  isEdit?: boolean;
}

export function UserForm({ data, onChange, isEdit = false }: UserFormProps) {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="name" className="text-right">
          姓名
        </label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="email" className="text-right">
          邮箱
        </label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="role" className="text-right">
          角色
        </label>
        <Select
          value={data.role}
          onValueChange={(value) => onChange({ ...data, role: value })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="选择角色" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="管理员">管理员</SelectItem>
            <SelectItem value="编辑">编辑</SelectItem>
            <SelectItem value="用户">用户</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label htmlFor="status" className="text-right">
          状态
        </label>
        <Select
          value={data.status}
          onValueChange={(value) => onChange({ ...data, status: value })}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="选择状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="活跃">活跃</SelectItem>
            <SelectItem value="未激活">未激活</SelectItem>
            <SelectItem value="已禁用">已禁用</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
