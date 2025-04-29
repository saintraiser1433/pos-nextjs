'use client';

import { DataTable } from '@/components/datatable/data-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getColumns } from './column';
import { deleteCategories, getCategories } from '@/queries/productCategories';
import DialogCategory from '@/components/product-category/dialog-category';
import { ProductCategory } from '@/types/products/categories';
import { toast } from 'react-toastify';
const initialCategory = {
  id: 0,
  name: '',
  status: true,
};
const ProductCategories = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] =
    useState<Omit<ProductCategory, 'createdAt'>>(initialCategory);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
  });

  const { mutateAsync: deleteCategory } = useMutation({
    mutationFn: deleteCategories,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });
      const previousCategories = queryClient.getQueryData(['categories']);
      queryClient.setQueryData<ProductCategory[]>(['categories'], (old) =>
        old?.filter((item) => item.id !== id)
      );

      return { previousCategories };
    },
    onError: (error, _, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories'], context.previousCategories);
      }
      toast.error(`Deletion Failed : ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
  });

  const columns = getColumns(
    deleteCategory,
    setCategories,
    setIsUpdate,
    setOpen
  );

  useEffect(() => {
    if (isError) {
      toast.error(`An error occurred : ${error.message}`);
    }
  }, [isError, error]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <DataTable columns={columns} data={data ?? []}>
          <DialogCategory
            setIsUpdate={setIsUpdate}
            open={open}
            setOpen={setOpen}
            isUpdate={isUpdate}
            categories={categories}
          />
        </DataTable>
      )}
    </div>
  );
};

export default ProductCategories;
