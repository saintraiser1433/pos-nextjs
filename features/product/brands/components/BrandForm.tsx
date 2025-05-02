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

import { useBrandMutations } from '../hooks/useBrandMutations';
import { DEFAULT_FORM_PRODUCT_BRAND } from '../constants';
import { PartialProductBrand } from '../types';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Product Brand must be at least 3 characters.',
  }),
  status: z.boolean().default(true).optional(),
});

type DialogProps = {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  brand: PartialProductBrand;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const BrandForm = ({
  isUpdate,
  brand,
  setOpen,
  open,
  setIsUpdate,
}: DialogProps) => {
  const queryClient = useQueryClient();
  const { insertProductBrand, updateProductBrand } = useBrandMutations({
    queryClient,
  });

  const { mutateAsync: add, isPending: addIsPending } = insertProductBrand;
  const { mutateAsync: update, isPending: updateIsPending } =
    updateProductBrand;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: brand.name,
      status: brand.status,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isUpdate) {
      await update({ ...data, id: brand.id });
      resetForm(false);
    } else {
      await add(data);
      resetForm(false);
    }
  };

  const resetForm = (isOpen: boolean) => {
    form.reset(DEFAULT_FORM_PRODUCT_BRAND);
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
          Create Brand
        </Button>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Product Brand</DialogTitle>
            <DialogDescription>Please enter Brand</DialogDescription>
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
                      <FormLabel>Brand Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter Brand' {...field} />
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

export default BrandForm;
