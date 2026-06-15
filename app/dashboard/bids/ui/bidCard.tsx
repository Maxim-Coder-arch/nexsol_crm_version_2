import { BidsStatus } from "@/config-and-data/bids.cnf";
import styles from "../index.module.scss";

interface BidCardProps {
    bid: {
        username: string;
        createdAt: string;
        useremail: string;
        usecontact: string;
        comment: string;
        status: BidsStatus;
    };
    onStatusChange: (newStatus: BidsStatus) => void;
    onDelete: () => void;
}

const statusOptions = [
    { value: BidsStatus.new, label: "Новая" },
    { value: BidsStatus.inProgress, label: "В работе" },
    { value: BidsStatus.finished, label: "Завершена" },
];

const BidCard = ({ bid, onStatusChange, onDelete }: BidCardProps) => {
    return (
        <div className={styles["root-bids__column__bids__bid"]}>
            <div className={styles["bid__header"]}>
                <h3>{bid.username}</h3>
                <span className={styles["bid__date"]}>{bid.createdAt}</span>
            </div>

            <div className={styles["bid__contacts"]}>
                <div className={styles["bid__contact-row"]}>
                    <span className={styles["bid__label"]}>Email:</span>
                    <a href={`mailto:${bid.useremail}`} className={styles["bid__email"]}>
                        {bid.useremail}
                    </a>
                </div>
                <div className={styles["bid__contact-row"]}>
                    <span className={styles["bid__label"]}>Контакт:</span>
                    <a href={bid.usecontact} target="_blank" rel="noopener noreferrer" className={styles["bid__link"]}>
                        {bid.usecontact}
                    </a>
                </div>
            </div>

            <div className={styles["bid__comment"]}>
                <p>{bid.comment}</p>
            </div>

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