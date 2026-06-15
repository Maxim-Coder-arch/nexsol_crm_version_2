"use client";
import { useState } from "react";
import ClientsIncludes from "./ui/includes";

export interface IClient {
    _id: string;
    name: string;
    workStatus: "new" | "inProgress" | "completed";
    physicalStatus: "successful" | "lost";
    createdAt: string;
    updatedAt: string;
    comment: string;
    additionalData: { key: string; value: string }[];
}

const initialClientsData: IClient[] = [
    {
        _id: "1",
        name: "ООО Ромашка",
        workStatus: "new",
        physicalStatus: "successful",
        createdAt: "15.06.2026, 14:30",
        updatedAt: "15.06.2026, 14:30",
        comment: "Первичный контакт, нужен сайт-визитка",
        additionalData: [{ key: "Телефон", value: "+7 (999) 123-45-67" }],
    },
    {
        _id: "2",
        name: "ИП Иванов",
        workStatus: "inProgress",
        physicalStatus: "successful",
        createdAt: "10.06.2026, 11:20",
        updatedAt: "12.06.2026, 15:45",
        comment: "Обсуждаем условия разработки CRM",
        additionalData: [
            { key: "Telegram", value: "@ivanov" },
            { key: "Бюджет", value: "500 000 ₽" },
        ],
    },
    {
        _id: "3",
        name: "Студия Дизайна",
        workStatus: "completed",
        physicalStatus: "successful",
        createdAt: "01.06.2026, 09:15",
        updatedAt: "08.06.2026, 18:00",
        comment: "Проект завершен, клиент доволен",
        additionalData: [{ key: "Сумма", value: "350 000 ₽" }],
    },
    {
        _id: "4",
        name: "ООО ТехноСтрой",
        workStatus: "new",
        physicalStatus: "lost",
        createdAt: "05.06.2026, 16:45",
        updatedAt: "05.06.2026, 16:45",
        comment: "Не сошлись по бюджету",
        additionalData: [{ key: "Причина", value: "Выбрали конкурента" }],
    },
];

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
    const [clients, setClients] = useState<IClient[]>(initialClientsData);

    const addClient = (client: Omit<IClient, "_id" | "createdAt" | "updatedAt">) => {
        const now = new Date().toLocaleString();
        const newClient: IClient = {
            ...client,
            _id: Date.now().toString(),
            createdAt: now,
            updatedAt: now,
        };
        setClients([newClient, ...clients]);
    };

    const updateClient = (id: string, updates: Partial<IClient>) => {
        setClients(prev =>
            prev.map(client =>
                client._id === id
                    ? { ...client, ...updates, updatedAt: new Date().toLocaleString() }
                    : client
            )
        );
    };

    const deleteClient = (id: string) => {
        setClients(prev => prev.filter(client => client._id !== id));
    };

    const successfulClients = clients.filter(
        c => c.physicalStatus === "successful"
    );
    const lostClients = clients.filter(c => c.physicalStatus === "lost");

    return <ClientsIncludes
        workStatuses={workStatuses}
        physicalStatuses={physicalStatuses}
        addClient={addClient}
        successfulClients={successfulClients}
        updateClient={updateClient}
        deleteClient={deleteClient}
        lostClients={lostClients}
    />
};

export default ClientsPage;