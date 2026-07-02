import { IFunnel } from "./funnel.type";
import { FunnelType, StageType } from "./ItemType.type";

export interface IncludesFunnelsProps {
    funnels: IFunnel[];
    filter: FunnelType | 'all';
    editingFunnel: IFunnel | null;
    isModalOpen: boolean;
    filteredFunnels: IFunnel[];
    funnelTypes: { value: FunnelType; label: string }[];
    stageTypes: { value: StageType; label: string; color: string }[];
    onAddFunnel: (data: { title: string; type: FunnelType }) => void;
    onDeleteFunnel: (id: string) => void;
    onEditFunnel: (funnel: IFunnel) => void;
    onSaveFunnel: (id: string, data: Partial<IFunnel>) => void;
    onFilterChange: (filter: FunnelType | 'all') => void;
    onCloseModal: () => void;
}