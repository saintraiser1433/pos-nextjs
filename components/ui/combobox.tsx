'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormSetValue,
  Path,
} from 'react-hook-form';
import { ComboBoxItemProps } from '@/types';

type ItemsProps<TField extends FieldValues> = {
  items: ComboBoxItemProps[];
  placeholder?: string;
  columnField: Path<TField>; // This must match field.name
  field: ControllerRenderProps<TField, Path<TField>>;
  setBaseUnitId?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setValue: UseFormSetValue<TField>;
};



export function ComboBox<TField extends FieldValues>({
  items,
  placeholder = 'Select items...',
  setBaseUnitId,
  setValue,
  columnField,
  field,
}: ItemsProps<TField>) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='justify-between max-w-full'
        >
          {field.value
            ? items.find((items) => items.value === field.value.toString())?.label
            : placeholder}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-(--radix-popover-trigger-width)'>
        <Command>
          <CommandInput placeholder='Search items...' className='h-9 w-full' />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items.map((items) => (
                <CommandItem
                  key={items.value}
                  value={items.value}
                  onSelect={(currentValue) => {
                    setValue(columnField, currentValue as any);
                    setOpen(false);
                    setBaseUnitId?.(parseInt(currentValue));
                  }}
                >
                  {items.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      field.value === items.value
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
  );
}
