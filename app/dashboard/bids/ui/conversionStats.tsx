import { motion } from "framer-motion";
import { ConversionStatsProps } from "@/types/bids/coversionStats.type";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import { itemVariants__conversionStats as itemVariants } from "@/configs/bids/bids.cnf";
import { generateStatsData } from "@/helpers/bids/generateStatsData";
import styles from "../index.module.scss";

const ConversionStats = ({ bids }: ConversionStatsProps) => {
  const show = useTimeoutAnimationLoader();
  const stats = generateStatsData(bids);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={styles["conversion-stats"]}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.06,
              delayChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        className={styles["stats-grid"]}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            className={styles["stat-item"]}
          >
            <span className={styles["stat-label"]}>{stat.label}</span>
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: show ? 1 : 0.5, opacity: show ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.04 }}
              className={styles["stat-value"]}
            >
              {stat.value}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ConversionStats;