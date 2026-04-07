import { getResearchPosts } from '@/lib/mdx';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Companies | cofferai.com',
  description: 'Every company analyzed on cofferai.com.',
};

export default async function CompaniesIndex() {
  const posts = await getResearchPosts();

  // Build company map: ticker → {company, sector, industry, analyses[]}
  const companyMap = new Map<
    string,
    {
      company: string;
      ticker: string;
      sector: string;
      industry: string;
      analyses: typeof posts;
    }
  >();

  for (const post of posts) {
    if (post.ticker === 'N/A') continue;
    if (!companyMap.has(post.ticker)) {
      companyMap.set(post.ticker, {
        company: post.company,
        ticker: post.ticker,
        sector: post.sector,
        industry: post.industry,
        analyses: [],
      });
    }
    companyMap.get(post.ticker)!.analyses.push(post);
  }

  const companies = Array.from(companyMap.values()).sort((a, b) =>
    a.company.localeCompare(b.company)
  );

  return (
    <div className="pt-20 pb-20">
      <div className="container mb-12">
        <h1 className="font-garamond text-5xl font-bold mb-4">Companies</h1>
        <p className="text-text-secondary max-w-2xl">
          Every company analyzed on cofferai.com. Click a company name to see all associated research and downloadable models.
        </p>
      </div>

      <div className="container">
        {companies.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted">No company analyses published yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light w-[30%]">Company</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light w-[10%]">Ticker</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light w-[15%]">Sector</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light w-[10%]">Analyses</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light w-[15%]">Latest</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light w-[20%]">Base Case</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((co, i) => {
                  const latest = co.analyses[0];
                  const baseCase = latest?.valuation?.baseCase;
                  return (
                    <tr key={co.ticker} className={i % 2 === 1 ? 'bg-bg-secondary' : ''}>
                      <td className="px-4 py-3 border border-border-light">
                        <a
                          href={`/companies/${co.ticker.toLowerCase()}`}
                          className="text-accent-blue hover:text-accent-blue-light font-semibold text-sm"
                        >
                          {co.company}
                        </a>
                      </td>
                      <td className="px-4 py-3 border border-border-light font-mono text-sm text-text-secondary">
                        {co.ticker}
                      </td>
                      <td className="px-4 py-3 border border-border-light text-sm text-text-secondary">{co.sector}</td>
                      <td className="px-4 py-3 border border-border-light text-sm font-mono text-right text-text-primary">
                        {co.analyses.length}
                      </td>
                      <td className="px-4 py-3 border border-border-light text-sm text-text-muted">
                        {new Date(latest.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-3 border border-border-light text-sm font-mono text-right text-text-primary">
                        {baseCase ? `$${baseCase.toFixed(2)}` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
