import Link from 'next/link';
import type { ReactNode } from 'react';

export function LocalText({ vi, en }: { vi: string; en: string }) {
  return (
    <span data-localized data-vi={vi} data-en={en}>
      {vi}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="system-tag">{children}</span>;
}

export function MetaLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="system-link" href={href}>
      {children} <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function SystemButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="system-button" href={href}>
      {children} <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function Divider() {
  return <hr className="system-divider" />;
}
