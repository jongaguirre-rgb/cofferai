import { StartupMetrics, StartupPost } from '@/types/content';

interface StartupMetricsCardProps {
  post: StartupPost;
}

export default function StartupMetricsCard({ post }: StartupMetricsCardProps) {
  const metrics = post.metrics;

  const cells = [
    { label: 'Last Valuation', value: post.lastValuation },
    { label: 'Total Raised', value: post.totalRaised },
    { label: 'Founded', value: String(post.founded) },
    { label: 'HQ', value: post.hq },
    ...(metrics.revenue ? [{ label: 'Revenue (Est.)', value: metrics.revenue }] : []),
    ...(metrics.revenueGrowth ? [{ label: 'Revenue Growth', value: metrics.revenueGrowth }] : []),
    ...(metrics.tpv ? [{ label: 'TPV', value: metrics.tpv }] : []),
    ...(metrics.employees ? [{ label: 'Employees', value: metrics.employees }] : []),
  ];

  return (
    <div className="card -mt-6 relative z-10 max-w-article mx-auto">
      <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-text-muted mb-4">
        Company Metrics
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cells.slice(0, 6).map((cell) => (
          <div key={cell.label} className="border border-border-light p-3 rounded-none">
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold mb-1">
              {cell.label}
            </p>
            <p className="font-mono text-sm font-semibold text-text-primary">{cell.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
