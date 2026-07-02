import { IFunnelItem } from "./funneltem.type";
import { StageType } from "./ItemType.type";

export interface IFunnelItemsListProps {
    items: IFunnelItem[], 
    stageTypes: { 
        value: StageType; 
        label: string; 
        color: string
    }[]
}