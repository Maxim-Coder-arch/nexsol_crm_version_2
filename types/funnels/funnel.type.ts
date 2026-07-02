import { IFunnelItem } from "./funneltem.type";
import { FunnelType } from "./ItemType.type";

export interface IFunnel {
    _id: string;
    title: string;
    type: FunnelType;
    items: IFunnelItem[];
    createdAt: Date;
}