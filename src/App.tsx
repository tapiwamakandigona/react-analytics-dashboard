import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { KPICards } from './components/KPICards';
import { RevenueChart } from './components/RevenueChart';
import { UsersChart } from './components/UsersChart';
import { DataTable } from './components/DataTable';
import { useAnalyticsData } from './hooks/useAnalyticsData';
import './App.css';

export default function App() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const data = useAnalyticsData(dateRange);

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className="main-content">
        <Header dateRange={dateRange} onDateRangeChange={setDateRange} />
        <div className="dashboard-grid">
          <KPICards data={data.kpis} />
          <div className="chart-row">
            <RevenueChart data={data.revenue} />
            <UsersChart data={data.users} />
          </div>
          <DataTable data={data.transactions} />
        </div>
      </main>
    </div>
  );
}
