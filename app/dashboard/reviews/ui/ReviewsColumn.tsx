import { motion } from "framer-motion";
import ReviewCard from "./reviewCard";
import EmptyState from "./emptyState";
import styles from "../index.module.scss";
import { ReviewsColumnProps } from "@/types/reviews/reviewColumn.type";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const ReviewsColumn = ({
  title,
  reviews,
  type,
  onApprove,
  onDelete,
}: ReviewsColumnProps) => {
  const show = useTimeoutAnimationLoader();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`${styles["root-reviews__column"]} ${styles[`root-reviews__column--${type}`]}`}
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
        transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
        className={styles["root-reviews__column__header"]}
      >
        <h2>{title}</h2>
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: show ? 1 : 0.5, opacity: show ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {reviews.length}
        </motion.span>
      </motion.div>

      <motion.div
        key={reviews.length}
        variants={containerVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        className={styles["root-reviews__column__data"]}
      >
        {reviews.length === 0 ? (
          <EmptyState type={type} />
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review._id}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.15 },
              }}
            >
              <ReviewCard
                review={review}
                type={type}
                onApprove={onApprove}
                onDelete={onDelete}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default ReviewsColumn;