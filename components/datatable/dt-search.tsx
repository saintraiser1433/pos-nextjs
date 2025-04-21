import React from 'react';
import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';

interface DataTableSearch<TData> {
  table: Table<TData>;
}

export function DataTableSearch<TData>({ table }: DataTableSearch<TData>){
  return (
    <Input
      placeholder='Filter emails...'
      value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
      onChange={(event) =>
        table.getColumn('email')?.setFilterValue(event.target.value)
      }
      className='max-w-lg h-8'
    />
  );
}
