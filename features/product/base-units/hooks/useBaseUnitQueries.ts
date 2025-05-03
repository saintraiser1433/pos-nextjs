import { useQuery } from "@tanstack/react-query";
import { getBaseUnits } from "../services";



export const useBaseUnitQueries = () => {

    const getAllBaseUnit = useQuery({
        queryKey: ['base-unit'],
        queryFn: getBaseUnits,
        retry: 1,
    });




    return {
        getAllBaseUnit
    }

}
