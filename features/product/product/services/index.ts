import { api } from "@/lib/api";
import { ApiResponse } from "@/types/products";
import { Product } from "../types";



export const getAllProduct = async (): Promise<Product[]> => {
    try {
        const { data } = await api.get<Product[]>("/product");
        return data;
    } catch (err: any) {
        throw err;
    }

};


export const createProduct = async (
    data: FormData
): Promise<ApiResponse<Product>> => {
    try {
        const response = await api.post<ApiResponse<Product>>("/product", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};


export const modifyProduct = async (
    data: FormData,
): Promise<ApiResponse<Product>> => {  
    try {
        const response = await api.put<ApiResponse<Product>>(`/product`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error: any) {  
        throw error.response?.data || error.message;
    }
};


export const removeProduct = async (id: number): Promise<ApiResponse<void>> => {
    try {
        const response = await api.delete<ApiResponse<void>>(`/product/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};