import Link from 'next/link';
import { StartupPost } from '@/types/content';

interface StartupCardProps {
  post: StartupPost;
}

export default function StartupCard({ post }: StartupCardProps) {
  const typeLabel = {
    'startup-deep-dive': 'Deep Dive',
    'startup-update': 'Update',
  };

  return (
    <Link href={`/startups/${post.slug}`}>
      <div className="card h-full flex flex-col hover:shadow-md transition-shadow">
        <div className="mb-3 flex gap-2">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 bg-accent-blue/20 text-accent-blue rounded-none">
            {typeLabel[post.analysisType]}
          </span>
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-1 bg-bg-tertiary text-text-secondary rounded-none">
            {post.sector}
          </span>
        </div>

        <h3 className="font-garamond text-xl font-bold mb-2 text-text-primary">
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

        <p className="text-text-secondary text-sm mb-4 flex-grow line-clamp-2">
          {post.content.substring(0, 160)}...
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-bg-secondary text-text-secondary px-2 py-1 rounded-none"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
