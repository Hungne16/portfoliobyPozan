import type { Metadata, Viewport } from 'next';
import './globals.css';
import '../styles/tokens.css';
import '../styles/editorial.css';
import '../styles/profile-crt.css';
export const viewport: Viewport = { themeColor: '#0B0B0D' };
export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliobypozan.vercel.app'),
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pozan — Multidisciplinary Designer & Creative Developer',
    description:
      'Designing digital products, social campaigns and interactive visual experiences.',
    images: ['/anime-studio.png'],
    type: 'website',
  },
  title: 'Pozan — Multidisciplinary Designer & Creative Developer',
  description:
    'Portfolio of Pozan — UI/UX, social media design, branding and creative development.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
