import BidCard from "./bidCard";
import styles from "../index.module.scss";
import { BidsColumnProps } from "@/types/bids/bidsColumn.type";

const BidsColumn = ({ title, type, bids, onStatusChange, onDelete }: BidsColumnProps) => {
    const columnBids = bids.filter(bid => bid.status === type);

    return (
        <div className={styles["root-bids__column"]}>
            <h2>
                {title}
                <span className={styles["column-count"]}>{columnBids.length}</span>
            </h2>
            <div className={styles["root-bids__column__bids"]}>
                {columnBids.map((bid) => (
                    <BidCard
                        key={bid._id}
                        bid={bid}
                        onStatusChange={(newStatus) => onStatusChange(bid._id, newStatus)}
                        onDelete={() => onDelete(bid._id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default BidsColumn;