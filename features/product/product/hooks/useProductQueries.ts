import { useQuery } from "@tanstack/react-query";
import { getAllProduct, getProductById } from "../services";


export const useProductQueries = () => {

    const fetchProduct = useQuery({
        queryKey: ['product'],
        queryFn: getAllProduct,
    });

    const fetchProductById = (productId: number) => useQuery({
        queryKey: ['IProduct', productId],
        queryFn: () => getProductById(productId),
        staleTime: 0
    });

    return {
        fetchProduct,
        fetchProductById
    };
};