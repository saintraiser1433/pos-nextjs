'use client';

import { DataTableColumnHeader } from '@/components/datatable/dt-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, FileText, ImageOff, ImagePlus, Trash2 } from 'lucide-react';
import { DataTableActions } from '@/components/datatable/dt-column-action';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // 👈 import router
import { ImageLoaderProps } from 'next/image';
import { cn } from '@/lib/utils';
import { Product, ProductColumnProps } from '../types';

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${process.env.NEXT_PUBLIC_STORAGE_PRODUCT}/${src}?w=${width}&q=${
    quality || 75
  }`;
};

export const getProductColumns = ({
  openAlert,
  deleteProduct,
}: ProductColumnProps): ColumnDef<Product>[] => {
  const route = useRouter();
  return [
    {
      accessorKey: 'productImage',
      header: 'Image',
      cell: ({ row }) => {
        const image = row.getValue('productImage');
        return image ? (
          <div className='border rounded-md w-16 h-16 flex items-center justify-center overflow-hidden'>
            <Image
              loader={imageLoader}
              loading='lazy'
              src={`${image}`}
              alt='Product Image'
              width={64}
              height={64}
              className='object-cover w-full h-full p-2 dark:bg-gray-200'
            />
          </div>
        ) : (
          <div className='border rounded-md w-16 h-16 flex items-center justify-center overflow-hidden'>
            <ImageOff
              className={cn(' text-gray-500 w-16 h-16 p-2 dark:bg-gray-200')}
            />
          </div>
        );
      },
    },

    {
      accessorKey: 'productType',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Type' />
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Name' />
      ),
      cell: ({ row }) => {
        return <span className='capitalize'>{row.getValue('name')}</span>;
      },
    },
    {
      accessorKey: 'brand',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Brand' />
      ),
      cell: ({ row }) => {
        return <span className='capitalize'>{row.getValue('brand')}</span>;
      },
    },
    {
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Category' />
      ),
      cell: ({ row }) => {
        return <span className='capitalize'>{row.getValue('category')}</span>;
      },
    },
    {
      accessorKey: 'productCost',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Cost' />
      ),
    },
    {
      accessorKey: 'productPrice',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Price' />
      ),
    },
    {
      accessorKey: 'productUnit',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Unit' />
      ),
    },
    {
      accessorKey: 'productUnits',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Quantity' />
      ),
      cell: ({ row }) => {
        return <span>0</span>;
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableActions<Product>
          row={row}
          actions={[
            {
              label: 'View Product',
              icon: Eye,
              onClick: (item) => {},
            },
            {
              label: 'Edit Product',
              icon: FileText,
              onClick: (item) => {
                route.push(`/product/${item.id}`);
              },
            },
            {
              label: 'Delete Product',
              icon: Trash2,
              destructive: true,
              onClick: async (item) => {
                openAlert({
                  title: `Oh nooo!!`,
                  message: `Are you sure you want to delete this product? ${item.name} `,
                  onConfirm: () => deleteProduct(item.id),
                });
              },
              separatorBefore: true,
            },
          ]}
        />
      ),
    },
  ];
};
