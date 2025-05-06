import { useDropzone } from "react-dropzone";

export const useOnDrop = (onDrop: (files: File[],) => void, maxFiles: number = 1, maxSize: number = 5000000) => {
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles,
            maxSize,
            accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
        });

    return {
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
    };
}
