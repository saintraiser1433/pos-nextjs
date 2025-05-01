export type ProductCategory = {
    id: number,
    createdAt: Date,
    name: string;
    status?: boolean
}

export type PartialProductCategory = Omit<ProductCategory, 'createdAt'> & Partial<Pick<ProductCategory, 'id'>>
