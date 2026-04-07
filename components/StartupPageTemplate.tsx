import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { AlertCircle } from 'lucide-react';
import { StartupPost } from '@/types/content';
import StartupMetricsCard from '@/components/StartupMetricsCard';
import TableOfContents, { extractHeadings } from '@/components/TableOfContents';
import Callout from '@/components/mdx/Callout';
import FinancialTable from '@/components/mdx/FinancialTable';
import ScenarioTable from '@/components/mdx/ScenarioTable';
import FundingTimeline from '@/components/mdx/FundingTimeline';
import CompetitorMap from '@/components/mdx/CompetitorMap';
import SourceLink from '@/components/mdx/SourceLink';

const mdxComponents = {
  Callout,
  FinancialTable,
  ScenarioTable,
  FundingTimeline,
  CompetitorMap,
  SourceLink,
};

const typeLabel: Record<string, string> = {
  'startup-deep-dive': 'Deep Dive',
  'startup-update': 'Update',
};

interface StartupPageTemplateProps {
  post: StartupPost;
}

export default function StartupPageTemplate({ post }: StartupPageTemplateProps) {
  const headings = extractHeadings(post.content);

  return (
    <>
      {/* Dark Header Block */}
      <div className="bg-bg-dark text-text-inverse py-16 md:py-20">
        <div className="container">
          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-block border border-text-inverse/30 text-text-inverse px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {typeLabel[post.analysisType] || post.analysisType}
            </span>
            <span className="inline-block bg-text-inverse/10 text-text-inverse px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {post.sector}
            </span>
            <span className="inline-block bg-text-inverse/10 text-text-inverse px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {post.stage}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-garamond text-3xl md:text-5xl font-bold text-text-inverse mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="text-text-inverse/65 text-sm font-sans flex flex-wrap gap-x-4 gap-y-1">
            <span>{post.company}</span>
            <span>·</span>
            <span>{post.stage}</span>
            <span>·</span>
            <span>{post.sector}</span>
            <span>·</span>
            <span>{post.hq}</span>
            <span>·</span>
            <span>Founded {post.founded}</span>
            <span>·</span>
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Disclosure Bar */}
          <div className="mt-6 bg-text-inverse/[0.08] border border-text-inverse/10 p-4 flex items-start gap-3">
            <AlertCircle size={14} className="text-text-inverse/60 mt-0.5 flex-shrink-0" />
            <p className="text-text-inverse/60 text-[13px] font-sans">{post.disclosure}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-bg-primary py-12">
        <div className="container">
          {/* Startup Metrics Card */}
          <div className="max-w-article mx-auto mb-12 -mt-8 relative z-10">
            <StartupMetricsCard post={post} />
          </div>

          {/* Two-column layout */}
          <div className="flex gap-12 items-start">
            {/* Article Body */}
            <article className="flex-1 min-w-0 max-w-article">
              <div className="mdx-prose">
                <MDXRemote source={post.content} components={mdxComponents} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-border-light">
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-bg-secondary border border-border-light text-text-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Link href="/startups" className="text-accent-blue text-sm hover:text-accent-blue-light">
                  ← Back to Startups
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
              {headings.length > 0 && (
                <div className="mb-8">
                  <TableOfContents headings={headings} />
                </div>
              )}

              {/* Quick metrics */}
              <div className="p-4 border border-border-light bg-bg-secondary">
                <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-text-muted mb-3">
                  Key Metrics
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-muted">Last Valuation</span>
                    <span className="font-mono text-xs font-semibold text-text-primary">{post.lastValuation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-muted">Total Raised</span>
                    <span className="font-mono text-xs font-semibold text-text-primary">{post.totalRaised}</span>
                  </div>
                  {post.metrics.revenue && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-muted">Revenue</span>
                      <span className="font-mono text-xs font-semibold text-text-primary">{post.metrics.revenue}</span>
                    </div>
                  )}
                  {post.metrics.employees && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-muted">Employees</span>
                      <span className="font-mono text-xs font-semibold text-text-primary">{post.metrics.employees}</span>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
