// hooks/useImageDrop.ts
import { useCallback, useState } from 'react';
import { UseFormSetValue, UseFormResetField } from 'react-hook-form';

export const useImageDrop = (
    fieldName: string, 
    setValue: UseFormSetValue<any>,
    resetField: UseFormResetField<any>
) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const reader = new FileReader();
        try {
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(acceptedFiles[0]);
            setValue(fieldName, acceptedFiles[0]); 
        } catch (error) {
            setPreview(null);
            resetField(fieldName);
        }
    }, [fieldName, setValue, resetField]);

    return { preview, setPreview, onDrop };
};