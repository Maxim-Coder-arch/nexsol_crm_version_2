import { BidsStatus, statusOptions } from "@/configs/bids/bids.cnf";
import { BidCardProps } from "@/types/bids/bidCard.type";
import UserProtected from "@/app/components/share/protected";
import { formattedData } from "@/helpers/bids/bidcardFormatted";
import styles from "../index.module.scss";

const BidCard = ({ bid, onStatusChange, onDelete }: BidCardProps) => {
    const { formattedDate, formattedTime } = formattedData(bid.createdAt);

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
                <UserProtected roles={["moderator", "director"]}>
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
                </UserProtected>
                <UserProtected roles={["director"]}>
                    <button 
                        onClick={onDelete}
                        className={styles["bid__delete-btn"]}
                    >
                        Удалить
                    </button>
                </UserProtected>
            </div>
        </div>
    );
}

export default BidCard;