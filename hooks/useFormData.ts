import { useCallback } from 'react';

export function useFormData() {
    const createFormData = useCallback((data: Record<string, any>): FormData => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value == null) return;

            if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, String(value));
            }
        });

        return formData;
    }, []);

    return { createFormData };
}
