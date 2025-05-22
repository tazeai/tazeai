'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@tazeai/ui/components/table';
import { Loader2 } from 'lucide-react';
import type { DataTableProps } from './types';
import { cn } from '@tazeai/ui/lib/utils';

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  emptyMessage = '没有数据',
  loadingMessage = '加载中...',
  rowKeyField = 'id' as keyof T,
  onRowClick,
  selectedRowIds = [],
  onRowSelect,
  highlightOnHover = true,
}: DataTableProps<T>) {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    {loadingMessage}
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((item) => {
                const rowId = String(item[rowKeyField]);
                const isSelected = selectedRowIds.includes(rowId);

                return (
                  <TableRow
                    key={rowId}
                    className={cn(
                      // 基础样式
                      'transition-colors duration-200',
                      // 悬停高亮效果
                      highlightOnHover && 'hover:bg-muted/50',
                      // 选中高亮效果
                      isSelected && 'bg-primary/10 hover:bg-primary/20',
                      // 可点击样式
                      (onRowClick || onRowSelect) && 'cursor-pointer',
                    )}
                    onClick={(e) => {
                      // 如果有行选择回调，则触发
                      if (onRowSelect) {
                        onRowSelect(rowId, !isSelected);
                      }
                      // 如果有行点击回调，则触发
                      if (onRowClick) {
                        onRowClick(item);
                      }
                    }}
                    data-selected={isSelected ? 'true' : undefined}
                    data-state={isSelected ? 'selected' : undefined}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={`${rowId}-${column.id}`}
                        className={column.className}
                      >
                        {column.cell(item)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
