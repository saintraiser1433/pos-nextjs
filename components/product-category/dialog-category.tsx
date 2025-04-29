'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Box, Loader2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ProductCategory } from '@/types/products/categories';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  insertCategories,
  updateCategories,
} from '@/queries/productCategories';
import { toast } from 'react-toastify';
import { Switch } from '../ui/switch';
import { ApiResponse } from '@/types/products';
import { DEFAULT_FORM_PRODUCT_CATEGORY } from '@/constants';


const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Product category must be at least 3 characters.',
  }),
  status: z.boolean().default(true).optional(),
});

type DialogProps = {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Omit<ProductCategory, 'createdAt'>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const DialogCategory = ({
  isUpdate,
  categories,
  setOpen,
  open,
  setIsUpdate,
}: DialogProps) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: categories.name,
      status: categories.status,
    },
  });

  const { mutateAsync: addCategories, isPending: addIsPending } = useMutation<
    ApiResponse<ProductCategory>,
    Error,
    Pick<ProductCategory, 'name' | 'status'>,
    {
      previousCategories?: Pick<ProductCategory, 'name' | 'status'>[];
    }
  >({
    mutationFn: insertCategories,
    onMutate: async (newCategory) => {
      await queryClient.cancelQueries({ queryKey: ['categories'] });
      const previousCategories = queryClient.getQueryData<
        Pick<ProductCategory, 'name' | 'status'>[]
      >(['categories']);
      queryClient.setQueryData<Pick<ProductCategory, 'name' | 'status'>[]>(
        ['categories'],
        (old = []) => [newCategory, ...old]
      );
      return { previousCategories };
    },
    onError: (error, _, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(['categories'], context.previousCategories);
      }
      toast.error(`Creation Failed: ${error.message}`);
    },
    onSuccess: (response) => {
      toast.success(response?.message);
      resetForm(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const { mutateAsync: updateCategory, isPending: updateIsPending } =
    useMutation<
      ApiResponse<ProductCategory>,
      Error,
      Pick<ProductCategory, 'id' | 'name' | 'status'>,
      {
        previousCategory?: ProductCategory;
        newCategory: Omit<ProductCategory, 'createdAt'>;
      }
    >({
      mutationFn: updateCategories,
      onMutate: async (newCategory) => {
        await queryClient.cancelQueries({
          queryKey: ['categories', newCategory.id],
        });

        const previousCategory = queryClient.getQueryData<ProductCategory>([
          'categories',
          newCategory.id,
        ]);

        queryClient.setQueryData<ProductCategory[]>(['categories'], (old) =>
          old?.map((cat) =>
            cat.id === newCategory.id ? { ...cat, ...newCategory } : cat
          )
        );

        return { previousCategory, newCategory };
      },
      onError: (error, _, context) => {
        if (context?.previousCategory) {
          queryClient.setQueryData(
            ['categories', context.newCategory.id],
            context.previousCategory
          );
        }
        toast.error(`Update Failed: ${error.message}`);
      },
      onSuccess: (response) => {
        toast.success(response?.message);
        resetForm(false);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isUpdate) {
      await updateCategory({ ...data, id: categories.id });
    } else {
      await addCategories(data);
    }
  };

  const resetForm = (open:boolean) => {
    form.reset(DEFAULT_FORM_PRODUCT_CATEGORY);
    setIsUpdate(false);
    setOpen(open);
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

export default DialogCategory;
