import type { ReactNode } from "react";

export interface Column<T> {
  id: string;
  header: string | ReactNode;
  cell: (item: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  rowKeyField?: keyof T;
  onRowClick?: (item: T) => void;
  selectedRowIds?: string[];
  onRowSelect?: (id: string, selected: boolean) => void;
  highlightOnHover?: boolean;
}

export interface DataTableToolbarProps<T> {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchValue?: string;
  filters?: ReactNode;
  actions?: ReactNode;
}

export interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemsLabel?: string;
  // 新增：页面大小控制相关属性
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}
