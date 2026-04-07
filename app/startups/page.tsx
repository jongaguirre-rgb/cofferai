import { getStartupPosts } from '@/lib/mdx';
import StartupCard from '@/components/StartupCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Startup Analysis | cofferai.com',
  description: 'Pre-IPO and late-stage startup analysis covering valuation, competitive positioning, and funding history.',
};

export default async function StartupsIndex() {
  const posts = await getStartupPosts();

  return (
    <div className="pt-20 pb-20">
      {/* Header */}
      <div className="container mb-12">
        <h1 className="font-garamond text-5xl font-bold mb-4">Startups</h1>
        <p className="text-text-secondary max-w-2xl">
          Pre-IPO and late-stage startup analysis. Valuation frameworks, competitive positioning, and funding history sourced from public disclosures.
        </p>
      </div>

      {/* Summary Table */}
      {posts.length > 0 && (
        <div className="container mb-12">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Company</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Stage</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Sector</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Last Valuation</th>
                  <th className="text-right px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Total Raised</th>
                  <th className="text-left px-4 py-3 text-xs uppercase tracking-wider font-semibold text-text-secondary border border-border-light">Date</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post.slug} className={i % 2 === 1 ? 'bg-bg-secondary' : ''}>
                    <td className="px-4 py-3 border border-border-light">
                      <a href={`/startups/${post.slug}`} className="text-accent-blue hover:text-accent-blue-light font-semibold text-sm">
                        {post.company}
                      </a>
                    </td>
                    <td className="px-4 py-3 border border-border-light text-sm text-text-secondary">{post.stage}</td>
                    <td className="px-4 py-3 border border-border-light text-sm text-text-secondary">{post.sector}</td>
                    <td className="px-4 py-3 border border-border-light text-sm font-mono text-right">{post.lastValuation}</td>
                    <td className="px-4 py-3 border border-border-light text-sm font-mono text-right">{post.totalRaised}</td>
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

      {/* Cards */}
      <div className="container">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted">No startup analyses published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <StartupCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
