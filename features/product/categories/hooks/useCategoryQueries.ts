import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services";


export const useCategoryQueries = () => {

    const getAllCategory = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        retry: 1,
    });




    return {
        getAllCategory
    }

}
