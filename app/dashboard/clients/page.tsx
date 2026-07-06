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
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";

const ClientsPage = () => {
    const dispatch = useAppDispatch();
    const { data: clients = [], isLoading, error } = useGetClientsQuery(void 0) as clientType<IClient>;
    const [createClientMutation] = useCreateClientMutation();
    const [updateClientMutation] = useUpdateClientMutation();
    const [deleteClientMutation] = useDeleteClientMutation();

    const handleAddClient = async (client: Omit<IClient, "_id" | "createdAt" | "updatedAt">) => {
        try {
            await createClientMutation(client).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Клиент добавлен',
                message: `Клиент "${client.name}" успешно добавлен`,
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось добавить клиента',
                duration: 4000,
            }));
        }
    };

    const handleUpdateClient = async (id: string, updates: Partial<IClient>) => {
        try {
            await updateClientMutation({ id, data: updates }).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Клиент обновлён',
                message: 'Данные клиента успешно обновлены',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось обновить клиента',
                duration: 4000,
            }));
        }
    };

    const handleDeleteClient = async (id: string) => {   
        try {
            await deleteClientMutation(id).unwrap();
            dispatch(showToast({
                type: 'success',
                title: 'Удалено!',
                message: 'Клиент успешно удалён',
                duration: 3000,
            }));
        } catch {
            dispatch(showToast({
                type: 'error',
                title: 'Ошибка!',
                message: 'Не удалось удалить клиента',
                duration: 4000,
            }));
        }
    };

    if (isLoading) return <div>Загрузка клиентов...</div>;

    if (error) {
        dispatch(showToast({
            type: 'error',
            title: 'Ошибка загрузки',
            message: 'Не удалось загрузить клиентов',
            duration: 4000,
        }));
        return <div>Ошибка загрузки</div>;
    }

    const successfulClients = clients.filter(c => c.physicalStatus === "successful");
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