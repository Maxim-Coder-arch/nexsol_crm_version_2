import { IFunnel } from "./funnel.type";
import { FunnelType, StageType } from "./ItemType.type";

export interface IFunnelCardProps {
    funnel: IFunnel; 
    onDelete: (id: string) => void; 
    onEdit: (funnel: IFunnel) => void;
    funnelTypes: { value: FunnelType; label: string }[];
    stageTypes: { value: StageType; label: string; color: string }[]
}