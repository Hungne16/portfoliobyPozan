import type { Metadata, Viewport } from 'next';
import './globals.css';
import '../styles/tokens.css';
import '../styles/editorial.css';
export const viewport: Viewport = { themeColor: '#0B0B0D' };
export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliobypozan.vercel.app'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pozan — Creative Developer, UI/UX Designer & Software Engineer',
    description:
      'Designing and building digital experiences through UI/UX, visual systems and software engineering.',
    images: ['/anime-studio.png'],
    type: 'website',
  },
  title: 'Pozan — Creative Developer, UI/UX Designer & Software Engineer',
  description:
    'Portfolio of Pozan — designing and building digital experiences through UI/UX, visual systems, creative development and software engineering.',
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
