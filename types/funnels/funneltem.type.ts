import { StageType } from "./ItemType.type";

export interface IFunnelItem {
    id: string;
    title: string;
    type: StageType;
}

export interface IItemStageType {
    value: StageType; 
    label: string; 
    color: string
}

export interface IFunnelItemProps {
    item: IFunnelItem; 
    index: number; 
    total: number, 
    stageTypes: IItemStageType[]
}