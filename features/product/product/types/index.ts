import { ProductCategory } from "@/types/products/categories";
import { ProductBaseUnit } from "../../base-units/types";
import { ProductUnit } from "../../units/types";
import { UseFormSetValue } from "react-hook-form";

export type ProductBrand = {
  id: number,
  createdAt: Date,
  name: string;
  description: string;
  brandImage?: string;
  status?: boolean
}

export type BrandFormProps = {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  brand: PartialProductBrand;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export type ProductFormProps = {
  categories: ProductCategory[] | undefined;
  brand: ProductBrand[] | undefined;
  baseUnit: ProductBaseUnit[] | undefined;
  unit: ProductUnit[] | undefined;
  baseUnitId: number | undefined;
  setBaseUnitId: React.Dispatch<React.SetStateAction<number | undefined>>;
};


export type SetValueProps = {
  setValue: UseFormSetValue<any>
}

export type ImageDropProps = {
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  onDrop: (acceptedFiles: File[]) => void;
}

export type PartialProductBrand = Omit<ProductBrand, 'createdAt'> & Partial<Pick<ProductBrand, 'id'>>
