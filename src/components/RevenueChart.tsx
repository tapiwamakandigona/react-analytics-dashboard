interface DataPoint {
  date: string;
  revenue: number;
  orders: number;
}

interface RevenueChartProps {
  data: DataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="chart-card">
      <h3>Revenue</h3>
      <div className="bar-chart">
        {data.map((point, i) => (
          <div key={i} className="bar-container">
            <div
              className="bar"
              style={{ height: `${(point.revenue / maxRevenue) * 100}%` }}
              title={`${point.date}: $${point.revenue.toLocaleString()}`}
            />
            <span className="bar-label">{point.date.slice(5)}</span>
          </div>
        ))}
      </div>
      <p className="chart-total">
        Total: ${data.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
      </p>
    </div>
  );
}
