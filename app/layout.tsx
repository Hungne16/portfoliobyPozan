import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Pozan — Software Engineer & Creative Developer',
  description:
    'Portfolio của Pozan — sinh viên Công nghệ Phần mềm tại HUCE, kỹ sư phần mềm và creative developer.',
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
