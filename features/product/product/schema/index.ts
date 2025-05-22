import { z } from "zod";

export const formSchema = z.object({
    id: z.number().optional(),
    productImage: z
        .union([
            z.instanceof(File).refine((file) => file.size !== 0, {
                message: 'Please upload a valid image',
            }),
            z.string().min(1, { message: 'Image must not be empty' }),
        ])
        .optional(),
    categoryId: z.coerce.number({
        required_error: 'Product Category is Required',
    }),
    name: z.string().min(2, {
        message: 'Product name must be at least 2 characters.',
    }),
    barcode: z.string({
        required_error: 'SKU Barcode is Required',
    }),
    barcodeType: z.enum(['CODE128', 'CODE39'], {
        required_error: 'Barcode Symbology is Required',
    }),
    brandId: z.coerce.number({
        required_error: 'Brand is Required',
    }),
    orderTax: z.coerce.number().min(0).max(100),
    taxType: z.enum(['EXCLUSIVE', 'INCLUSIVE'], {
        required_error: 'Product Type is Required',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 5 characters.',
    }),
    productType: z.enum(['STANDARD', 'VARIABLE'], {
        required_error: 'Product Type is Required',
    }),
    productCost: z.coerce.number({
        required_error: 'Product Cost is Required',
        invalid_type_error: 'Product Cost is Required',
    }),
    productPrice: z.coerce.number({
        required_error: 'Product Price is Required',
        invalid_type_error: 'Product Price is Required',
    }),
    productUnitId: z.coerce.number({
        required_error: 'Product Unit is Required',
        invalid_type_error: 'Product Unit is Required',
    }),
    saleUnitId: z.coerce.number({
        required_error: 'Sale Unit is Required',
        invalid_type_error: 'Sale Unit is Required',
    }),
    purchaseUnitId: z.coerce.number({
        required_error: 'Purchase Unit is Required',
        invalid_type_error: 'Purchase Unit is Required',
    }),
    stockAlert: z.coerce.number({
        required_error: 'Stock Alert is Required',
        invalid_type_error: 'Stock Alert is Required',
    }),
    warrantyPeriod: z.coerce.number({
        required_error: 'Warranty Period is Required',
        invalid_type_error: 'Warranty Period is Required',
    }),
    warrantyPaymentType: z.enum(['DAYS', 'YEARS', 'MONTHS'], {
        required_error: 'Payment Type is Required',
    }),
    warrantyTerms: z.string().min(5, {
        message: 'Warranty Terms must be at least 5 characters.',
    }),
    // openingStock: z.coerce.number().optional(),
    isGuaranteed: z.boolean().default(false).optional(),
});