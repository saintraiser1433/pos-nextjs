"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Box, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useBaseUnitMutations } from "../hooks/useBaseUnitMutations";
import { PartialProductBaseUnit } from "../types";
import { DEFAULT_FORM_PRODUCT_BASE_UNITS } from "../constants";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Product Base Unit is required",
  }),
});

type DialogProps = {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  baseUnit: PartialProductBaseUnit;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const BaseUnitForm = ({
  isUpdate,
  baseUnit,
  setOpen,
  open,
  setIsUpdate,
}: DialogProps) => {
  const queryClient = useQueryClient();
  const { insertBaseUnit, updateBaseUnit } = useBaseUnitMutations({
    queryClient,
  });

  const { mutateAsync: add, isPending: addIsPending } = insertBaseUnit;
  const { mutateAsync: update, isPending: updateIsPending } = updateBaseUnit;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: baseUnit.name,
      
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isUpdate) {
      await update({ ...data, id: baseUnit.id });
      resetForm(false);
    } else {
      await add(data);
      resetForm(false);
    }
  };

  const resetForm = (isOpen: boolean) => {
    form.reset(DEFAULT_FORM_PRODUCT_BASE_UNITS);
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
          variant="outline"
        >
          <Box />
          Create Unit
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product Base Unit</DialogTitle>
            <DialogDescription>Please enter Variant Type</DialogDescription>
          </DialogHeader>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Unit Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Base Unit Name" {...field} />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-3" />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setIsUpdate(false);
                    }}
                    type="button"
                    variant="secondary"
                  >
                    Close
                  </Button>
                </DialogClose>
                {addIsPending || updateIsPending ? (
                  <Button type="submit" disabled>
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit">Save Changes</Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BaseUnitForm;
