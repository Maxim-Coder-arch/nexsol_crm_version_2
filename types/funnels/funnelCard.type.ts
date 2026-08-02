import { IFunnel } from "./funnel.type";
import { FunnelType, StageType } from "./ItemType.type";

export type funnelType = { value: FunnelType; label: string };

export interface IFunnelCardProps {
    funnel: IFunnel; 
    onDelete: (id: string) => void; 
    onEdit: (funnel: IFunnel) => void;
    funnelTypes: funnelType[];
    stageTypes: { value: StageType; label: string; color: string }[]
}