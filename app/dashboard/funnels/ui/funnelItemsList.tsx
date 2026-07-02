import { IFunnelItemsListProps } from "@/types/funnels/funnelItemsList.type";
import styles from "../index.module.scss";

const FunnelItemsList = ({ items,stageTypes }: IFunnelItemsListProps) => {
    
    return (
        <div className={styles["funnel-items-list"]}>
            <h4>Все пункты воронки</h4>
            <div className={styles["funnel-items-list__grid"]}>
                {items.map(item => {
                    const stageInfo = stageTypes.find(s => s.value === item.type);
                    return (
                        <div key={item.id} className={styles["funnel-items-list__item"]}>
                            <span>{item.title}</span>
                            <span 
                                className={styles["funnel-items-list__type"]}
                                style={{ backgroundColor: stageInfo?.color }}
                            >
                                {item.type}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FunnelItemsList;