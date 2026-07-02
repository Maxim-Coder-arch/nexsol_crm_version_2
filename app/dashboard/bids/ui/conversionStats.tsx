import { BidsStatus } from "@/config-and-data/bids.cnf";
import styles from "../index.module.scss";
import { ConversionStatsProps } from "@/types/bids/coversionStats.type";

const ConversionStats = ({ bids }: ConversionStatsProps) => {
    const total = bids.length;
    const finished = bids.filter(b => b.status === BidsStatus.finished).length;
    const inProgress = bids.filter(b => b.status === BidsStatus.inProgress).length;
    const newBids = bids.filter(b => b.status === BidsStatus.new).length;
    const conversionRate = total > 0 ? ((finished / total) * 100).toFixed(1) : "0";

    return (
        <div className={styles["conversion-stats"]}>
            <div className={styles["stats-grid"]}>
                <div className={styles["stat-item"]}>
                    <span className={styles["stat-label"]}>Всего заявок</span>
                    <span className={styles["stat-value"]}>{total}</span>
                </div>
                <div className={styles["stat-item"]}>
                    <span className={styles["stat-label"]}>Новые</span>
                    <span className={styles["stat-value"]}>{newBids}</span>
                </div>
                <div className={styles["stat-item"]}>
                    <span className={styles["stat-label"]}>В работе</span>
                    <span className={styles["stat-value"]}>{inProgress}</span>
                </div>
                <div className={styles["stat-item"]}>
                    <span className={styles["stat-label"]}>Завершено</span>
                    <span className={styles["stat-value"]}>{finished}</span>
                </div>
                <div className={styles["stat-item"]}>
                    <span className={styles["stat-label"]}>Конверсия</span>
                    <span className={styles["stat-value"]}>{conversionRate}%</span>
                </div>
            </div>
        </div>
    );
}

export default ConversionStats;