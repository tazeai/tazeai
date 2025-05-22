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
        <label className="text-right" htmlFor="name">
          姓名
        </label>
        <Input
          className="col-span-3"
          id="name"
          onChange={(e) =>
            onChange({
              ...data,
              name: e.target.value,
            })
          }
          value={data.name}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label className="text-right" htmlFor="email">
          邮箱
        </label>
        <Input
          className="col-span-3"
          id="email"
          onChange={(e) =>
            onChange({
              ...data,
              email: e.target.value,
            })
          }
          type="email"
          value={data.email}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <label className="text-right" htmlFor="role">
          角色
        </label>
        <Select
          onValueChange={(value) =>
            onChange({
              ...data,
              role: value,
            })
          }
          value={data.role}
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
        <label className="text-right" htmlFor="status">
          状态
        </label>
        <Select
          onValueChange={(value) =>
            onChange({
              ...data,
              status: value,
            })
          }
          value={data.status}
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
