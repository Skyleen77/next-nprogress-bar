'use client';

import { Hero } from './_components/hero';
import { Header } from './_components/header';
import { BackgroundLines } from '@/components/ui/background-lines';

export default function HomePage() {
  return (
    <main>
      <Header />

      <BackgroundLines className="h-screen w-full flex lg:flex-row flex-col items-center justify-center">
        <Hero />
      </BackgroundLines>
    </main>
  );
}
