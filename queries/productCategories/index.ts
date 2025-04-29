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


export const insertCategories = async (
    data: Pick<ProductCategory, "name" | "status">
): Promise<ApiResponse<ProductCategory>> => {  // Explicit return type
    try {
        const response = await api.post<ApiResponse<ProductCategory>>("/product/category", data);
        return response.data;
    } catch (error: any) {  // Type assertion for error
        throw error.response?.data || error.message;
    }
};


export const updateCategories = async (
    data: Pick<ProductCategory, "id" | "name" | "status">,
): Promise<ApiResponse<ProductCategory>> => {  // Explicit return type
    try {
        const response = await api.put<ApiResponse<ProductCategory>>(`/product/category`, data);
        return response.data;
    } catch (error: any) {  // Type assertion for error
        throw error.response?.data || error.message;
    }
};


export const deleteCategories = async (id: number): Promise<ApiResponse<void>> => {
    try {
        const response = await api.delete<ApiResponse<void>>(`/product/category/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};