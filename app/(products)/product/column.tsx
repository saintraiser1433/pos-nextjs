'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Copy, FileText, MoreHorizontal, Trash2, User } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: '#',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableActions<Payment>
        row={row}
        actions={[
          {
            label: 'Copy payment ID',
            icon: Copy,
            onClick: (payment) => navigator.clipboard.writeText(payment.id),
          },
          {
            label: 'View customer',
            icon: User,
            onClick: (payment) => console.log('View customer', payment),
            separatorBefore: true,
          },
          {
            label: 'View details',
            icon: FileText,
            onClick: (payment) => console.log('View details', payment),
          },
          {
            label: 'Delete payment',
            icon: Trash2,
            destructive: true,
            onClick: (payment) => console.log('Delete', payment),
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
