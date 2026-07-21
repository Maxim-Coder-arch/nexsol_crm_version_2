import { BidsStatus } from "@/configs/bids/bids.cnf";
import { ConversionStatsProps } from "@/types/bids/coversionStats.type";

export const calculateConversionStats = (bids: ConversionStatsProps['bids']) => {
    const total = bids.length;
    const finished = bids.filter(b => b.status === BidsStatus.finished).length;
    const inProgress = bids.filter(b => b.status === BidsStatus.inProgress).length;
    const newBids = bids.filter(b => b.status === BidsStatus.new).length;
    const conversionRate = total > 0 ? ((finished / total) * 100).toFixed(1) : "0";

    return {
        total,
        finished,
        inProgress,
        newBids,
        conversionRate,
    }
}

