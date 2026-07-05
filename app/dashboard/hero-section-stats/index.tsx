"use client";

import { useState, useEffect } from "react";
import HeroSectionUiIncludes from "./ui/includes";
import { Period } from "@/types/hero-section/preriod.type";
import { ChartDataItem } from "@/types/hero-section/ChartDataItem.type";
import { Bid } from "@/types/hero-section/bid.type";
import { DetailUser } from "@/types/hero-section/detailUser.type";
import { TeamMember } from "@/types/hero-section/teamMember.type";
import { UserStat } from "@/types/hero-section/userStat.type";
import { VisitorsStats } from "@/types/hero-section/visitorStats.type";
import { API_URLS, initialUserStats } from "@/config-and-data/hero-section";

const fetchData = async (
  url: string,
  onSuccess: (data: any[]) => void,
  onError?: () => void
) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    onSuccess(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    if (onError) onError();
  }
};

const HeroSectionStats = () => {
  const [chartPeriod, setChartPeriod] = useState<Period>("week");
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [chartLoading, setChartLoading] = useState(true);
  const [bids, setBids] = useState<Bid[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [detailUsers, setDetailUsers] = useState<DetailUser[]>([]);
  const [userStats, setUserStats] = useState<UserStat[]>(initialUserStats);

  useEffect(() => {
    const fetchChartData = async () => {
      setChartLoading(true);
      try {
        const res = await fetch(`${API_URLS.chart}?period=${chartPeriod}`);
        const data = await res.json();
        setChartData(data.data || []);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, [chartPeriod]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(API_URLS.stats);
        const stats: VisitorsStats = await res.json();

        setUserStats([
          { label: "Уникальные сегодня", value: stats.uniqueToday },
          { label: "Уникальные за неделю", value: stats.uniqueWeek },
          { label: "Уникальные за месяц", value: stats.uniqueMonth },
          { label: "Всего сегодня", value: stats.totalToday },
          { label: "Всего за неделю", value: stats.totalWeek },
          { label: "Всего за месяц", value: stats.totalMonth },
        ]);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    fetchData(API_URLS.leads, (data) => setBids(data as Bid[]), () => setBids([]));
  }, []);

  useEffect(() => {
    fetchData(API_URLS.team, (data) => setTeam(data as TeamMember[]), () => setTeam([]));
  }, []);

  useEffect(() => {
    fetchData(API_URLS.visitors, (data) => setDetailUsers(data as DetailUser[]), () =>
      setDetailUsers([])
    );
  }, []);

  return (
    <HeroSectionUiIncludes
      chartPeriod={chartPeriod}
      setChartPeriod={setChartPeriod}
      chartData={chartData}
      chartLoading={chartLoading}
      users={userStats}
      bids={bids}
      team={team}
      detailUsers={detailUsers}
    />
  );
};

export default HeroSectionStats;