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

export type PartialProductBrand = Omit<ProductBrand, 'createdAt'> & Partial<Pick<ProductBrand, 'id'>>
