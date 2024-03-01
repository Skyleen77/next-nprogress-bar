import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { ProgressProvider } from '@/context/progress-context';

export const metadata: Metadata = {
  title: 'Next NProgress Bar - Progress bar for Next.js',
  description:
    'Progress bar for Next.js compatible with next pages and app directory.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body>
        <ProgressProvider>
          <Providers>{children}</Providers>
        </ProgressProvider>
      </body>
    </html>
  );
}
