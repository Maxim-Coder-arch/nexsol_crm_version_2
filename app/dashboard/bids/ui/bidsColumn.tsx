import { motion } from "framer-motion";
import BidCard from "./bidCard";
import styles from "../index.module.scss";
import { BidsColumnProps } from "@/types/bids/bidsColumn.type";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const BidsColumn = ({ title, type, bids, onStatusChange, onDelete }: BidsColumnProps) => {
  const show = useTimeoutAnimationLoader();
  const columnBids = bids.filter(bid => bid.status === type);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
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
      className={styles["root-bids__column"]}
    >
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
        transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
      >
        {title}
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: show ? 1 : 0.5, opacity: show ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={styles["column-count"]}
        >
          {columnBids.length}
        </motion.span>
      </motion.h2>

      <motion.div
        key={bids.length}
        variants={containerVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        className={styles["root-bids__column__bids"]}
      >
        {columnBids.map((bid) => (
          <motion.div
            key={bid._id}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.15 }
            }}
          >
            <BidCard
              bid={bid}
              onStatusChange={(newStatus) => onStatusChange(bid._id, newStatus)}
              onDelete={() => onDelete(bid._id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BidsColumn;