// column.tsx
'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, Trash2 } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';
import { ProductCategory } from '@/types/products/categories';
import { ApiResponse } from '@/types/products';

export const getColumns = (
  deleteCategory: (id: number) => Promise<ApiResponse<void>>,
  setCategories: React.Dispatch<
    React.SetStateAction<Omit<ProductCategory, 'createdAt'>>
  >,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<ProductCategory>[] => [
  {
    accessorKey: '#',
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableActions<ProductCategory>
        row={row}
        actions={[
          {
            label: 'Edit Categories',
            icon: FileText,
            onClick: (category) => {
              setIsUpdate(true),
                setCategories({
                  id: category.id,
                  name: category.name,
                  status: category.status,
                });
              setOpen(true);
            },
          },
          {
            label: 'Delete payment',
            icon: Trash2,
            destructive: true,
            onClick: async (category) => {
              await deleteCategory(category.id);
            },
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
