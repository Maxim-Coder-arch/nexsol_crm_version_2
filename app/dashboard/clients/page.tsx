"use client";

import { useState } from "react";
import TemplateContent from "@/app/components/share/template";
import ClientsIncludes from "./ui/includes";
import { workStatuses, physicalStatuses } from "@/configs/clients/clients.cnf";
import {
    useGetClientsQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
} from "@/store/client-api";
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";
import { IClient } from "@/types/clients/client.type";
import { WorkStatus, PhysicalStatus } from "@/types/clients/common.type";

const ClientsPage = () => {
    const dispatch = useAppDispatch();

    const { data: clients = [], isLoading, error } = useGetClientsQuery(void 0);
    const [createClient] = useCreateClientMutation();
    const [updateClient] = useUpdateClientMutation();
    const [deleteClient] = useDeleteClientMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [workStatus, setWorkStatus] = useState<WorkStatus>("new");
    const [physicalStatus, setPhysicalStatus] = useState<PhysicalStatus>("successful");
    const [comment, setComment] = useState("");
    const [additionalData, setAdditionalData] = useState([{ key: "", value: "" }]);

    const handleAddClient = async (client: Omit<IClient, "_id" | "createdAt" | "updatedAt">) => {
        try {
            await createClient(client).unwrap();
            dispatch(showToast({
                type: "success",
                title: "Клиент добавлен",
                message: `Клиент "${client.name}" успешно добавлен`,
                duration: 3000,
            }));
        } catch (e) {
            dispatch(showToast({
                type: "error",
                title: "Ошибка",
                message: "Не удалось добавить клиента",
                duration: 4000,
            }));
            console.error(e);
        }
    };

    const handleUpdateClient = async (id: string, updates: Partial<IClient>) => {
        try {
            await updateClient({ id, data: updates }).unwrap();
            dispatch(showToast({
                type: "success",
                title: "Обновлено",
                message: "Данные клиента успешно обновлены",
                duration: 3000,
            }));
        } catch (e) {
            dispatch(showToast({
                type: "error",
                title: "Ошибка",
                message: "Не удалось обновить клиента",
                duration: 4000,
            }));
            console.error(e);
        }
    };

    const handleDeleteClient = async (id: string) => {
        try {
            await deleteClient(id).unwrap();
            dispatch(showToast({
                type: "success",
                title: "Удалено",
                message: "Клиент успешно удалён",
                duration: 3000,
            }));
        } catch (e) {
            dispatch(showToast({
                type: "error",
                title: "Ошибка",
                message: "Не удалось удалить клиента",
                duration: 4000,
            }));
            console.error(e);
        }
    };

    const handleAddField = () => {
        setAdditionalData([...additionalData, { key: "", value: "" }]);
    };

    const handleRemoveField = (index: number) => {
        setAdditionalData(additionalData.filter((_, i) => i !== index));
    };

    const handleFieldChange = (index: number, field: "key" | "value", value: string) => {
        const copy = [...additionalData];
        copy[index][field] = value;
        setAdditionalData(copy);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) return;

        await handleAddClient({
            name,
            workStatus: workStatus as any,
            physicalStatus: physicalStatus as any,
            comment,
            additionalData,
        });

        setName("");
        setComment("");
        setWorkStatus("new");
        setPhysicalStatus("successful");
        setAdditionalData([{ key: "", value: "" }]);
        setIsOpen(false);
    };

    if (isLoading) {
        return (
            <TemplateContent>
                <div className="loading-state">Загрузка клиентов...</div>
            </TemplateContent>
        );
    }

    if (error) {
        dispatch(showToast({
            type: "error",
            title: "Ошибка загрузки",
            message: "Не удалось загрузить клиентов",
            duration: 4000,
        }));

        return (
            <TemplateContent>
                <div className="error-state">Ошибка загрузки данных</div>
            </TemplateContent>
        );
    }

    const successfulClients = clients.filter((client: IClient) => client.physicalStatus === "successful");
    const lostClients = clients.filter((client: IClient) => client.physicalStatus === "lost");

    const form = { name, workStatus, physicalStatus, comment, additionalData };
    const actions = {
        setName,
        setWorkStatus,
        setPhysicalStatus,
        setComment,
        setAdditionalData,
        handleAddField,
        handleRemoveField,
        handleFieldChange,
        handleSubmit,
    };

    return (
        <TemplateContent>
            <ClientsIncludes
                workStatuses={workStatuses}
                physicalStatuses={physicalStatuses}
                successfulClients={successfulClients}
                lostClients={lostClients}
                addClient={handleAddClient}
                updateClient={handleUpdateClient}
                deleteClient={handleDeleteClient}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                form={form}
                actions={actions}
            />
        </TemplateContent>
    );
};

export default ClientsPage;