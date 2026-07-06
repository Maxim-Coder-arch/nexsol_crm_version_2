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
import { showToast } from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/app/hooks/store";

const fetchData = async (
  url: string,
  onSuccess: (data: any[]) => void,
  onError?: () => void
) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    onSuccess(Array.isArray(data) ? data : []);
  } catch {
    if (onError) onError();
  }
};

const HeroSectionStats = () => {
  const dispatch = useAppDispatch();
  const [chartPeriod, setChartPeriod] = useState<Period>("week");
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [chartLoading, setChartLoading] = useState(true);
  const [bids, setBids] = useState<Bid[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [detailUsers, setDetailUsers] = useState<DetailUser[]>([]);
  const [userStats, setUserStats] = useState<UserStat[]>(initialUserStats);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      setChartLoading(true);
      try {
        const res = await fetch(`${API_URLS.chart}?period=${chartPeriod}`);
        const data = await res.json();
        setChartData(data.data || []);
      } catch {
        dispatch(showToast({
          type: 'error',
          title: 'Ошибка загрузки',
          message: 'Не удалось загрузить данные графиков',
          duration: 4000,
        }));
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, [chartPeriod, dispatch]);

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
      } catch {
        dispatch(showToast({
          type: 'error',
          title: 'Ошибка загрузки',
          message: 'Не удалось загрузить статистику',
          duration: 4000,
        }));
      }
    };

    fetchStats();
  }, [dispatch]);

  useEffect(() => {
    fetchData(
      API_URLS.leads,
      (data) => {
        setBids(data as Bid[]);
        if (data.length > 0) {
          dispatch(showToast({
            type: 'info',
            title: 'Новые заявки!',
            message: `У вас ${data.length} новая(ых) заявка(и)`,
            duration: 4000,
          }));
        }
      },
      () => {
        setBids([]);
        dispatch(showToast({
          type: 'error',
          title: 'Ошибка загрузки',
          message: 'Не удалось загрузить заявки',
          duration: 4000,
        }));
      }
    );
  }, [dispatch]);

  useEffect(() => {
    fetchData(
      API_URLS.team,
      (data) => setTeam(data as TeamMember[]),
      () => {
        setTeam([]);
        dispatch(showToast({
          type: 'error',
          title: 'Ошибка загрузки',
          message: 'Не удалось загрузить команду',
          duration: 4000,
        }));
      }
    );
  }, [dispatch]);

  useEffect(() => {
    fetchData(
      API_URLS.visitors,
      (data) => setDetailUsers(data as DetailUser[]),
      () => {
        setDetailUsers([]);
        dispatch(showToast({
          type: 'error',
          title: 'Ошибка загрузки',
          message: 'Не удалось загрузить посетителей',
          duration: 4000,
        }));
      }
    );
  }, [dispatch]);

  useEffect(() => {
    const allLoaded = !chartLoading && bids.length >= 0 && team.length >= 0;
    if (allLoaded && !dataLoaded) {
      setDataLoaded(true);
      dispatch(showToast({
        type: 'success',
        title: 'Данные обновлены',
        message: 'Все данные успешно загружены',
        duration: 2500,
      }));
    }
  }, [chartLoading, bids, team, detailUsers, dataLoaded, dispatch]);

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