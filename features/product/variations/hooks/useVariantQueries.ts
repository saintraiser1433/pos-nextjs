import { useQuery } from "@tanstack/react-query";
import { getVariants } from "../services";



export const useVariantQueries = () => {

    const getAllVariant = useQuery({
        queryKey: ['variant'],
        queryFn: getVariants,
    });




    return {
        getAllVariant
    }

}
