import Link from 'next/link';
import { FileSpreadsheet, Download } from 'lucide-react';

export interface ModelMeta {
  filename: string;
  company: string;
  version: string;
  lastUpdated: string;
  fileSize: string;
  analysisSlug?: string;
  analysisType?: 'research' | 'fund' | 'startup';
}

interface ModelCardProps {
  model: ModelMeta;
}

export default function ModelCard({ model }: ModelCardProps) {
  const analysisHref =
    model.analysisSlug && model.analysisType
      ? `/${model.analysisType === 'research' ? 'research' : model.analysisType === 'fund' ? 'funds' : 'startups'}/${model.analysisSlug}`
      : null;

  return (
    <div className="card flex flex-col">
      <div className="w-11 h-11 border border-border-light bg-bg-primary flex items-center justify-center mb-4">
        <FileSpreadsheet size={22} className="text-accent-blue" />
      </div>

      <h3 className="font-sans font-semibold text-text-primary mb-1 text-sm break-all leading-snug">
        {model.filename}
      </h3>

      <p className="text-text-secondary text-sm mb-1">{model.company}</p>

      <p className="text-text-muted text-xs mb-5">
        v{model.version} · {model.lastUpdated} · {model.fileSize}
      </p>

      {analysisHref && (
        <p className="text-xs mb-5">
          <Link href={analysisHref} className="text-accent-blue hover:text-accent-blue-light">
            View Analysis →
          </Link>
        </p>
      )}

      <div className="mt-auto">
        <a
          href={`/models/${model.filename}`}
          download
          className="btn-primary w-full py-2 text-sm flex items-center justify-center gap-2 text-center"
        >
          <Download size={14} />
          Download Model
        </a>
      </div>
    </div>
  );
}
