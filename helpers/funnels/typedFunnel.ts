import { IFunnel } from "@/types/funnels/funnel.type";
import { funnelType } from "@/types/funnels/funnelCard.type";

export const typedLabel = (funnelTypes: funnelType[], funnel: IFunnel) => {
    return funnelTypes.find(t => t.value === funnel.type)?.label || funnel.type;
}
