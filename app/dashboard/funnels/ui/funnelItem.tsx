import styles from "../index.module.scss";
import { IFunnelItem, StageType } from "../page";

const FunnelItem = ({ item, index, total, stageTypes }: { item: IFunnelItem; index: number; total: number, stageTypes: { value: StageType; label: string; color: string }[] }) => {
    const stageInfo = stageTypes.find(s => s.value === item.type);
    const width = 100 - (index / total) * 25;

    return (
        <div 
            className={styles["funnel-item"]}
            style={{ width: `${width}%` }}
        >
            <span className={styles["funnel-item__title"]}>{item.title}</span>
            <span 
                className={styles["funnel-item__type"]}
                style={{ backgroundColor: stageInfo?.color }}
            >
                {item.type}
            </span>
        </div>
    );
};

export default FunnelItem;