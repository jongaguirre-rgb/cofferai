'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface JCurveData {
  year: number;
  nav: number;
  distributions: number;
  contributions: number;
}

interface FundReturnsChartProps {
  data: JCurveData[];
  title?: string;
}

export default function FundReturnsChart({ data, title = 'J-Curve Return Profile' }: FundReturnsChartProps) {
  return (
    <div className="my-8">
      {title && <h3 className="font-sans font-semibold text-text-primary mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
          <XAxis dataKey="year" stroke="var(--color-text-muted)" style={{ fontSize: '12px' }} />
          <YAxis stroke="var(--color-text-muted)" style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-light)',
              borderRadius: '2px',
            }}
          />
          <Legend wrapperStyle={{ color: 'var(--color-text-secondary)' }} />
          <Line type="monotone" dataKey="nav" stroke="var(--color-accent-blue)" strokeWidth={2} name="NAV" />
          <Line
            type="monotone"
            dataKey="distributions"
            stroke="var(--color-accent-green)"
            strokeWidth={2}
            name="Distributions"
          />
          <Line
            type="monotone"
            dataKey="contributions"
            stroke="var(--color-text-muted)"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Contributions"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
