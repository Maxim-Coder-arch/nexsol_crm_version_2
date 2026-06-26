export interface ChartDataItem {
  date: string;
  visitors: number;
  unique: number;
}

export interface ChartDataMap {
  week: ChartDataItem[];
  month: ChartDataItem[];
  year: ChartDataItem[];
}

export interface UserStat {
  label: string;
  value: number;
}


export interface TeamMember {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'director' | 'moderator' | 'viewer';
  specialties: string[];
  responsibilities?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DetailUser {
  _id: string;
  page: string;
  source: string;
  device: string;
  time: string;
}

export interface VisitorsStats {
  uniqueToday: number;
  uniqueWeek: number;
  uniqueMonth: number;
  totalToday: number;
  totalWeek: number;
  totalMonth: number;
}

export interface UserStat {
  label: string;
  value: number;
}

export interface Bid {
  _id: string;
  email: string;
  contact: string;
  name: string;
  createdAt: string;
  time: string;
  status: string;
  message: string;
}

export type Period = 'week' | 'month' | 'year';