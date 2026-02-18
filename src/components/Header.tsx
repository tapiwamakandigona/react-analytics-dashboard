interface HeaderProps {
  dateRange: '7d' | '30d' | '90d';
  onDateRangeChange: (range: '7d' | '30d' | '90d') => void;
}

export function Header({ dateRange, onDateRangeChange }: HeaderProps) {
  return (
    <header className="dashboard-header">
      <div>
        <h2>Dashboard</h2>
        <p className="header-subtitle">Overview of your business metrics</p>
      </div>
      <div className="date-range-selector">
        {(['7d', '30d', '90d'] as const).map(range => (
          <button
            key={range}
            className={dateRange === range ? 'active' : ''}
            onClick={() => onDateRangeChange(range)}
          >
            {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
          </button>
        ))}
      </div>
    </header>
  );
}
