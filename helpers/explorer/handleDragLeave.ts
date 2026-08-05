import { Dispatch, SetStateAction } from "react";

export const handleDragLeave = (e: React.DragEvent, setDragOver: Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault();
    setDragOver(false);
};