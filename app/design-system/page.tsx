import type { Metadata } from 'next';
import DesignSystemDocs from '@/components/design-system-docs';
import '@/styles/system-docs.css';

export const metadata: Metadata = {
  title: 'POZAN System — Design language and component guidance',
  description:
    'The design language, foundations, components and experience patterns behind the POZAN portfolio.',
  alternates: { canonical: '/design-system' },
};

export default function DesignSystem() {
  return <DesignSystemDocs />;
}
