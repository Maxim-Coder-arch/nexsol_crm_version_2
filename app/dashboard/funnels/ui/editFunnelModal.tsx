import { useState } from "react";
import { FunnelType, IFunnel, IFunnelItem, StageType } from "../page";
import styles from "../index.module.scss";

const EditFunnelModal = ({ 
    funnel, 
    isOpen, 
    onClose, 
    onSave,
    funnelTypes,
    stageTypes
}: { 
    funnel: IFunnel | null; 
    isOpen: boolean; 
    onClose: () => void; 
    onSave: (id: string, data: Partial<IFunnel>) => void;
    funnelTypes: { value: FunnelType; label: string }[];
    stageTypes: { value: StageType; label: string; color: string }[];

}) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState<FunnelType>('sales');
    const [items, setItems] = useState<IFunnelItem[]>([]);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemType, setNewItemType] = useState<StageType>('TOFU');

    useState(() => {
        if (funnel) {
            setTitle(funnel.title);
            setType(funnel.type);
            setItems(funnel.items);
        }
    });

    if (!isOpen || !funnel) return null;

    const handleAddItem = () => {
        if (!newItemTitle.trim()) return;
        setItems([...items, { 
            id: Date.now().toString(), 
            title: newItemTitle.trim(), 
            type: newItemType 
        }]);
        setNewItemTitle('');
    };

    const handleRemoveItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave(funnel._id, { title: title.trim(), type, items });
        onClose();
    };

    return (
        <div className={styles["modal-overlay"]} onClick={onClose}>
            <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles["modal__header"]}>
                    <h2>Редактирование воронки</h2>
                    <button className={styles["modal__close"]} onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className={styles["modal__form"]}>
                    <div className={styles["modal__field"]}>
                        <label>Название</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles["modal__field"]}>
                        <label>Тип</label>
                        <select value={type} onChange={(e) => setType(e.target.value as FunnelType)}>
                            {funnelTypes.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles["modal__field"]}>
                        <label>Пункты воронки</label>
                        <div className={styles["modal__items-list"]}>
                            {items.map(item => (
                                <div key={item.id} className={styles["modal__item"]}>
                                    <span>{item.title} <small>({item.type})</small></span>
                                    <button type="button" onClick={() => handleRemoveItem(item.id)}>✕</button>
                                </div>
                            ))}
                        </div>
                        <div className={styles["modal__add-item"]}>
                            <input
                                type="text"
                                placeholder="Название пункта"
                                value={newItemTitle}
                                onChange={(e) => setNewItemTitle(e.target.value)}
                            />
                            <select value={newItemType} onChange={(e) => setNewItemType(e.target.value as StageType)}>
                                {stageTypes.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                            <button type="button" onClick={handleAddItem}>+</button>
                        </div>
                    </div>

                    <div className={styles["modal__actions"]}>
                        <button type="submit" className={styles["modal__save"]}>Сохранить</button>
                        <button type="button" className={styles["modal__cancel"]} onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFunnelModal;