import { useState } from "react";
import styles from "../index.module.scss";
import { FunnelType } from "@/types/funnels/ItemType.type";

const AddFunnel = ({ onAdd, funnelTypes }: { onAdd: (data: { title: string; type: FunnelType }) => void, funnelTypes: { value: FunnelType; label: string }[] }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<FunnelType>('sales');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title: title.trim(), type });
        setTitle('');
    };

    return (
        <div className={styles["add-funnel"]}>
            <form onSubmit={handleSubmit} className={styles["add-funnel__form"]}>
                <input
                    type="text"
                    placeholder="Название воронки"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select value={type} onChange={(e) => setType(e.target.value as FunnelType)}>
                    {funnelTypes.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                </select>
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default AddFunnel;