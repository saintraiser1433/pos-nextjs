import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ComboBox } from '@/components/ui/combobox';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { BarcodeIcon, Percent } from 'lucide-react';
import React from 'react';
import { DEFAULT_TAX_TYPE } from '../constants';
import { useFormContext } from 'react-hook-form';
import { ProductFormProps } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductInformation = ({
  brand = [],
  categories = [],
}: Pick<ProductFormProps, 'brand' | 'categories'>) => {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader className='border-b-1 pb-3'>
        <CardTitle>Product Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12 md:col-span-4'>
            <FormField
              control={control}
              name='productName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-12 md:col-span-4'>
            <FormField
              control={control}
              name='barcode'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>SKU (Barcode)</FormLabel>
                  <FormControl>
                    <div className='flex items-center'>
                      <Input
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
              control={control}
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
                        <SelectItem value='light'>Code 128</SelectItem>
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
              control={control}
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
              control={control}
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-12 md:col-span-2'>
            <FormField
              control={control}
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
              control={control}
              name='taxType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Type</FormLabel>
                  <FormControl>
                    <ComboBox
                      placeholder='Select tax type'
                      items={DEFAULT_TAX_TYPE}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-12'>
            <FormField
              control={control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      placeholder='Type your message here.'
                      id='message'
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
  );
};

export default ProductInformation;
