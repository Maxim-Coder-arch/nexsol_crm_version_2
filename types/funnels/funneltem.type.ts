import { StageType } from "./ItemType.type";

export interface IFunnelItem {
    id: string;
    title: string;
    type: StageType;
}

export interface IFunnelItemProps {
    item: IFunnelItem; 
    index: number; 
    total: number, 
    stageTypes: { 
        value: StageType; 
        label: string; 
        color: string
    }[]
}