import Link from 'next/link';
import { ArrowRight, Building2, PieChart, Rocket } from 'lucide-react';
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

  const allRecent = [
    ...research.map((p) => ({ type: 'research' as const, post: p, date: p.date })),
    ...funds.map((p) => ({ type: 'fund' as const, post: p, date: p.date })),
    ...startups.map((p) => ({ type: 'startup' as const, post: p, date: p.date })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-bg-dark text-text-inverse pt-28 pb-24 md:pt-32 md:pb-28">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -top-16 left-[8%] w-80 h-80 rounded-full bg-accent-blue/40 blur-3xl" />
          <div className="absolute top-20 right-[12%] w-72 h-72 rounded-full bg-accent-green/20 blur-3xl" />
        </div>
        <div className="container relative text-center fade-up">
          <p className="section-eyebrow text-text-inverse/70 mb-4">Institutional-Grade Research</p>
          <h1 className="font-garamond font-bold text-text-inverse mx-auto text-5xl md:text-6xl leading-[1.1] max-w-4xl mb-6">
            Financial Analysis Built For Clarity, Not Noise
          </h1>
          <p className="font-sans text-text-inverse/75 mx-auto text-lg leading-relaxed mb-10 max-w-2xl">
            Rigorous deep dives, transparent assumptions, and auditable models across public companies, private funds, and startups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/research" className="btn-primary inline-flex justify-center items-center gap-2 px-8 py-3">
              Read Latest Research
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex justify-center items-center px-8 py-3 border border-text-inverse/35 text-text-inverse text-sm font-semibold uppercase tracking-wider hover:bg-text-inverse/10 transition-colors"
            >
              View Methodology
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="section-eyebrow mb-2">New This Week</p>
              <h2 className="font-garamond font-bold text-4xl text-text-primary m-0">Latest Research</h2>
            </div>
            <Link href="/research" className="text-accent-blue font-semibold hover:text-accent-blue-light inline-flex items-center gap-1">
              View All Research
              <ArrowRight size={14} />
            </Link>
          </div>

          {allRecent.length === 0 ? (
            <div className="glass-panel border border-border-light p-10 text-center">
              <p className="text-text-muted">No published analyses yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-secondary border-y border-border-light">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="section-eyebrow mb-2">Coverage</p>
            <h2 className="font-garamond font-bold text-4xl text-text-primary">Browse by Category</h2>
          </div>

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
                <Link key={category.href} href={category.href} className="card group h-full flex flex-col items-start text-left hover:!no-underline">
                  <div className="w-12 h-12 mb-5 border border-border-light bg-bg-primary flex items-center justify-center">
                    <Icon size={24} className="text-accent-blue" />
                  </div>
                  <h3 className="font-garamond text-2xl font-bold mb-2 text-text-primary">{category.title}</h3>
                  <p className="text-text-secondary text-sm mb-5">{category.description}</p>
                  <div className="mt-auto w-full pt-4 border-t border-border-light flex items-center justify-between text-sm">
                    <span className="text-text-muted font-semibold">{category.count}</span>
                    <span className="text-accent-blue inline-flex items-center gap-1">
                      Explore
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="section-eyebrow mb-2">Open Models</p>
              <h2 className="font-garamond font-bold text-4xl text-text-primary m-0">Downloadable Models</h2>
            </div>
            <Link href="/models" className="text-accent-blue font-semibold hover:text-accent-blue-light inline-flex items-center gap-1">
              View All Models
              <ArrowRight size={14} />
            </Link>
          </div>

          {models.length === 0 ? (
            <div className="glass-panel border border-border-light p-10 text-center">
              <p className="text-text-muted mb-2">No models available yet.</p>
              <p className="text-text-muted text-sm">Models appear here as analyses are published.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {models.slice(0, 3).map((model) => (
                <ModelCard key={model.filename} model={model} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-bg-secondary border-t border-border-light soft-grid-bg">
        <div className="container">
          <div className="glass-panel p-8 md:p-10 border border-border-light flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="section-eyebrow mb-2">About The Work</p>
              <p className="text-text-primary mb-3">
                cofferai.com is a personal research platform designed to demonstrate institutional-quality analytical thinking across credit, equity, and venture markets.
              </p>
              <p className="text-text-secondary text-sm mb-0">
                Every thesis is independently formed, explicitly sourced, and published with transparent assumptions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/about" className="btn-secondary inline-flex items-center justify-center px-6 py-2.5 text-sm text-center">
                About
              </Link>
              <Link href="/methodology" className="btn-ghost inline-flex items-center justify-center px-6 py-2.5 text-sm text-center">
                Methodology →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
