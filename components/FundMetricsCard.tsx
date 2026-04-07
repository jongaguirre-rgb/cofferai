import { FundMetrics } from '@/types/content';

interface FundMetricsCardProps {
  metrics: FundMetrics;
}

export default function FundMetricsCard({ metrics }: FundMetricsCardProps) {
  const getPerformanceColor = (value: string) => {
    if (value.includes('Top')) return 'text-accent-green';
    if (value.includes('Median')) return 'text-accent-amber';
    return 'text-text-secondary';
  };

  const metricPairs = [
    { label: 'Gross MOIC', value: metrics.grossMoic.toFixed(1) + 'x' },
    { label: 'Net MOIC', value: metrics.netMoic.toFixed(1) + 'x' },
    { label: 'Gross IRR', value: metrics.grossIrr },
    { label: 'Net IRR', value: metrics.netIrr },
    { label: 'DPI', value: metrics.dpi.toFixed(1) + 'x' },
    { label: 'TVPI', value: metrics.tvpi.toFixed(1) + 'x' },
    { label: 'Vintage Quartile', value: metrics.vintageQuartile },
  ];

  return (
    <div className="card -mt-12 relative z-10 mb-8">
      <div className="mb-2">
        <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-text-muted">
          Fund Metrics
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metricPairs.map((metric, i) => (
          <div key={i} className="text-center">
            <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-2">
              {metric.label}
            </p>
            <p
              className={`font-mono text-lg font-bold ${
                metric.label === 'Vintage Quartile'
                  ? getPerformanceColor(metric.value)
                  : 'text-text-primary'
              }`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
