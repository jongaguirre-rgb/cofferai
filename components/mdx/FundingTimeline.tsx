interface FundingRound {
  date: string;
  series: string;
  amount: string;
  valuation: string;
  leadInvestor: string;
}

interface FundingTimelineProps {
  rounds: FundingRound[];
}

export default function FundingTimeline({ rounds }: FundingTimelineProps) {
  return (
    <div className="my-8">
      <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-text-muted mb-6">
        Funding History
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-bg-tertiary">
              <th className="text-left px-4 py-2 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Date</th>
              <th className="text-left px-4 py-2 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Round</th>
              <th className="text-right px-4 py-2 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Amount</th>
              <th className="text-right px-4 py-2 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Valuation</th>
              <th className="text-left px-4 py-2 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Lead Investor</th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((round, i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-bg-secondary' : ''}>
                <td className="px-4 py-2 border border-border-light font-mono text-xs text-text-muted">{round.date}</td>
                <td className="px-4 py-2 border border-border-light text-sm font-semibold text-text-primary">{round.series}</td>
                <td className="px-4 py-2 border border-border-light font-mono text-sm text-right text-text-primary">{round.amount}</td>
                <td className="px-4 py-2 border border-border-light font-mono text-sm text-right text-text-secondary">{round.valuation}</td>
                <td className="px-4 py-2 border border-border-light text-sm text-text-secondary">{round.leadInvestor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
