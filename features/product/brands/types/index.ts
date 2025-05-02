export type ProductBrand = {
    id: number,
    createdAt: Date,
    name: string;
    status?: boolean
}

export type PartialProductBrand = Omit<ProductBrand, 'createdAt'> & Partial<Pick<ProductBrand, 'id'>>
