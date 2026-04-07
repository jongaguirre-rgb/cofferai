import { notFound } from 'next/navigation';
import { getStartupPostBySlug, getStartupPosts } from '@/lib/mdx';
import StartupPageTemplate from '@/components/StartupPageTemplate';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getStartupPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getStartupPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | cofferai.com`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      url: `https://cofferai.com/startups/${post.slug}`,
      authors: [post.author],
      publishedTime: post.date,
    },
  };
}

export default async function StartupAnalysisPage({ params }: { params: { slug: string } }) {
  const post = await getStartupPostBySlug(params.slug);
  if (!post) notFound();
  return <StartupPageTemplate post={post} />;
}
