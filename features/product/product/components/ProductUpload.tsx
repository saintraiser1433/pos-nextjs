import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useOnDrop } from '@/hooks/useOnDrop';
import { cn } from '@/lib/utils';
import { ImageDropProps } from '@/types';
import { ImagePlus, ImageOff } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';


const ProductUpload = ({ preview, setPreview, onDrop }: ImageDropProps) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useOnDrop(onDrop);

  const { control } = useFormContext();
  return (
    <Card className='p-3'>
      <CardContent className='px-1'>
        <FormField
          control={control}
          name='productImage'
          render={({ field }) => (
            <FormItem className='mx-auto'>
              <FormControl>
                <div
                  {...getRootProps()}
                  className={cn(
                    'mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-10 rounded-lg border border-foreground p-2  shadow-foreground'
                  )}
                >
                  {preview ? (
                    <img
                      src={preview as string}
                      alt='Uploaded image'
                      className='max-h-[300px] rounded-lg'
                    />
                  ) : (
                    field.value &&
                    typeof field.value === 'string' && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_STORAGE_PRODUCT}/${field.value}`}
                        alt='Uploaded images'
                        className='max-h-[300px] rounded-lg'
                      />
                    )
                  )}

                  <ImagePlus
                    className={`size-30 text-gray-500 ${
                      preview || field.value ? 'hidden' : 'block'
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
              {preview && (
                <Button
                  onClick={() => setPreview(null)}
                  type='button'
                  variant={'destructive'}
                >
                  <ImageOff></ImageOff>
                  Remove
                </Button>
              )}

              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 5MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ProductUpload;
