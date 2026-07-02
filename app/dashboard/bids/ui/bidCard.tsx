import { BidsStatus, statusOptions } from "@/config-and-data/bids.cnf";
import styles from "../index.module.scss";
import { BidCardProps } from "@/types/bids/bidCard.type";

const BidCard = ({ bid, onStatusChange, onDelete }: BidCardProps) => {
    const date = new Date(bid.createdAt);
    const formattedDate = date.toLocaleDateString('ru-RU');
    const formattedTime = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles["root-bids__column__bids__bid"]}>
            <div className={styles["bid__header"]}>
                <h3>{bid.name}</h3>
                <span className={styles["bid__date"]}>{formattedDate} ({formattedTime})</span>
            </div>

            <div className={styles["bid__contacts"]}>
                <div className={styles["bid__contact-row"]}>
                    <span className={styles["bid__label"]}>Email:</span>
                    <a href={`mailto:${bid.email}`} className={styles["bid__email"]}>
                        {bid.email}
                    </a>
                </div>
                {bid.contact && (
                    <div className={styles["bid__contact-row"]}>
                        <span className={styles["bid__label"]}>Контакт:</span>
                        <a href={bid.contact} target="_blank" rel="noopener noreferrer" className={styles["bid__link"]}>
                            {bid.contact}
                        </a>
                    </div>
                )}
            </div>

            {bid.message && (
                <div className={styles["bid__comment"]}>
                    <p>{bid.message}</p>
                </div>
            )}

            <div className={styles["bid__footer"]}>
                <select 
                    value={bid.status}
                    onChange={(e) => onStatusChange(e.target.value as BidsStatus)}
                    className={styles["bid__status-select"]}
                >
                    {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <button 
                    onClick={onDelete}
                    className={styles["bid__delete-btn"]}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}

export default BidCard;