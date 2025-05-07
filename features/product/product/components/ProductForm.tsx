'use client';

import { Input } from '@/components/ui/input';
import {
  BarcodeIcon,
  ImageOff,
  ImagePlus,
  Percent,
  SendHorizonal,
} from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

import { useBrandMutations } from '../hooks/useBrandMutations';
import { Textarea } from '@/components/ui/textarea';
import { useOnDrop } from '@/hooks/useOnDrop';
import { useImageDrop } from '@/hooks/useImageDrop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComboBox } from '@/components/ui/combobox';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCategory } from '@/types/products/categories';
import { ProductBrand } from '../../brands/types';
import { DEFAULT_PAYMENT_TYPE, DEFAULT_PRODUCT_TYPE, DEFAULT_TAX_TYPE } from '../constants';
import { ProductBaseUnit } from '../../base-units/types';
import { ProductUnit } from '../../units/types';
const formSchema = z.object({
  productImage: z
    .union([
      z.instanceof(File).refine((file) => file.size !== 0, {
        message: 'Please upload a valid image',
      }),
      z.string().min(1, { message: 'Image must not be empty' }),
    ])
    .optional(),
  productName: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  barcode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  barcodeSymbology: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  productCategory: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  brand: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  orderTax: z.number().int().min(0).max(100),
  taxType: z.string(),
  description: z.string().min(2, {
    message: 'Description must be at least 5 characters.',
  }),
  productType: z.string({
    required_error: 'Product Type is Required',
  }),
  productCost: z.number({
    required_error: 'Product Cost is Required',
  }),
  productPrice: z.number({
    required_error: 'Product Price is Required',
  }),
  productUnit: z.string({
    required_error: 'Product Unit   is Required',
  }),
  saleUnit: z.string({
    required_error: 'Sale Unit is Required',
  }),
  purchaseUnit: z.string({
    required_error: 'Purchase Unit is Required',
  }),
  stockAlert: z.number({
    required_error: 'Stock Alert is Required',
  }),
  warrantyPeriod: z.number({
    required_error: 'Warranty Period is Required',
  }),
  paymentType: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  warrantyTerms: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  openingStock: z.number().optional(),
  isGuarantee: z.boolean().default(false).optional(),
});

type ProductFormProps = {
  categories: ProductCategory[] | undefined;
  brand: ProductBrand[] | undefined;
  baseUnit: ProductBaseUnit[] | undefined;
  unit: ProductUnit[] | undefined;
  setBaseUnitId: React.Dispatch<React.SetStateAction<number>>;
};

