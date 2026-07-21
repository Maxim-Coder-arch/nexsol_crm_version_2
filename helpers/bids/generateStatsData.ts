import { ConversionStatsProps } from "@/types/bids/coversionStats.type";
import { calculateConversionStats } from "./calculateConversionStats";

export const generateStatsData = (bids: ConversionStatsProps['bids']) => {
    const { total, finished, inProgress, newBids, conversionRate } = calculateConversionStats(bids);
    return [
        { label: "Всего заявок", value: total },
        { label: "Новые", value: newBids },
        { label: "В работе", value: inProgress },
        { label: "Завершено", value: finished },
        { label: "Конверсия", value: `${conversionRate}%` },
    ]
}