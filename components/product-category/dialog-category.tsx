'use client';
import React, { useRef, useState } from 'react';
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
import { Box } from 'lucide-react';
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Product category must be at least 3 characters.',
  }),
  status: z.boolean().optional(),
});

type DialogProps = {
  isUpdate: boolean;
};

const DialogCategory = ({ isUpdate }: DialogProps) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(1);
  const queryClient = useQueryClient();

  const { mutateAsync: addCategories } = useMutation({
    mutationFn: insertCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const { mutateAsync: updateCategory } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Pick<ProductCategory, 'name' | 'status'>;
    }) => updateCategories(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      toast.error(`Update Failed : ${error.message}`);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isUpdate) {
      updateCategory({ data, id: id });
    }
    addCategories(data);

    setOpen(false);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      status: true,
    },
  });
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button onClick={() => setOpen(true)} variant='outline'>
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
                  <Button type='button' variant='secondary'>
                    Close
                  </Button>
                </DialogClose>
                <Button type='submit'>Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogCategory;
