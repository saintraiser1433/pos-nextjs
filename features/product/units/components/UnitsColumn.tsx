'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, Trash2 } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { PartialProductUnit, ProductUnit } from '../types';

export const getVariantColumns = (
  setVariantToDelete: React.Dispatch<React.SetStateAction<ProductUnit | null>>,
  setVariant: React.Dispatch<React.SetStateAction<PartialProductUnit>>,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<ProductUnit>[] => [
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
    accessorKey: 'shortName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Short Name' />
    ),
  },
  {
    accessorKey: 'baseUnit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Base Unit' />
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
      <DataTableActions<ProductUnit>
        row={row}
        actions={[
          {
            label: 'Edit Unit',
            icon: FileText,
            onClick: (unit) => {
              setIsUpdate(true);
              setVariant(unit);
              setOpen(true);
            },
          },
          {
            label: 'Delete Unit',
            icon: Trash2,
            destructive: true,
            onClick: async (unit) => {
              setVariantToDelete(unit);
              setOpenAlert(true);
            },
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
