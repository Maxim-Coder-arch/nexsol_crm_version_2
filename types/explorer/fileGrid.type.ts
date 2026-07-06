import { IFileCard } from "./fileCard.type";

export interface FileGridProps {
    files: IFileCard[];
    onDownload: (id: string) => void;
    onDelete: (id: string) => void;
}