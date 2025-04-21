"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImageDown, ImageUp, SendHorizonal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  barcode: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  productCategory: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  barcodeSymbology: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  productUnit: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  warehouse: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  saleUnit: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  purchaseUnit: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  supplier: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  note: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  productType: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const onSubmit = (values: z.infer<typeof formSchema>) => {
  console.log(values);
};
const CreateProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
    },
  });

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-2 flex flex-col items-center gap-4">
                <div className="h-72 bg-card relative  border rounded-xl shadow-sm p-2 w-full">
                  <Image
                    className="px-2"
                    objectFit="fill"
                    objectPosition="center"
                    fill={true}
                    src="/images/no-image.png"
                    alt="Picture of the author"
                  />
                </div>
                <Button type="button" variant={"outline"}>
                  <ImageUp />
                  Upload Image
                </Button>
              </div>

              <div className="col-span-9 grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU (Barcode)</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="barcodeSymbology"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barcode Symbology</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="productUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="saleUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="purchaseUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="warehouse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Warehouse</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="productType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-8">
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={10}
                            placeholder="Type your message here."
                            id="message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex gap-2 items-center">
              <Button variant="outline" type="submit">
                <SendHorizonal />
                Submit
              </Button>
              <Link href="/product" replace>
                <Button>Back</Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProduct;
