"use client";

import { Input } from "@tazeai/ui/components/input";
import { Search } from "lucide-react";
import type { DataTableToolbarProps } from "./types";

export function DataTableToolbar<T>({
  searchPlaceholder = "搜索...",
  onSearch,
  searchValue = "",
  filters,
  actions,
}: DataTableToolbarProps<T>) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
      {onSearch && (
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-8"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        {filters}
        {actions}
      </div>
    </div>
  );
}
