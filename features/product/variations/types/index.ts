export type ProductVariant = {
    id: number,
    createdAt: Date,
    name: string;
    type: string;
    status?: boolean
}

export type PartialProductVariant = Omit<ProductVariant, 'createdAt'> & Partial<Pick<ProductVariant, 'id'>>
