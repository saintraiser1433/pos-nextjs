import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ComboBox } from '@/components/ui/combobox';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { BarcodeIcon, Check, ChevronsUpDown, Percent } from 'lucide-react';
import React from 'react';
import { DEFAULT_TAX_TYPE } from '../constants';
import { useFormContext } from 'react-hook-form';
import { ProductFormProps, SetValueProps } from '../types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

const ProductInformation = ({
  brand = [],
  categories = [],
  setValue,
}: Pick<
  ProductFormProps & SetValueProps,
  'brand' | 'categories' | 'setValue'
>) => {
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Enter Barcode Symbology' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Code 128'>Code 128</SelectItem>
                        <SelectItem value='Code 39'>Code 39</SelectItem>
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
              name='categoryId'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Product Type</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            ' justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) => category.id === field.value
                              )?.name
                            : 'Select Category'}
                          <ChevronsUpDown className='opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=' p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search category...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No Category Found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((cat) => (
                              <CommandItem
                                value={cat.name}
                                key={cat.id}
                                onSelect={() => {
                                  setValue('categoryId', cat.id);
                                }}
                              >
                                {cat.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    cat.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            ' justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? brand.find((brand) => brand.id === field.value)
                                ?.name
                            : 'Select Brand'}
                          <ChevronsUpDown className='opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className=' p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search framework...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No Brand Found.</CommandEmpty>
                          <CommandGroup>
                            {brand.map((brand) => (
                              <CommandItem
                                value={brand.name}
                                key={brand.id}
                                onSelect={() => {
                                  setValue('brand', brand.id);
                                }}
                              >
                                {brand.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    brand.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                <FormItem className='w-full'>
                  <FormLabel>Tax Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Enter Barcode Symbology' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Exclusive'>Exclusive</SelectItem>
                        <SelectItem value='Inclusive'>Inclusive</SelectItem>
                      </SelectContent>
                    </Select>
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
