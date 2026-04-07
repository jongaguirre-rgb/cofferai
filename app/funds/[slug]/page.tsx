import { notFound } from 'next/navigation';
import { getFundPostBySlug, getFundPosts } from '@/lib/mdx';
import FundPageTemplate from '@/components/FundPageTemplate';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getFundPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getFundPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | cofferai.com`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      url: `https://cofferai.com/funds/${post.slug}`,
      authors: [post.author],
      publishedTime: post.date,
    },
  };
}

export default async function FundAnalysisPage({ params }: { params: { slug: string } }) {
  const post = await getFundPostBySlug(params.slug);
  if (!post) notFound();
  return <FundPageTemplate post={post} />;
}
