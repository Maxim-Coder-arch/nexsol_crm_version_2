import BidCard from "./bidCard";
import styles from "../index.module.scss";
import { BidsStatus } from "@/config-and-data/bids.cnf";

interface BidsColumnProps {
    title: string;
    type: BidsStatus;
    bids: Array<{
        username: string;
        createdAt: string;
        useremail: string;
        usecontact: string;
        comment: string;
        status: BidsStatus;
    }>;
    onStatusChange: (bidIndex: number, newStatus: BidsStatus) => void;
    onDelete: (bidIndex: number) => void;
}

const BidsColumn = ({ title, type, bids, onStatusChange, onDelete }: BidsColumnProps) => {
    const columnBids = bids.filter(bid => bid.status === type);

    return (
        <div className={styles["root-bids__column"]}>
            <h2>
                {title}
                <span className={styles["column-count"]}>{columnBids.length}</span>
            </h2>
            <div className={styles["root-bids__column__bids"]}>
                {columnBids.map((bid, index) => {
                    const originalIndex = bids.findIndex(b => 
                        b.username === bid.username && 
                        b.createdAt === bid.createdAt &&
                        b.comment === bid.comment
                    );
                    return (
                        <BidCard
                            key={`${bid.username}-${index}`}
                            bid={bid}
                            onStatusChange={(newStatus) => onStatusChange(originalIndex, newStatus)}
                            onDelete={() => onDelete(originalIndex)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default BidsColumn;