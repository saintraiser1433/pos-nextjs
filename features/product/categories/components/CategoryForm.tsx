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
import { ProductCategory } from '@/types/products/categories';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useCategoryMutations } from '../hooks/useCategoryMutations';
import { PartialProductCategory } from '../types';
import { DEFAULT_FORM_PRODUCT_CATEGORY } from '../constants';

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Product category must be at least 3 characters.',
  }),
  status: z.boolean().default(true).optional(),
});

type DialogProps = {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  categories: PartialProductCategory;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const CategoryForm = ({
  isUpdate,
  categories,
  setOpen,
  open,
  setIsUpdate,
}: DialogProps) => {
  const queryClient = useQueryClient();
  const { insertCategory, updateCategory } = useCategoryMutations({
    queryClient,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: categories.name,
      status: categories.status,
    },
  });

  const { mutateAsync: add, isPending: addIsPending } = insertCategory();
  const { mutateAsync: update, isPending: updateIsPending } = updateCategory();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isUpdate) {
      await update({ ...data, id: categories.id });
      resetForm(false);
    } else {
      await add(data);
      resetForm(false);
    }
  };

  const resetForm = (isOpen: boolean) => {
    form.reset(DEFAULT_FORM_PRODUCT_CATEGORY);
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
          Create Category
        </Button>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Product Category</DialogTitle>
            <DialogDescription>Please enter category</DialogDescription>
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
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter category' {...field} />
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

export default CategoryForm;
