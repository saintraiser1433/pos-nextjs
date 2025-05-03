import { api } from "@/lib/api";
import { ApiResponse } from "@/types/products";
import { ProductBaseUnit } from "../types";




export const getBaseUnits = async (): Promise<ProductBaseUnit[]> => {
    try {
        const { data } = await api.get<ProductBaseUnit[]>("/product/base-unit");
        return data;
    } catch (err: any) {
        throw err;
    }

};


export const addBaseUnits = async (
    data: Pick<ProductBaseUnit, "name">
): Promise<ApiResponse<ProductBaseUnit>> => {  // Explicit return type
    try {
        const response = await api.post<ApiResponse<ProductBaseUnit>>("/product/base-unit", data);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};


export const modifyBaseUnit = async (
    data: Omit<ProductBaseUnit, "createdAt">,
): Promise<ApiResponse<ProductBaseUnit>> => {
    try {
        const response = await api.put<ApiResponse<ProductBaseUnit>>(`/product/base-unit`, data);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};


export const deleteBaseUnits = async (id: number): Promise<ApiResponse<void>> => {
    try {
        const response = await api.delete<ApiResponse<void>>(`/product/base-unit/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};