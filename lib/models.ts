import fs from 'fs';
import path from 'path';
import { ModelMeta } from '@/components/ModelCard';
import { getResearchPosts, getFundPosts, getStartupPosts } from '@/lib/mdx';

const modelsDir = path.join(process.cwd(), 'public', 'models');

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function getModelsMeta(): Promise<ModelMeta[]> {
  if (!fs.existsSync(modelsDir)) return [];

  const files = fs.readdirSync(modelsDir).filter((f) => f.endsWith('.xlsx'));
  if (files.length === 0) return [];

  const [research, funds, startups] = await Promise.all([
    getResearchPosts(),
    getFundPosts(),
    getStartupPosts(),
  ]);

  const models: ModelMeta[] = [];

  for (const filename of files) {
    const filePath = path.join(modelsDir, filename);
    const stats = fs.statSync(filePath);
    const fileSize = formatFileSize(stats.size);

    // Try to match to a research post
    const researchPost = research.find((p) => p.model?.filename === filename);
    if (researchPost && researchPost.model) {
      models.push({
        filename,
        company: researchPost.company,
        version: researchPost.model.version,
        lastUpdated: researchPost.model.lastUpdated,
        fileSize,
        analysisSlug: researchPost.slug,
        analysisType: 'research',
      });
      continue;
    }

    // Fallback: use filename as company name
    models.push({
      filename,
      company: filename.replace(/_Model.*\.xlsx$/, '').replace(/_/g, ' '),
      version: '1.0',
      lastUpdated: new Date(stats.mtime).toISOString().split('T')[0],
      fileSize,
    });
  }

  return models;
}
