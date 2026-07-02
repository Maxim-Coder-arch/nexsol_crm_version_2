import { IClient } from "./client.type";

export interface ClientCardProps {
    client: IClient;
    workStatuses: readonly { value: string; label: string }[];
    physicalStatuses: readonly { value: string; label: string }[];
    onUpdate: (id: string, updates: Partial<IClient>) => void;
    onDelete: (id: string) => void;
}