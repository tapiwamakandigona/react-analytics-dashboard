import { useMemo } from 'react';

function generateDates(days: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

function seededRandom(seed: number) {
  return ((seed * 9301 + 49297) % 233280) / 233280;
}

export function useAnalyticsData(range: '7d' | '30d' | '90d') {
  return useMemo(() => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const dates = generateDates(days);
    
    const revenue = dates.map((date, i) => ({
      date,
      revenue: Math.floor(seededRandom(i + days) * 15000) + 5000,
      orders: Math.floor(seededRandom(i + days + 100) * 200) + 50,
    }));
    
    const users = dates.map((date, i) => ({
      date,
      newUsers: Math.floor(seededRandom(i + days + 200) * 500) + 100,
      activeUsers: Math.floor(seededRandom(i + days + 300) * 3000) + 1000,
    }));
    
    const totalRevenue = revenue.reduce((s, d) => s + d.revenue, 0);
    const totalOrders = revenue.reduce((s, d) => s + d.orders, 0);
    const totalNewUsers = users.reduce((s, d) => s + d.newUsers, 0);
    const avgActive = Math.floor(users.reduce((s, d) => s + d.activeUsers, 0) / users.length);
    
    const names = ['Alex Johnson', 'Sarah Chen', 'Mike Brown', 'Emily Davis', 'James Wilson', 'Lisa Taylor', 'David Lee', 'Anna Martinez'];
    const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'completed', 'completed', 'pending', 'failed'];
    
    const transactions = Array.from({ length: 20 }, (_, i) => ({
      id: `TX-${String(i + 1).padStart(4, '0')}`,
      customer: names[i % names.length],
      amount: Math.floor(seededRandom(i + 500) * 500) + 10,
      status: statuses[Math.floor(seededRandom(i + 600) * statuses.length)],
      date: dates[Math.floor(seededRandom(i + 700) * dates.length)],
    }));
    
    return {
      kpis: [
        { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: 12.5, icon: '\u{1F4B0}' },
        { label: 'Orders', value: totalOrders.toLocaleString(), change: 8.2, icon: '\u{1F4E6}' },
        { label: 'New Users', value: totalNewUsers.toLocaleString(), change: -3.1, icon: '\u{1F465}' },
        { label: 'Avg Active Users', value: avgActive.toLocaleString(), change: 15.7, icon: '\u{1F4C8}' },
      ],
      revenue,
      users,
      transactions,
    };
  }, [range]);
}
