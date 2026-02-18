interface Transaction {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

interface DataTableProps {
  data: Transaction[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="table-card">
      <h3>Recent Transactions</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map(tx => (
              <tr key={tx.id}>
                <td>{tx.customer}</td>
                <td>${tx.amount.toFixed(2)}</td>
                <td><span className={`badge ${tx.status}`}>{tx.status}</span></td>
                <td>{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
