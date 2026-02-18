interface KPI {
  label: string;
  value: string;
  change: number;
  icon: string;
}

interface KPICardsProps {
  data: KPI[];
}

export function KPICards({ data }: KPICardsProps) {
  return (
    <div className="kpi-grid">
      {data.map(kpi => (
        <div key={kpi.label} className="kpi-card">
          <div className="kpi-icon">{kpi.icon}</div>
          <div className="kpi-info">
            <p className="kpi-label">{kpi.label}</p>
            <p className="kpi-value">{kpi.value}</p>
            <p className={`kpi-change ${kpi.change >= 0 ? 'positive' : 'negative'}`}>
              {kpi.change >= 0 ? '\u2191' : '\u2193'} {Math.abs(kpi.change)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
