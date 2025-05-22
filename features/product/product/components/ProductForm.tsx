'use client';

import { SendHorizonal } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useImageDrop } from '@/hooks/useImageDrop';
import { useRouter } from 'next/navigation';
import { formSchema } from '../schema';
import ProductInformation from './ProductInformation';
import ProductType from './ProductType';
import ProductWarranty from './ProductWarranty';
import ProductUpload from './ProductUpload';
import { Product, ProductFormProps } from '../types';
import { useProductMutations } from '../hooks/useProductMutations';
import { useEffect } from 'react';
import { useFormData } from '@/hooks/useFormData';

const ProductForm = ({
  categories = [],
  brand = [],
  baseUnit = [],
  unit = [],
  baseUnitId,
  setBaseUnitId,
  isUpdate = false,
  setData,
  id,
}: ProductFormProps & {
  id?: number;
  isUpdate?: boolean;
  setData?: Product;
}) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { insertProduct, updateProduct } = useProductMutations({
    queryClient,
  });
  const { createFormData } = useFormData();
  const { mutateAsync: update } = updateProduct;
  const { mutateAsync: add } = insertProduct;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: '',
      barcode: '',
      barcodeType: undefined,
      categoryId: 0,
      brandId: 0,
      orderTax: 0,
      taxType: undefined,
      description: undefined,
      productType: undefined,
      saleUnitId: undefined,
      purchaseUnitId: undefined,
      productUnitId: undefined,
      stockAlert: 0,
      productCost: 0,
      productPrice: 0,
      warrantyPeriod: 0,
      warrantyPaymentType: undefined,
      warrantyTerms: '',
      productImage: undefined,
      // openingStock: undefined,
      isGuaranteed: false,
    },
  });

  const { preview, setPreview, onDrop } = useImageDrop(
    'productImage',
    form.setValue,
    form.resetField
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = createFormData(data);
    if (isUpdate) {
      update(formData);
    } else {
      add(formData);
    }
  };

  useEffect(() => {
    if (setData && Object.keys(setData).length > 0) {
      form.reset({ ...setData, id });
    }
  }, [setData]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-12 gap-5'>
            <div className='col-span-12 lg:col-span-2'>
              <ProductUpload
                preview={preview as string}
                setPreview={setPreview}
                onDrop={onDrop}
              />
            </div>
            <div className='col-span-12 lg:col-span-10 flex flex-col gap-4'>
              <ProductInformation
                setValue={form.setValue}
                brand={brand}
                categories={categories}
              />
              <ProductType
                baseUnit={baseUnit}
                unit={unit}
                setBaseUnitId={setBaseUnitId}
                setValue={form.setValue}
                baseUnitId={baseUnitId}
              />
              <ProductWarranty setValue={form.setValue} />
              <div className='flex gap-2 items-center'>
                <Button variant='outline' type='submit'>
                  <SendHorizonal />
                  Submit
                </Button>
                <Button type='button' onClick={() => router.back()}>
                  Back
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
