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
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductFormProps } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SetValueProps } from '@/types';

const ProductType = ({
  baseUnit = [],
  unit = [],
  setBaseUnitId,
  setValue,
}: Omit<ProductFormProps & SetValueProps, 'categories' | 'brand'>) => {
  const { control } = useFormContext();

  return (
    <Card>
      <CardHeader className='border-b-1 pb-3'>
        <CardTitle>Product Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12 md:col-span-4'>
            <FormField
              control={control}
              name='productType'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Enter Product Type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='STANDARD'>
                          Standard Product
                        </SelectItem>
                        <SelectItem value='VARIABLE'>
                          Variable Product
                        </SelectItem>
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
              name='productCost'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Cost</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product cost' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-12 md:col-span-4'>
            <FormField
              control={control}
              name='productPrice'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter product price' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-12 md:col-span-4'>
            <FormField
              control={control}
              name='productUnitId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Unit</FormLabel>
                  <ComboBox
                    field={field}
                    setValue={setValue}
                    columnField={'productUnitId'}
                    setBaseUnitId={setBaseUnitId}
                    items={baseUnit.map((item) => ({
                      label: item.name,
                      value: item.id.toString(),
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-12 md:col-span-4'>
            <FormField
              control={control}
              name='saleUnitId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Unit</FormLabel>
                  <ComboBox
                    field={field}
                    setValue={setValue}
                    columnField={'saleUnitId'}
                    items={unit.map((item) => ({
                      label: item.name,
                      value: item.id.toString(),
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-12 md:col-span-4'>
            <FormField
              control={control}
              name='purchaseUnitId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Unit</FormLabel>
                  <ComboBox
                    field={field}
                    setValue={setValue}
                    columnField={'purchaseUnitId'}
                    items={unit.map((item) => ({
                      label: item.name,
                      value: item.id.toString(),
                    }))}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='col-span-12 md:col-span-4'>
            <FormField
              control={control}
              name='stockAlert'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Alert</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
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
  );
};

export default ProductType;
