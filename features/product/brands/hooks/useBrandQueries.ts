import { useQuery } from "@tanstack/react-query";
import { getBrand } from "../services";

export const useBrandQueries = () => {

    const getAllBrand = useQuery({
        queryKey: ['brand'],
        queryFn: getBrand,
    });

    return {
        getAllBrand, 
    };
};