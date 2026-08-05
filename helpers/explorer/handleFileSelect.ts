import { Dispatch, SetStateAction } from "react";

export const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, setSelectedFile: Dispatch<SetStateAction<File | null>>) => {
    const file = e.target.files?.[0];
    if (file) {
        setSelectedFile(file);
    }
};