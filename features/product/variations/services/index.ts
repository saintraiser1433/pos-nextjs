import { api } from "@/lib/api";
import { ApiResponse } from "@/types/products";
import { ProductVariant } from "../types";


export const getVariants = async (): Promise<ProductVariant[]> => {
    try {
        const { data } = await api.get<ProductVariant[]>("/product/variant");
        return data;
    } catch (err: any) {
        throw err;
    }

};


export const addVariants = async (
    data: Pick<ProductVariant, "name" | "type" | "status">
): Promise<ApiResponse<ProductVariant>> => {  // Explicit return type
    try {
        const response = await api.post<ApiResponse<ProductVariant>>("/product/variant", data);
        return response.data;
    } catch (error: any) {      
        throw error.response?.data || error.message;
    }
};


export const modifyVariant = async (
    data: Pick<ProductVariant, "id" | "name" | "type" | "status">,
): Promise<ApiResponse<ProductVariant>> => {  // Explicit return type
    try {
        const response = await api.put<ApiResponse<ProductVariant>>(`/product/variant`, data);
        return response.data;
    } catch (error: any) {  // Type assertion for error
        throw error.response?.data || error.message;
    }
};


export const deleteVariants = async (id: number): Promise<ApiResponse<void>> => {
    try {
        const response = await api.delete<ApiResponse<void>>(`/product/variant/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};