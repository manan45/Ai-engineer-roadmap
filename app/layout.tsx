import './globals.css';
import type { Metadata } from 'next';
import { Source_Serif_4 } from 'next/font/google';

const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-serif-source',
});

export const metadata: Metadata = {
  title: 'Atlas — Frontier AI Engineering Roadmap',
  description:
    'Self-contained curriculum for reaching AI Engineer / Staff Engineer at a frontier AI lab. Every resource free and open.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-bg" suppressHydrationWarning>
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('atlas.theme');if(t==='night'||t==='paper'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','paper');}})()`,
          }}
        />
      </head>
      <body className={`min-h-screen bg-bg text-ink font-sans ${sourceSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}
