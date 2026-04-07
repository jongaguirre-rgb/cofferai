interface SensitivityTableProps {
  rowLabel: string;
  colLabel: string;
  rows: Array<{
    label: string;
    values: number[];
  }>;
  highlightRow?: number;
  highlightCol?: number;
}

export default function SensitivityTable({
  rowLabel,
  colLabel,
  rows,
  highlightRow = 1,
  highlightCol = 1,
}: SensitivityTableProps) {
  const colCount = rows[0]?.values.length || 0;
  const colHeaders = Array.from({ length: colCount }, (_, i) => `${(i - highlightCol + 1) * 5}-${i - highlightCol + 1}0%`);

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-bg-tertiary">
            <th className="font-mono font-bold text-xs uppercase tracking-wider px-2 py-2 border border-border-light text-left">
              {rowLabel}
            </th>
            {colHeaders.map((header, i) => (
              <th
                key={i}
                className={`font-mono font-bold text-xs uppercase tracking-wider px-2 py-2 border border-border-light text-right ${
                  i === highlightCol ? 'bg-accent-amber/20' : ''
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-transparent' : 'bg-bg-secondary'}>
              <td
                className={`font-mono font-bold text-xs uppercase tracking-wider px-2 py-2 border border-border-light text-left ${
                  rowIndex === highlightRow ? 'bg-accent-amber/20' : ''
                }`}
              >
                {row.label}
              </td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className={`font-mono px-2 py-2 border border-border-light text-right ${
                    rowIndex === highlightRow && colIndex === highlightCol
                      ? 'bg-accent-amber font-bold text-bg-dark'
                      : rowIndex === highlightRow || colIndex === highlightCol
                        ? 'bg-accent-amber/10'
                        : ''
                  }`}
                >
                  ${value.toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
