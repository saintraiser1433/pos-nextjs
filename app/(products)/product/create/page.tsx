'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { SendHorizonal } from 'lucide-react';

const formSchema = z.object({
  productName: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  barcode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  productCategory: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  brand: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  barcodeSymbology: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  productUnit: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  warehouse: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  saleUnit: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  purchaseUnit: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  supplier: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  note: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  productType: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  status: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

const onSubmit = (values: z.infer<typeof formSchema>) => {
  console.log(values);
};
const CreateProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
    },
  });

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-12 gap-5'>
              <div className='col-span-9 grid grid-cols-12 gap-4'>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='productName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='barcode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU (Barcode)</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='productCategory'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='brand'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='barcodeSymbology'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barcode Symbology</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='productUnit'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Unit</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='saleUnit'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Unit</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='purchaseUnit'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Unit</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='warehouse'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warehouse</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='note'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='supplier'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-4'>
                  <FormField
                    control={form.control}
                    name='productType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <FormControl>
                          <Input placeholder='shadcn' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className='col-span-3'>Image here</div>
            </div>
            <div className='flex gap-2 items-center'>
              <Button variant='outline' type='submit'>
                <SendHorizonal/>
                Submit
              </Button>
              <Button>Back</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
