interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
}

/**
 * Inline sparkline chart component.
 * Perfect for showing trends in KPI cards.
 */
export function Sparkline({ data, width = 100, height = 30, color = "#6366f1", fill = true }: SparklineProps) {
  if (data.length < 2) return null;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return { x, y };
  });
  
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const fillD = pathD + ` L ${width} ${height} L 0 ${height} Z`;
  
  const trend = data[data.length - 1] >= data[0] ? "up" : "down";
  const lineColor = trend === "up" ? "#22c55e" : "#ef4444";
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {fill && (
        <path d={fillD} fill={lineColor} opacity="0.1" />
      )}
      <path d={pathD} fill="none" stroke={lineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last point dot */}
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3" fill={lineColor} />
    </svg>
  );
}
