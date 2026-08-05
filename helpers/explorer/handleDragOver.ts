import { Dispatch, SetStateAction } from "react";

export const handleDragOver = (e: React.DragEvent, setDragOver: Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault();
    setDragOver(true);
};