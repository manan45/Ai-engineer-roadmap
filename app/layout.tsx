import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atlas — Frontier AI Engineering Roadmap',
  description:
    'Self-contained curriculum for reaching AI Engineer / Staff Engineer at a frontier AI lab. Every resource free and open.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-bg">
      <body className="min-h-screen bg-bg text-ink font-sans">{children}</body>
    </html>
  );
}
