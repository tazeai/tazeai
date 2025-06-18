'use client';

import { DataTable } from '@/components/data-table';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import type { Column } from '@/components/data-table/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@tazeai/ui/components/avatar';
import { Badge } from '@tazeai/ui/components/badge';
import { Button } from '@tazeai/ui/components/button';
import { Checkbox } from '@tazeai/ui/components/checkbox';
import {
  ChevronDown,
  Trash,
  UserCheck,
  UserPlus,
  UserX,
} from '@tazeai/ui/components/icons';
import { cn } from '@tazeai/ui/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useSWR, { mutate } from 'swr';
import { ConfirmDialog } from './dialogs/confirm-dialog';
import { FormDialog } from './dialogs/form-dialog';
import { fetcher } from './fetcher';
import type { User, UserFormData } from './types';
import { UserActions } from './user-actions';
import { UserFilters } from './user-filters';
import { UserForm } from './user-form';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tazeai/ui/components/dropdown-menu';

export default function UserManagementList() {
  // SWR hook for fetching users
  const { data, error, isLoading } = useSWR<{
    data: User[];
    total: number;
    page: number;
  }>('/api/v1/users', fetcher);

  const { data: users } = data || {};

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('全部');
  const [statusFilter, setStatusFilter] = useState('全部');

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // 修改为状态变量，以支持动态更改
  const [pageSize, setPageSize] = useState(2);
  // 定义页面大小选项
  const pageSizeOptions = [2, 5, 10, 20, 50];

  // State for dialogs
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for forms
  const [newUser, setNewUser] = useState<UserFormData>({
    name: '',
    email: '',
    role: '用户',
    status: '活跃',
  });
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // 选中行状态
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  // 处理页面大小变化
  const handlePageSizeChange = (newPageSize: number) => {
    // 计算当前页的第一条数据在所有数据中的索引
    const firstItemIndex = (currentPage - 1) * pageSize;

    // 计算新的页码，确保显示的是相同的数据范围
    const newPage = Math.floor(firstItemIndex / newPageSize) + 1;

    setPageSize(newPageSize);
    setCurrentPage(newPage);
  };

  // 当筛选条件变化时，重置页码到第一页
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  // 处理行选择
  const handleRowSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedRowIds((prev) => [...prev, id]);
    } else {
      setSelectedRowIds((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // 处理全选/取消全选
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedRowIds(filteredUsers.map((user) => user.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  // 批量操作函数
  const handleBulkAction = (action: 'delete' | 'disable' | 'enable') => {
    if (selectedRowIds.length === 0) return;

    // 这里可以根据需要实现批量操作逻辑
    toast.info(
      `已选择 ${selectedRowIds.length} 个用户，准备${
        action === 'delete' ? '删除' : action === 'disable' ? '禁用' : '启用'
      }`
    );

    // 示例：仅显示消息，不执行实际操作
    console.log(`Bulk action: ${action}`, selectedRowIds);
  };

  // Filter users based on search term and filters
  const filteredUsers = users
    ? users.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRole = roleFilter === '全部' || user.role === roleFilter;
        const matchesStatus =
          statusFilter === '全部' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
      })
    : [];

  // Paginate users
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  // 选择列
  const selectColumn: Column<User> = {
    id: 'select',
    header: (
      <Checkbox
        aria-label="全选"
        checked={
          filteredUsers.length > 0 &&
          selectedRowIds.length === filteredUsers.length
        }
        onCheckedChange={(checked) => handleSelectAll(!!checked)}
      />
    ),
    cell: (user) => (
      <Checkbox
        aria-label={`选择 ${user.name}`}
        checked={selectedRowIds.includes(user.id)}
        onCheckedChange={(checked) => handleRowSelect(user.id, !!checked)} // 防止触发行点击事件
        onClick={(e) => e.stopPropagation()}
      />
    ),
    className: 'w-12',
  };

  // Define table columns
  const columns: Column<User>[] = [
    selectColumn, // 添加选择列
    {
      id: 'name',
      header: '用户',
      cell: (user) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              alt={user.name}
              src={user.avatar || '/placeholder.svg'}
            />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      ),
    },
    {
      id: 'email',
      header: '邮箱',
      cell: (user) => user.email,
      className: 'hidden md:table-cell',
    },
    {
      id: 'role',
      header: '角色',
      cell: (user) => user.role,
    },
    {
      id: 'status',
      header: '状态',
      cell: (user) => (
        <Badge className={getStatusBadgeColor(user.status)}>
          {user.status}
        </Badge>
      ),
    },
    {
      id: 'lastLogin',
      header: '最后登录',
      cell: (user) => user.lastLogin,
      className: 'hidden md:table-cell',
    },
    {
      id: 'actions',
      header: '',
      cell: (user) => (
        <div className="text-right">
          <UserActions
            onDelete={(userId) => handleDeleteUser(userId)}
            onEdit={handleEditUser}
            onToggleStatus={handleToggleUserStatus}
            user={user}
          />
        </div>
      ),
      className: 'text-right',
    },
  ];

  // Handle user deletion with SWR mutation
  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      setIsSubmitting(true);

      try {
        // Optimistic UI update
        mutate(
          '/api/users',
          users?.filter((user) => user.id !== userToDelete),
          false
        );

        // Send delete request to API
        await fetch(`/api/users/${userToDelete}`, {
          method: 'DELETE',
        });

        // Revalidate the cache
        mutate('/api/users');

        // 如果删除的用户在选中列表中，从选中列表中移除
        if (selectedRowIds.includes(userToDelete)) {
          setSelectedRowIds((prev) => prev.filter((id) => id !== userToDelete));
        }

        toast.success('用户已删除', {
          description: '用户已成功删除。',
        });
      } catch (error) {
        toast.error('删除失败', {
          description: '删除用户时出错，请重试。',
        });

        // Revalidate to get the correct data
        mutate('/api/users');
      } finally {
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        setIsSubmitting(false);
      }
    }
  };

  // Handle adding a new user with SWR mutation
  const handleAddUser = async () => {
    setIsSubmitting(true);

    try {
      // Send POST request to API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const addedUser = await response.json();

      // Update the cache with the new user
      mutate('/api/users', [...(users || []), addedUser]);

      toast.success('用户已添加', {
        description: '新用户已成功添加。',
      });

      // Reset form
      setNewUser({
        name: '',
        email: '',
        role: '用户',
        status: '活跃',
      });
    } catch (error) {
      toast.error('添加失败', {
        description: '添加用户时出错，请重试。',
      });
    } finally {
      setIsAddUserDialogOpen(false);
      setIsSubmitting(false);
    }
  };

  // Handle opening edit user dialog
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditUserDialogOpen(true);
  };

  // Handle updating a user with SWR mutation
  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setIsSubmitting(true);

    try {
      // Optimistic UI update
      const updatedUsers =
        users?.map((user) =>
          user.id === editingUser.id ? editingUser : user
        ) || [];
      mutate('/api/users', updatedUsers, false);

      // Send PUT request to API
      const response = await fetch(`/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          status: editingUser.status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Revalidate the cache
      mutate('/api/users');

      toast.success('用户已更新', {
        description: '用户信息已成功更新。',
      });
    } catch (error) {
      toast.error('更新失败', {
        description: '更新用户信息时出错，请重试。',
      });

      // Revalidate to get the correct data
      mutate('/api/users');
    } finally {
      setIsEditUserDialogOpen(false);
      setEditingUser(null);
      setIsSubmitting(false);
    }
  };

  // Handle toggling user status (enable/disable)
  const handleToggleUserStatus = async (user: User) => {
    // Determine the new status
    const newStatus = user.status === '已禁用' ? '活跃' : '已禁用';
    const userName = user.name;

    // Show loading toast
    toast.loading(`正在${newStatus === '已禁用' ? '禁用' : '启用'}用户...`);

    try {
      // Optimistic UI update
      const updatedUsers =
        users?.map((u) =>
          u.id === user.id
            ? {
                ...u,
                status: newStatus,
              }
            : u
        ) || [];

      mutate('/api/users', updatedUsers, false);

      // Send PATCH request to API
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      // Revalidate the cache
      mutate('/api/users');

      toast.success('状态已更新', {
        description: `用户 ${userName} 已${newStatus === '已禁用' ? '禁用' : '启用'}。`,
      });
    } catch (error) {
      toast.error('更新失败', {
        description: '更新用户状态时出错，请重试。',
      });

      // Revalidate to get the correct data
      mutate('/api/users');
    }
  };

  // Status badge color mapping
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case '活跃':
        return 'bg-green-500';
      case '未激活':
        return 'bg-yellow-500';
      case '已禁用':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="mb-4 text-red-500">加载用户数据时出错</p>
        <Button onClick={() => mutate('/api/users')}>重试</Button>
      </div>
    );
  }

  // 修改批量操作按钮部分，将其改为下拉菜单形式
  const bulkActions = (
    <div
      className={cn(
        'flex items-center gap-3 transition-all duration-200',
        selectedRowIds.length > 0
          ? 'rounded-lg border bg-muted/50 p-2 shadow-sm'
          : 'h-0 overflow-hidden p-0'
      )}
    >
      {selectedRowIds.length > 0 && (
        <>
          <div className="flex items-center gap-2">
            <Badge
              className="px-2 py-1 font-medium text-xs"
              variant="secondary"
            >
              已选择 {selectedRowIds.length} 项
            </Badge>
            <Button
              className="h-7 px-2 text-muted-foreground text-xs hover:text-foreground"
              onClick={() => setSelectedRowIds([])}
              size="sm"
              variant="ghost"
            >
              清除选择
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto" size="sm" variant="outline">
                批量操作
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                className="text-red-500 focus:bg-red-50 focus:text-red-600"
                onClick={() => handleBulkAction('delete')}
              >
                <Trash className="mr-2 h-4 w-4" />
                批量删除
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-amber-500 focus:bg-amber-50 focus:text-amber-600"
                onClick={() => handleBulkAction('disable')}
              >
                <UserX className="mr-2 h-4 w-4" />
                批量禁用
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-green-500 focus:bg-green-50 focus:text-green-600"
                onClick={() => handleBulkAction('enable')}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                批量启用
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Toolbar with search, filters and actions */}
      <DataTableToolbar
        actions={
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            添加用户
          </Button>
        }
        filters={
          <UserFilters
            onRoleFilterChange={setRoleFilter}
            onStatusFilterChange={setStatusFilter}
            roleFilter={roleFilter}
            statusFilter={statusFilter}
          />
        }
        onSearch={setSearchTerm}
        searchPlaceholder="搜索用户..."
        searchValue={searchTerm}
      />

      {/* 批量操作按钮 */}
      {bulkActions}

      {/* Users table */}
      <DataTable
        columns={columns}
        data={paginatedUsers}
        emptyMessage="没有找到匹配的用户"
        highlightOnHover={true}
        isLoading={isLoading}
        loadingMessage="加载中..."
        onRowSelect={handleRowSelect}
        selectedRowIds={selectedRowIds}
      />

      {/* Pagination with page size control */}
      {filteredUsers.length > 0 && (
        <DataTablePagination
          currentPage={currentPage}
          itemsLabel="用户"
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          totalItems={filteredUsers.length}
          totalPages={totalPages}
        />
      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        confirmLabel="删除"
        confirmVariant="destructive"
        description="您确定要删除此用户吗？此操作无法撤销。"
        isSubmitting={isSubmitting}
        onConfirm={confirmDeleteUser}
        onOpenChange={setIsDeleteDialogOpen}
        open={isDeleteDialogOpen}
        title="确认删除用户"
      />

      {/* Add user dialog */}
      <FormDialog
        isSubmitDisabled={!newUser.name || !newUser.email}
        isSubmitting={isSubmitting}
        onOpenChange={setIsAddUserDialogOpen}
        onSubmit={handleAddUser}
        open={isAddUserDialogOpen}
        submitLabel="添加"
        title="添加新用户"
      >
        <UserForm data={newUser} onChange={setNewUser} />
      </FormDialog>

      {/* Edit user dialog */}
      <FormDialog
        isSubmitDisabled={
          !editingUser || !editingUser.name || !editingUser.email
        }
        isSubmitting={isSubmitting}
        onOpenChange={(open) => {
          setIsEditUserDialogOpen(open);
          if (!open) setEditingUser(null);
        }}
        onSubmit={handleUpdateUser}
        open={isEditUserDialogOpen}
        submitLabel="更新"
        title="编辑用户"
      >
        {editingUser && (
          <UserForm
            data={editingUser}
            isEdit={true}
            onChange={(user) => setEditingUser(user as User)}
          />
        )}
      </FormDialog>
    </div>
  );
}
