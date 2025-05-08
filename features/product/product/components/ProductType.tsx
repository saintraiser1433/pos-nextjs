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
import { DEFAULT_PRODUCT_TYPE } from '../constants';
import { useFormContext } from 'react-hook-form';
import { ProductFormProps } from '../types';

const ProductType = ({
  baseUnit = [],
  unit = [],
  baseUnitId,
  setBaseUnitId,
}: Omit<ProductFormProps, 'categories' | 'brand'>) => {
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
              name='productUnit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Unit</FormLabel>
                  <FormControl>
                    <ComboBox
                      placeholder='Select product unit'
                      setBaseUnitId={setBaseUnitId}
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
              control={control}
              name='saleUnit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Unit</FormLabel>
                  <FormControl>
                    <ComboBox
                      placeholder='Select sale unit'
                      items={
                        baseUnitId
                          ? unit.map((unit) => ({
                              value: unit.id.toString(),
                              label: unit.name.toLocaleUpperCase(),
                            }))
                          : []
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
              control={control}
              name='purchaseUnit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Unit</FormLabel>
                  <FormControl>
                    <ComboBox
                      placeholder='Select purchase unit'
                      items={
                        baseUnitId
                          ? unit.map((unit) => ({
                              value: unit.id.toString(),
                              label: unit.name.toLocaleUpperCase(),
                            }))
                          : []
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
              control={control}
              name='stockAlert'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Alert</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter stock alert' {...field} />
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
