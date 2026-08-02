import FunnelItem from "./funnelItem";
import styles from "../index.module.scss";
import { IFunnelCardProps } from "@/types/funnels/funnelCard.type";
import UserProtected from "@/app/components/share/protected";
import { typedLabel } from "@/helpers/funnels/typedFunnel";

const FunnelCard = ({ 
    funnel, 
    onDelete, 
    onEdit,
    funnelTypes,
    stageTypes,
}: IFunnelCardProps) => {
    const typeLabel = typedLabel(funnelTypes, funnel);

    return (
        <div 
        className={styles["funnel-card"]}>
            <div className={styles["funnel-card__header"]}>
                <div>
                    <h3>{funnel.title}</h3>
                    <span className={styles["funnel-card__type"]}>{typeLabel}</span>
                </div>
                    <div className={styles["funnel-card__actions"]}>
                        <UserProtected roles={["moderator", "director"]}>
                            <button onClick={() => onEdit(funnel)} className={styles["edit-btn"]}>✎</button>
                        </UserProtected>
                        <UserProtected>
                            <button onClick={() => onDelete(funnel._id)} className={styles["delete-btn"]}>✕</button>
                        </UserProtected>
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