import { Play } from 'lucide-react';
import Link from 'next/link';

export interface ProgressLinkProps {
  children: React.ReactNode;
  disabled?: boolean;
  target?: string;
  href?: string;
  onClick?: () => void;
}

export const ProgressLink = ({
  children,
  target,
  disabled,
  href,
  onClick,
}: ProgressLinkProps) => {
  const Component = href ? Link : 'div';

  const datasets = disabled
    ? {
        'data-disable-nprogress': true,
      }
    : {};

  return (
    <Component
      href={href as any}
      target={target}
      onClick={onClick}
      className="cursor-pointer group flex flex-row items-center gap-x-2"
      {...datasets}
    >
      <div className="bg-gray-200 group-hover:bg-gray-300 transition p-2.5 rounded-full">
        <Play className="w-6 h-6 pl-0.5" />
      </div>

      <span>{children}</span>
    </Component>
  );
};
