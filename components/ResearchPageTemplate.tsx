import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { AlertCircle, Download } from 'lucide-react';
import { ResearchPost } from '@/types/content';
import ValuationBar from '@/components/ValuationBar';
import TableOfContents, { extractHeadings } from '@/components/TableOfContents';
import Callout from '@/components/mdx/Callout';
import FinancialTable from '@/components/mdx/FinancialTable';
import ScenarioTable from '@/components/mdx/ScenarioTable';
import RevenueChart from '@/components/mdx/RevenueChart';
import SensitivityTable from '@/components/mdx/SensitivityTable';
import SourceLink from '@/components/mdx/SourceLink';

const mdxComponents = {
  Callout,
  FinancialTable,
  ScenarioTable,
  RevenueChart,
  SensitivityTable,
  SourceLink,
};

const analysisTypeLabel: Record<string, string> = {
  'deep-dive': 'Deep Dive',
  'earnings-update': 'Earnings Update',
  'method-note': 'Method Note',
};

interface ResearchPageTemplateProps {
  post: ResearchPost;
  relatedPosts?: ResearchPost[];
}

export default function ResearchPageTemplate({ post, relatedPosts = [] }: ResearchPageTemplateProps) {
  const headings = extractHeadings(post.content);
  const isDeepDive = post.analysisType === 'deep-dive';
  const isMethodNote = post.analysisType === 'method-note';

  return (
    <>
      {/* Dark Header Block */}
      <div className="bg-bg-dark text-text-inverse py-16 md:py-20">
        <div className="container">
          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-block border border-text-inverse/30 text-text-inverse px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {analysisTypeLabel[post.analysisType] || post.analysisType}
            </span>
            <span className="inline-block bg-text-inverse/10 text-text-inverse px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {post.sector}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-garamond text-3xl md:text-5xl font-bold text-text-inverse mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="text-text-inverse/65 text-sm font-sans flex flex-wrap gap-x-4 gap-y-1">
            {!isMethodNote && (
              <>
                <span>{post.company}</span>
                <span>·</span>
                <span className="font-mono">{post.ticker}:{post.exchange}</span>
                <span>·</span>
              </>
            )}
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {!isMethodNote && (
              <>
                <span>·</span>
                <span>Data as of {post.dataAsOf}</span>
              </>
            )}
            <span>·</span>
            <span>{post.readingTime} min read</span>
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
          {/* Valuation Summary Card — overlapping header */}
          {isDeepDive && (
            <div className="max-w-article mx-auto mb-12 -mt-8 relative z-10">
              <div className="bg-bg-primary border border-border-light shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-text-muted mb-4">
                  Valuation Summary
                </p>
                <ValuationBar
                  bear={post.valuation.bearCase}
                  base={post.valuation.baseCase}
                  bull={post.valuation.bullCase}
                  current={post.valuation.currentPrice}
                />
                <p className="text-xs text-text-muted mt-4">
                  <strong>Methodology:</strong> {post.valuation.methodology}
                </p>
                {post.model && (
                  <a
                    href={`/models/${post.model.filename}`}
                    download
                    className="btn-secondary mt-6 py-2 text-sm flex items-center justify-center gap-2 w-full"
                  >
                    <Download size={14} />
                    Download Model ({post.model.filename})
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Two-column layout: article + sidebar */}
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

              {/* Back link */}
              <div className="mt-8">
                <Link href="/research" className="text-accent-blue text-sm hover:text-accent-blue-light">
                  ← Back to Research
                </Link>
              </div>
            </article>

            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="mb-8">
                  <TableOfContents headings={headings} />
                </div>
              )}

              {/* Model Download */}
              {post.model && (
                <div className="mb-8 p-4 border border-border-light bg-bg-secondary">
                  <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-text-muted mb-3">
                    Financial Model
                  </p>
                  <a
                    href={`/models/${post.model.filename}`}
                    download
                    className="btn-primary w-full py-2 text-xs flex items-center justify-center gap-2"
                  >
                    <Download size={12} />
                    Download Model
                  </a>
                  <p className="text-[11px] text-text-muted mt-2 text-center">
                    v{post.model.version} · {post.model.lastUpdated}
                  </p>
                </div>
              )}

              {/* Related Analyses */}
              {relatedPosts.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-text-muted mb-3">
                    Related
                  </p>
                  <ul className="space-y-3">
                    {relatedPosts.slice(0, 2).map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={`/research/${related.slug}`}
                          className="block text-sm text-text-primary hover:text-accent-blue hover:!no-underline"
                        >
                          <span className="block font-semibold leading-tight mb-1">{related.title}</span>
                          <span className="text-xs text-text-muted">
                            {new Date(related.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
