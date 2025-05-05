'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, Trash2 } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { PartialProductBrand, ProductBrand } from '../types';

export const getBrandColumns = (
  setBrandToDelete: React.Dispatch<React.SetStateAction<ProductBrand | null>>,
  setBrand: React.Dispatch<React.SetStateAction<PartialProductBrand>>,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<ProductBrand>[] => [
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
    accessorKey: 'brandImage',
    header: 'Brand Image',
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Brand Name' />
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Brand Description' />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <Badge variant={status ? 'default' : 'outline'}>
          {' '}
          {status ? 'Active' : 'Inactive'}{' '}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableActions<ProductBrand>
        row={row}
        actions={[
          {
            label: 'Edit Brand',
            icon: FileText,
            onClick: (category) => {
              setIsUpdate(true), setBrand(category);
              setOpen(true);
            },
          },
          {
            label: 'Delete brand',
            icon: Trash2,
            destructive: true,
            onClick: async (category) => {
              setBrandToDelete(category);
              setOpenAlert(true);
            },
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
