import { QueryClient, useMutation } from "@tanstack/react-query";
import { ProductVariant } from "../types";
import { ApiResponse } from "@/types/products";
import { useToast } from "@/hooks/useToast";
import { addVariants, deleteVariants, modifyVariant } from "../services";

type MutationProps = {
    queryClient: QueryClient
}

export const useVariantMutations = ({ queryClient }: MutationProps) => {
    const toast = useToast();

    const deleteVariant = useMutation({
        mutationFn: deleteVariants,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['variant'] });
            const previousVariant = queryClient.getQueryData(['variant']);
            queryClient.setQueryData<ProductVariant[]>(['variant'], (old) =>
                old?.filter((item) => item.id !== id)
            );

            return { previousVariant };
        },
        onError: (error, _, context) => {
            if (context?.previousVariant) {
                queryClient.setQueryData(['variant'], context.previousVariant);
            }
            toast('error', error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['variant'] });
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
    });



    const insertVariant = useMutation<
        ApiResponse<ProductVariant>,
        Error,
        Pick<ProductVariant, 'name' | 'type' | 'status'>,
        {
            previousVariant?: Pick<ProductVariant, 'name' | 'status'>[];
        }
    >({
        mutationFn: addVariants,
        onMutate: async (newVariant) => {
            await queryClient.cancelQueries({ queryKey: ['variant'] });
            const previousVariant = queryClient.getQueryData<
                Pick<ProductVariant, 'name' | 'type' | 'status'>[]
            >(['variant']);
            queryClient.setQueryData<Pick<ProductVariant, 'name' | 'type' | 'status'>[]>(
                ['variant'],
                (old = []) => [newVariant, ...old]
            );
            return { previousVariant };
        },
        onError: (error, _, context) => {
            if (context?.previousVariant) {
                queryClient.setQueryData(['variant'], context.previousVariant);
            }
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['variant'] });
        },
    });


    const updateVariant = useMutation<
        ApiResponse<ProductVariant>,
        Error,
        Omit<ProductVariant, 'createdAt'>,
        {
            previousVariant?: ProductVariant;
            newVariant: Omit<ProductVariant, 'createdAt'>;
        }
    >({
        mutationFn: modifyVariant,
        onMutate: async (newVariant) => {
            await queryClient.cancelQueries({
                queryKey: ['variant', newVariant.id],
            });

            const previousVariant = queryClient.getQueryData<ProductVariant>([
                'variant',
                newVariant.id,
            ]);

            queryClient.setQueryData<ProductVariant[]>(['variant'], (old) =>
                old?.map((cat) =>
                    cat.id === newVariant.id ? { ...cat, ...newVariant } : cat
                )
            );

            return { previousVariant, newVariant };
        },
        onError: (error, _, context) => {
            if (context?.previousVariant) {
                queryClient.setQueryData(
                    ['variant', context.newVariant.id],
                    context.previousVariant
                );
            }
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['variant'] });
        },
    });



    return {
        deleteVariant,
        insertVariant,
        updateVariant
    }

}

