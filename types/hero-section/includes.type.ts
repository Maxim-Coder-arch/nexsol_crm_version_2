import { Dispatch, SetStateAction } from "react";
import { Period } from "./preriod.type";
import { ChartDataItem } from "./ChartDataItem.type";
import { UserStat } from "./userStat.type";
import { Bid } from "./bid.type";
import { TeamMember } from "./teamMember.type";
import { DetailUser } from "./detailUser.type";

export interface IHeroSectionUiIncludes {
    chartPeriod: Period;
    setChartPeriod: Dispatch<SetStateAction<Period>>;
    chartData: ChartDataItem[];
    chartLoading: boolean;
    users: UserStat[];
    bids: Bid[];
    team: TeamMember[];
    detailUsers: DetailUser[]
}