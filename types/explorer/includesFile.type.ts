import { IFileCard } from "./fileCard.type";

export interface IncludesFilesProps {
    files: IFileCard[];
    showAddForm: boolean;
    onDownload: (id: string) => void;
    onDelete: (id: string) => void;
    onAddFile: () => void;
    onCancelAdd: () => void;
    onFileSubmit: (file: File) => void;
}
