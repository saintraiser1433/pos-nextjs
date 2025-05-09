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
import { ProductFormProps, SetValueProps } from '../types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

const ProductType = ({
  baseUnit = [],
  unit = [],
  baseUnitId,
  setBaseUnitId,
  setValue
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
                        <SelectItem value='Standard Product'>Standard Product</SelectItem>
                        <SelectItem value='Variable Product'>Variable Product</SelectItem>
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
              name='productUnit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Unit</FormLabel>
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
                            ? baseUnit.find((item) => item.id === field.value)
                                ?.name
                            : 'Select Product Unit'}
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
                          <CommandEmpty>No Product Unit Found.</CommandEmpty>
                          <CommandGroup>
                            {baseUnit.map((item) => (
                              <CommandItem
                                value={item.name}
                                key={item.id}
                                onSelect={() => {
                                  setValue('brand', item.id);
                                  setBaseUnitId(item.id);
                                }}
                              >
                                {item.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    item.id === field.value
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
              name='baseUnit'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Unit</FormLabel>
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
                            ? baseUnit.find((item) => item.id === field.value)
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
                          <CommandEmpty>No Base Unit Found.</CommandEmpty>
                          <CommandGroup>
                            {baseUnit.map((item) => (
                              <CommandItem
                                value={item.name}
                                key={item.id}
                                onSelect={() => {
                                  setValue('brand', item.id);
                                  setBaseUnitId(item.id);
                                }}
                              >
                                {item.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    item.id === field.value
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
