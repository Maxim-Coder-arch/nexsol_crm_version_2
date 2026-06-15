import { IClient } from "../page";
import ClientCard from "./clientCard";
import EmptyState from "./emptyState";
import styles from "../index.module.scss";

interface ClientsColumnProps {
    title: string;
    clients: IClient[];
    workStatuses: readonly { value: string; label: string }[];
    physicalStatuses: readonly { value: string; label: string }[];
    onUpdate: (id: string, updates: Partial<IClient>) => void;
    onDelete: (id: string) => void;
}

const ClientsColumn = ({ title, clients, workStatuses, physicalStatuses, onUpdate, onDelete }: ClientsColumnProps) => {
    return (
        <div className={styles["clients-column"]}>
            <div className={styles["clients-column__header"]}>
                <h2>{title}</h2>
                <span>{clients.length}</span>
            </div>

            <div className={styles["clients-column__data"]}>
                {clients.length === 0 ? (
                    <EmptyState />
                ) : (
                    clients.map((client) => (
                        <ClientCard
                            key={client._id}
                            client={client}
                            workStatuses={workStatuses}
                            physicalStatuses={physicalStatuses}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ClientsColumn;