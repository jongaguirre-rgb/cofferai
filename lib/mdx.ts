import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ResearchPost, FundPost, StartupPost, validateResearchPost, validateFundPost, validateStartupPost } from '@/types/content';

const contentDir = path.join(process.cwd(), 'content');

export async function getResearchPosts(): Promise<ResearchPost[]> {
  const researchDir = path.join(contentDir, 'research');

  if (!fs.existsSync(researchDir)) {
    return [];
  }

  const files = fs.readdirSync(researchDir).filter((f) => f.endsWith('.mdx'));
  const posts: ResearchPost[] = [];

  for (const file of files) {
    const filePath = path.join(researchDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);

    try {
      const post: ResearchPost = {
        ...(data as unknown),
        content: body,
      } as ResearchPost;
      validateResearchPost(post);

      if (post.status === 'published') {
        posts.push(post);
      }
    } catch (error) {
      console.error(`Error parsing research post ${file}:`, error);
      throw error;
    }
  }

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFundPosts(): Promise<FundPost[]> {
  const fundsDir = path.join(contentDir, 'funds');

  if (!fs.existsSync(fundsDir)) {
    return [];
  }

  const files = fs.readdirSync(fundsDir).filter((f) => f.endsWith('.mdx'));
  const posts: FundPost[] = [];

  for (const file of files) {
    const filePath = path.join(fundsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);

    try {
      const post: FundPost = {
        ...(data as unknown),
        content: body,
      } as FundPost;
      validateFundPost(post);

      if (post.status === 'published') {
        posts.push(post);
      }
    } catch (error) {
      console.error(`Error parsing fund post ${file}:`, error);
      throw error;
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getStartupPosts(): Promise<StartupPost[]> {
  const startupsDir = path.join(contentDir, 'startups');

  if (!fs.existsSync(startupsDir)) {
    return [];
  }

  const files = fs.readdirSync(startupsDir).filter((f) => f.endsWith('.mdx'));
  const posts: StartupPost[] = [];

  for (const file of files) {
    const filePath = path.join(startupsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: body } = matter(content);

    try {
      const post: StartupPost = {
        ...(data as unknown),
        content: body,
      } as StartupPost;
      validateStartupPost(post);

      if (post.status === 'published') {
        posts.push(post);
      }
    } catch (error) {
      console.error(`Error parsing startup post ${file}:`, error);
      throw error;
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getResearchPostBySlug(slug: string): Promise<ResearchPost | null> {
  const posts = await getResearchPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getFundPostBySlug(slug: string): Promise<FundPost | null> {
  const posts = await getFundPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getStartupPostBySlug(slug: string): Promise<StartupPost | null> {
  const posts = await getStartupPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// Generate search index at build time
export async function generateSearchIndex() {
  const [research, funds, startups] = await Promise.all([getResearchPosts(), getFundPosts(), getStartupPosts()]);

  const searchIndex = [
    ...research.map((post) => ({
      type: 'research',
      title: post.title,
      slug: post.slug,
      company: post.company,
      ticker: post.ticker,
      sector: post.sector,
      tags: post.tags,
      analysisType: post.analysisType,
      date: post.date,
      excerpt: post.content.substring(0, 160),
    })),
    ...funds.map((post) => ({
      type: 'fund',
      title: post.title,
      slug: post.slug,
      company: post.fundName,
      sector: post.fundType,
      tags: post.tags,
      date: post.date,
      excerpt: post.content.substring(0, 160),
    })),
    ...startups.map((post) => ({
      type: 'startup',
      title: post.title,
      slug: post.slug,
      company: post.company,
      sector: post.sector,
      tags: post.tags,
      date: post.date,
      excerpt: post.content.substring(0, 160),
    })),
  ];

  return searchIndex;
}
