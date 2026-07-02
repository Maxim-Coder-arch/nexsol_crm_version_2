import { useState } from "react";
import styles from "../index.module.scss";
import { ClientFormProps } from "@/types/clients/clientForm.type";

const ClientForm = ({ 
    initialData, 
    workStatuses, 
    physicalStatuses, 
    onSubmit, 
    onCancel
 }: ClientFormProps) => {
    
    const [name, setName] = useState(initialData?.name || "");
    const [workStatus, setWorkStatus] = useState(initialData?.workStatus || "new");
    const [physicalStatus, setPhysicalStatus] = useState(initialData?.physicalStatus || "successful");
    const [comment, setComment] = useState(initialData?.comment || "");
    const [additionalData, setAdditionalData] = useState<{ key: string; value: string }[]>(
        initialData?.additionalData || [{ key: "", value: "" }]
    );

    const handleAddField = () => {
        setAdditionalData([...additionalData, { key: "", value: "" }]);
    };

    const handleRemoveField = (index: number) => {
        setAdditionalData(additionalData.filter((_, i) => i !== index));
    };

    const handleFieldChange = (index: number, field: "key" | "value", value: string) => {
        const updated = [...additionalData];
        updated[index][field] = value;
        setAdditionalData(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Введите имя клиента");
            return;
        }
        onSubmit({
            name: name.trim(),
            workStatus,
            physicalStatus,
            comment: comment.trim(),
            additionalData: additionalData.filter(field => field.key.trim() || field.value.trim()),
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles["client-form"]}>
            <h3>{initialData ? "Редактировать клиента" : "Новый клиент"}</h3>

            <div className={styles["form-group"]}>
                <label>Имя клиента *</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя или название компании"
                />
            </div>

            <div className={styles["form-row"]}>
                <div className={styles["form-group"]}>
                    <label>Рабочий статус</label>
                    <select value={workStatus} onChange={(e) => setWorkStatus(e.target.value)}>
                        {workStatuses.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>

                <div className={styles["form-group"]}>
                    <label>Физический статус</label>
                    <select value={physicalStatus} onChange={(e) => setPhysicalStatus(e.target.value)}>
                        {physicalStatuses.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles["form-group"]}>
                <label>Комментарий по сделке</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Введите комментарий..."
                    rows={3}
                />
            </div>

            <div className={styles["form-group"]}>
                <label>Дополнительные данные</label>
                {additionalData.map((field, index) => (
                    <div key={index} className={styles["additional-field"]}>
                        <input
                            type="text"
                            placeholder="Ключ (например: Телефон)"
                            value={field.key}
                            onChange={(e) => handleFieldChange(index, "key", e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Значение"
                            value={field.value}
                            onChange={(e) => handleFieldChange(index, "value", e.target.value)}
                        />
                        {additionalData.length > 1 && (
                            <button type="button" onClick={() => handleRemoveField(index)}>✕</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddField} className={styles["add-field-btn"]}>
                    + Добавить поле
                </button>
            </div>

            <div className={styles["form-actions"]}>
                <button type="submit" className={styles["submit-btn"]}>
                    {initialData ? "Сохранить" : "Добавить"}
                </button>
                <button type="button" onClick={onCancel} className={styles["cancel-btn"]}>
                    Отмена
                </button>
            </div>
        </form>
    );
};

export default ClientForm;