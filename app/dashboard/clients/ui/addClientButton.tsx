import { useState } from "react";
import ClientForm from "./clientForm";
import styles from "../index.module.scss";

interface AddClientButtonProps {
    workStatuses: readonly { value: string; label: string }[];
    physicalStatuses: readonly { value: string; label: string }[];
    onAdd: (client: any) => void;
}

const AddClientButton = ({ workStatuses, physicalStatuses, onAdd }: AddClientButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles["add-client-section"]}>
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className={styles["add-client-btn"]}
                >
                    + Добавить клиента
                </button>
            ) : (
                <div className={styles["form-wrapper"]}>
                    <ClientForm
                        workStatuses={workStatuses}
                        physicalStatuses={physicalStatuses}
                        onSubmit={(client) => {
                            onAdd(client);
                            setIsOpen(false);
                        }}
                        onCancel={() => setIsOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default AddClientButton;