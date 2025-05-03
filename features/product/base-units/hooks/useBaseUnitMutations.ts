import { QueryClient, useMutation } from "@tanstack/react-query";

import { ApiResponse } from "@/types/products";
import { useToast } from "@/hooks/useToast";
import { addBaseUnits, deleteBaseUnits, modifyBaseUnit } from "../services";
import { ProductBaseUnit } from "../types";



type MutationProps = {
    queryClient: QueryClient
}

export const useBaseUnitMutations = ({ queryClient }: MutationProps) => {
    const toast = useToast();

    const deleteBaseUnit = useMutation({
        mutationFn: deleteBaseUnits,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['base-unit'] });
            const previousUnit = queryClient.getQueryData(['base-unit']);
            queryClient.setQueryData<ProductBaseUnit[]>(['base-unit'], (old) =>
                old?.filter((item) => item.id !== id)
            );

            return { previousUnit };
        },
        onError: (error, _, context) => {
            if (context?.previousUnit) {
                queryClient.setQueryData(['base-unit'], context.previousUnit);
            }
            toast('error', error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['base-unit'] });
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
    });



    const insertBaseUnit = useMutation<
        ApiResponse<ProductBaseUnit>,
        Error,
        Pick<ProductBaseUnit, "name">,
        {
            previousUnit?: Pick<ProductBaseUnit, "name">[];
        }
    >({
        mutationFn: addBaseUnits,
        onMutate: async (newUnit) => {
            await queryClient.cancelQueries({ queryKey: ['base-unit'] });
            const previousUnit = queryClient.getQueryData<
                Pick<ProductBaseUnit, "name">[]
            >(['base-unit']);
            queryClient.setQueryData<Pick<ProductBaseUnit, "name">[]>(
                ['base-unit'],
                (old = []) => [newUnit, ...old]
            );
            return { previousUnit };
        },
        onError: (error, _, context) => {
            if (context?.previousUnit) {
                queryClient.setQueryData(['base-unit'], context.previousUnit);
            }
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['base-unit'] });
        },
    });


    const updateBaseUnit = useMutation<
        ApiResponse<ProductBaseUnit>,
        Error,
        Omit<ProductBaseUnit, 'createdAt'>,
        {
            previousUnit?: ProductBaseUnit;
            newUnit: Omit<ProductBaseUnit, 'createdAt'>;
        }
    >({
        mutationFn: modifyBaseUnit,
        onMutate: async (newUnit) => {
            await queryClient.cancelQueries({
                queryKey: ['base-unit', newUnit.id],
            });

            const previousUnit = queryClient.getQueryData<ProductBaseUnit>([
                'base-unit',
                newUnit.id,
            ]);

            queryClient.setQueryData<ProductBaseUnit[]>(['base-unit'], (old) =>
                old?.map((cat) =>
                    cat.id === newUnit.id ? { ...cat, ...newUnit } : cat
                )
            );

            return { previousUnit, newUnit };
        },
        onError: (error, _, context) => {
            if (context?.previousUnit) {
                queryClient.setQueryData(
                    ['base-unit', context.newUnit.id],
                    context.previousUnit
                );
            }
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['base-unit'] });
        },
    });



    return {
        deleteBaseUnit,
        insertBaseUnit,
        updateBaseUnit
    }

}

