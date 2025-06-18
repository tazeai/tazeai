'use client';

import { Search } from '@tazeai/ui/components/icons';
import { Input } from '@tazeai/ui/components/input';
import type { DataTableToolbarProps } from './types';

export function DataTableToolbar<T>({
  searchPlaceholder = '搜索...',
  onSearch,
  searchValue = '',
  filters,
  actions,
}: DataTableToolbarProps<T>) {
  return (
    <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
      {onSearch && (
        <div className="relative w-full sm:w-64">
          <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
            placeholder={searchPlaceholder}
            value={searchValue}
          />
        </div>
      )}

      <div className="flex w-full flex-wrap gap-2 sm:w-auto">
        {filters}
        {actions}
      </div>
    </div>
  );
}
