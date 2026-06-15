import AddClientButton from "./addClientButton";
import ClientsColumn from "./clientColumn";
import styles from "../index.module.scss";
import { IClient } from "../page";

interface IProps {
    workStatuses: readonly [{
        readonly value: "new";
        readonly label: "Новый";
    }, {
        readonly value: "inProgress";
        readonly label: "В работе";
    }, {
        readonly value: "completed";
        readonly label: "Завершен";
    }];
    physicalStatuses: readonly [{
        readonly value: "successful";
        readonly label: "Успешный";
    }, {
        readonly value: "lost";
        readonly label: "Потерянный";
    }];
    addClient: (client: Omit<IClient, "_id" | "createdAt" | "updatedAt">) => void;
    successfulClients: IClient[];
    updateClient: (id: string, updates: Partial<IClient>) => void;
    deleteClient: (id: string) => void;
    lostClients: IClient[];
}


const ClientsIncludes = ({ workStatuses, physicalStatuses, addClient, successfulClients, updateClient, deleteClient, lostClients }: IProps) => {
    return (
        <section id="clients">
            <div className={styles["root-clients"]}>
                <AddClientButton
                    workStatuses={workStatuses}
                    physicalStatuses={physicalStatuses}
                    onAdd={addClient}
                />
                <div className={styles["columns-container"]}>
                    <ClientsColumn
                        title="Успешные клиенты"
                        clients={successfulClients}
                        workStatuses={workStatuses}
                        physicalStatuses={physicalStatuses}
                        onUpdate={updateClient}
                        onDelete={deleteClient}
                    />
                    <ClientsColumn
                        title="Потерянные клиенты"
                        clients={lostClients}
                        workStatuses={workStatuses}
                        physicalStatuses={physicalStatuses}
                        onUpdate={updateClient}
                        onDelete={deleteClient}
                    />
                </div>
            </div>
        </section>
    )
}

export default ClientsIncludes;