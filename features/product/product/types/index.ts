import { ProductCategory } from "@/types/products/categories"
import { ProductUnit } from "../../units/types"
import { ProductBrand } from "../../brands/types"
import { ProductBaseUnit } from "../../base-units/types"
import { AlertContextType } from "@/types"
import { UseMutateAsyncFunction } from "@tanstack/react-query"
import { ApiResponse } from "@/types/products"

enum BarcodeType {
  CODE39 = 'CODE39',
  CODE128 = 'CODE128',
}

enum TaxType {
  EXCLUSIVE = 'EXCLUSIVE',
  INCLUSIVE = 'INCLUSIVE',
}

enum ProductType {
  STANDARD = 'STANDARD',
  VARIABLE = 'VARIABLE',
}

enum PaymentType {
  DAYS = 'DAYS',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS',
}

export type Product = {
  id: number,
  name: string,
  barcode: string,
  barcodeType: BarcodeType,
  categoryId: number,
  brandId: number,
  orderTax: number,
  taxType: TaxType,
  description: string,
  productImage?: string,
  productType: ProductType
  productCost: number,
  productPrice: number,
  productUnitId: number,
  saleUnitId: number,
  purchaseUnitId: number,
  stockAlert: number,
  warrantyPeriod: number,
  warrantyPaymentType: PaymentType,
  warrantyTerms?: string
  isGuaranteed?: boolean
  createdAt: Date
  updatedAt?: Date
  status?: boolean
}

export type ProductColumnProps = {
  openAlert: AlertContextType['openAlert'],
  deleteProduct: UseMutateAsyncFunction<ApiResponse<void>, Error, number, {
    previousProduct: unknown;
  }>
}


export type ProductFormProps = {
  categories: ProductCategory[] | undefined
  brand: ProductBrand[] | undefined
  baseUnit: ProductBaseUnit[] | undefined
  unit: ProductUnit[] | undefined
  baseUnitId: number | undefined
  setBaseUnitId: React.Dispatch<React.SetStateAction<number | undefined>>
}



export type PartialProduct = Omit<Product, 'createdAt' | 'updatedAt'> & Partial<Pick<Product, 'id'>>


