'use client';

import { useBaseUnitQueries } from '@/features/product/base-units/hooks/useBaseUnitQueries';
import { useBrandQueries } from '@/features/product/brands/hooks/useBrandQueries';
import { useCategoryQueries } from '@/features/product/categories/hooks/useCategoryQueries';
import ProductForm from '@/features/product/product/components/ProductForm';
import { useUnitQueries } from '@/features/product/units/hooks/useUnitQueries';
import { useState } from 'react';

const CreateProduct = () => {
  const [baseUnitId, setBaseUnitId] = useState<number | undefined>(undefined);
  const { getAllCategory } = useCategoryQueries();
  const { getAllBrand } = useBrandQueries();
  const { getAllBaseUnit } = useBaseUnitQueries();
  const { getUnitByBaseUnit } = useUnitQueries();

  const { data: baseUnit } = getAllBaseUnit;
  const { data: brand } = getAllBrand;
  const { data: category } = getAllCategory;
  const { data: unit } = getUnitByBaseUnit(baseUnitId as number);

  return (
    <>

      <ProductForm
        baseUnitId={baseUnitId}
        setBaseUnitId={setBaseUnitId}
        unit={unit}
        baseUnit={baseUnit}
        categories={category}
        brand={brand}
      />
    </>
  );
};

export default CreateProduct;
