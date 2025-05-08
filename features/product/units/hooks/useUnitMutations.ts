import { QueryClient, useMutation } from "@tanstack/react-query";

import { ApiResponse } from "@/types/products";
import { useToast } from "@/hooks/useToast";
import { addUnits, deleteUnits, modifyUnit } from "../services";
import { ProductUnit } from "../types";


type MutationProps = {
    queryClient: QueryClient
}

export const useUnitMutations = ({ queryClient }: MutationProps) => {
    const toast = useToast();

    const deleteUnit = useMutation({
        mutationFn: deleteUnits,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['unit'] });
            const previousUnit = queryClient.getQueryData(['unit']);
            queryClient.setQueryData<ProductUnit[]>(['unit'], (old) =>
                old?.filter((item) => item.id !== id)
            );

            return { previousUnit };
        },
        onError: (error, _, context) => {
            if (context?.previousUnit) {
                queryClient.setQueryData(['unit'], context.previousUnit);
            }
            toast('error', error.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['unit'] });
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
    });



    const insertUnit = useMutation<
        ApiResponse<ProductUnit>,
        Error,
        Pick<ProductUnit, "name" | "shortName" | "baseUnitId">,
        {
            previousUnit?: Pick<ProductUnit, "name" | "shortName" | "baseUnitId">[];
        }
    >({
        mutationFn: addUnits,
        onMutate: async (newUnit) => {
            await queryClient.cancelQueries({ queryKey: ['unit'] });
            const previousUnit = queryClient.getQueryData<
                Pick<ProductUnit, "name" | "shortName" | "baseUnitId">[]
            >(['unit']);
            queryClient.setQueryData<Pick<ProductUnit, "name" | "shortName" | "baseUnitId">[]>(
                ['unit'],
                (old = []) => [newUnit, ...old]
            );
            return { previousUnit };
        },
        onError: (error, _, context) => {
            if (context?.previousUnit) {
                queryClient.setQueryData(['unit'], context.previousUnit);
            }
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['unit'] });
        },
    });


    const updateUnit = useMutation<
        ApiResponse<ProductUnit>,
        Error,
        Omit<ProductUnit, 'createdAt'>,
        {
            previousUnit?: ProductUnit;
            newUnit: Omit<ProductUnit, 'createdAt'>;
        }
    >({
        mutationFn: modifyUnit,
        onMutate: async (newUnit) => {
            await queryClient.cancelQueries({
                queryKey: ['unit', newUnit.id],
            });

            const previousUnit = queryClient.getQueryData<ProductUnit>([
                'unit',
                newUnit.id,
            ]);

            queryClient.setQueryData<ProductUnit[]>(['unit'], (old) =>
                old?.map((cat) =>
                    cat.id === newUnit.id ? { ...cat, ...newUnit } : cat
                )
            );

            return { previousUnit, newUnit };
        },
        onError: (error, _, context) => {
            if (context?.previousUnit) {
                queryClient.setQueryData(
                    ['unit', context.newUnit.id],
                    context.previousUnit
                );
            }
            toast('error', error.message)
        },
        onSuccess: (response) => {
            toast('success', response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['unit'] });
        },
    });



    return {
        deleteUnit,
        insertUnit,
        updateUnit
    }

}

