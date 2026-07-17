'use client';
import { motion } from "framer-motion";
import styles from "../index.module.scss";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import UserProtected from "@/app/components/share/protected";

interface AddFileButtonProps {
    onClick: () => void;
}

const AddFileButton = ({ onClick }: AddFileButtonProps) => {
    const show = useTimeoutAnimationLoader();

    return (
        <UserProtected roles={["moderator", "director"]}>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={styles["add-file"]}
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className={styles["add-file__btn"]}
                    onClick={onClick}
                >
                    + Загрузить файл
                </motion.button>
            </motion.div>
        </UserProtected>
    );
};

export default AddFileButton;