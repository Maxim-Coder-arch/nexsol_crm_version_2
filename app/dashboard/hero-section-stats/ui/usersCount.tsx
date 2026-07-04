import { motion } from "framer-motion";
import styles from "../index.module.scss";
import { HeroSectionUiUsersCountProps } from "@/types/hero-section/usersCountProps";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const HeroSectionUiUsersCount = ({ users }: HeroSectionUiUsersCountProps) => {
  const show = useTimeoutAnimationLoader();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles["root-hero-section-stats__users-count"]}
    >
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        Посещаемость сайта
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        className={styles["root-hero-section-stats__users-count__blocks"]}
      >
        {users.map((user, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={styles["root-hero-section-stats__users-count__blocks__block"]}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3>{user.label}</h3>
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: show ? 1 : 0.5, opacity: show ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05, ease: "easeOut" }}
            >
              {user.value}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSectionUiUsersCount;