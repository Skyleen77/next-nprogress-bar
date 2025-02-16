'use client';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { useProgressBar } from 'next-nprogress-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { start, stop, inc } = useProgressBar();
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={() => inc(0.3)}>Inc</button>
    </DocsLayout>
  );
}
