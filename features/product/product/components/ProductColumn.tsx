'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { FileText, ImageOff, ImagePlus, Trash2 } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';
import { Badge } from '@/components/ui/badge';
import { PartialProductBrand, ProductBrand } from '../types';
import Image from 'next/image';

import { ImageLoaderProps } from 'next/image';
import { cn } from '@/lib/utils';

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${process.env.NEXT_PUBLIC_STORAGE_BRAND}/${src}?w=${width}&q=${
    quality || 75
  }`;
};
export const getBrandColumns = (
  setBrandToDelete: React.Dispatch<React.SetStateAction<ProductBrand | null>>,
  setBrand: React.Dispatch<React.SetStateAction<PartialProductBrand>>,
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<ProductBrand>[] => [
  {
    accessorKey: 'brandImage',
    header: 'Brand Image',
    cell: ({ row }) => {
      const image = row.getValue('brandImage');
      return image ? (
        <Image
          loader={imageLoader}
          loading='lazy'
          style={{ objectFit: 'contain' }}
          className='rounded-md ml-4'
          src={`${row.getValue('brandImage')}`}
          width={32}
          height={32}
          alt='Picture of the author'
        />
      ) : (
        <ImageOff className={cn('ml-4 text-gray-500')} />
      );
    },
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
            onClick: (brand) => {
              setIsUpdate(true);
              setBrand(brand);
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
