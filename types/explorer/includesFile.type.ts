import { Dispatch, RefObject, SetStateAction } from "react";
import { IFileCard } from "./fileCard.type";

export interface IncludesFilesProps {
    files: IFileCard[];
    showAddForm: boolean;
    onDownload: (id: string) => void;
    onDelete: (id: string) => void;
    onAddFile: () => void;
    onCancelAdd: () => void;
    onFileSubmit: (file: File, isShared: boolean) => void;
    selectedFile: File | null;
    setSelectedFile: Dispatch<SetStateAction<File | null>>;
    isShared: boolean;
    setIsShared: Dispatch<SetStateAction<boolean>>;
    dragOver: boolean;
    setDragOver: Dispatch<SetStateAction<boolean>>;
    fileInputRef: RefObject<HTMLInputElement | null>;
}
