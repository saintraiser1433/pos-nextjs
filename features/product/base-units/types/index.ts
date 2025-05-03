export type ProductBaseUnit = {
    id: number,
    createdAt: Date,
    name: string;
    status?: boolean
}

export type PartialProductBaseUnit = Omit<ProductBaseUnit, 'createdAt'> & Partial<Pick<ProductBaseUnit, 'id'>>
