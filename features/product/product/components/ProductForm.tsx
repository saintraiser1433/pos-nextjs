'use client';

import { SendHorizonal } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useBrandMutations } from '../hooks/useBrandMutations';
import { useImageDrop } from '@/hooks/useImageDrop';
import { useRouter } from 'next/navigation';
import { formSchema } from '../schema';
import { ProductFormProps } from '../types';
import ProductInformation from './ProductInformation';
import ProductType from './ProductType';
import ProductWarranty from './ProductWarranty';
import ProductUpload from './ProductUpload';


const ProductForm = ({
  categories = [],
  brand = [],
  baseUnit = [],
  unit = [],
  baseUnitId,
  setBaseUnitId,
}: ProductFormProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { insertProductBrand, updateProductBrand } = useBrandMutations({
    queryClient,
  });
  const { mutateAsync: add, isPending: addIsPending } = insertProductBrand;
  const { mutateAsync: update, isPending: updateIsPending } =
    updateProductBrand;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      barcode: '',
      barcodeSymbology: undefined,
      categoryId: 0,
      brandId: 0,
      orderTax: undefined,
      taxType: undefined,
      description: '',
      productType: undefined,
      saleUnit: undefined,
      purchaseUnit: undefined,
      productUnit: undefined,
      stockAlert: undefined,
      productCost: undefined,
      productPrice: undefined,
      warrantyPeriod: undefined,
      paymentType: undefined,
      warrantyTerms: '',
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
    console.log('data', data);
    
    // const formData = new FormData();
    // if (data.brandImage instanceof File) {
    //   formData.append('brandImage', data.brandImage);
    // }
    // formData.append('name', data.name);
    // formData.append('description', data.description);
    // formData.append('status', String(data.status ?? true));
    // if (isUpdate) formData.append('id', brand.id.toString());
    // await (isUpdate ? update(formData) : add(formData));
    // resetForm(false);
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
