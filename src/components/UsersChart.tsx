interface UserData {
  date: string;
  newUsers: number;
  activeUsers: number;
}

interface UsersChartProps {
  data: UserData[];
}

export function UsersChart({ data }: UsersChartProps) {
  const maxUsers = Math.max(...data.map(d => d.activeUsers));
  
  return (
    <div className="chart-card">
      <h3>Users</h3>
      <div className="line-chart">
        <svg viewBox={`0 0 ${data.length * 40} 200`} className="chart-svg">
          {/* Active users line */}
          <polyline
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            points={data.map((d, i) => `${i * 40 + 20},${200 - (d.activeUsers / maxUsers) * 180}`).join(' ')}
          />
          {/* New users line */}
          <polyline
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray="5,5"
            points={data.map((d, i) => `${i * 40 + 20},${200 - (d.newUsers / maxUsers) * 180}`).join(' ')}
          />
          {/* Data points */}
          {data.map((d, i) => (
            <circle key={i} cx={i * 40 + 20} cy={200 - (d.activeUsers / maxUsers) * 180} r="3" fill="#6366f1" />
          ))}
        </svg>
      </div>
      <div className="chart-legend">
        <span className="legend-item"><span className="dot" style={{background:'#6366f1'}} /> Active</span>
        <span className="legend-item"><span className="dot" style={{background:'#22c55e'}} /> New</span>
      </div>
    </div>
  );
}
