import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styles from "../index.module.scss";
import { HeroSectionUiChartsProps } from "@/types/hero-section/uiProps.type";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '10px',
        borderRadius: '5px',
        border: `1px solid #c12060`,
      }}>
        <p style={{ color: '#e3e1e1', fontSize: '12px', margin: 0 }}>{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} style={{ color: item.color, fontSize: '12px', margin: '5px 0 0' }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


const HeroSectionUiCharts = ({ chartPeriod, setChartPeriod, chartData, loading }: HeroSectionUiChartsProps) => {
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
    <div className={styles["root-hero-section-stats__charts"]}>    
      <div className={styles["root-hero-section-stats__charts__header"]}>
        <h2>Графики посещаемости</h2>
        <div className={styles["root-hero-section-stats__charts__tabs"]}>
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
        </div>
      </div>
      
      <div className={styles["root-hero-section-stats__charts__container"]}>
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
      </div>
    </div>
  );
};

export default HeroSectionUiCharts;