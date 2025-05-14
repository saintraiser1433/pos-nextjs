'use client';

import { DataTable } from '@/components/datatable/data-table';
import { useEffect, useState } from 'react';
import { AlertDialogDemo } from '@/components/alert-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { useGlobal } from '@/context/GlobalProvider';
import {
  PartialProductUnit,
  ProductUnit,
} from '@/features/product/units/types';
import { DEFAULT_FORM_PRODUCT_UNITS } from '@/features/product/units/constants';
import { getUnitsColumns } from '@/features/product/units/components/UnitsColumn';
import UnitForm from '@/features/product/units/components/UnitsForm';
import { useUnitMutations } from '@/features/product/units/hooks/useUnitMutations';
import { useUnitQueries } from '@/features/product/units/hooks/useUnitQueries';

const ProductUnits = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [unitsToDelete, setUnitsToDelete] = useState<ProductUnit | null>(null);
  const [units, setUnits] = useState<PartialProductUnit>(
    DEFAULT_FORM_PRODUCT_UNITS
  );
  const global = useGlobal();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { deleteUnit } = useUnitMutations({
    queryClient,
  });
  const { getAllUnit } = useUnitQueries();

  const { data, isLoading, isError, error } = getAllUnit;
  const { mutateAsync: deletes } = deleteUnit;

  const handleDelete = async () => {
    if (unitsToDelete) {
      await deletes(unitsToDelete.id);
      setOpenAlert(false);
    }
  };

  const columns = getUnitsColumns(
    setUnitsToDelete,
    setUnits,
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
    if (global.state?.title !== 'Product Unit') {
      global.setState({
        title: 'Product Unit',
      });
    }
  }, [global.state?.title]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {unitsToDelete && (
            <AlertDialogDemo
              open={openAlert}
              setOpen={setOpenAlert}
              onConfirm={handleDelete}
              message={`Are you sure you want to delete "${unitsToDelete.name}"?`}
            />
          )}
          <DataTable columns={columns} data={data ?? []}>
            <UnitForm
              setIsUpdate={setIsUpdate}
              open={open}
              setOpen={setOpen}
              isUpdate={isUpdate}
              unit={units}
            />
          </DataTable>
        </>
      )}
    </div>
  );
};

export default ProductUnits;
