import { UserStat } from "@/types/hero-section/userStat.type";

const initialUserStats: UserStat[] = [
  { label: "Уникальные сегодня", value: 0 },
  { label: "Уникальные за неделю", value: 0 },
  { label: "Уникальные за месяц", value: 0 },
  { label: "Всего сегодня", value: 0 },
  { label: "Всего за неделю", value: 0 },
  { label: "Всего за месяц", value: 0 },
];

const API_URLS = {
  chart: "/api/hero-section/chart",
  stats: "/api/hero-section/stats",
  leads: "/api/hero-section/leads",
  team: "/api/hero-section/team",
  visitors: "/api/hero-section/visitors",
};

export { initialUserStats, API_URLS }