import { motion } from "framer-motion";
import styles from "../index.module.scss";
import { HeroSectionUiTeamProps } from "@/types/hero-section/heroSectionUiTeam.type";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const HeroSectionUiTeam = ({ team }: HeroSectionUiTeamProps) => {
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

  const personVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  } as const;

  if (team.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles["root-hero-section-stats__team"]}
      >
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          Команда
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.95 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className={styles["root-hero-section-stats__team__empty"]}
        >
          <p>Нет данных о команде</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={team.length}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles["root-hero-section-stats__team"]}
    >
      <motion.h2
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        Команда
      </motion.h2>

      <motion.div
        key={team.length}
        variants={containerVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
        className={styles["root-hero-section-stats__team__people"]}
      >
        {team.map((person) => (
          <motion.div
            key={person._id}
            variants={personVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className={styles["root-hero-section-stats__team__people__person"]}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className={styles["root-hero-section-stats__team__people__person__avatar"]}
            >
              <span>{person.name.slice(0, 1)}</span>
            </motion.div>
            <div className={styles["root-hero-section-stats__team__people__person__meta"]}>
              <h3>{person.name}</h3>
              <div className={styles["root-hero-section-stats__team__people__person__meta__specialties"]}>
                {person.specialties.map((speciality, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.8 }}
                    transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                    className={styles["root-hero-section-stats__team__people__person__meta__specialties__speciality"]}
                  >
                    <span>{speciality}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSectionUiTeam;