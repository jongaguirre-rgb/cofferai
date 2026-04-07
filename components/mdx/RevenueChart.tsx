'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RevenueChartData {
  year: string | number;
  revenue: number;
  margin: number;
}

interface RevenueChartProps {
  data: RevenueChartData[];
  title?: string;
  revenueLabel?: string;
  marginLabel?: string;
}

export default function RevenueChart({
  data,
  title = 'Revenue & Margin Trend',
  revenueLabel = 'Revenue',
  marginLabel = 'Margin %',
}: RevenueChartProps) {
  return (
    <div className="my-8">
      {title && <h3 className="font-sans font-semibold text-text-primary mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
          <XAxis
            dataKey="year"
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="left"
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="var(--color-text-muted)"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-light)',
              borderRadius: '2px',
            }}
            formatter={(value: number) => value.toFixed(2)}
          />
          <Legend wrapperStyle={{ color: 'var(--color-text-secondary)' }} />
          <Bar
            yAxisId="left"
            dataKey="revenue"
            fill="var(--color-accent-blue)"
            name={revenueLabel}
            radius={[2, 2, 0, 0]}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="margin"
            stroke="var(--color-accent-green)"
            name={marginLabel}
            strokeWidth={2}
            dot={{ fill: 'var(--color-accent-green)', r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
