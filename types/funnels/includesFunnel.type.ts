import { Dispatch, FormEvent, SetStateAction } from "react";
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
    onDeleteFunnel: (id: string) => void;
    onEditFunnel: (funnel: IFunnel) => void;
    onSaveFunnel: (id: string, data: Partial<IFunnel>) => void;
    onFilterChange: (filter: FunnelType | 'all') => void;
    onCloseModal: () => void;
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
    type: FunnelType;
    setType: Dispatch<SetStateAction<FunnelType>>;
    handleSubmit: (e: FormEvent<Element>) => void;
}