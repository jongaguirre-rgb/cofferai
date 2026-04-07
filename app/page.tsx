import Link from 'next/link';
import { Building2, PieChart, Rocket } from 'lucide-react';
import { getResearchPosts, getFundPosts, getStartupPosts } from '@/lib/mdx';
import { getModelsMeta } from '@/lib/models';
import ResearchCard from '@/components/ResearchCard';
import FundCard from '@/components/FundCard';
import StartupCard from '@/components/StartupCard';
import ModelCard from '@/components/ModelCard';

export default async function Home() {
  const [research, funds, startups, models] = await Promise.all([
    getResearchPosts(),
    getFundPosts(),
    getStartupPosts(),
    getModelsMeta(),
  ]);

  // Latest 3 across all types, sorted by date
  const allRecent = [
    ...research.map((p) => ({ type: 'research' as const, post: p, date: p.date })),
    ...funds.map((p) => ({ type: 'fund' as const, post: p, date: p.date })),
    ...startups.map((p) => ({ type: 'startup' as const, post: p, date: p.date })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-bg-dark text-text-inverse" style={{ padding: '100px 0 80px' }}>
        <div className="container text-center">
          <h1
            className="font-garamond font-bold text-text-inverse text-center mx-auto"
            style={{ fontSize: '52px', lineHeight: '1.2', letterSpacing: '-0.01em', marginBottom: '24px', maxWidth: '760px' }}
          >
            Company Research & Financial Analysis
          </h1>
          <p
            className="font-sans text-text-inverse/70 text-center mx-auto"
            style={{ fontSize: '19px', lineHeight: '1.6', marginBottom: '40px', maxWidth: '600px' }}
          >
            Rigorous, transparent analysis. Every claim sourced to filings. Every model downloadable.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/research" className="btn-primary inline-block px-8 py-3">
              Read Latest Research
            </Link>
            <Link
              href="/methodology"
              className="inline-block px-8 py-3 border border-text-inverse/40 text-text-inverse text-sm font-semibold uppercase tracking-wider hover:bg-text-inverse/10 transition-colors"
            >
              View Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Research */}
      <section className="bg-bg-primary" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="font-garamond font-bold mb-3" style={{ fontSize: '30px' }}>Latest Research</h2>
          <p className="text-text-secondary mb-10 max-w-2xl">
            Deep dives into public companies, funds, and startups — with transparent assumptions and downloadable models.
          </p>

          {allRecent.length === 0 ? (
            <p className="text-text-muted">No published analyses yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {allRecent.map(({ type, post }) => {
                if (type === 'research') {
                  return <ResearchCard key={post.slug} post={post as typeof research[0]} />;
                }
                if (type === 'fund') {
                  return <FundCard key={post.slug} post={post as typeof funds[0]} />;
                }
                return <StartupCard key={post.slug} post={post as typeof startups[0]} />;
              })}
            </div>
          )}

          <Link href="/research" className="text-accent-blue font-semibold hover:text-accent-blue-light">
            View All Research →
          </Link>
        </div>
      </section>

      {/* By Category */}
      <section className="bg-bg-secondary" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="font-garamond font-bold mb-12 text-center" style={{ fontSize: '30px' }}>Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: 'Public Companies',
                description: 'Valuation analysis and earnings research on listed equities',
                count: `${research.length} ${research.length === 1 ? 'analysis' : 'analyses'}`,
                href: '/research',
              },
              {
                icon: PieChart,
                title: 'Funds',
                description: 'Vintage performance analysis of PE, VC, and credit funds',
                count: `${funds.length} ${funds.length === 1 ? 'analysis' : 'analyses'}`,
                href: '/funds',
              },
              {
                icon: Rocket,
                title: 'Startups',
                description: 'Pre-IPO companies and late-stage venture analysis',
                count: `${startups.length} ${startups.length === 1 ? 'analysis' : 'analyses'}`,
                href: '/startups',
              },
            ].map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.href} href={category.href}>
                  <div className="card h-full flex flex-col items-center text-center">
                    <Icon size={40} className="text-accent-blue mb-4" />
                    <h3 className="font-garamond text-2xl font-bold mb-2">{category.title}</h3>
                    <p className="text-text-secondary text-sm mb-3">{category.description}</p>
                    <p className="text-text-muted text-sm font-semibold mt-auto">{category.count}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Downloadable Models */}
      <section className="bg-bg-primary" style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 className="font-garamond font-bold mb-4" style={{ fontSize: '30px' }}>Downloadable Models</h2>
          <p className="text-text-secondary mb-10">
            Every financial model is open and auditable. Examine assumptions, modify inputs, and run your own scenarios.
          </p>
          {models.length === 0 ? (
            <p className="text-text-muted mb-8">Models will appear here as analyses are published.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {models.slice(0, 3).map((model) => (
                <ModelCard key={model.filename} model={model} />
              ))}
            </div>
          )}
          <Link href="/models" className="text-accent-blue font-semibold hover:text-accent-blue-light">
            View All Models →
          </Link>
        </div>
      </section>

      {/* About Callout */}
      <section className="bg-bg-secondary" style={{ padding: '64px 0' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1 max-w-2xl">
              <p className="text-text-primary mb-4">
                cofferai.com is a personal financial research portfolio demonstrating institutional-quality analytical capability across public equities, private credit, venture capital, and pre-IPO companies.
              </p>
              <p className="text-text-secondary text-sm">
                Every analysis reflects independent views. Every claim traces to a primary source. Every model is auditable and freely downloadable.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link href="/about" className="btn-secondary inline-block px-6 py-2 text-sm text-center">
                About
              </Link>
              <Link href="/methodology" className="btn-ghost inline-block px-6 py-2 text-sm text-center">
                Methodology →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
