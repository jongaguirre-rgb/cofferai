interface ValuationBarProps {
  bear: number;
  base: number;
  bull: number;
  current: number;
}

export default function ValuationBar({ bear, base, bull, current }: ValuationBarProps) {
  const min = bear;
  const max = bull;
  const range = max - min;

  const bearPercent = 0;
  const basePercent = ((base - min) / range) * 100;
  const bullPercent = 100;
  const currentPercent = ((current - min) / range) * 100;

  const getCurrentColor = () => {
    if (current < base) return 'bg-accent-red';
    if (current > base) return 'bg-accent-green';
    return 'bg-accent-amber';
  };

  return (
    <div className="my-6">
      <div className="flex items-center gap-8">
        <div className="flex-1">
          {/* Main range bar */}
          <div className="h-3 bg-border-light rounded-full overflow-hidden flex relative">
            {/* Bear section (red) */}
            <div
              style={{ width: `${basePercent}%` }}
              className="bg-accent-red h-full"
              title={`Bear: $${bear.toFixed(2)}`}
            ></div>
            {/* Base section (amber) */}
            <div
              style={{ width: `${bullPercent - basePercent}%` }}
              className="bg-accent-amber h-full"
              title={`Base: $${base.toFixed(2)}`}
            ></div>

            {/* Current price indicator */}
            <div
              style={{ left: `${currentPercent}%` }}
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-text-primary rounded-full border-2 border-bg-primary shadow-md"
              title={`Current: $${current.toFixed(2)}`}
            />
          </div>

          {/* Labels below bar */}
          <div className="mt-3 text-x  s font-mono text-text-muted flex justify-between">
            <span>${bear.toFixed(2)}</span>
            <span>${base.toFixed(2)}</span>
            <span>${bull.toFixed(2)}</span>
          </div>
        </div>

        {/* Current price display */}
        <div className="flex-shrink-0 text-center">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Current</p>
          <p className={`font-mono font-bold text-lg ${getCurrentColor() === 'bg-accent-red' ? 'text-accent-red' : getCurrentColor() === 'bg-accent-green' ? 'text-accent-green' : 'text-accent-amber'}`}>
            ${current.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent-red rounded-full"></div>
          <span className="text-text-secondary">Bear: ${bear.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent-amber rounded-full"></div>
          <span className="text-text-secondary">Base: ${base.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent-green rounded-full"></div>
          <span className="text-text-secondary">Bull: ${bull.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
