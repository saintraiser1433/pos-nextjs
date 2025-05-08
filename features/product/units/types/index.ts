export type ProductUnit = {
    id: number,
    createdAt: Date,
    name: string;
    shortName: string;
    baseUnitId: number;
    operator:string;
    operationValue:number;
    status?: boolean
}

export type PartialProductUnit = Omit<ProductUnit, 'createdAt'> & Partial<Pick<ProductUnit, 'id'>>
