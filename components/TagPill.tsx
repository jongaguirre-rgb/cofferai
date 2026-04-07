interface TagPillProps {
  label: string;
}

export default function TagPill({ label }: TagPillProps) {
  return (
    <span className="inline-block bg-bg-tertiary text-text-secondary px-[10px] py-1 text-[11px] font-sans font-semibold uppercase tracking-[0.06em] rounded-none">
      {label}
    </span>
  );
}
