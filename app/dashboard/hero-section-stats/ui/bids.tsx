import { motion, AnimatePresence } from "framer-motion";
import { HeroSectionUiBidsProps } from "@/types/hero-section/bidsProps";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";
import { containerVariants__bids as containerVariants } from "@/configs/hero-section/bidsAnimationVariants";
import { cardVariants__bids as cardVariants} from "@/configs/hero-section/bidsAnimationVariants";
import styles from "../index.module.scss";

const HeroSectionUiBids = ({ bids }: HeroSectionUiBidsProps) => {
  const show = useTimeoutAnimationLoader();

  if (bids.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles["root-hero-section-stats__bids"]}
      >
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          Новые заявки
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.95 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className={styles["root-hero-section-stats__bids__empty"]}
        >
          <p>Нет новых заявок</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={bids.length}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles["root-hero-section-stats__bids"]}
    >
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        Новые заявки
      </motion.h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={bids.length}
          variants={containerVariants}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className={styles["root-hero-section-stats__bids__blocks"]}
        >
          {bids.map((bid) => (
            <motion.div
              key={bid._id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className={styles["root-hero-section-stats__bids__blocks__block"]}
            >
              <div className={styles["root-hero-section-stats__bids__blocks__block__header"]}>
                <h3>{bid.name}</h3>
                <span>{bid.createdAt} ({bid.time})</span>
              </div>
              <div className={styles["root-hero-section-stats__bids__blocks__block__body"]}>
                <div className={styles["root-hero-section-stats__bids__blocks__block__body__point"]}>
                  <h4>Email</h4>
                  <a href={`mailto:${bid.email}`}>{bid.email}</a>
                </div>
                <div className={styles["root-hero-section-stats__bids__blocks__block__body__point"]}>
                  <h4>Контакт</h4>
                  <a href={bid.contact} target="_blank" rel="noopener noreferrer">{bid.contact}</a>
                </div>
                <div className={styles["root-hero-section-stats__bids__blocks__block__body__message"]}>
                  <p>{bid.message}</p>
                </div>
              </div>
              <div className={styles["root-hero-section-stats__bids__blocks__block__footer"]}>
                <h5>Статус</h5>
                <span>{bid.status === 'new' ? 'Новая' : bid.status}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default HeroSectionUiBids;