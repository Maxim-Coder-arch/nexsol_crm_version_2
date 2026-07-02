import styles from "../index.module.scss";
import { IFunnelFilterProps } from "@/types/funnels/funnelFilter.type";

const FunnelFilter = ({ 
    activeFilter, 
    onFilterChange,
    funnelTypes
}: IFunnelFilterProps) => {
    
    return (
        <div className={styles["funnel-filter"]}>
            <button 
                className={activeFilter === 'all' ? styles.active : ''}
                onClick={() => onFilterChange('all')}
            >
                Все
            </button>
            {funnelTypes.map(t => (
                <button 
                    key={t.value}
                    className={activeFilter === t.value ? styles.active : ''}
                    onClick={() => onFilterChange(t.value)}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
};

export default FunnelFilter;