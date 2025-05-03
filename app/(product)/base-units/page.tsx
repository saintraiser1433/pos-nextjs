"use client";

import { DataTable } from "@/components/datatable/data-table";
import React, { useEffect, useState } from "react";
import { AlertDialogDemo } from "@/components/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { useGlobal } from "@/context/GlobalProvider";
import { useUnitMutations } from "@/features/product/units/hooks/useVariantMutations";
import { useUnitQueries } from "@/features/product/units/hooks/useVariantQueries";
import { DEFAULT_FORM_PRODUCT_BASE_UNITS } from "@/features/product/base-units/constants";
import {
  PartialProductBaseUnit,
  ProductBaseUnit,
} from "@/features/product/base-units/types";
import BaseUnitForm from "@/features/product/base-units/components/BaseUnitsForm";
import { getBaseUnitsColumns } from "@/features/product/base-units/components/BaseUnitsColumn";
import { useBaseUnitQueries } from "@/features/product/base-units/hooks/useBaseUnitQueries";
import { useBaseUnitMutations } from "@/features/product/base-units/hooks/useBaseUnitMutations";

const ProductBaseUnits = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [baseUnitToDelete, setBaseUnitToDelete] =
    useState<ProductBaseUnit | null>(null);
  const [baseUnit, setBaseUnit] = useState<PartialProductBaseUnit>(
    DEFAULT_FORM_PRODUCT_BASE_UNITS
  );
  const global = useGlobal();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { deleteBaseUnit } = useBaseUnitMutations({
    queryClient,
  });
  const { getAllBaseUnit } = useBaseUnitQueries();

  const { data, isLoading, isError, error } = getAllBaseUnit;
  const { mutateAsync: deletes } = deleteBaseUnit;

  const handleDelete = async () => {
    if (baseUnitToDelete) {
      await deletes(baseUnitToDelete.id);
      setOpenAlert(false);
    }
  };

  const columns = getBaseUnitsColumns(
    setBaseUnitToDelete,
    setBaseUnit,
    setIsUpdate,
    setOpen,
    setOpenAlert
  );

  useEffect(() => {
    if (isError) {
      toast("error", error.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (global.state?.title !== "Product Base Unit") {
      global.setState({
        title: "Product Base Unit",
      });
    }
  }, [global.state?.title]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {baseUnitToDelete && (
            <AlertDialogDemo
              open={openAlert}
              setOpen={setOpenAlert}
              onConfirm={handleDelete}
              message={`Are you sure you want to delete "${baseUnitToDelete.name}"?`}
            />
          )}
          <DataTable columns={columns} data={data ?? []}>
            <BaseUnitForm
              setIsUpdate={setIsUpdate}
              open={open}
              setOpen={setOpen}
              isUpdate={isUpdate}
              baseUnit={baseUnit}
            />
          </DataTable>
        </>
      )}
    </div>
  );
};

export default ProductBaseUnits;
