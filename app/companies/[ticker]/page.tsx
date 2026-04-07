import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getResearchPosts } from '@/lib/mdx';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getResearchPosts();
  const tickers = Array.from(
    new Set(posts.filter((p) => p.ticker !== 'N/A').map((p) => p.ticker.toLowerCase()))
  );
  return tickers.map((ticker) => ({ ticker }));
}

export async function generateMetadata({ params }: { params: { ticker: string } }): Promise<Metadata> {
  const posts = await getResearchPosts();
  const companyPosts = posts.filter((p) => p.ticker.toLowerCase() === params.ticker);
  if (companyPosts.length === 0) return {};
  const company = companyPosts[0].company;
  return {
    title: `${company} (${params.ticker.toUpperCase()}) | cofferai.com`,
    description: `All research and analysis for ${company}.`,
  };
}

export default async function CompanyProfilePage({ params }: { params: { ticker: string } }) {
  const posts = await getResearchPosts();
  const companyPosts = posts.filter((p) => p.ticker.toLowerCase() === params.ticker);

  if (companyPosts.length === 0) notFound();

  const latest = companyPosts[0];
  const analysisTypeLabel: Record<string, string> = {
    'deep-dive': 'Deep Dive',
    'earnings-update': 'Earnings Update',
    'method-note': 'Method Note',
  };

  const models = companyPosts
    .filter((p) => p.model)
    .map((p) => p.model!);

  return (
    <div className="pt-20 pb-20">
      {/* Company Header */}
      <div className="bg-bg-dark text-text-inverse py-12">
        <div className="container">
          <p className="text-text-inverse/60 text-sm font-mono mb-2">
            {latest.ticker}:{latest.exchange} · {latest.sector}
          </p>
          <h1 className="font-garamond text-4xl md:text-5xl font-bold text-text-inverse mb-2">
            {latest.company}
          </h1>
          <p className="text-text-inverse/70 text-sm">{latest.industry}</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-article">
          {/* All Analyses */}
          <h2 className="font-garamond text-2xl font-bold mb-6">All Analyses</h2>
          <div className="space-y-4 mb-12">
            {companyPosts.map((post) => (
              <Link key={post.slug} href={`/research/${post.slug}`}>
                <div className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 bg-accent-blue/20 text-accent-blue">
                        {analysisTypeLabel[post.analysisType]}
                      </span>
                    </div>
                    <h3 className="font-garamond text-lg font-bold text-text-primary mb-1">{post.title}</h3>
                    <p className="text-text-muted text-xs">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}{' '}
                      · {post.readingTime} min read
                    </p>
                  </div>
                  {post.analysisType === 'deep-dive' && post.valuation && (
                    <div className="flex-shrink-0 text-right">
                      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Base Case</p>
                      <p className="font-mono font-bold text-xl text-text-primary">
                        ${post.valuation.baseCase.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Models */}
          {models.length > 0 && (
            <>
              <h2 className="font-garamond text-2xl font-bold mb-6">Downloadable Models</h2>
              <div className="space-y-3">
                {models.map((model) => (
                  <div key={model.filename} className="card flex items-center justify-between gap-4">
                    <div>
                      <p className="font-sans font-semibold text-sm text-text-primary">{model.filename}</p>
                      <p className="text-text-muted text-xs">v{model.version} · {model.lastUpdated}</p>
                    </div>
                    <a
                      href={`/models/${model.filename}`}
                      download
                      className="btn-primary py-2 px-4 text-xs flex-shrink-0"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-8">
            <Link href="/companies" className="text-accent-blue text-sm hover:text-accent-blue-light">
              ← Back to Companies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
