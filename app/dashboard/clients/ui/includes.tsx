import AddClientButton from "./addClientButton";
import ClientsColumn from "./clientColumn";
import { ClientIncludesProps } from "@/types/clients/clientIncludes.type";
import styles from "../index.module.scss";

const ClientsIncludes = ({
    workStatuses,
    physicalStatuses,
    successfulClients,
    lostClients,
    addClient,
    updateClient,
    deleteClient,
    isOpen,
    setIsOpen,
    form,
    actions,
}: ClientIncludesProps) => {
    return (
        <section id="clients">
            <div className={styles["root-clients"]}>
                <AddClientButton
                    workStatuses={workStatuses}
                    physicalStatuses={physicalStatuses}
                    onAdd={addClient}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    form={form}
                    actions={actions}
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
    );
};

export default ClientsIncludes;