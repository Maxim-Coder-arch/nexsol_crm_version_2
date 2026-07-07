'use client';
import { motion } from "framer-motion";
import { AddUserButtonProps } from '@/types/users/addUserButton.type';
import styles from '../index.module.scss';
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import UserProtected from "@/app/components/share/protected";

const AddUserButton = ({ onClick }: AddUserButtonProps) => {
    const show = useTimeoutAnimationLoader();

    return (
        <UserProtected>
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={styles["add-user"]}
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className={styles["add-user__btn"]}
                    onClick={onClick}
                >
                    + Добавить пользователя
                </motion.button>
            </motion.div>
        </UserProtected>
    );
};

export default AddUserButton;