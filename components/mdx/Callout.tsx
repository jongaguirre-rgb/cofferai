import { AlertCircle, Info, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type: 'info' | 'warning' | 'insight';
  title?: string;
  children: React.ReactNode;
}

const typeStyles = {
  info: {
    borderColor: 'border-accent-blue',
    icon: Info,
    iconColor: 'text-accent-blue',
  },
  warning: {
    borderColor: 'border-accent-red',
    icon: AlertCircle,
    iconColor: 'text-accent-red',
  },
  insight: {
    borderColor: 'border-accent-amber',
    icon: Lightbulb,
    iconColor: 'text-accent-amber',
  },
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <div
      className={`bg-bg-secondary border-l-4 ${styles.borderColor} p-6 my-8`}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Icon className={`${styles.iconColor} w-5 h-5 mt-0.5`} />
        </div>
        <div className="flex-1">
          {title && (
            <p className="font-sans font-semibold text-text-primary mb-2 text-sm uppercase tracking-wider">
              {title}
            </p>
          )}
          <div className="text-text-secondary text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
