import { motion } from "framer-motion";
import styles from "../index.module.scss";
import { IFileCard } from "../page";

interface FileCardProps {
    file: IFileCard;
    onDownload: (id: string) => void;
    onDelete: (id: string) => void;
}

const FileCard = ({ file, onDownload, onDelete }: FileCardProps) => {
    const getFileIcon = (contentType: string): string => {
        const type = contentType.toLowerCase();
        if (type === 'pdf') return '📄';
        if (type === 'doc' || type === 'docx') return '📝';
        if (type === 'xls' || type === 'xlsx' || type === 'csv') return '📊';
        if (type === 'ppt' || type === 'pptx') return '📽️';
        if (type === 'jpg' || type === 'jpeg' || type === 'png' || type === 'gif' || type === 'svg') return '🖼️';
        if (type === 'mp4' || type === 'avi' || type === 'mov') return '🎬';
        if (type === 'mp3' || type === 'wav' || type === 'flac') return '🎵';
        if (type === 'zip' || type === 'rar' || type === '7z') return '📦';
        if (type === 'txt') return '📃';
        if (type === 'js' || type === 'ts' || type === 'py' || type === 'java' || type === 'html' || type === 'css') return '⚙️';
        return '📎';
    };

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
                <span>{getFileIcon(file.contentType)}</span>
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

            <div className={styles["file-card__actions"]}>
                <button
                    onClick={() => onDownload(file._id)}
                    className={styles["file-card__download"]}
                    title="Скачать"
                >
                    ⬇️
                </button>
                <button
                    onClick={() => onDelete(file._id)}
                    className={styles["file-card__delete"]}
                    title="Удалить"
                >
                    ✕
                </button>
            </div>
        </motion.div>
    );
};

export default FileCard;