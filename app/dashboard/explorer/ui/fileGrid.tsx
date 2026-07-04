import { motion } from "framer-motion";
import FileCard from "./fileCard";
import styles from "../index.module.scss";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import { IFileCard } from "../page";

interface FileGridProps {
    files: IFileCard[];
    onDownload: (id: string) => void;
    onDelete: (id: string) => void;
}

const FileGrid = ({ files, onDownload, onDelete }: FileGridProps) => {
    const show = useTimeoutAnimationLoader();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.35, ease: "easeOut" },
        },
    } as const;

    if (files.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: show ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className={styles["files__empty"]}
            >
                <p>Нет загруженных файлов</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            key={files.length}
            variants={containerVariants}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            className={styles["files__grid"]}
        >
            {files.map((file) => (
                <motion.div key={file._id} variants={cardVariants}>
                    <FileCard
                        file={file}
                        onDownload={onDownload}
                        onDelete={onDelete}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default FileGrid;