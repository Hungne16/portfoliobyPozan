import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Sora — Creative Portfolio', description: 'Thiết kế, trải nghiệm số và minh họa lấy cảm hứng từ anime Nhật Bản.' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="vi"><body>{children}</body></html>}
