'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Box, Loader2 } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { PartialProductUnit } from '../types';
import { useUnitMutations } from '../hooks/useVariantMutations';
import { DEFAULT_FORM_PRODUCT_UNITS } from '../constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBaseUnitQueries } from '../../base-units/hooks/useBaseUnitQueries';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Product Variant Name is required',
  }),
  shortName: z.string().min(1, {
    message: 'Short Name is required',
  }),
  baseUnit: z.string().min(1, {
    message: 'Base Unit is required',
  }),
  operator: z.string().min(1, {
    message: 'Operator is required',
  }),
  operationValue: z.coerce.number().min(1, {
    message: 'Operation Value is required',
  }),
  status: z.boolean().default(true).optional(),
});

type DialogProps = {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  unit: PartialProductUnit;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const UnitForm = ({
  isUpdate,
  unit,
  setOpen,
  open,
  setIsUpdate,
}: DialogProps) => {
  const queryClient = useQueryClient();
  const { getAllBaseUnit } = useBaseUnitQueries();
  const { insertUnit, updateUnit } = useUnitMutations({
    queryClient,
  });
  const { data, isLoading, isError, error } = getAllBaseUnit;
  const { mutateAsync: add, isPending: addIsPending } = insertUnit;
  const { mutateAsync: update, isPending: updateIsPending } = updateUnit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: unit,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isUpdate) {
      await update({ ...data, id: unit.id });
      resetForm(false);
    } else {
      await add(data);
      resetForm(false);
    }
  };

  const resetForm = (isOpen: boolean) => {
    form.reset(DEFAULT_FORM_PRODUCT_UNITS);
    setIsUpdate(false);
    setOpen(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          onClick={() => {
            resetForm(true);
          }}
          variant='outline'
        >
          <Box />
          Create Unit
        </Button>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Product Unit</DialogTitle>
            <DialogDescription>Please enter Unit </DialogDescription>
          </DialogHeader>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid gap-4 py-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter Unit Name' {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='shortName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter Short Name'
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='baseUnit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Unit</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select Base Unit' />
                          </SelectTrigger>
                          <SelectContent>
                            {data?.map((item) => (
                              <SelectItem key={item.id} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='operator'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operator</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select Operator' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='*'>Multiply (*)</SelectItem>
                            <SelectItem value='/'>Divide (/) </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='operationValue'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operation Value</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Enter Operation Value'
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                {isUpdate && (
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <Separator className='my-3' />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setIsUpdate(false);
                    }}
                    type='button'
                    variant='secondary'
                  >
                    Close
                  </Button>
                </DialogClose>
                {addIsPending || updateIsPending ? (
                  <Button type='submit' disabled>
                    <Loader2 className='animate-spin' />
                    Please wait
                  </Button>
                ) : (
                  <Button type='submit'>Save Changes</Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UnitForm;
