interface HeatmapProps {
  data: Record<string, number>; // date -> value
  weeks?: number;
}

/**
 * GitHub-style activity heatmap.
 * Shows daily values as colored squares in a grid.
 */
export function ActivityHeatmap({ data, weeks = 12 }: HeatmapProps) {
  const cellSize = 14;
  const cellGap = 3;
  const days = weeks * 7;
  
  const now = new Date();
  const dates: Array<{ date: string; value: number; dayOfWeek: number }> = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    dates.push({
      date: dateStr,
      value: data[dateStr] || 0,
      dayOfWeek: d.getDay(),
    });
  }
  
  const maxValue = Math.max(...dates.map(d => d.value), 1);
  
  const getColor = (value: number) => {
    if (value === 0) return "#1a1a26";
    const intensity = value / maxValue;
    if (intensity < 0.25) return "#0e4429";
    if (intensity < 0.5) return "#006d32";
    if (intensity < 0.75) return "#26a641";
    return "#39d353";
  };
  
  const width = weeks * (cellSize + cellGap) + 40;
  const height = 7 * (cellSize + cellGap) + 20;
  
  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
  
  return (
    <div className="chart-card">
      <h3>Activity</h3>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Day labels */}
        {dayLabels.map((label, i) => (
          label && <text key={i} x="0" y={i * (cellSize + cellGap) + cellSize + 10} fill="var(--muted)" fontSize="10">{label}</text>
        ))}
        
        {/* Cells */}
        {dates.map((d, i) => {
          const weekIndex = Math.floor(i / 7);
          const dayIndex = d.dayOfWeek;
          const x = 30 + weekIndex * (cellSize + cellGap);
          const y = dayIndex * (cellSize + cellGap) + 10;
          
          return (
            <rect
              key={d.date}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              rx="3"
              fill={getColor(d.value)}
              style={{ transition: "fill 0.2s" }}
            >
              <title>{d.date}: {d.value}</title>
            </rect>
          );
        })}
      </svg>
    </div>
  );
}
