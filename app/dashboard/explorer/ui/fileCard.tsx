import { motion } from "framer-motion";
import styles from "../index.module.scss";
import CloseIcon from "@/public/global/close";
import DownloadIcon from "@/public/global/download";
import FileIcon from "@/public/global/file";
import { FileCardProps } from "@/types/explorer/fileCardProps.type";
import UserProtected from "@/app/components/share/protected";

const FileCard = ({ file, onDownload, onDelete }: FileCardProps) => {

    const formatSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    };

    const formatDate = (date: Date): string => {
        return new Date(date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <motion.div
            className={styles["file-card"]}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
        >
            <div className={styles["file-card__icon"]}>
                <span>
                    <FileIcon />
                </span>
            </div>

            <div className={styles["file-card__info"]}>
                <div className={styles["file-card__name"]}>
                    <span>{file.filename}</span>
                </div>
                <div className={styles["file-card__meta"]}>
                    <span>{formatSize(file.size)}</span>
                    <span>•</span>
                    <span>{file.contentType}</span>
                    <span>•</span>
                    <span>{formatDate(file.createdAt)}</span>
                </div>
            </div>
            <UserProtected roles={["manager", "director"]}>
                <div className={styles["file-card__actions"]}>
                    <button
                        onClick={() => onDownload(file._id)}
                        className={styles["file-card__download"]}
                        title="Скачать"
                    >
                        <DownloadIcon />
                    </button>
                    <button
                        onClick={() => onDelete(file._id)}
                        className={styles["file-card__delete"]}
                        title="Удалить"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </UserProtected>
        </motion.div>
    );
};

export default FileCard;