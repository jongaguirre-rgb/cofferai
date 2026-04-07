import { notFound } from 'next/navigation';
import { getResearchPostBySlug, getResearchPosts } from '@/lib/mdx';
import ResearchPageTemplate from '@/components/ResearchPageTemplate';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const posts = await getResearchPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getResearchPostBySlug(params.slug);
  if (!post) return {};

  const description = post.content.replace(/[#*`[\]]/g, '').substring(0, 160);

  return {
    title: `${post.title} | cofferai.com`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: `https://cofferai.com/research/${post.slug}`,
      authors: [post.author],
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
    other: {
      'article:author': post.author,
      'article:published_time': post.date,
    },
  };
}

export default async function ResearchArticlePage({ params }: { params: { slug: string } }) {
  const [post, allPosts] = await Promise.all([
    getResearchPostBySlug(params.slug),
    getResearchPosts(),
  ]);

  if (!post) notFound();

  // Related: same tags, excluding current
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  return <ResearchPageTemplate post={post} relatedPosts={related} />;
}
