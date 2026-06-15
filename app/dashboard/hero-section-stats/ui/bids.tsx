import { HeroSectionUiBidsProps } from "@/types/hero-section/bidsProps";
import styles from "../index.module.scss";


const HeroSectionUiBids = ({ bids }: HeroSectionUiBidsProps) => {
  if (bids.length === 0) {
    return (
      <div className={styles["root-hero-section-stats__bids"]}>
        <h2>Новые заявки</h2>
        <div className={styles["root-hero-section-stats__bids__empty"]}>
          <p>Нет новых заявок</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["root-hero-section-stats__bids"]}>
      <h2>Новые заявки</h2>
      <div className={styles["root-hero-section-stats__bids__blocks"]}>
        {bids.map((bid) => (
          <div key={bid._id} className={styles["root-hero-section-stats__bids__blocks__block"]}>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSectionUiBids;