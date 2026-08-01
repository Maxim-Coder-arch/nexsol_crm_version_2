import { IStatusOption, IClient } from "./common.type";

export interface ClientCardProps {
    client: IClient;
    workStatuses: readonly IStatusOption[];
    physicalStatuses: readonly IStatusOption[];
    onUpdate: (id: string, updates: Partial<IClient>) => void;
    onDelete: (id: string) => void;
}