'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, Trash2 } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { PartialProductUnit, ProductUnit } from '../types';

export const getUnitsColumns = (
  setUnitsToDelete: React.Dispatch<React.SetStateAction<ProductUnit | null>>,
  setUnits: React.Dispatch<React.SetStateAction<PartialProductUnit>>,
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
    cell: ({ row }) => {
      const baseUnit = row.getValue('baseUnit') as string;
      return <Badge variant='outline'>{baseUnit}</Badge>;
    },
  },
  {
    accessorKey: 'operator',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Operator' />
    ),
    cell: ({ row }) => {
      const rawOperator = row.getValue('operator');

      const operatorMap: Record<
        string,
        { label: string; variant: 'default' | 'outline' | 'destructive' }
      > = {
        '*': { label: 'Multiply', variant: 'outline' },
        '/': { label: 'Divide', variant: 'default' },
      };

      const operatorData = operatorMap[rawOperator as string] || {
        label: 'Not existing',
        variant: 'destructive',
      };

      return <Badge variant={operatorData.variant}>{operatorData.label}</Badge>;
    },
  },

  {
    accessorKey: 'operationValue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Operation Value' />
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
              setUnits(unit);
              setOpen(true);
            },
          },
          {
            label: 'Delete Unit',
            icon: Trash2,
            destructive: true,
            onClick: async (unit) => {
              setUnitsToDelete(unit);
              setOpenAlert(true);
            },
            separatorBefore: true,
          },
        ]}
      />
    ),
  },
];
