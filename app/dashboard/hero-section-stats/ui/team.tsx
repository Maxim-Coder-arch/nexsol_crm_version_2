import styles from "../index.module.scss";
import { HeroSectionUiTeamProps } from "@/types/hero-section/heroSectionUiTeam.type";

const HeroSectionUiTeam = ({ team }: HeroSectionUiTeamProps) => {
  if (team.length === 0) {
    return (
      <div className={styles["root-hero-section-stats__team"]}>
        <h2>Команда</h2>
        <div className={styles["root-hero-section-stats__team__empty"]}>
          <p>Нет данных о команде</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["root-hero-section-stats__team"]}>
      <h2>Команда</h2>
      <div className={styles["root-hero-section-stats__team__people"]}>
        {team.map((person) => (
          <div key={person._id} className={styles["root-hero-section-stats__team__people__person"]}>
            <div className={styles["root-hero-section-stats__team__people__person__avatar"]}>
              <span>{person.name.slice(0, 1)}</span>
            </div>
            <div className={styles["root-hero-section-stats__team__people__person__meta"]}>
              <h3>{person.name}</h3>
              <div className={styles["root-hero-section-stats__team__people__person__meta__specialties"]}>
                {person.specialties.map((speciality, idx) => (
                  <div key={idx} className={styles["root-hero-section-stats__team__people__person__meta__specialties__speciality"]}>
                    <span>{speciality}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSectionUiTeam;