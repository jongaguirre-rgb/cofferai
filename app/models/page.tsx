import { getModelsMeta } from '@/lib/models';
import ModelCard from '@/components/ModelCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Downloadable Models | cofferai.com',
  description: 'Every financial model is open and auditable. Download Excel models for all published analyses.',
};

export default async function ModelsPage() {
  const models = await getModelsMeta();

  return (
    <div className="pt-20 pb-20">
      <div className="container mb-12">
        <h1 className="font-garamond text-5xl font-bold mb-4">Downloadable Models</h1>
        <p className="text-text-secondary max-w-2xl">
          Every financial model is open and auditable. Examine assumptions, modify inputs, and run your own scenarios. All models are provided as-is for educational purposes.
        </p>
      </div>

      <div className="container">
        {models.length === 0 ? (
          <div className="text-center py-16 border border-border-light bg-bg-secondary">
            <p className="text-text-muted mb-2">No models available yet.</p>
            <p className="text-text-muted text-sm">Models will appear here as analyses are published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((model) => (
              <ModelCard key={model.filename} model={model} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
