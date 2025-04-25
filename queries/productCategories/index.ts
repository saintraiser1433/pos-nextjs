import { api } from "@/lib/api";
import { ApiResponse } from "@/types/products";
import { ProductCategory } from "@/types/products/categories";

import { toast } from "react-toastify";
export const getCategories = async (): Promise<ProductCategory[]> => {
    try {
        const { data } = await api.get<ProductCategory[]>("/product/category");
        return data;
    } catch (err: any) {
        throw err;
    }

};


export const insertCategories = async (data: Pick<ProductCategory, "name" | "status">) => {
    await api.post<ApiResponse<ProductCategory>>("/product/category", data).then(function (response) {
        return toast.success(response.data.message)
    }).catch(function (error) {
        return toast.error(error);
    });
}

export const updateCategories = async (data: Pick<ProductCategory, "name" | "status">, id: number) => {
    await api.post<ApiResponse<ProductCategory>>(`/product/category`, data).then(function (response) {
        return toast.success(response.data.message)
    }).catch(function (error) {
        throw error;
    });
}

export const deleteCategories = async (id: number) => {
    await api.delete<ApiResponse<ProductCategory>>(`/product/category/${id}`).then(function (response) {
        return toast.success(response.data.message)
    }).catch(function (error) {
        throw error;
    });
}