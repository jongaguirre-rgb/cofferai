import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { StartupPost } from '@/types/content';

interface StartupCardProps {
  post: StartupPost;
}

export default function StartupCard({ post }: StartupCardProps) {
  const typeLabel = {
    'startup-deep-dive': 'Deep Dive',
    'startup-update': 'Update',
  };

  const excerpt = post.content.replace(/[#*`>\[\]]/g, '').replace(/\s+/g, ' ').trim().substring(0, 155);

  return (
    <Link href={`/startups/${post.slug}`} className="h-full hover:!no-underline">
      <article className="card h-full flex flex-col">
        <div className="mb-4 flex gap-2">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 bg-accent-blue/20 text-accent-blue rounded-none">
            {typeLabel[post.analysisType]}
          </span>
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 bg-bg-tertiary text-text-secondary rounded-none">
            {post.sector}
          </span>
        </div>

        <h3 className="font-garamond text-2xl font-bold mb-2 text-text-primary leading-tight">
          {post.title}
        </h3>

        <p className="text-text-secondary text-sm mb-1">
          {post.company} • {post.stage}
        </p>

        <p className="text-text-muted text-xs mb-3">
          {post.hq} • Founded {post.founded} •{' '}
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-bg-primary border border-border-light rounded-none">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold mb-1">Last Valuation</p>
            <p className="font-mono text-sm font-semibold text-text-primary">{post.lastValuation}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted font-semibold mb-1">Total Raised</p>
            <p className="font-mono text-sm font-semibold text-text-primary">{post.totalRaised}</p>
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-5 flex-grow line-clamp-3">
          {excerpt}...
        </p>

        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] bg-bg-secondary text-text-secondary px-2 py-1 rounded-none uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-3 border-t border-border-light text-accent-blue text-sm font-semibold inline-flex items-center gap-1">
          Open Analysis <ArrowUpRight size={14} />
        </div>
      </article>
    </Link>
  );
}
