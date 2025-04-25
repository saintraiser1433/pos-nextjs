'use client';

import { DataTable } from '@/components/datatable/data-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getColumns } from './column';
import {
  deleteCategories,
  getCategories,
  insertCategories,
  updateCategories,
} from '@/queries/productCategories';
import DialogCategory from '@/components/product-category/dialog-category';
import { ProductCategory } from '@/types/products/categories';
import { toast } from 'react-toastify';
const ProductCategories = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
  });

  const { mutateAsync: deleteCategory } = useMutation({
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast.error(`Creation Failed : ${error.message}`);
    },
  });

  const columns = getColumns(deleteCategory);

  useEffect(() => {
    //if fetch will error
    if (isError) {
      toast.error(`An error occurred : ${error.message}`);
    }
  });

  return (
    <div>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <DataTable columns={columns} data={data ?? []}>
          <DialogCategory isUpdate={isUpdate} />
        </DataTable>
      )}
    </div>
  );
};

export default ProductCategories;
