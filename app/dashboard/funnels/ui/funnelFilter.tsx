import { FunnelType } from "../page";
import styles from "../index.module.scss";

const FunnelFilter = ({ 
    activeFilter, 
    onFilterChange,
    funnelTypes
}: { 
    activeFilter: FunnelType | 'all'; 
    onFilterChange: (filter: FunnelType | 'all') => void,
    funnelTypes: { value: FunnelType; label: string }[]
}) => {
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