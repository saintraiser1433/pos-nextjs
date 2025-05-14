import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../services";


export const useProductQueries = () => {

    const fetchProduct = useQuery({
        queryKey: ['product'],
        queryFn: getAllProduct,
        retry: 1,
    });

    return {
        fetchProduct,
    };
};