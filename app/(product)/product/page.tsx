'use client';

import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import { Box } from 'lucide-react';
import Link from 'next/link';
import { useGlobal } from '@/context/GlobalProvider';
import { useToast } from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import { useUnitMutations } from '@/features/product/units/hooks/useUnitMutations';
import { useProductQueries } from '@/features/product/product/hooks/useProductQueries';
import { getProductColumns } from '@/features/product/product/components/ProductColumn';
import { useState } from 'react';
import { useAlert } from '@/context/AlertProvider';
import { useProductMutations } from '@/features/product/product/hooks/useProductMutations';

const Product = () => {
  const { openAlert } = useAlert();
  const [productDelete, setProductDelete] = useState<number | null>(null);
  const global = useGlobal();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { removeProduct } = useProductMutations({
    queryClient,
  });
  const { fetchProduct } = useProductQueries();
  const { data = [], isLoading, isError, error } = fetchProduct;
  const { mutateAsync: deleteProduct } = removeProduct;

  const columns = getProductColumns({
    openAlert,
    deleteProduct,
  });

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
