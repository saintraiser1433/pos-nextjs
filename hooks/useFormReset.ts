// hooks/useFormReset.ts
import { UseFormReset } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

export const useFormReset = <T extends {}>(
    reset: UseFormReset<T>,
    defaultValues: T,
    setPreview?: Dispatch<SetStateAction<string | ArrayBuffer | null>>,
    setIsUpdate?: Dispatch<SetStateAction<boolean>>,
    setOpen?: Dispatch<SetStateAction<boolean>>
) => {
    const resetForm = (isOpen: boolean) => {
        reset(defaultValues);
        setPreview?.(null);
        setIsUpdate?.(false);
        setOpen?.(isOpen);
    };

    return { resetForm };
};