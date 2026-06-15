import styles from "../index.module.scss";
import { HeroSectionUiUsersCountProps } from "@/types/hero-section/usersCountProps";

const HeroSectionUiUsersCount = ({ users }: HeroSectionUiUsersCountProps) => {
  return (
    <div className={styles["root-hero-section-stats__users-count"]}>
      <h2>Посещаемость сайта</h2>
      <div className={styles["root-hero-section-stats__users-count__blocks"]}>
        {users.map((user, index) => (
          <div key={index} className={styles["root-hero-section-stats__users-count__blocks__block"]}>
            <h3>{user.label}</h3>
            <span>{user.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSectionUiUsersCount;