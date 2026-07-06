import { IFileCard } from "./fileCard.type";

export interface FileCardProps {
    file: IFileCard;
    onDownload: (id: string) => void;
    onDelete: (id: string) => void;
}