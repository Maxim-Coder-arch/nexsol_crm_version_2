import { motion } from "framer-motion";
import styles from "../index.module.scss";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

interface FileHeaderProps {
    count: number;
}

const FileHeader = ({ count }: FileHeaderProps) => {
    const show = useTimeoutAnimationLoader();

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={styles["files__header"]}
        >
            <h2>Файлы</h2>
            <span>{count} файлов</span>
        </motion.div>
    );
};

export default FileHeader;