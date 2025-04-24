import { ProductCategory } from "@/types/products/categories";
import { api } from "./api";
import { toast } from "react-toastify";
export const getCategories = async (): Promise<ProductCategory[]> => {
    try {
        const { data } = await api.get<ProductCategory[]>("/product/category");
        return data;
    } catch (err: any) {
        toast.error(err.message);
        throw err;
    }

};