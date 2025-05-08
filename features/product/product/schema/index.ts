import { z } from "zod";

export const formSchema = z.object({
    productImage: z
        .union([
            z.instanceof(File).refine((file) => file.size !== 0, {
                message: 'Please upload a valid image',
            }),
            z.string().min(1, { message: 'Image must not be empty' }),
        ])
        .optional(),
    productName: z.string().min(2, {
        message: 'Product name must be at least 2 characters.',
    }),
    barcode: z.string({
        required_error: 'SKU Barcode is Required',
    }),
    barcodeSymbology: z.string({
        required_error: 'Barcode Symbology is Required',
    }),
    productCategory: z.string({
        required_error: 'Product Category is Required',
    }),
    brand: z.string({
        required_error: 'Brand is Required',
    }),
    orderTax: z.number().int().min(0).max(100),
    taxType: z.string(),
    description: z.string().min(2, {
        message: 'Description must be at least 5 characters.',
    }),
    productType: z.string({
        required_error: 'Product Type is Required',
    }),
    productCost: z.coerce.number({
        required_error: 'Product Cost is Required',
    }),
    productPrice: z.coerce.number({
        required_error: 'Product Price is Required',
    }),
    productUnit: z.string({
        required_error: 'Product Unit   is Required',
    }),
    saleUnit: z.string({
        required_error: 'Sale Unit is Required',
    }),
    purchaseUnit: z.string({
        required_error: 'Purchase Unit is Required',
    }),
    stockAlert: z.coerce.number({
        required_error: 'Stock Alert is Required',
    }),
    warrantyPeriod: z.number({
        required_error: 'Warranty Period is Required',
    }),
    paymentType: z.string({
        required_error: 'Payment Type is Required',
    }),
    warrantyTerms: z.string().min(5, {
        message: 'Warranty Terms must be at least 5 characters.',
    }),
    openingStock: z.coerce.number().optional(),
    isGuarantee: z.boolean().default(false).optional(),
});