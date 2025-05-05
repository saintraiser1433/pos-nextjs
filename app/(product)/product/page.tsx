'use server';

import { DataTable } from '@/components/datatable/data-table';
import { columns } from './column';
import { Button } from '@/components/ui/button';
import { Box } from 'lucide-react';
import Link from 'next/link';

type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
};

async function getData(): Promise<Payment[]> {
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '12321',
      amount: 100,
      status: 'success',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'processing',
      email: '123@example.com',
    },
    {
      id: '728ed52f',
      amount: 100,
      status: 'failed',
      email: 'm@example.com',
    },
    // ...
  ];
}

const Product = async () => {
  const data = await getData();

  return (
    <div className=''>
      <DataTable columns={columns} data={data}>
        <Link href='/product/create'>
          <Button className='cursor-pointer' variant='outline'>
            <Box />
            Create Product
          </Button>
        </Link>
      </DataTable>
    </div>
  );
};

export default Product;
