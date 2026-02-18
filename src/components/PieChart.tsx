interface PieSlice {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieSlice[];
  size?: number;
}

export function PieChart({ data, size = 200 }: PieChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const center = size / 2;
  const radius = size / 2 - 10;
  
  let currentAngle = -90; // Start from top
  
  const slices = data.map(slice => {
    const angle = (slice.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    const endAngle = currentAngle;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const d = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    
    return { ...slice, d, percentage: Math.round((slice.value / total) * 100) };
  });
  
  return (
    <div className="chart-card">
      <h3>Traffic Sources</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((s, i) => (
            <path key={i} d={s.d} fill={s.color} stroke="var(--bg)" strokeWidth="2">
              <title>{s.label}: {s.percentage}%</title>
            </path>
          ))}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
              <span style={{ color: 'var(--muted)' }}>{s.label}</span>
              <span style={{ fontWeight: 600, marginLeft: 'auto' }}>{s.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
