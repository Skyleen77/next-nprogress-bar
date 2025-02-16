import './globals.css';

import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <RootProvider>{children}</RootProvider>
        </Providers>
      </body>
    </html>
  );
}
