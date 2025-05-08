import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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

const ProductWarehouse = () => {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader className='border-b-1 pb-3'>
        <CardTitle>Opening Stock</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12 md:col-span-3'>
            <FormField
              control={control}
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
              control={control}
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
  );
};

export default ProductWarehouse;
