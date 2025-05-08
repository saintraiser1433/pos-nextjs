import { api } from "@/lib/api";
import { ApiResponse } from "@/types/products";
import { ProductUnit } from "../types";



export const getUnits = async (): Promise<ProductUnit[]> => {
    try {
        const { data } = await api.get<ProductUnit[]>("/product/unit");
        return data;
    } catch (err: any) {
        throw err;
    }

};


export const getUnitsById = async ({ queryKey }: { queryKey: [string, { baseUnitId: number }] }): Promise<ProductUnit[]> => {
    try {
        const [_key, { baseUnitId }] = queryKey;  
        const { data } = await api.get<ProductUnit[]>(`/product/unit`, {
            params: {
                baseUnitId
            }
        });
        return data;
    } catch (err: any) {
        throw err;
    }
};


export const addUnits = async (
    data: Pick<ProductUnit, "name" | "shortName" | "baseUnitId">
): Promise<ApiResponse<ProductUnit>> => {  // Explicit return type
    try {
        const response = await api.post<ApiResponse<ProductUnit>>("/product/unit", data);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};


export const modifyUnit = async (
    data: Omit<ProductUnit, "createdAt">,
): Promise<ApiResponse<ProductUnit>> => {
    try {
        const response = await api.put<ApiResponse<ProductUnit>>(`/product/unit`, data);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};


export const deleteUnits = async (id: number): Promise<ApiResponse<void>> => {
    try {
        const response = await api.delete<ApiResponse<void>>(`/product/unit/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error.message;
    }
};