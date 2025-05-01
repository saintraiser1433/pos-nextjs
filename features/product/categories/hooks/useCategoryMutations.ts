import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteCategories, insertCategories, updateCategories } from "../services";
import { ProductCategory } from "../types";
import { Bounce, toast } from "react-toastify";
import { ApiResponse } from "@/types/products";
import { CustomNotification } from "@/components/ui/custom-notification";
import { useToast } from "@/hooks/useToast";

type MutationProps = {
    queryClient: QueryClient
}

export const useCategoryMutations = ({ queryClient }: MutationProps) => {
    const [toastHook] = useToast();

    const deleteCategory = () => {
        return useMutation({
            mutationFn: deleteCategories,
            onMutate: async (id) => {
                await queryClient.cancelQueries({ queryKey: ['categories'] });
                const previousCategories = queryClient.getQueryData(['categories']);
                queryClient.setQueryData<ProductCategory[]>(['categories'], (old) =>
                    old?.filter((item) => item.id !== id)
                );

                return { previousCategories };
            },
            onError: (error, _, context) => {
                if (context?.previousCategories) {
                    queryClient.setQueryData(['categories'], context.previousCategories);
                }
                toastHook('error', error.message)
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ['categories'] });
            },
            onSuccess: (response) => {
                toastHook('success', response.message)
            },
        });
    }


    const insertCategory = () => {
        return useMutation<
            ApiResponse<ProductCategory>,
            Error,
            Pick<ProductCategory, 'name' | 'status'>,
            {
                previousCategories?: Pick<ProductCategory, 'name' | 'status'>[];
            }
        >({
            mutationFn: insertCategories,
            onMutate: async (newCategory) => {
                await queryClient.cancelQueries({ queryKey: ['categories'] });
                const previousCategories = queryClient.getQueryData<
                    Pick<ProductCategory, 'name' | 'status'>[]
                >(['categories']);
                queryClient.setQueryData<Pick<ProductCategory, 'name' | 'status'>[]>(
                    ['categories'],
                    (old = []) => [newCategory, ...old]
                );
                return { previousCategories };
            },
            onError: (error, _, context) => {
                if (context?.previousCategories) {
                    queryClient.setQueryData(['categories'], context.previousCategories);
                }
                toastHook('error', error.message)
            },
            onSuccess: (response) => {
                toastHook('success', response.message)
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ['categories'] });
            },
        });
    }

    const updateCategory = () => {
        return useMutation<
            ApiResponse<ProductCategory>,
            Error,
            Pick<ProductCategory, 'id' | 'name' | 'status'>,
            {
                previousCategory?: ProductCategory;
                newCategory: Omit<ProductCategory, 'createdAt'>;
            }
        >({
            mutationFn: updateCategories,
            onMutate: async (newCategory) => {
                await queryClient.cancelQueries({
                    queryKey: ['categories', newCategory.id],
                });

                const previousCategory = queryClient.getQueryData<ProductCategory>([
                    'categories',
                    newCategory.id,
                ]);

                queryClient.setQueryData<ProductCategory[]>(['categories'], (old) =>
                    old?.map((cat) =>
                        cat.id === newCategory.id ? { ...cat, ...newCategory } : cat
                    )
                );

                return { previousCategory, newCategory };
            },
            onError: (error, _, context) => {
                if (context?.previousCategory) {
                    queryClient.setQueryData(
                        ['categories', context.newCategory.id],
                        context.previousCategory
                    );
                }
                toastHook('error', error.message)
            },
            onSuccess: (response) => {
                toastHook('success', response.message)
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ['categories'] });
            },
        });
    }


    return {
        deleteCategory,
        insertCategory,
        updateCategory
    }

}

