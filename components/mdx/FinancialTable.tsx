interface FinancialTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
}

function formatCell(value: string): { text: string; className: string } {
  const v = value.trim();

  // Parenthetical negatives stay red
  if (v.startsWith('(') && v.endsWith(')')) {
    return { text: v, className: 'text-accent-red' };
  }

  // Explicit negatives → convert to parens and color red
  if (v.startsWith('-') && v !== '-') {
    return { text: `(${v.slice(1)})`, className: 'text-accent-red' };
  }

  // Positive percent change
  if (v.startsWith('+') && v.includes('%')) {
    return { text: v, className: 'text-accent-green' };
  }

  return { text: v, className: 'text-text-secondary' };
}

export default function FinancialTable({ headers, rows, caption }: FinancialTableProps) {
  const isNumericColumn = (colIndex: number): boolean => {
    if (colIndex === 0) return false;
    return rows.some((row) => {
      const cell = row[colIndex];
      return cell && /^[\-\+\(\$\d]/.test(cell.trim());
    });
  };

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-bg-tertiary">
            {headers.map((header, i) => (
              <th
                key={i}
                className={`font-sans font-semibold text-xs uppercase tracking-wider px-4 py-3 border border-border-light text-text-secondary ${
                  i === 0 ? 'text-left' : 'text-right'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 1 ? 'bg-bg-secondary' : ''}>
              {row.map((cell, colIndex) => {
                const { text, className } = formatCell(cell);
                const isNumeric = isNumericColumn(colIndex);
                return (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 border border-border-light text-sm ${
                      colIndex === 0 ? 'font-sans text-text-primary' : `font-mono text-right ${className}`
                    }`}
                  >
                    {text}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <p className="text-xs text-text-muted mt-2 italic">{caption}</p>
      )}
    </div>
  );
}
