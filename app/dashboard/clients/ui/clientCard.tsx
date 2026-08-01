"use client";

import { useState } from "react";
import ClientForm from "./clientForm";
import { ClientCardProps } from "@/types/clients/clientsCard.type";
import UserProtected from "@/app/components/share/protected";
import styles from "../index.module.scss";

const ClientCard = ({
    client,
    workStatuses,
    physicalStatuses,
    onUpdate,
    onDelete,
}: ClientCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(client.name);
    const [workStatus, setWorkStatus] = useState(client.workStatus);
    const [physicalStatus, setPhysicalStatus] = useState(client.physicalStatus);
    const [comment, setComment] = useState(client.comment);
    const [additionalData, setAdditionalData] = useState(
        client.additionalData.length ? client.additionalData : [{ key: "", value: "" }]
    );

    const handleAddField = () => {
        setAdditionalData(prev => [...prev, { key: "", value: "" }]);
    };

    const handleRemoveField = (index: number) => {
        setAdditionalData(prev => prev.filter((_, i) => i !== index));
    };

    const handleFieldChange = (index: number, field: "key" | "value", value: string) => {
        setAdditionalData(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onUpdate(client._id, {
            name,
            workStatus,
            physicalStatus,
            comment,
            additionalData: additionalData.filter(item => item.key.trim() || item.value.trim()),
        });

        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className={styles["client-card"]}>
                <ClientForm
                    workStatuses={workStatuses}
                    physicalStatuses={physicalStatuses}
                    initialData={{
                        name: client.name,
                        workStatus: client.workStatus,
                        physicalStatus: client.physicalStatus,
                        comment: client.comment,
                        additionalData: client.additionalData,
                    }}
                    form={{
                        name,
                        workStatus,
                        physicalStatus,
                        comment,
                        additionalData,
                    }}
                    actions={{
                        setName,
                        setWorkStatus,
                        setPhysicalStatus,
                        setComment,
                        setAdditionalData,
                        handleAddField,
                        handleRemoveField,
                        handleFieldChange,
                        handleSubmit,
                    }}
                    onCancel={() => {
                        setName(client.name);
                        setWorkStatus(client.workStatus);
                        setPhysicalStatus(client.physicalStatus);
                        setComment(client.comment);
                        setAdditionalData(
                            client.additionalData.length ? client.additionalData : [{ key: "", value: "" }]
                        );
                        setIsEditing(false);
                    }}
                />
            </div>
        );
    }

    return (
        <div className={styles["client-card"]}>
            <div className={styles["client-card__header"]}>
                <h3>{client.name}</h3>
                <div className={styles["client-card__actions"]}>
                    <UserProtected>
                        <button
                            onClick={() => setIsEditing(true)}
                            className={styles["edit-btn"]}
                        >
                            ✎
                        </button>
                    </UserProtected>
                    <UserProtected>
                        <button
                            onClick={() => onDelete(client._id)}
                            className={styles["delete-btn"]}
                        >
                            ✕
                        </button>
                    </UserProtected>
                </div>
            </div>

            <div className={styles["client-card__statuses"]}>
                <UserProtected>
                    <div className={styles["status-group"]}>
                        <span className={styles["status-label"]}>Рабочий:</span>
                        <select
                            value={client.workStatus}
                            onChange={(e) =>
                                onUpdate(client._id, { workStatus: e.target.value as any })
                            }
                            className={styles["status-select"]}
                        >
                            {workStatuses.map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </UserProtected>

                <UserProtected>
                    <div className={styles["status-group"]}>
                        <span className={styles["status-label"]}>Статус:</span>
                        <select
                            value={client.physicalStatus}
                            onChange={(e) =>
                                onUpdate(client._id, { physicalStatus: e.target.value as any })
                            }
                            className={styles["status-select"]}
                        >
                            {physicalStatuses.map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </UserProtected>
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
                        {client.additionalData.map((item, index) => (
                            <div key={index} className={styles["additional-item"]}>
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