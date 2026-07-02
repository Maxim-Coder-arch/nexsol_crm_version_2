import { IFunnel } from "./funnel.type";
import { FunnelType, StageType } from "./ItemType.type";

export interface IEditFunnelModalProps {
    funnel: IFunnel | null; 
    isOpen: boolean; 
    onClose: () => void; 
    onSave: (id: string, data: Partial<IFunnel>) => void;
    funnelTypes: { value: FunnelType; label: string }[];
    stageTypes: { value: StageType; label: string; color: string }[];
}