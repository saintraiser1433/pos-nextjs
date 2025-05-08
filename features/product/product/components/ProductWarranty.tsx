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
import React from 'react';
import { DEFAULT_PAYMENT_TYPE } from '../constants';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

const ProductWarranty = () => {
  const { control } = useFormContext();
  return (
    <Card>
      <CardHeader className='border-b-1 pb-3'>
        <CardTitle>Warranty & Guarantee Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12 md:col-span-2'>
            <FormField
              control={control}
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
              control={control}
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
              control={control}
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
              control={control}
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
  );
};

export default ProductWarranty;
