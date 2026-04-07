import { getFundPosts } from '@/lib/mdx';
import FundCard from '@/components/FundCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fund Analysis | cofferai.com',
  description: 'Vintage performance analysis of private equity, venture capital, and credit funds.',
};

export default async function FundsIndex() {
  const posts = await getFundPosts();
  const fundTypes = Array.from(new Set(posts.map((p) => p.fundType)));

  return (
    <div className="pt-20 pb-20">
      {/* Header */}
      <div className="container mb-12">
        <h1 className="font-garamond text-5xl font-bold mb-4">Funds</h1>
        <p className="text-text-secondary max-w-2xl">
          Vintage performance analysis of private equity, venture capital, and credit funds. MOIC, IRR, and DPI sourced from public disclosures and LP reporting.
        </p>
      </div>

      {/* Summary Table */}
      {posts.length > 0 && (
        <div className="container mb-12">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Fund Name</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Type</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Vintage</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">AUM</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Net MOIC</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Net IRR</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">DPI</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Date</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post.slug} className={i % 2 === 1 ? 'bg-bg-secondary' : ''}>
                    <td className="px-4 py-3 border border-border-light">
                      <a href={`/funds/${post.slug}`} className="text-accent-blue hover:text-accent-blue-light font-semibold text-sm">
                        {post.fundName}
                      </a>
                    </td>
                    <td className="px-4 py-3 border border-border-light text-sm text-text-secondary">{post.fundType}</td>
                    <td className="px-4 py-3 border border-border-light text-sm font-mono text-right">{post.fundVintage}</td>
                    <td className="px-4 py-3 border border-border-light text-sm font-mono text-right">{post.aum}</td>
                    <td className="px-4 py-3 border border-border-light text-sm font-mono text-right text-accent-green font-semibold">{post.metrics.netMoic}x</td>
                    <td className="px-4 py-3 border border-border-light text-sm font-mono text-right text-accent-green font-semibold">{post.metrics.netIrr}</td>
                    <td className="px-4 py-3 border border-border-light text-sm font-mono text-right">{post.metrics.dpi}x</td>
                    <td className="px-4 py-3 border border-border-light text-sm text-text-muted">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="container">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted">No fund analyses published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <FundCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
