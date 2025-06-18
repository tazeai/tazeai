'use client';

import { Loader2 } from '@tazeai/ui/components/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@tazeai/ui/components/table';
import { cn } from '@tazeai/ui/lib/utils';
import type { DataTableProps } from './types';

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
    <div className="overflow-hidden rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead className={column.className} key={column.id}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
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
                    className={cn(
                      // 基础样式
                      'transition-colors duration-200',
                      // 悬停高亮效果
                      highlightOnHover && 'hover:bg-muted/50',
                      // 选中高亮效果
                      isSelected && 'bg-primary/10 hover:bg-primary/20',
                      // 可点击样式
                      (onRowClick || onRowSelect) && 'cursor-pointer'
                    )}
                    data-selected={isSelected ? 'true' : undefined}
                    data-state={isSelected ? 'selected' : undefined}
                    key={rowId}
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
                  >
                    {columns.map((column) => (
                      <TableCell
                        className={column.className}
                        key={`${rowId}-${column.id}`}
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
                  className="py-6 text-center"
                  colSpan={columns.length}
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
