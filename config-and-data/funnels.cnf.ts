import { FunnelType, StageType } from "@/types/funnels/ItemType.type";

const funnelTypes: { value: FunnelType; label: string }[] = [
    { value: 'sales', label: 'Продажи' },
    { value: 'attraction', label: 'Привлечение' },
    { value: 'b2b', label: 'B2B' },
];

const stageTypes: { value: StageType; label: string; color: string }[] = [
    { value: 'TOFU', label: 'TOFU', color: '#4CAF50' },
    { value: 'MOFU', label: 'MOFU', color: '#FF9800' },
    { value: 'BOFU', label: 'BOFU', color: '#F44336' },
];

export { funnelTypes, stageTypes };