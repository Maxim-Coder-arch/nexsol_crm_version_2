"use client";
import { useState, useEffect } from "react";
import { Period, ChartDataItem, UserStat, Bid, TeamMember, DetailUser, VisitorsStats } from "../../../types/hero-section";
import HeroSectionUiIncludes from "./ui/includes";

const HeroSectionStats = () => {
  const [chartPeriod, setChartPeriod] = useState<Period>('week');
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [chartLoading, setChartLoading] = useState(true);
  const [bids, setBids] = useState<Bid[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [detailUsers, setDetailUsers] = useState<DetailUser[]>([]);
  const [userStats, setUserStats] = useState<UserStat[]>([
    { label: "Уникальные сегодня", value: 0 },
    { label: "Уникальные за неделю", value: 0 },
    { label: "Уникальные за месяц", value: 0 },
    { label: "Всего сегодня", value: 0 },
    { label: "Всего за неделю", value: 0 },
    { label: "Всего за месяц", value: 0 },
  ]);

  useEffect(() => {
    const fetchChartData = async () => {
      setChartLoading(true);
      try {
        const res = await fetch(`/api/hero-section/chart?period=${chartPeriod}`);
        const data = await res.json();
        setChartData(data.data || []);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, [chartPeriod]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/hero-section/stats');
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
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

   useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/hero-section/leads');
        const data = await res.json();
        setBids(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
        setBids([]);
      }
    };

    fetchLeads();
  }, []);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
            const res = await fetch('/api/hero-section/team');
            const data = await res.json();
            setTeam(Array.isArray(data) ? data : []);
            } catch (error) {
            console.error('Failed to fetch team:', error);
            setTeam([]);
            }
        };

        fetchTeam();
    }, []);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const res = await fetch('/api/hero-section/visitors');
                const data = await res.json();
                setDetailUsers(Array.isArray(data) ? data : []);
                } catch (error) {
                console.error('Failed to fetch visitors:', error);
                setDetailUsers([]);
            }
        };

        fetchVisitors();
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