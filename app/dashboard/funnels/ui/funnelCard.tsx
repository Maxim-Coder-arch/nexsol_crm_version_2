import { FunnelType, IFunnel, StageType } from "../page";
import FunnelItem from "./funnelItem";
import styles from "../index.module.scss";

const FunnelCard = ({ 
    funnel, 
    onDelete, 
    onEdit,
    funnelTypes,
    stageTypes,
}: { 
    funnel: IFunnel; 
    onDelete: (id: string) => void; 
    onEdit: (funnel: IFunnel) => void;
    funnelTypes: { value: FunnelType; label: string }[];
    stageTypes: { value: StageType; label: string; color: string }[]
}) => {
    const typeLabel = funnelTypes.find(t => t.value === funnel.type)?.label || funnel.type;

    return (
        <div className={styles["funnel-card"]}>
            <div className={styles["funnel-card__header"]}>
                <div>
                    <h3>{funnel.title}</h3>
                    <span className={styles["funnel-card__type"]}>{typeLabel}</span>
                </div>
                <div className={styles["funnel-card__actions"]}>
                    <button onClick={() => onEdit(funnel)} className={styles["edit-btn"]}>✎</button>
                    <button onClick={() => onDelete(funnel.id)} className={styles["delete-btn"]}>✕</button>
                </div>
            </div>

            <div className={styles["funnel-card__items"]}>
                {funnel.items.map((item, index) => (
                    <FunnelItem 
                        key={item.id} 
                        item={item} 
                        index={index} 
                        total={funnel.items.length} 
                        stageTypes={stageTypes}
                    />
                ))}
            </div>

            <div className={styles["funnel-card__stats"]}>
                <span>Пунктов: {funnel.items.length}</span>
                <span>Типы: {funnel.items.map(i => i.type).filter((v, i, a) => a.indexOf(v) === i).join(', ')}</span>
            </div>
        </div>
    );
};

export default FunnelCard;