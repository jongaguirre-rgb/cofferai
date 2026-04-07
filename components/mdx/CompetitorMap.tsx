'use client';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Company {
  name: string;
  x: number;
  y: number;
}

interface CompetitorMapProps {
  xLabel: string;
  yLabel: string;
  companies: Company[];
}

export default function CompetitorMap({ xLabel, yLabel, companies }: CompetitorMapProps) {
  return (
    <div className="my-8">
      <h3 className="font-sans font-semibold text-text-primary mb-4">Competitive Positioning</h3>
      <ResponsiveContainer width="100%" height={350}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
          <XAxis
            type="number"
            dataKey="x"
            name={xLabel}
            stroke="var(--color-text-muted)"
            label={{ value: xLabel, position: 'bottom', offset: 10 }}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yLabel}
            stroke="var(--color-text-muted)"
            label={{ value: yLabel, angle: -90, position: 'insideLeft' }}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-light)',
              borderRadius: '2px',
            }}
            formatter={(value) => (typeof value === 'number' ? value.toFixed(2) : value)}
          />
          <Scatter
            name="Companies"
            data={companies}
            fill="var(--color-accent-blue)"
            shape="circle"
            fillOpacity={0.7}
          />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-3">
        {companies.map((company) => (
          <div key={company.name} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-accent-blue rounded-full"></div>
            <span className="text-text-secondary">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
