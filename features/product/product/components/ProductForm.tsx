'use client';

import { SendHorizonal } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useBrandMutations } from '../hooks/useProductMutations';
import { useImageDrop } from '@/hooks/useImageDrop';
import { useRouter } from 'next/navigation';
import { formSchema } from '../schema';
import ProductInformation from './ProductInformation';
import ProductType from './ProductType';
import ProductWarranty from './ProductWarranty';
import ProductUpload from './ProductUpload';
import { ProductFormProps } from '../types';

const ProductForm = ({
  categories = [],
  brand = [],
  baseUnit = [],
  unit = [],
  baseUnitId,
  setBaseUnitId,
  isUpdate = false,
}: ProductFormProps & { isUpdate?: boolean }) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { insertProduct, updateProduct } = useBrandMutations({
    queryClient,
  });
  const { mutateAsync: update } = updateProduct;
  const { mutateAsync: add } = insertProduct;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      barcode: '',
      barcodeType: undefined,
      categoryId: 0,
      brandId: 0,
      orderTax: 0,
      taxType: undefined,
      description: '',
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
      isGuarantee: false,
    },
  });

  const { preview, setPreview, onDrop } = useImageDrop(
    'productImage',
    form.setValue,
    form.resetField
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('me');
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    if (isUpdate) {
      update(formData);
    }
    add(formData);
    // form.reset();
    // setPreview(null);
  };

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
                setValue={form.setValue}
                baseUnit={baseUnit}
                unit={unit}
                baseUnitId={baseUnitId}
                setBaseUnitId={setBaseUnitId}
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
