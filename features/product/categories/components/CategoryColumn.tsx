'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, Trash2 } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';
import { ProductCategory } from '@/types/products/categories';
import { Checkbox } from '@/components/ui/checkbox';
import { PartialProductCategory } from '../types';
import { Badge } from '@/components/ui/badge';

export const getColumns = (
  setCategoryToDelete: React.Dispatch<
    React.SetStateAction<ProductCategory | null>
  >,
  setCategories: React.Dispatch<React.SetStateAction<PartialProductCategory>>,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<ProductCategory>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    cell: ({ row }) => {
      const status = row.getValue("status");
      return <Badge variant={status ? "default" : "outline"}> {status ? "Active" : "Inactive"} </Badge>;
    },
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
            label: 'Delete category',
            icon: Trash2,
            destructive: true,
            onClick: async (category) => {
              setCategoryToDelete(category);
              setOpenAlert(true);
            },
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
