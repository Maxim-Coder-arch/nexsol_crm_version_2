import ClientCard from "./clientCard";
import EmptyState from "./emptyState";
import styles from "../index.module.scss";
import { ClientsColumnProps } from "@/types/clients/clientColumn.type";

const ClientsColumn = ({ 
    title, 
    clients, 
    workStatuses, 
    physicalStatuses, 
    onUpdate, 
    onDelete
 }: ClientsColumnProps) => {
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