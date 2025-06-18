'use client';

import { Button } from '@tazeai/ui/components/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from '@tazeai/ui/components/icons';
import { Input } from '@tazeai/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tazeai/ui/components/select';
import { cn } from '@tazeai/ui/lib/utils';
import { useState } from 'react';
import type { DataTablePaginationProps } from './types';

export function DataTablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemsLabel = '项',
  pageSizeOptions = [10, 20, 30, 50, 100],
  onPageSizeChange,
}: DataTablePaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const [jumpToPage, setJumpToPage] = useState('');

  // 处理页码跳转
  const handleJumpToPage = () => {
    const pageNumber = Number.parseInt(jumpToPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setJumpToPage('');
    }
  };

  // 生成页码按钮
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5; // 最多显示的页码数

    // 始终显示第一页
    buttons.push(
      <Button
        className="h-8 w-8"
        disabled={currentPage === 1}
        key="first"
        onClick={() => onPageChange(1)}
        size="icon"
        variant={currentPage === 1 ? 'default' : 'outline'}
      >
        1
      </Button>
    );

    // 计算显示的页码范围
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3) + 1);
    }

    // 添加省略号（如果需要）
    if (startPage > 2) {
      buttons.push(
        <span
          className="flex h-8 w-8 items-center justify-center text-muted-foreground"
          key="ellipsis-start"
        >
          ···
        </span>
      );
    }

    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          className="h-8 w-8"
          key={i}
          onClick={() => onPageChange(i)}
          size="icon"
          variant={currentPage === i ? 'default' : 'outline'}
        >
          {i}
        </Button>
      );
    }

    // 添加省略号（如果需要）
    if (endPage < totalPages - 1) {
      buttons.push(
        <span
          className="flex h-8 w-8 items-center justify-center text-muted-foreground"
          key="ellipsis-end"
        >
          ···
        </span>
      );
    }

    // 始终显示最后一页（如果总页数大于1）
    if (totalPages > 1) {
      buttons.push(
        <Button
          className="h-8 w-8"
          disabled={currentPage === totalPages}
          key="last"
          onClick={() => onPageChange(totalPages)}
          size="icon"
          variant={currentPage === totalPages ? 'default' : 'outline'}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        {/* 左侧：页面大小选择器和页面信息 */}
        <div className="order-2 flex w-full flex-col items-center gap-6 sm:flex-row lg:order-1 lg:w-auto">
          {/* 页面大小选择器 */}
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-muted-foreground text-sm">
              每页显示
            </span>
            {onPageSizeChange ? (
              <Select
                onValueChange={(value) => onPageSizeChange(Number(value))}
                value={pageSize.toString()}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize.toString()} />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <span className="font-medium text-sm">{pageSize}</span>
            )}
            <span className="text-muted-foreground text-sm">条</span>
          </div>

          {/* 页面信息 */}
          <div className="whitespace-nowrap text-muted-foreground text-sm">
            显示 <span className="font-medium">{startItem}</span> -{' '}
            <span className="font-medium">{endItem}</span> 共{' '}
            <span className="font-medium">{totalItems}</span> 个{itemsLabel}
          </div>
        </div>

        {/* 右侧：分页控件 */}
        <div className="order-1 flex w-full flex-col items-center gap-4 sm:flex-row lg:order-2 lg:w-auto">
          {/* 页码导航 */}
          <div className="flex items-center">
            <div className="flex items-center">
              <Button
                aria-label="首页"
                className={cn(
                  'h-8 w-8 rounded-r-none border-r-0',
                  currentPage === 1 && 'opacity-50'
                )}
                disabled={currentPage === 1}
                onClick={() => onPageChange(1)}
                size="icon"
                variant="outline"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                aria-label="上一页"
                className={cn(
                  'h-8 w-8 rounded-r-none rounded-l-none',
                  currentPage === 1 && 'opacity-50'
                )}
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                size="icon"
                variant="outline"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* 页码按钮 - 在中等及以上屏幕显示 */}
            <div className="mx-1 hidden items-center space-x-1 md:flex">
              {totalPages > 0 && generatePaginationButtons()}
            </div>

            <div className="flex items-center">
              <Button
                aria-label="下一页"
                className={cn(
                  'h-8 w-8 rounded-r-none rounded-l-none',
                  currentPage === totalPages && 'opacity-50'
                )}
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() =>
                  onPageChange(Math.min(currentPage + 1, totalPages))
                }
                size="icon"
                variant="outline"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                aria-label="末页"
                className={cn(
                  'h-8 w-8 rounded-l-none',
                  currentPage === totalPages && 'opacity-50'
                )}
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => onPageChange(totalPages)}
                size="icon"
                variant="outline"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 页码跳转 - 在中等及以上屏幕显示 */}
          <div className="flex items-center space-x-2">
            <span className="whitespace-nowrap text-muted-foreground text-sm">
              跳转到
            </span>
            <div className="flex items-center">
              <Input
                aria-label="页码输入"
                className="h-8 w-14 rounded-r-none px-1 text-center"
                onChange={(e) => setJumpToPage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJumpToPage();
                  }
                }}
                value={jumpToPage}
              />
              <Button
                className="h-8 rounded-l-none border-l-0"
                disabled={!jumpToPage || totalPages === 0}
                onClick={handleJumpToPage}
                size="sm"
                variant="outline"
              >
                跳转
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 当前页码信息 - 在小屏幕上显示 */}
      <div className="mt-2 flex justify-center md:hidden">
        <span className="text-muted-foreground text-sm">
          第 <span className="font-medium">{currentPage}</span> 页，共{' '}
          <span className="font-medium">{totalPages}</span> 页
        </span>
      </div>
    </div>
  );
}
