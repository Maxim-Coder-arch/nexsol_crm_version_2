"use client";
import { useEffect, useState } from "react";
import ClientsIncludes from "./ui/includes";

export interface IClient {
    _id: string;
    name: string;
    workStatus: "new" | "inProgress" | "completed";
    physicalStatus: "successful" | "lost";
    comment: string;
    additionalData: { key: string; value: string }[];
    createdAt: string;
    updatedAt: string;
}

const workStatuses = [
    { value: "new", label: "Новый" },
    { value: "inProgress", label: "В работе" },
    { value: "completed", label: "Завершен" },
] as const;

const physicalStatuses = [
    { value: "successful", label: "Успешный" },
    { value: "lost", label: "Потерянный" },
] as const;

const ClientsPage = () => {
    const [clients, setClients] = useState<IClient[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = async () => {
        try {
            const response = await fetch("/api/clients");
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error('Failed to fetch clients:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const addClient = async (client: Omit<IClient, "_id" | "createdAt" | "updatedAt">) => {
        try {
            const response = await fetch("/api/clients", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: client.name,
                    workStatus: client.workStatus,
                    physicalStatus: client.physicalStatus,
                    comment: client.comment,
                    additionalData: client.additionalData,
                })
            });
    
            if (response.ok) {
                const createdClient = await response.json();
                setClients(prev => [createdClient, ...prev]);
            }
        } catch (error) {
            console.error('Failed to add client:', error);
        }
    };

    const updateClient = async (id: string, updates: Partial<IClient>) => {
        try {
            const response = await fetch(`/api/clients/${id}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                const updatedClient = await response.json();
                setClients(prev =>
                    prev.map(client =>
                        client._id === id ? updatedClient : client
                    )
                );
            }
        } catch (error) {
            console.error('Failed to update client:', error);
        }
    };

    const deleteClient = async (id: string) => {
        try {
            const response = await fetch(`/api/clients/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setClients(prev => prev.filter(client => client._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete client:', error);
        }
    };

    if (loading) {
        return <div>Загрузка клиентов...</div>;
    }

    const successfulClients = clients.filter(
        c => c.physicalStatus === "successful"
    );
    const lostClients = clients.filter(c => c.physicalStatus === "lost");

    return (
        <ClientsIncludes
            workStatuses={workStatuses}
            physicalStatuses={physicalStatuses}
            addClient={addClient}
            successfulClients={successfulClients}
            updateClient={updateClient}
            deleteClient={deleteClient}
            lostClients={lostClients}
        />
    );
};

export default ClientsPage;