import { NextResponse } from 'next/server';
import { generateSearchIndex } from '@/lib/mdx';

export const dynamic = 'force-static';

export async function GET() {
  const index = await generateSearchIndex();
  return NextResponse.json(index);
}
