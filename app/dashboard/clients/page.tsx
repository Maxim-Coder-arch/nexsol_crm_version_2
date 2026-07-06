"use client";
import ClientsIncludes from "./ui/includes";
import { IClient } from "@/types/clients/client.type";
import { physicalStatuses, workStatuses } from "@/config-and-data/clients.cnf";
import TemplateContent from "@/app/components/share/template";
import { 
    useCreateClientMutation, 
    useGetClientsQuery, 
    useUpdateClientMutation,
    useDeleteClientMutation 
} from "@/store/client-api";
import { clientType } from "@/types/store-types/client.type";

const ClientsPage = () => {
    const { data: clients = [], isLoading, error } = useGetClientsQuery(void 0) as clientType<IClient>;
    const [createClientMutation] = useCreateClientMutation();
    const [updateClientMutation] = useUpdateClientMutation();
    const [deleteClientMutation] = useDeleteClientMutation();

    const handleAddClient = async (client: Omit<IClient, "_id" | "createdAt" | "updatedAt">) => {
        try {
            await createClientMutation(client).unwrap();
        } catch (error) {
            console.error('Failed to add client:', error);
        }
    };

    const handleUpdateClient = async (id: string, updates: Partial<IClient>) => {
        try {
            await updateClientMutation({ id, data: updates }).unwrap();
        } catch (error) {
            console.error('Failed to update client:', error);
        }
    };

    const handleDeleteClient = async (id: string) => {
        if (!confirm("Удалить клиента?")) return;
        try {
            await deleteClientMutation(id).unwrap();
        } catch (error) {
            console.error('Failed to delete client:', error);
        }
    };

    if (isLoading) {
        return <div>Загрузка клиентов...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки</div>;
    }

    const successfulClients = clients.filter(
        c => c.physicalStatus === "successful"
    );
    const lostClients = clients.filter(c => c.physicalStatus === "lost");

    return (
        <TemplateContent>
            <ClientsIncludes
                workStatuses={workStatuses}
                physicalStatuses={physicalStatuses}
                addClient={handleAddClient}
                successfulClients={successfulClients}
                updateClient={handleUpdateClient}
                deleteClient={handleDeleteClient}
                lostClients={lostClients}
            />
        </TemplateContent>
    );
};

export default ClientsPage;