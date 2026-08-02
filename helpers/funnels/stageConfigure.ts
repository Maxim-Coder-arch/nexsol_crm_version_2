import { IFunnelItem, IItemStageType } from "@/types/funnels/funneltem.type";

export const stageConfigure = (stageTypes: IItemStageType[], item: IFunnelItem, index: number, total: number) => {
    const stageInfo = stageTypes.find(s => s.value === item.type);
    const width = 100 - (index / total) * 25;

    return { stageInfo, width }
}