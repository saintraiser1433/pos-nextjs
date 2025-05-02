'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, Trash2 } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { PartialProductVariant, ProductVariant } from '../types';

export const getVariantColumns = (
  setVariantToDelete: React.Dispatch<
    React.SetStateAction<ProductVariant | null>
  >,
  setVariant: React.Dispatch<React.SetStateAction<PartialProductVariant>>,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<ProductVariant>[] => [
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
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Variant Type' />
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
      <DataTableActions<ProductVariant>
        row={row}
        actions={[
          {
            label: 'Edit Variant',
            icon: FileText,
            onClick: (variant) => {
              setIsUpdate(true),
                setVariant({
                  id: variant.id,
                  name: variant.name,
                  type: variant.type,
                  status: variant.status,
                });
              setOpen(true);
            },
          },
          {
            label: 'Delete Variant',
            icon: Trash2,
            destructive: true,
            onClick: async (variant) => {
              setVariantToDelete(variant);
              setOpenAlert(true);
            },
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
