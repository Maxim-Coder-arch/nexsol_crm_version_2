import { ChartDataItem } from "./ChartDataItem.type";
import { Period } from "./preriod.type";

export interface HeroSectionUiChartsProps {
  chartPeriod: Period;
  setChartPeriod: (period: Period) => void;
  chartData: ChartDataItem[];
  loading?: boolean;
}