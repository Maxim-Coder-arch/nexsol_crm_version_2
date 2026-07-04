import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import styles from "../index.module.scss";
import { HeroSectionUiChartsProps } from "@/types/hero-section/uiProps.type";
import CustomTooltip from "./customTooltip";
import useTimeoutAnimationLoader from "@/app/hooks/useTimeoutAnimationLoader";

const HeroSectionUiCharts = ({ 
  chartPeriod, 
  setChartPeriod, 
  chartData, 
  loading
 }: HeroSectionUiChartsProps) => {
  const show = useTimeoutAnimationLoader();

  if (loading) {
    return (
      <div className={styles["root-hero-section-stats__charts"]}>
        <div className={styles["root-hero-section-stats__charts__container"]}>
          <div style={{ textAlign: 'center', padding: '50px' }}>Загрузка графиков...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={styles["root-hero-section-stats__charts"]}
    >    
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 15 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className={styles["root-hero-section-stats__charts__header"]}
      >
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: show ? 1 : 0, x: show ? 0 : -10 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        >
          Графики посещаемости
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: show ? 1 : 0, x: show ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className={styles["root-hero-section-stats__charts__tabs"]}
        >
          <button 
            className={chartPeriod === 'week' ? styles.active : ''}
            onClick={() => setChartPeriod('week')}
          >
            Неделя
          </button>
          <button 
            className={chartPeriod === 'month' ? styles.active : ''}
            onClick={() => setChartPeriod('month')}
          >
            Месяц
          </button>
          <button 
            className={chartPeriod === 'year' ? styles.active : ''}
            onClick={() => setChartPeriod('year')}
          >
            Год
          </button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 30 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        className={styles["root-hero-section-stats__charts__container"]}
      >
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#c4c4c4" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="#486284" 
              tick={{ fontSize: 12, fill: '#cbd7e8' }}
              axisLine={{ stroke: '#c4c4c4' }}
            />
            <YAxis 
              stroke="#486284" 
              tick={{ fontSize: 12, fill: '#cbd7e8' }}
              axisLine={{ stroke: '#c4c4c4' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: '#2a2a2a' }}
              formatter={(value) => <span style={{ color: '#ede7e7', fontSize: '12px' }}>{value === 'visitors' ? 'Всего' : 'Уникальные'}</span>}
            />
            <Line 
              type="monotone" 
              dataKey="visitors" 
              name="Всего посетителей"
              stroke="#c12060" 
              strokeWidth={3}
              dot={{ fill: '#c12060', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="unique" 
              name="Уникальные"
              stroke="#fff083" 
              strokeWidth={3}
              dot={{ fill: '#fff083', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default HeroSectionUiCharts;