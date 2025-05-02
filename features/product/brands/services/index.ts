import { api } from "@/lib/api";
import { ApiResponse } from "@/types/products";
import { ProductBrand } from "../types";


export const getBrand = async (): Promise<ProductBrand[]> => {
    try {
        const { data } = await api.get<ProductBrand[]>("/product/brand");
        return data;
    } catch (err: any) {
        throw err;
    }

};


export const insertBrand = async (
    data: Pick<ProductBrand, "name" | "status">
): Promise<ApiResponse<ProductBrand>> => {  // Explicit return type
    try {
        const response = await api.post<ApiResponse<ProductBrand>>("/product/brand", data);
        return response.data;
    } catch (error: any) {      
        throw error.response?.data || error.message;
    }
};


export const updateBrand = async (
    data: Pick<ProductBrand, "id" | "name" | "status">,
): Promise<ApiResponse<ProductBrand>> => {  // Explicit return type
    try {
        const response = await api.put<ApiResponse<ProductBrand>>(`/product/brand`, data);
        return response.data;
    } catch (error: any) {  // Type assertion for error
        throw error.response?.data || error.message;
    }
};


export const removeBrand = async (id: number): Promise<ApiResponse<void>> => {
    try {
        const response = await api.delete<ApiResponse<void>>(`/product/brand/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};