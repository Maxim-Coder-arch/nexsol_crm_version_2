export interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        name: string;
        value: number;
        color: string;
        dataKey: string;
    }[];
    label?: string;
}