const ProductForm = ({
  categories = [],
  brand = [],
  baseUnit = [],
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
      isGuarantee: false,
    },
  });

  const { preview, setPreview, onDrop } = useImageDrop(
    'brandImage',
    form.setValue,
    form.resetField
  );
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useOnDrop(onDrop);

  // const { resetForm } = useFormReset(
  //   form.reset,
  //   DEFAULT_FORM_PRODUCT_BRAND,
  //   setPreview,
  //   setIsUpdate,
  //   setOpen
  // );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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

  const frameworks = [
    {
      value: '1',
      label: 'Next.js',
    },
    {
      value: '2',
      label: 'SvelteKit',
    },
    {
      value: '3',
      label: 'Nuxt.js',
    },
    {
      value: '4',
      label: 'Remix',
    },
    {
      value: '5',
      label: 'Astro',
    },
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-12 gap-5'>
            <div className='col-span-12 lg:col-span-2'>
              <Card className='p-3'>
                <CardContent className='px-1'>
                  <FormField
                    control={form.control}
                    name='productImage'
                    render={({ field }) => (
                      <FormItem className='mx-auto'>
                        <FormControl>
                          <div
                            {...getRootProps()}
                            className={cn(
                              'mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-10 rounded-lg border border-foreground p-2  shadow-foreground'
                            )}
                          >
                            {preview ? (
                              <img
                                src={preview as string}
                                alt='Uploaded image'
                                className='max-h-[300px] rounded-lg'
                              />
                            ) : (
                              field.value &&
                              typeof field.value === 'string' && (
                                <img
                                  src={`${process.env.NEXT_PUBLIC_STORAGE_BRAND}/${field.value}`}
                                  alt='Uploaded images'
                                  className='max-h-[300px] rounded-lg'
                                />
                              )
                            )}

                            <ImagePlus
                              className={`size-30 text-gray-500 ${
                                preview || field.value ? 'hidden' : 'block'
                              }`}
                            />

                            <Input {...getInputProps()} type='file' />
                            {isDragActive ? (
                              <p>Drop the image!</p>
                            ) : (
                              <p className='text-gray-700'>
                                Click here or drag an image to upload it
                              </p>
                            )}
                          </div>
                        </FormControl>
                        <Button variant={'destructive'}>
                          <ImageOff></ImageOff>
                          Remove
                        </Button>
                        <FormMessage>
                          {fileRejections.length !== 0 && (
                            <p>
                              Image must be less than 5MB and of type png, jpg,
                              or jpeg
                            </p>
                          )}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className='col-span-12 lg:col-span-10 flex flex-col gap-4'>
              <Card>
                <CardHeader className='border-b-1 pb-3'>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='productName'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter product name'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='barcode'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>SKU (Barcode)</FormLabel>
                            <FormControl>
                              <div className='flex items-center'>
                                <Input
                                  type='number'
                                  className='rounded-r-none'
                                  placeholder='Enter SKU Barcode'
                                  {...field}
                                />
                                <Button
                                  className='rounded-l-none bg-gray-100 text-gray-700 dark:text-white'
                                  variant={'outline'}
                                >
                                  <BarcodeIcon />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='barcodeSymbology'
                        render={({ field }) => (
                          <FormItem className='w-full'>
                            <FormLabel>Barcode Symbology</FormLabel>
                            <FormControl>
                              <Select {...field}>
                                <SelectTrigger className='w-full'>
                                  <SelectValue placeholder='Enter Barcode Symbology' />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value='light'>
                                    Code 128
                                  </SelectItem>
                                  <SelectItem value='dark'>Code 39</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='productCategory'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Category</FormLabel>
                            <FormControl>
                              <ComboBox
                                placeholder='Select product category'
                                items={
                                  categories.map((category) => ({
                                    value: category.id.toString(),
                                    label: category.name.toLocaleUpperCase(),
                                  })) || []
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='brand'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand Name</FormLabel>
                            <FormControl>
                              <ComboBox
                                placeholder='Select brand name'
                                items={
                                  brand.map((brand) => ({
                                    value: brand.id.toString(),
                                    label: brand.name.toLocaleUpperCase(),
                                  })) || []
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-2'>
                      <FormField
                        control={form.control}
                        name='orderTax'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Tax</FormLabel>
                            <FormControl>
                              <div className='flex items-center'>
                                <Input
                                  type='number'
                                  className='rounded-r-none'
                                  placeholder='Enter order tax'
                                  {...field}
                                />
                                <Button
                                  className='rounded-l-none bg-gray-100 text-gray-700'
                                  variant={'outline'}
                                >
                                  <Percent />
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-2'>
                      <FormField
                        control={form.control}
                        name='taxType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax Type</FormLabel>
                            <FormControl>
                              <ComboBox
                                placeholder='Select tax type'
                                items={DEFAULT_TAX_TYPE}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12'>
                      <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={10}
                                placeholder='Type your message here.'
                                id='message'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='border-b-1 pb-3'>
                  <CardTitle>Product Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='productType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Type</FormLabel>
                            <FormControl>
                              <ComboBox
                                placeholder='Select product type'
                                items={DEFAULT_PRODUCT_TYPE}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='productCost'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Cost</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter product cost'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='productPrice'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Price</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter product price'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='productUnit'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Unit</FormLabel>
                            <FormControl>
                              <ComboBox
                                placeholder='Select product unit'
                                items={
                                  baseUnit.map((baseUnit) => ({
                                    value: baseUnit.id.toString(),
                                    label: baseUnit.name.toLocaleUpperCase(),
                                  })) || []
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='saleUnit'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sale Unit</FormLabel>
                            <FormControl>
                              <ComboBox
                                placeholder='Select sale unit'
                                items={frameworks}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='purchaseUnit'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Purchase Unit</FormLabel>
                            <FormControl>
                              <ComboBox
                                placeholder='Select purchase unit'
                                items={frameworks}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-4'>
                      <FormField
                        control={form.control}
                        name='stockAlert'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stock Alert</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Enter stock alert'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='border-b-1 pb-3'>
                  <CardTitle>Warranty & Guarantee Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-12 md:col-span-2'>
                      <FormField
                        control={form.control}
                        name='warrantyPeriod'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warranty Period</FormLabel>
                            <FormControl>
                              <Input placeholder='Enter Period' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-2'>
                      <FormField
                        control={form.control}
                        name='paymentType'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Payment Type </FormLabel>
                            <FormControl>
                              <ComboBox items={DEFAULT_PAYMENT_TYPE} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12'>
                      <FormField
                        control={form.control}
                        name='warrantyTerms'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel> Warranty Terms </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={10}
                                placeholder='Type your message here.'
                                id='message'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12'>
                      <FormField
                        control={form.control}
                        name='isGuarantee'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                              <FormLabel>Is Guarantee?</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='border-b-1 pb-3'>
                  <CardTitle>Opening Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-12 md:col-span-3'>
                      <FormField
                        control={form.control}
                        name='openingStock'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warehouse 1</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='Starting stock'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-12 md:col-span-3'>
                      <FormField
                        control={form.control}
                        name='openingStock'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Warehouse 2</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='Starting stock'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
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
