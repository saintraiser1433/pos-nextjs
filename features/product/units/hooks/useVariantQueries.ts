import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../services";


export const useUnitQueries = () => {

    const getAllUnit = useQuery({
        queryKey: ['unit'],
        queryFn: getUnits,
        retry: 1,
    });




    return {
        getAllUnit
    }

}
