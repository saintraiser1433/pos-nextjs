import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { ProductCategory } from '@/types/products/categories';
import { Link, Box } from 'lucide-react';
import React from 'react';
import axios from 'axios';
const getCategories = async (): Promise<ProductCategory[]> => {
  try {
    const response = await axios.get<ProductCategory[]>(`${process.env.NEXT_PUBLIC_API_URL}/product/category`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return []; // Return empty array or handle differently
  }
};

const ProductCategories = async () => {
  const data = await getCategories();
  return (
    <div className=''>
      {data.map((item) => (
        <div key={item.name}>
          {item.name}
        </div>
      ))}
      {/* <DataTable columns={columns} data={data}>
      <Link href='/product/create'>
        <Button className='cursor-pointer' variant='outline'>
          <Box />
          Create Product
        </Button>
      </Link>
    </DataTable> */}
    </div>
  );
};

export default ProductCategories;
