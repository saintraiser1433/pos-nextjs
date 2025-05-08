import { useQuery } from "@tanstack/react-query";
import { getUnits, getUnitsById } from "../services";


export const useUnitQueries = () => {

    const getAllUnit = useQuery({
        queryKey: ['unit'],
        queryFn: getUnits,
        retry: 1,
    });

    const getUnitByBaseUnit = (baseUnitId: number) => useQuery({
        queryKey: ['baseUnit', { baseUnitId }],
        queryFn: getUnitsById,
        retry: 1,
    });






    return {
        getAllUnit,
        getUnitByBaseUnit
    }

}
