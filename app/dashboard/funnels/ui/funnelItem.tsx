import { IFunnelItemProps } from "@/types/funnels/funneltem.type";
import styles from "../index.module.scss";
import { stageConfigure } from "@/helpers/funnels/stageConfigure";

const FunnelItem = ({ 
    item, 
    index, 
    total, 
    stageTypes
 }: IFunnelItemProps) => {
    const { stageInfo, width } = stageConfigure(stageTypes, item, index, total);

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