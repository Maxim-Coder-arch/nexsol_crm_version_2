import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

export interface AddFileFormProps {
    onAdd: (file: File, isShared: boolean) => void;
    onCancel: () => void;
    selectedFile: File | null;
    setSelectedFile: Dispatch<SetStateAction<File | null>>;
    isShared: boolean;
    setIsShared: Dispatch<SetStateAction<boolean>>;
    dragOver: boolean;
    setDragOver: Dispatch<SetStateAction<boolean>>;
    fileInputRef: RefObject<HTMLInputElement | null>;
}