import { motion } from "framer-motion";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import styles from "../index.module.scss";

const EmptyState = () => {
    const show = useTimeoutAnimationLoader();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={styles["empty-state"]}
        >
            <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: show ? 1 : 0, y: show ? 0 : 5 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                Нет клиентов
            </motion.p>
        </motion.div>
    );
};

export default EmptyState;