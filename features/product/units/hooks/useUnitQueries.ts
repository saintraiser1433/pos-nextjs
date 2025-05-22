import { useQuery } from "@tanstack/react-query";
import { getUnits, getUnitsById } from "../services";


export const useUnitQueries = () => {

    const getAllUnit = useQuery({
        queryKey: ['unit'],
        queryFn: getUnits,
    });

    const getUnitByBaseUnit = (baseUnitId: number) => useQuery({
        queryKey: ['baseUnit', { baseUnitId }],
        queryFn: getUnitsById,
        enabled: !!baseUnitId,
    });






    return {
        getAllUnit,
        getUnitByBaseUnit
    }

}
