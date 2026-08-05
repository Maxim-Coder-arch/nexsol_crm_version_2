import { Dispatch, SetStateAction } from "react";

export const handleDrop = (e: React.DragEvent, setDragOver: Dispatch<SetStateAction<boolean>>, setSelectedFile: Dispatch<SetStateAction<File | null>>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
        setSelectedFile(file);
    }
};