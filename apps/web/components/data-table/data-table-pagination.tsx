'use client';

import { useState } from 'react';
import { Button } from '@tazeai/ui/components/button';
import { Input } from '@tazeai/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tazeai/ui/components/select';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import type { DataTablePaginationProps } from './types';
import { cn } from '@tazeai/ui/lib/utils';

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
        key="first"
        variant={currentPage === 1 ? 'default' : 'outline'}
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        1
      </Button>,
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
          key="ellipsis-start"
          className="flex items-center justify-center w-8 h-8 text-muted-foreground"
        >
          ···
        </span>,
      );
    }

    // 添加中间页码
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? 'default' : 'outline'}
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>,
      );
    }

    // 添加省略号（如果需要）
    if (endPage < totalPages - 1) {
      buttons.push(
        <span
          key="ellipsis-end"
          className="flex items-center justify-center w-8 h-8 text-muted-foreground"
        >
          ···
        </span>,
      );
    }

    // 始终显示最后一页（如果总页数大于1）
    if (totalPages > 1) {
      buttons.push(
        <Button
          key="last"
          variant={currentPage === totalPages ? 'default' : 'outline'}
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </Button>,
      );
    }

    return buttons;
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* 左侧：页面大小选择器和页面信息 */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto order-2 lg:order-1">
          {/* 页面大小选择器 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              每页显示
            </span>
            {onPageSizeChange ? (
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => onPageSizeChange(Number(value))}
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
              <span className="text-sm font-medium">{pageSize}</span>
            )}
            <span className="text-sm text-muted-foreground">条</span>
          </div>

          {/* 页面信息 */}
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            显示 <span className="font-medium">{startItem}</span> -{' '}
            <span className="font-medium">{endItem}</span> 共{' '}
            <span className="font-medium">{totalItems}</span> 个{itemsLabel}
          </div>
        </div>

        {/* 右侧：分页控件 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto order-1 lg:order-2">
          {/* 页码导航 */}
          <div className="flex items-center">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-r-none border-r-0',
                  currentPage === 1 && 'opacity-50',
                )}
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                aria-label="首页"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-l-none rounded-r-none',
                  currentPage === 1 && 'opacity-50',
                )}
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                aria-label="上一页"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            {/* 页码按钮 - 在中等及以上屏幕显示 */}
            <div className="hidden md:flex items-center mx-1 space-x-1">
              {totalPages > 0 && generatePaginationButtons()}
            </div>

            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-l-none rounded-r-none',
                  currentPage === totalPages && 'opacity-50',
                )}
                onClick={() =>
                  onPageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                aria-label="下一页"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'h-8 w-8 rounded-l-none',
                  currentPage === totalPages && 'opacity-50',
                )}
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                aria-label="末页"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 页码跳转 - 在中等及以上屏幕显示 */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              跳转到
            </span>
            <div className="flex items-center">
              <Input
                className="h-8 w-14 rounded-r-none text-center px-1"
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJumpToPage();
                  }
                }}
                aria-label="页码输入"
              />
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-l-none border-l-0"
                onClick={handleJumpToPage}
                disabled={!jumpToPage || totalPages === 0}
              >
                跳转
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 当前页码信息 - 在小屏幕上显示 */}
      <div className="md:hidden flex justify-center mt-2">
        <span className="text-sm text-muted-foreground">
          第 <span className="font-medium">{currentPage}</span> 页，共{' '}
          <span className="font-medium">{totalPages}</span> 页
        </span>
      </div>
    </div>
  );
}
