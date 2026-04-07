import { ScenarioRow } from '@/types/content';

interface ScenarioTableProps {
  rows: ScenarioRow[];
}

export default function ScenarioTable({ rows }: ScenarioTableProps) {
  const formatValue = (value: number | string) => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: value % 1 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
      });
    }
    return '—';
  };

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-bg-tertiary">
            <th className="text-left font-sans font-bold text-xs uppercase tracking-wider px-4 py-3 border border-border-light">
              Scenario
            </th>
            <th className="text-right font-mono font-bold text-xs uppercase tracking-wider px-4 py-3 border border-border-light text-accent-red">
              Bear
            </th>
            <th className="text-right font-mono font-bold text-xs uppercase tracking-wider px-4 py-3 border border-border-light text-accent-amber">
              Base
            </th>
            <th className="text-right font-mono font-bold text-xs uppercase tracking-wider px-4 py-3 border border-border-light text-accent-green">
              Bull
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-bg-secondary'}>
              <td className="font-sans px-4 py-3 border border-border-light text-text-primary font-semibold">
                {row.label}
              </td>
              <td className="font-mono px-4 py-3 border border-border-light text-right text-accent-red">
                {formatValue(row.bear)}
              </td>
              <td className="font-mono px-4 py-3 border border-border-light text-right text-accent-amber">
                {formatValue(row.base)}
              </td>
              <td className="font-mono px-4 py-3 border border-border-light text-right text-accent-green">
                {formatValue(row.bull)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
