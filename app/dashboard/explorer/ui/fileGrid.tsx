import { motion } from "framer-motion";
import FileCard from "./fileCard";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import { FileGridProps } from "@/types/explorer/fileGrid.type";
import { containerVariants__FileGrid as containerVariants } from "@/configs/explorer/animationConfig.cnf";
import { cardVariants__FileGrid as cardVariants } from "@/configs/explorer/animationConfig.cnf";
import styles from "../index.module.scss";

const FileGrid = ({ files, onDownload, onDelete }: FileGridProps) => {
    const show = useTimeoutAnimationLoader();

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