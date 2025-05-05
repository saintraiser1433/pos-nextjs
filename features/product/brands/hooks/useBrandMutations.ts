import { QueryClient, useMutation } from "@tanstack/react-query";
import { ApiResponse } from "@/types/products";
import { useToast } from "@/hooks/useToast";
import { ProductBrand } from "../types";
import { insertBrand, removeBrand, updateBrand } from "../services";


type MutationProps = {
    queryClient: QueryClient
}

export const useBrandMutations = ({ queryClient }: MutationProps) => {
    const toast = useToast();

    const deleteProductBrand = useMutation({
        mutationFn: removeBrand,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['brand'] });
            const previousBrand = queryClient.getQueryData(['brand']);
            queryClient.setQueryData<ProductBrand[]>(['brand'], (old) =>
                old?.filter((item) => item.id !== id)
            );
            return { previousBrand };
        },
        onError: (error, _, context) => {
            if (context?.previousBrand) {
                queryClient.setQueryData(['brand'], context.previousBrand);
            }
            toast('error', error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['brand'] });
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
    });

    const insertProductBrand = useMutation<
        ApiResponse<ProductBrand>,
        Error,
        FormData
    >({
        mutationFn: insertBrand,
        onError: (error, _, context) => {
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['brand'] });
        },
    });

    const updateProductBrand = useMutation<
        ApiResponse<ProductBrand>,
        Error,
        FormData
    >({
        mutationFn: updateBrand,

        onError: (error, _, context) => {
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['brand'] });
        },
    });

    return {
        deleteProductBrand,
        insertProductBrand,
        updateProductBrand
    };
}

