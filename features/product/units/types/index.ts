export type ProductUnit = {
    id: number,
    createdAt: Date,
    name: string;
    shortName: string;
    baseUnit: string;
    status?: boolean
}

export type PartialProductUnit = Omit<ProductUnit, 'createdAt'> & Partial<Pick<ProductUnit, 'id'>>
