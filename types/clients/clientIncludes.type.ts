import { IClient } from "./client.type";

export interface ClientIncludesProps {
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