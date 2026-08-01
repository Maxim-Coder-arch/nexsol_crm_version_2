import styles from "../index.module.scss";
import { ClientFormProps } from "@/types/clients/clientForm.type";

const ClientForm = ({
    workStatuses,
    physicalStatuses,
    form,
    actions,
    initialData,
    onCancel,
}: ClientFormProps) => {
    return (
        <form onSubmit={actions.handleSubmit} className={styles["client-form"]}>
            <h3>{initialData ? "Редактировать клиента" : "Новый клиент"}</h3>

            <div className={styles["form-group"]}>
                <label>Имя клиента *</label>
                <input
                    type="text"
                    value={form.name}
                    placeholder="Введите имя или название компании"
                    onChange={(e) => actions.setName(e.target.value)}
                />
            </div>

            <div className={styles["form-row"]}>
                <div className={styles["form-group"]}>
                    <label>Рабочий статус</label>
                    <select
                        value={form.workStatus}
                        onChange={(e) => actions.setWorkStatus(e.target.value as any)}
                    >
                        {workStatuses.map(status => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles["form-group"]}>
                    <label>Физический статус</label>
                    <select
                        value={form.physicalStatus}
                        onChange={(e) => actions.setPhysicalStatus(e.target.value as any)}
                    >
                        {physicalStatuses.map(status => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles["form-group"]}>
                <label>Комментарий</label>
                <textarea
                    rows={3}
                    value={form.comment}
                    placeholder="Введите комментарий..."
                    onChange={(e) => actions.setComment(e.target.value)}
                />
            </div>

            <div className={styles["form-group"]}>
                <label>Дополнительные данные</label>
                {form.additionalData.map((field, index) => (
                    <div key={index} className={styles["additional-field"]}>
                        <input
                            type="text"
                            placeholder="Ключ"
                            value={field.key}
                            onChange={(e) => actions.handleFieldChange(index, "key", e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Значение"
                            value={field.value}
                            onChange={(e) => actions.handleFieldChange(index, "value", e.target.value)}
                        />
                        {form.additionalData.length > 1 && (
                            <button
                                type="button"
                                onClick={() => actions.handleRemoveField(index)}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className={styles["add-field-btn"]}
                    onClick={actions.handleAddField}
                >
                    + Добавить поле
                </button>
            </div>

            <div className={styles["form-actions"]}>
                <button type="submit" className={styles["submit-btn"]}>
                    {initialData ? "Сохранить" : "Добавить"}
                </button>
                <button type="button" className={styles["cancel-btn"]} onClick={onCancel}>
                    Отмена
                </button>
            </div>
        </form>
    );
};

export default ClientForm;