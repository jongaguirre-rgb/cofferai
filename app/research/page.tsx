import { getResearchPosts } from '@/lib/mdx';
import ResearchIndexClient from '@/components/ResearchIndexClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research | cofferai.com',
  description: 'Deep dives, earnings updates, and methodology notes on public companies. Every claim sourced to filings.',
};

export default async function ResearchIndex() {
  const posts = await getResearchPosts();
  return <ResearchIndexClient posts={posts} />;
}
