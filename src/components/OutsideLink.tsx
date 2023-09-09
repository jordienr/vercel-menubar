import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OutsideLink({
  href,
  children,
}: {
  href: string | undefined;
  children: any;
}) {
  return (
    <a
      className="text-blue-500 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 hover:bg-blue-500/10 dark:hover:bg-blue-500/30 px-1 rounded-md transition-colors inline-flex items-center no-underline"
      target="_blank"
      href={href}
      rel="noreferrer"
    >
      {children}
      <ExternalLink size="16" className="inline-block ml-1 text-blue-400/60" />
    </a>
  );
}
