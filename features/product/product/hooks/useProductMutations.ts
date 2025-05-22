import { QueryClient, useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/types/products";
import { useToast } from "@/hooks/useToast";

import { Product } from "../types";
import { createProduct, deleteProduct, modifyProduct } from "../services";
import { useRouter } from "next/navigation";


type MutationProps = {
    queryClient: QueryClient
}



export const useProductMutations = ({ queryClient }: MutationProps) => {
    const toast = useToast();
    const route = useRouter();


    const insertProduct = useMutation<
        ApiResponse<Product>,
        Error,
        FormData
    >({
        mutationFn: createProduct,
        onError: (error, _, context) => {
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
            route.replace('/product');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });
        },
    });

    const updateProduct = useMutation<
        ApiResponse<Product>,
        Error,
        FormData
    >({
        mutationFn: modifyProduct,
        onError: (error, _, context) => {
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
            route.replace('/product');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });
        },
    });

    const removeProduct = useMutation({
        mutationFn: deleteProduct,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['product'] });
            const previousProduct = queryClient.getQueryData(['product']);
            queryClient.setQueryData<Product[]>(['product'], (old) =>
                old?.filter((item) => item.id !== id)
            );
            return { previousProduct };
        },
        onError: (error, _, context) => {
            if (context?.previousProduct) {
                queryClient.setQueryData(['product'], context.previousProduct);
            }
            toast('error', error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
    });

    return {
        removeProduct,
        insertProduct,
        updateProduct
    };
}

