'use client';

import { DataTable } from '@/components/datatable/data-table';
import React, { useEffect, useState } from 'react';
import { AlertDialogDemo } from '@/components/alert-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';

import { useGlobal } from '@/context/GlobalProvider';
import { DEFAULT_FORM_PRODUCT_VARIANTS } from '@/features/product/variations/constants';
import {
  PartialProductVariant,
  ProductVariant,
} from '@/features/product/variations/types';
import { useVariantMutations } from '@/features/product/variations/hooks/useVariantMutations';
import { useVariantQueries } from '@/features/product/variations/hooks/useVariantQueries';
import { getVariantColumns } from '@/features/product/variations/components/VariantsColumn';
import VariantForm from '@/features/product/variations/components/VariantsForm';

const ProductVariants = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [variantToDelete, setvariantToDelete] = useState<ProductVariant | null>(
    null
  );
  const [variant, setVariant] = useState<PartialProductVariant>(
    DEFAULT_FORM_PRODUCT_VARIANTS
  );
  const global = useGlobal();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { deleteVariant } = useVariantMutations({
    queryClient,
  });
  const { getAllVariant } = useVariantQueries();

  const { data, isLoading, isError, error } = getAllVariant;
  const { mutateAsync: deletes } = deleteVariant;

  const handleDelete = async () => {
    if (variantToDelete) {
      await deletes(variantToDelete.id);
      setOpenAlert(false);
    }
  };

  const columns = getVariantColumns(
    setvariantToDelete,
    setVariant,
    setIsUpdate,
    setOpen,
    setOpenAlert
  );

  useEffect(() => {
    if (isError) {
      toast('error', error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (global.state?.title !== 'Product Variations') {
      global.setState({
        title: 'Product Variations',
      });
    }
  }, [global.state?.title]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {variantToDelete && (
            <AlertDialogDemo
              open={openAlert}
              setOpen={setOpenAlert}
              onConfirm={handleDelete}
              message={`Are you sure you want to delete "${variantToDelete.name}"?`}
            />
          )}
          <DataTable columns={columns} data={data ?? []}>
            <VariantForm
              setIsUpdate={setIsUpdate}
              open={open}
              setOpen={setOpen}
              isUpdate={isUpdate}
              variant={variant}
            />
          </DataTable>
        </>
      )}
    </div>
  );
};

export default ProductVariants;
