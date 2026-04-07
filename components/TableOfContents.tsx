'use client';

import { useEffect, useState, useCallback } from 'react';

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY + 120;
    let current = '';
    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el && el.offsetTop <= scrollY) {
        current = heading.id;
      }
    }
    setActiveId(current);
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of Contents">
      <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-text-muted mb-3">
        Contents
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block text-sm py-1 pl-3 border-l-2 transition-colors hover:!no-underline ${
                activeId === h.id
                  ? 'border-accent-blue text-accent-blue font-semibold'
                  : 'border-border-light text-text-secondary hover:text-text-primary hover:border-border-dark'
              }`}
              style={{ paddingLeft: h.level === 3 ? '1.5rem' : '0.75rem' }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Utility: extract headings from MDX content string
export function extractHeadings(content: string): TOCHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCHeading[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    headings.push({ id, text, level });
  }
  return headings;
}
