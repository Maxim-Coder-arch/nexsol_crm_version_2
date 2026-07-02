import { ChartDataItem } from "./ChartDataItem.type";

export interface ChartDataMap {
  week: ChartDataItem[];
  month: ChartDataItem[];
  year: ChartDataItem[];
}