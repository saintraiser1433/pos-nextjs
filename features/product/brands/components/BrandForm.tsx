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
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';
import { Box, ImagePlus, Loader2 } from 'lucide-react';
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
import { BrandFormProps, PartialProductBrand } from '../types';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const BrandForm = ({
  isUpdate,
  brand,
  setOpen,
  open,
  setIsUpdate,
}: BrandFormProps) => {
  const queryClient = useQueryClient();
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>('');
  const { insertProductBrand, updateProductBrand } = useBrandMutations({
    queryClient,
  });

  const { mutateAsync: add, isPending: addIsPending } = insertProductBrand;
  const { mutateAsync: update, isPending: updateIsPending } =
    updateProductBrand;

  const formSchema = z.object({
    brandImage: z
      .instanceof(File)
      .refine((file) => file.size !== 0, 'Please upload an image'),
    name: z.string().min(3, {
      message: 'Product Brand must be at least 3 characters.',
    }),

    description: z.string().min(5, {
      message: 'Description be at least 5 characters.',
    }),
    status: z.boolean().default(true).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      brandImage: new File([''], 'filename'),
      name: brand.name,
      description: brand.description,
      status: brand.status,
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue('brandImage', acceptedFiles[0]);
        form.clearErrors('brandImage');
      } catch (error) {
        setPreview(null);
        form.resetField('brandImage');
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
    });

  const resetForm = (isOpen: boolean) => {
    form.reset(DEFAULT_FORM_PRODUCT_BRAND);
    setPreview(null);
    setIsUpdate(false);
    setOpen(isOpen);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('brandImage', data.brandImage);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('status', String(data.status ?? true));

    if (isUpdate) {
      formData.append('id', brand.id.toString());
      await update(formData);
      resetForm(false);
    } else {
      await add(formData);
      resetForm(false);
    }
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
        <DialogContent className='sm:max-w-[800px]'>
          <DialogHeader>
            <DialogTitle>Product Brand</DialogTitle>
            <DialogDescription>Please enter Brand</DialogDescription>
          </DialogHeader>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex gap-4'>
                <FormField
                  control={form.control}
                  name='brandImage'
                  render={() => (
                    <FormItem className='mx-auto sm:w-[300px]'>
                      <FormControl>
                        <div
                          {...getRootProps()}
                          className={cn(
                            'mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-2  shadow-foreground'
                          )}
                        >
                          {preview && (
                            <img
                              src={preview as string}
                              alt='Uploaded image'
                              className='max-h-[300px] rounded-lg'
                            />
                          )}
                          <ImagePlus
                            className={`size-30 text-gray-500 ${
                              preview ? 'hidden' : 'block'
                            }`}
                          />
                          <Input {...getInputProps()} type='file' />
                          {isDragActive ? (
                            <p>Drop the image!</p>
                          ) : (
                            <p className='text-gray-700'>
                              Click here or drag an image to upload it
                            </p>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage>
                        {fileRejections.length !== 0 && (
                          <p>
                            Image must be less than 1MB and of type png, jpg, or
                            jpeg
                          </p>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className='flex-1 flex flex-col gap-4'>
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
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Enter Brand Description'
                            className='resize'
                            {...field}
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

                <Button type='submit' disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className='animate-spin' />
                  )}
                  {form.formState.isSubmitting ? 'Please wait' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BrandForm;
