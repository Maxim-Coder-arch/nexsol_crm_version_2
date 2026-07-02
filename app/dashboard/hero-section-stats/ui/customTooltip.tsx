import { CustomTooltipProps } from "@/types/hero-section/customTooltip.type";

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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

export default CustomTooltip;