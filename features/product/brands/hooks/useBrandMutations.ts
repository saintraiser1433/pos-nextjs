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
        Pick<ProductBrand, 'name' | 'status'>,
        {
            previousBrand?: Pick<ProductBrand, 'name' | 'status'>[];
        }
    >({
        mutationFn: insertBrand,
        onMutate: async (newBrand) => {
            await queryClient.cancelQueries({ queryKey: ['brand'] });
            const previousBrand = queryClient.getQueryData<
                Pick<ProductBrand, 'name' | 'status'>[]
            >(['brand']);
            queryClient.setQueryData<Pick<ProductBrand, 'name' | 'status'>[]>(
                ['brand'],
                (old = []) => [newBrand, ...old]
            );
            return { previousBrand };
        },
        onError: (error, _, context) => {
            if (context?.previousBrand) {
                queryClient.setQueryData(['brand'], context.previousBrand);
            }
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
        Pick<ProductBrand, 'id' | 'name' | 'status'>,
        {
            previousBrand?: ProductBrand;
            newBrand: Omit<ProductBrand, 'createdAt'>;
        }
    >({
        mutationFn: updateBrand,
        onMutate: async (newBrand) => {
            await queryClient.cancelQueries({
                queryKey: ['brand', newBrand.id],
            });

            const previousBrand = queryClient.getQueryData<ProductBrand>([
                'brand',
                newBrand.id,
            ]);

            queryClient.setQueryData<ProductBrand[]>(['brand'], (old) =>
                old?.map((cat) =>
                    cat.id === newBrand.id ? { ...cat, ...newBrand } : cat
                )
            );

            return { previousBrand, newBrand };
        },
        onError: (error, _, context) => {
            if (context?.previousBrand) {
                queryClient.setQueryData(
                    ['brand', context.newBrand.id],
                    context.previousBrand
                );
            }
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

