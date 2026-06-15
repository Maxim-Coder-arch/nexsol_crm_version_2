import { ChartDataItem, Period } from ".";

export interface HeroSectionUiChartsProps {
  chartPeriod: Period;
  setChartPeriod: (period: Period) => void;
  chartData: ChartDataItem[];
  loading?: boolean;
}