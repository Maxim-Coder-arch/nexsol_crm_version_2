import { useState } from "react";
import ClientForm from "./clientForm";
import styles from "../index.module.scss";
import { ClientCardProps } from "@/types/clients/clientsCard.type";

const ClientCard = ({ 
    client, 
    workStatuses, 
    physicalStatuses, 
    onUpdate, 
    onDelete
 }: ClientCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return (
            <div className={styles["client-card"]}>
                <ClientForm
                    initialData={{
                        name: client.name,
                        workStatus: client.workStatus,
                        physicalStatus: client.physicalStatus,
                        comment: client.comment,
                        additionalData: client.additionalData,
                    }}
                    workStatuses={workStatuses}
                    physicalStatuses={physicalStatuses}
                    onSubmit={(updated) => {
                        onUpdate(client._id, updated);
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            </div>
        );
    }

    return (
        <div className={styles["client-card"]}>
            <div className={styles["client-card__header"]}>
                <h3>{client.name}</h3>
                <div className={styles["client-card__actions"]}>
                    <button onClick={() => setIsEditing(true)} className={styles["edit-btn"]}>
                        ✎
                    </button>
                    <button onClick={() => onDelete(client._id)} className={styles["delete-btn"]}>
                        ✕
                    </button>
                </div>
            </div>

            <div className={styles["client-card__statuses"]}>
                <div className={styles["status-group"]}>
                    <span className={styles["status-label"]}>Рабочий:</span>
                    <select
                        value={client.workStatus}
                        onChange={(e) => onUpdate(client._id, { workStatus: e.target.value as any })}
                        className={styles["status-select"]}
                    >
                        {workStatuses.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>
                <div className={styles["status-group"]}>
                    <span className={styles["status-label"]}>Статус:</span>
                    <select
                        value={client.physicalStatus}
                        onChange={(e) => onUpdate(client._id, { physicalStatus: e.target.value as any })}
                        className={styles["status-select"]}
                    >
                        {physicalStatuses.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles["client-card__dates"]}>
                <span>Создан: {client.createdAt}</span>
                <span>Изменён: {client.updatedAt}</span>
            </div>

            {client.comment && (
                <div className={styles["client-card__comment"]}>
                    <span className={styles["comment-label"]}>Комментарий:</span>
                    <p>{client.comment}</p>
                </div>
            )}

            {client.additionalData.length > 0 && (
                <div className={styles["client-card__additional"]}>
                    <span className={styles["additional-label"]}>Дополнительно:</span>
                    <div className={styles["additional-items"]}>
                        {client.additionalData.map((item, idx) => (
                            <div key={idx} className={styles["additional-item"]}>
                                <strong>{item.key}:</strong> {item.value}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientCard;