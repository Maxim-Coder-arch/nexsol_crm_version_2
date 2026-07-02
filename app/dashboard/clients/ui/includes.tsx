import AddClientButton from "./addClientButton";
import ClientsColumn from "./clientColumn";
import styles from "../index.module.scss";
import { ClientIncludesProps } from "@/types/clients/clientIncludes.type";

const ClientsIncludes = ({ 
    workStatuses, 
    physicalStatuses, 
    addClient, 
    successfulClients, 
    updateClient, 
    deleteClient, 
    lostClients
 }: ClientIncludesProps) => {
    
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