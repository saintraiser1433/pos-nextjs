'use client';

import { DataTable } from '@/components/datatable/data-table';
import React, { useEffect, useState } from 'react';
import { AlertDialogDemo } from '@/components/alert-dialog';

import { useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/useToast';
import { DEFAULT_FORM_PRODUCT_BRAND } from '@/features/product/brands/constants';
import BrandForm from '@/features/product/brands/components/BrandForm';
import type {
  ProductBrand,
  PartialProductBrand,
} from '@/features/product/brands/types';
import { useBrandMutations } from '@/features/product/brands/hooks/useBrandMutations';
import { useBrandQueries } from '@/features/product/brands/hooks/useBrandQueries';
import { getBrandColumns } from '@/features/product/brands/components/BrandColumn';
import { useGlobal } from '@/context/GlobalProvider';

const ProductBrand = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<ProductBrand | null>(null);
  const [brand, setBrand] = useState<PartialProductBrand>(
    DEFAULT_FORM_PRODUCT_BRAND
  );
  const global = useGlobal();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { deleteProductBrand } = useBrandMutations({
    queryClient,
  });
  const { getAllBrand } = useBrandQueries();

  const { data, isLoading, isError, error } = getAllBrand;
  const { mutateAsync: deletes } = deleteProductBrand;

  const handleDelete = async () => {
    if (brandToDelete) {
      await deletes(brandToDelete.id);
      setOpenAlert(false);
    }
  };

  const columns = getBrandColumns(
    setBrandToDelete,
    setBrand,
    setIsUpdate,
    setOpen,
    setOpenAlert
  );

  useEffect(() => {
    if (isError) {
      toast('error', error.message);
    }
  }, [isError, error, toast]);

  useEffect(() => {
    if (global.state?.title !== 'Product Brands') {
      global.setState({
        title: 'Product Brands',
      });
    }
  }, [global.state?.title]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {brandToDelete && (
            <AlertDialogDemo
              open={openAlert}
              setOpen={setOpenAlert}
              onConfirm={handleDelete}
              message={`Are you sure you want to delete "${brandToDelete.name}"?`}
            />
          )}
          <DataTable columns={columns} data={data ?? []}>
            <BrandForm
              setIsUpdate={setIsUpdate}
              open={open}
              setOpen={setOpen}
              isUpdate={isUpdate}
              brand={brand}
            />
          </DataTable>
        </>
      )}
    </div>
  );
};

export default ProductBrand;
