import { IStatusOption, IClient } from "./common.type";

export interface ClientsColumnProps {
    title: string;
    clients: IClient[];
    workStatuses: readonly IStatusOption[];
    physicalStatuses: readonly IStatusOption[];
    onUpdate: (id: string, updates: Partial<IClient>) => void;
    onDelete: (id: string) => void;
}