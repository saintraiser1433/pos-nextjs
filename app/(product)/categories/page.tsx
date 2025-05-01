'use client';

import { DataTable } from '@/components/datatable/data-table';
import React, { useEffect, useState } from 'react';
import { ProductCategory } from '@/types/products/categories';
import { AlertDialogDemo } from '@/components/alert-dialog';
import { getColumns } from '@/features/product/categories/components/CategoryColumn';
import { useCategoryMutations } from '@/features/product/categories/hooks/useCategoryMutations';
import { useCategoryQueries } from '@/features/product/categories/hooks/useCategoryQueries';
import { useQueryClient } from '@tanstack/react-query';
import CategoryForm from '@/features/product/categories/components/CategoryForm';
import { DEFAULT_FORM_PRODUCT_CATEGORY } from '@/features/product/categories/constants';
import { PartialProductCategory } from '@/features/product/categories/types';
import { useToast } from '@/hooks/useToast';

const ProductCategories = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] =
    useState<ProductCategory | null>(null);
  const [categories, setCategories] = useState<PartialProductCategory>(
    DEFAULT_FORM_PRODUCT_CATEGORY
  );
  const [toastHook] = useToast();
  const queryClient = useQueryClient();

  const { deleteCategory } = useCategoryMutations({
    queryClient,
  });
  const { getAllCategory } = useCategoryQueries();

  const { data, isLoading, isError, error } = getAllCategory();
  const { mutateAsync: deletes } = deleteCategory();

  const handleDelete = async () => {
    if (categoryToDelete) {
      await deletes(categoryToDelete.id);
      setOpenAlert(false);
    }
  };

  const columns = getColumns(
    setCategoryToDelete,
    setCategories,
    setIsUpdate,
    setOpen,
    setOpenAlert
  );

  useEffect(() => {
    if (isError) {
      toastHook('error', error.message);
    }
  }, [isError, error]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {categoryToDelete && (
            <AlertDialogDemo
              open={openAlert}
              setOpen={setOpenAlert}
              onConfirm={handleDelete}
              message={`Are you sure you want to delete "${categoryToDelete.name}"?`}
            />
          )}
          <DataTable columns={columns} data={data ?? []}>
            <CategoryForm
              setIsUpdate={setIsUpdate}
              open={open}
              setOpen={setOpen}
              isUpdate={isUpdate}
              categories={categories}
            />
          </DataTable>
        </>
      )}
    </div>
  );
};

export default ProductCategories;
