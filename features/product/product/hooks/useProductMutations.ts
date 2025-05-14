import { QueryClient, useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/types/products";
import { useToast } from "@/hooks/useToast";

import { Product } from "../types";
import { createProduct, modifyProduct, removeProduct } from "../services";
import { useRouter } from "next/navigation";


type MutationProps = {
    queryClient: QueryClient
}



export const useBrandMutations = ({ queryClient }: MutationProps) => {
    const toast = useToast();
    const route = useRouter();
    const deleteProduct = useMutation({
        mutationFn: removeProduct,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['product'] });
            const previousBrand = queryClient.getQueryData(['product']);
            queryClient.setQueryData<Product[]>(['product'], (old) =>
                old?.filter((item) => item.id !== id)
            );
            return { previousBrand };
        },
        onError: (error, _, context) => {
            if (context?.previousBrand) {
                queryClient.setQueryData(['product'], context.previousBrand);
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

    return {
        deleteProduct,
        insertProduct,
        updateProduct
    };
}

