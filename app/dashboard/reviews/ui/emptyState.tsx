import { motion } from "framer-motion";
import { EmptyStateProps } from "@/types/reviews/emptyState.type";
import styles from "../index.module.scss";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const EmptyState = ({ type }: EmptyStateProps) => {
  const show = useTimeoutAnimationLoader();
  const message = type === "new" ? "Нет новых отзывов" : "Нет отзывов на сайте";

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
        {message}
      </motion.p>
    </motion.div>
  );
};

export default EmptyState;