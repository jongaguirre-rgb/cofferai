interface SourceLinkProps {
  href: string;
  filing: string;
  date: string;
  index?: number;
}

export default function SourceLink({ href, filing, date, index = 1 }: SourceLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="superscript text-xs align-super">
      [{index}]
    </a>
  );
}
