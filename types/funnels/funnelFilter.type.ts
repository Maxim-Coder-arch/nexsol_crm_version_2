import { FunnelType } from "./ItemType.type";

export interface IFunnelFilterProps {
    activeFilter: FunnelType | 'all'; 
    onFilterChange: (filter: FunnelType | 'all') => void,
    funnelTypes: { value: FunnelType; label: string }[]
}